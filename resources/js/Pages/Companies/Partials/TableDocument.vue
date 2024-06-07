
<template>
    <div>
        <div class="card">
            <Toolbar class="mb-4 border border-slate-200 ...">
                <template #start>
                    <Button label="Delete" icon="pi pi-trash" severity="danger" class="danger-button" @click="confirmDeleteSelected" :disabled="!selectedDocuments || !selectedDocuments.length" />
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="documents" v-model:selection="selectedDocuments" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                :currentPageReportTemplate="`${$t('Showing')} {first} ${$t('of')} {last} ${$t('of')} {totalRecords} ${$t('documents')}`">
                <template #header>
                    <div class="flex justify-between items-center mt-2">
                        <h4>{{ $t('Manage documents') }}</h4>
                        <div class="relative rounded-md shadow-sm w-1/4">
                            <input type="search" class="block w-full h-11 rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" v-model="filters['global'].value" :placeholder="$t('Search...')">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                </template>

                <Column selectionMode="multiple" :exportable="false" class="datetable checkbox" ></Column>
                <Column field="number" :header="$t('Number')" sortable class="dateTable"></Column>
                <Column field="customer_name" :header="$t('Receiver')" sortable class="dateTable"></Column>
                <Column field="date"  :header="$t('Date')" sortable class="dateTable"></Column>
                <Column field="amount" :header="$t('Amount')" sortable class="dateTable"></Column>
                <Column field="document_type_name" :header="$t('Type')" sortable class="dateTable"></Column>
                <Column :exportable="false" class="dateTable">
                    <template #body="slotProps">
                        <Button icon="pi pi-file-check" outlined rounded class="mr-2 simpleInvoice-button" 
                            :disabled="slotProps.data.document_type_name !== 'Presupuesto'" 
                            @click="slotProps.data.document_type_name === 'Presupuesto' ? checkDocument() : null" />
                    
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2 edit-button" 
                            @click="handleInfoButtonClick(slotProps.data)" />
                    
                        <Button icon="pi pi-trash" outlined rounded class="simpleDelete-button" severity="danger" 
                            @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                    
                    
                    
                </Column>
            </DataTable>
        </div>

        <!-- MODAL DELETE SIMPLE -->
        <Dialog v-model:visible="deleteDocumentDialog" :style="{width: '450px'}" :header="$t('Confirm')" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="document">{{$t('Are you sure you want to delete')}}<b>{{document.number}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteDocumentDialog = false"/>
                <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
            </template>
        </Dialog>

        <!-- MODAL DELETE MULTIPLE -->
        <Dialog v-model:visible="deleteDocumentsDialog" :style="{width: '450px'}" :header="$t('Confirm')" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="myDocument">{{$t('Are you sure you want to delete the selected documents?')}}</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteDocumentsDialog = false"/>
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
            </template>
        </Dialog>
	</div>
</template>



<script>

import { FilterMatchMode } from 'primevue/api';
import axios from 'axios';


export default {
    data() {
    
        return {
            documents: null,
            deleteDocumentDialog: false,
            deleteDocumentsDialog: false,
            serie: '',
            date: '',
            myDocument: {
                id: '',
                number: '',
                company_id_company: '',
                company_id_customer: '',
                documents_type_id: '',
                documents_series_id: '',
                date: '',
                subTotal: '',
                totalTax: '',
                amount: '',
                paid: '',
                customer_name: ''
            },
            selectedDocuments: [],
            filters: {},
            submitted: false,
        };
    },
    created() {
        this.filters = {
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        }

        const today = new Date();
            const year = today.getFullYear();
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            const day = today.getDate().toString().padStart(2, '0');
            this.fecha = `${year}-${month}-${day}`;
    },
    mounted() {
        // Asigna los datos de la compañía pasados desde Laravel a una variable local
        this.fetchDocuments();
    },
    
    methods: {
        fetchDocuments() {
            let myCompanyId = window.location.pathname.split('/').pop();
            console.log("ID company " + myCompanyId)
            axios.get('/documents-serie/' + myCompanyId)
                .then(response => {
                    this.documents = response.data.documents;
                })
                .catch(error => {
                    console.error('Error fetching documents data:', error);
            });
        },

        confirmDeleteProduct(myDocument) {
            console.log("Confirm deletee");
            this.document = myDocument;
            this.deleteDocumentDialog = true;       
        },

        deleteProduct() {
            console.log("DELETE")
            this.documents = this.documents.filter(val => val.id !== this.document.id);
            this.deleteDocumentDialog = false;

            axios.delete('/documents/'+ this.document.id)
                .then(response => { console.log(response)})
                .catch(error => { console.log(error.response)})
                
            this.document = {};
        },
        
        confirmDeleteSelected() {
            console.log("CONFIRM DELETE SELECTED")
            this.deleteDocumentsDialog = true;
        },
        
        deleteSelectedProducts() {
            // Envía una solicitud de eliminación para cada producto seleccionado
            this.selectedDocuments.forEach(myDocument => {
            axios.delete('/documents/'+ myDocument.id)
                .then(response => {
                console.log('Factura eliminada:', myDocument.id);
                // Elimina el producto de la lista de myDocument
                this.documents = this.documents.filter(p => p.id !== myDocument.id);
                })
                .catch(error => {
                console.error('Error al eliminar la factura:', error);
                });
            });
            this.selectedDocuments = [];
            this.deleteDocumentsDialog = false;
        },


        handleInfoButtonClick(slotProps) {
            let companyID = window.location.pathname.split('/').pop();
            this.myDocument.id = slotProps.id;
            this.myDocument.number = slotProps.number;
            this.myDocument.company_id_company = slotProps.company_id_company;
            this.myDocument.company_id_customer = slotProps.company_id_customer;
            this.myDocument.documents_type_id = slotProps.documents_type_id;
            this.myDocument.documents_series_id = slotProps.documents_series_id;
            this.myDocument.date = slotProps.date;
            this.myDocument.subTotal = slotProps.subTotal;
            this.myDocument.amount = slotProps.amount;
            this.myDocument.totalTax = slotProps.totalTax;
            this.myDocument.paid = slotProps.paid;
            this.myDocument.customer_name = slotProps.customer_name;
        
            this.$inertia.get(`/companies/${companyID}/document/${this.myDocument.id}`);
        },


        checkDocument() {
            
            axios.get('/documents-serie/'+this.selectedType.id+'/'+this.selectedCompany.id+'/'+this.selectedSerie.serie)
            .then(response => {             
                this.date = response.data.date.date
                console.log("date "+ this.date);
                console.log("fecha "+ this.fecha);
                this.serie = response.data.serie.number;
                console.log("Serie "+ this.serie);
                console.log("selectedSerie "+ this.selectedSerie.number );

                if (this.date > this.fecha) {
                    let respuesta = confirm("La fecha seleccionada es anterior a la de la última factura, ¿deseas asignarle la fecha actual?");
                    if (respuesta) {
                        
                        alert("Se ha asignado la fecha actual");
                        this.makeInvoice();
                    }
                
                }else{

                    this.fecha = this.date
                    this.makeInvoice();
                }
            })
            .catch(error => {
                console.error('Error al guardar los datos del documento:', error.response);
                // Puedes manejar el error aquí si es necesario
            });

                
            
        },

        makeInvoice() {
            
            // TERMINAR con asignacion slotprops
            let companyID = window.location.pathname.split('/').pop();
            this.myDocument.id = slotProps.id;
            this.myDocument.number = slotProps.number;
            this.myDocument.company_id_company = slotProps.company_id_company;
            this.myDocument.company_id_customer = slotProps.company_id_customer;
            this.myDocument.documents_type_id = slotProps.documents_type_id;
            this.myDocument.documents_series_id = slotProps.documents_series_id;
            this.myDocument.date = slotProps.date;
            this.myDocument.subTotal = slotProps.subTotal;
            this.myDocument.amount = slotProps.amount;
            this.myDocument.totalTax = slotProps.totalTax;
            this.myDocument.paid = slotProps.paid;
            this.myDocument.customer_name = slotProps.customer_name;

            console.log("Fecha factura: " + this.fecha)
            //console.log("Numero factura: " + this.myDocument.number)
            this.myDocument.document_counter = this.number
            console.log("numero factura: " + this.myDocument.document_counter)
            this.myDocument.company_id_company = this.selectedCompany.id 
            this.myDocument.company_id_customer = this.selectedCustomer.id
            this.myDocument.documents_type_id = 1
            this.myDocument.number = slotProps.document_series_serie + this.number
            this.myDocument.documents_series_id = 1
            this.myDocument.date = this.fecha
            this.myDocument.subTotal = this.subtotal.toFixed(2)
            this.myDocument.totalTax = this.totalIVA.toFixed(2)
            this.myDocument.amount = this.totalConIVA.toFixed(2)

            this.products.forEach(product => {
                // Creamos un nuevo objeto con los valores del producto
                let newProduct = {
                    reference: product.reference,
                    description: product.product,
                    quantity: product.quantity,
                    price: product.price,
                    tax: product.taxes,
                    total: this.calculateTotal(product).toFixed(2)
                };
                // Agregamos el nuevo objeto al arreglo concept dentro de myDocument
                this.myDocument.concept.push(newProduct);

            });

            axios.post('/documents', {documentData: this.myDocument})
            .then(response => {
                console.log("ha pasao")
                
                //this.resetData();

            })
            .catch(error => {
                console.log("ha fallao")
                console.error('Error al guardar los datos del documento:', error.response);
               // this.resetData();
                
            });
            },


        }

}


</script>


<style>

    .checkbox {
        background-color: rgba(246, 246, 246, 0.609);
        border-top: #E2E8F0 1px solid;
        border-bottom: #E2E8F0 1px solid;
        
    }

    .success-button {
        background-color: rgb(34, 197, 94);
        color: #ffffff;
        padding: 8px;
        font-size:15px;
    }
    .danger-button {
        background-color:rgb(239, 68, 68);
        color: #ffffff;
        font-size:15px;
        padding: 8px;
    }
    .export-button {
        background-color:#007BFF;
        color: #ffffff;
        font-size:15px;
        padding: 8px;
    }

    .info-button {
        color:#007BFF;
        border: 1px solid;
    }

    .info-button:hover {
        background-color:rgba(0, 4, 252,0.1);
        transition-duration: 0.5s;
        padding:7px;
    }

    .edit-button {
        color:rgb(34, 197, 94);
        border: 1px solid;
    }

    .edit-button:hover {
        background-color:rgb(229, 245, 236);
        transition-duration: 0.5s;
        padding:7px;
    }

    .simpleDelete-button {
        color:rgb(239, 68, 68);
        border: 1px solid;
    }

    .simpleDelete-button:hover {
        background-color:rgb(245, 229, 229);
        transition-duration: 0.5s;
        padding:7px;
    }

    .simpleInvoice-button {
        color:rgb(111, 0, 255);
        border: 1px solid;
    }

    .simpleInvoice-button:hover {
        background-color:rgb(245, 229, 229);
        transition-duration: 0.5s;
        padding:7px;
    }
    .save-button {
        color:rgb(34, 197, 94);
        padding:7px;
    }
    .cancel-button {
        color:rgb(239, 68, 68);
        padding:7px;
    }

    .save-button:hover {
        transition-duration: 0.5s;
        background-color: rgba(34, 197, 94, 0.1);
        padding:7px;
    }
    .cancel-button:hover {
        transition-duration: 0.5s;
        background-color: rgba(239, 68, 68, 0.1);
        padding:7px;
    }
    .input {
        border:1px solid rgb(203, 213, 225);
        border-radius:10px;
        margin-top:10px;
    }
    .search-wrapper {
        position: relative;
        width: 271px;
    }
    .input-icon {
        color: #191919;
        position: absolute;
        width: 20px;
        height: 20px;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
    }
    .input:focus {
        outline:none !important;
        border:2px solid rgb(153, 228, 153) !important;
        border-radius:10px;
        box-shadow: none !important;
    
    }

    .card{
        padding: 3% 3% 0% 3%;
    }

    .dateTable{
        border-top: #E2E8F0 1px solid;
        border-bottom: #E2E8F0 1px solid;
        min-width:10rem;
    }

</style>
<template>
    <div>
        <div class="card">
            <Toolbar class="mb-4 border border-slate-200 ..." v-if="$page.props.user.permissions.includes('delete document income')">
                <template #start>
                    <Button label="Delete" icon="pi pi-trash" severity="danger" class="danger-button"  @click="confirmDeleteSelected" :disabled="!selectedDocuments || !selectedDocuments.length" />
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="valueToUse" v-model:selection="selectedDocuments" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                :currentPageReportTemplate="`${$t('Showing')} {first} ${$t('of')} {last} ${$t('of')} {totalRecords} ${$t('documents')}`">
                <template #header>
                    <div class="flex justify-between items-center mt-2">
                        <h4>{{ $t('Manage documents') }}</h4>
                        <label class="flex items-center cursor-pointer" v-if="$page.props.user.permissions.includes('read document expense')">
                            <span class="text-lg font-medium text-gray-900 dark:text-gray-300" v-if="!isChecked">{{ $t('Invoice-Income') }}</span>
                            <span class="text-lg font-medium text-gray-900 dark:text-gray-300" v-else>{{ $t('Invoice-Expense') }}</span>
                            <input type="checkbox" class="sr-only peer" v-model="isChecked">
                            <div class="relative w-11 h-6 ml-3 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
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
                <Column field="document_type_name" :header="$t('Type')" sortable class="dateTable"></Column>
                <Column field="customer_name" :header="$t('Receiver')" sortable class="dateTable"></Column>
                <Column field="dateFormatted" :header="$t('Date')" sortable class="dateTable"></Column>
                <Column field="amount" :header="$t('Amount')" sortable class="dateTable"></Column>

                <Column :exportable="false" class="dateTable" :header="$t('Utilidades')">
                    <template #body="slotProps">
                        <Button icon="pi pi-envelope" outlined rounded class="mr-2 simpleDelete-button" severity="danger" 
                            @click="confirmDeleteProduct(slotProps.data)" v-if="$page.props.user.permissions.includes('delete document income')" />
                        <Button icon="pi pi-file-check" outlined rounded class="mr-2 simpleInvoice-button" 
                            :disabled="slotProps.data.document_type_name !== 'Presupuesto'" 
                            @click="slotProps.data.document_type_name === 'Presupuesto' ? checkDocument(slotProps.data) : null" v-if="$page.props.user.permissions.includes('update document income')" />
                        <Button icon="pi pi-trash" outlined rounded class="simpleDelete-button" severity="danger" 
                            @click="confirmDeleteProduct(slotProps.data)" v-if="$page.props.user.permissions.includes('delete document income')" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <!-- MODAL DELETE SIMPLE -->
        <Dialog v-model:visible="deleteDocumentDialog" :style="{width: '450px'}" :header="$t('Confirm')" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="myDocument">{{$t('Are you sure you want to delete')}}<b>{{myDocument.number}}</b>?</span>
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
                <span>{{$t('Are you sure you want to delete the selected documents?')}}</span>
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
            receivedDocuments: [],
            emitedDocuments: [],
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
                dateFormatted: '',
                subTotal: '',
                totalTax: '',
                amount: '',
                paid: '',
                customer_name: '',
                invoiced: '',
            },
            selectedDocuments: [],
            filters: {},
            submitted: false,
            isChecked: false,
        };
    },
    created() {
        this.filters = {
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        };

        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        this.fecha = `${year}-${month}-${day}`;
    },
    mounted() {
        this.fetchDocuments();
    },

    computed: {
        valueToUse() {
            return this.isChecked ? this.receivedDocuments : this.emitedDocuments;
        },
    },
    
    methods: {
        fetchDocuments() {
            let myCompanyId = window.location.pathname.split('/').pop();
            console.log("ID company " + myCompanyId);
            axios.get('/documents-serie/' + myCompanyId)
                .then(response => {
                    
                    let date
                    let dateFormatted
                    
                    for(let i = 0; i < response.data.documents.length; i++ ) {
                        date = response.data.documents[i].date
                        dateFormatted = this.dateFormat(date)
                        response.data.documents[i].dateFormatted = dateFormatted
                        
                    }
                    this.documents = response.data.documents;

                    console.log(this.documents);
                    
                    this.documents.forEach(document => {
                        if (document.isReceived === 0) {
                            this.emitedDocuments.push(document);
                        } else if (document.isReceived === 1) {
                            this.receivedDocuments.push(document);
                        }
                    });
                })
                .catch(error => {
                    console.error('Error fetching documents data:', error);
                });
        },
        confirmDeleteProduct(document) {
            this.myDocument = document;
            this.deleteDocumentDialog = true;
        },
        deleteProduct() {
            
            
            axios.delete('/documents/' + this.myDocument.id)
                .then(response => {
                    

                    if(this.isChecked){
                        this.receivedDocuments = this.receivedDocuments.filter(p => p.id !== this.myDocument.id);
                    }else{
                        this.emitedDocuments = this.emitedDocuments.filter(p => p.id !== this.myDocument.id);
                    }
                
                    this.$toast(this.$t(response.data.message), response.data.type);

                    this.updateFields()
                })
                .catch(error => {
                    this.$toast(this.$t(error.response.message), error.response.type);
                });

            this.deleteDocumentDialog = false;
            
        },
        confirmDeleteSelected() {
            console.log("CONFIRM DELETE SELECTED");
            this.deleteDocumentsDialog = true;
        },
        deleteSelectedProducts() {
            this.selectedDocuments.forEach(myDocument => {
                axios.delete('/documents/' + myDocument.id)
                    .then(response => {
                        
                        if(this.isChecked){
                            this.receivedDocuments = this.receivedDocuments.filter(p => p.id !== myDocument.id);
                        }else{
                            this.emitedDocuments = this.emitedDocuments.filter(p => p.id !== myDocument.id);
                        }
                            
                        this.$toast(this.$t(response.data.message), response.data.type); 

                        this.updateFields()
                        
                        
                    })
                    .catch(error => {
                        if (error.response || error.response.status === 400) {
                            this.$toast(this.$t(error.response.message), error.response.type);
                        }
                    });
            });

            this.deleteDocumentsDialog = false;
        },
        handleInfoButtonClick(slotProps) {
            let companyID = window.location.pathname.split('/').pop();
            this.myDocument.id = slotProps.id;
            let url = `/companies/${companyID}/document/${this.myDocument.id}`;
            window.open(url, '_blank');
        },
        checkDocument(slotProps) {
            let companyID = window.location.pathname.split('/').pop();
            console.log("checkDocument");
            this.myDocument.id = slotProps.id;
            this.myDocument.company_id_company = companyID;
            console.log("SelectedType " + this.myDocument.id);
            console.log("SelectedCompany " + this.myDocument.company_id_company);

            axios.get('/documents-series/' + this.myDocument.company_id_company + '/' + this.myDocument.id)
                .then(response => {
                    console.log("checkDocument2");

                    if (response.data.date.date > this.fecha) {
                        let respuesta = confirm("La fecha seleccionada es anterior a la de la última factura, ¿deseas mantener la fecha actual?");
                        if (respuesta) {
                            alert("Se ha asignado la fecha actual");
                            this.makeInvoice();
                        }
                    } else {
                        this.fecha = response.data.date.date;
                        this.makeInvoice();
                    }
                })
                .catch(error => {
                    console.error('Error al guardar los datos del documento:', error.response);
                });
        },

        dateFormat(fecha) {
            // Convierte la fecha seleccionada a un objeto Date
            let date = new Date(fecha);

            // Obtén el día, mes y año de la fecha
            let dia = date.getDate();
            let mes = date.getMonth() + 1; // Los meses en JavaScript son de 0 a 11, por lo que se suma 1
            let año = date.getFullYear();

            // Añade un cero inicial si el día o mes son menores de 10
            if (dia < 10) {
            dia = '0' + dia;
            }
            if (mes < 10) {
            mes = '0' + mes;
            }

            // Construye la cadena con el formato español
            let fechaFormateada = `${dia}/${mes}/${año}`;

            return fechaFormateada;
        },

        makeInvoice() {
            console.log("Make invoice");
            let companyID = window.location.pathname.split('/').pop();
            console.log("Fecha factura: " + this.fecha);

            axios.post('/documents-serie/' + this.myDocument.id + '/' + this.fecha)
                .then(response => {
                    // this.resetData();
                })
                .catch(error => {
                    console.error('Error al guardar los datos del documento:', error.response);
                    // this.resetData();
                });
        },

        updateFields() {

            this.$emit('updateDocument', 1);
            
        },
    },
};
</script>

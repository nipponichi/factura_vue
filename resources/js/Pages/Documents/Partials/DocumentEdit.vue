<template>
    <div>
        <div class="card">

            <div class="select flex flex-col md:flex-row justify-between mb-4">

                <div class="flex justify-start md:justify-end mb-3 md:mb-0">
                    <div class="relative inline-block w-50">
                        <button 
                            type="button" 
                            class="px-4 py-2 bg-blue-500 text-white rounded flex items-center justify-between" 
                            @click="selectCompany()"
                            >
                            <span>
                                <i class="pi pi-plus mr-2"></i>
                                {{ $t('Companies') }}
                            </span>
                        </button>
                    </div>
                    <div class="relative inline-block w-50 ml-2">
                        <button 
                            type="button" 
                            class="px-4 py-2 bg-blue-500 text-white rounded flex items-center justify-between" 
                            @click="selectDocument()"
                            :class="{ 'opacity-50': !this.selectedCompany.id }"
                            :disabled="!this.selectedCompany.id"
                            >
                            <span>
                                <i class="pi pi-plus mr-2"></i>
                                {{ $t('Document type') }}
                            </span>
                        </button>
                    </div>
                    
                    <div class="flex items-center ml-2">
                        <label for="link-checkbox" class="ms-2 mr-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ $t('Mark as paid') }}</label>
                      <!--  <input id="link-checkbox" type="checkbox" v-model="this.myDocument.paid" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        -->
                    </div>
                </div>

                <div class="flex justify-end">
                    <div class="relative inline-block w-50 ml-2">
                        <button 
                            type="button" 
                            class="px-4 py-2 bg-purple-500 text-white rounded flex items-center justify-between" 
                            @click="exportDocument()"
                            :class="{ 'opacity-50': isDisabled }"
                            :disabled="isDisabled"
                            >
                            <span>
                                <i class="pi pi-file-export mr-2"></i>
                                {{ $t('Export') }}
                            </span>
                        </button>
                    </div>
                    
                    <div class="relative inline-block w-50 ml-2">
                        <button 
                            type="button" 
                            class="px-4 py-2 bg-red-500 text-white rounded flex items-center justify-between" 
                            @click="exportDocumentPDF()"
                            :class="{ 'opacity-50': isDisabled }"
                            :disabled="isDisabled"
                            >
                            <span>
                                <i class="pi pi-file-pdf mr-2"></i>
                                {{ $t('PDF') }}
                            </span>
                        </button>
                    </div>

                    <div class="relative inline-block w-50 ml-2">
                        <button 
                            type="button" 
                            class="px-4 py-2 bg-green-500 text-white rounded flex items-center justify-between" 
                            @click="checkDocument()"
                            
                            >
                            <span>
                                <i class="pi pi-upload mr-2"></i>
                                {{ $t('Save') }}
                            </span>
                        </button>
                    </div>
                </div>

            </div>

            <hr class="linea-grosor">

            <div class="selector flex flex-col md:flex-row justify-between items-start mt-4 ml-12">
                <!-- Foto -->
                <div class="w-64 h-32 mb-3 md:mb-0 border rounded-lg overflow-hidden relative bg-gray-100 mr-0 md:mr-4">
                    <img
                        alt="Company Logo"
                        :src="imageUrl"
                        class="object-cover w-full h-48 cursor-pointer"
                        @click="openFileInput"
                    />
                    <div class="absolute top-0 left-0 right-0 bottom-0 w-full block cursor-pointer flex items-center justify-center">
                        <button
                        type="button"
                        style="background-color: rgba(255, 255, 255, 0.65)"
                        class="hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 text-sm border border-gray-300 rounded-lg shadow-sm"
                        @click="openFileInput"
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-camera"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                            <path
                            d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2"
                            />
                            <circle cx="12" cy="13" r="3" />
                        </svg>
                        <input type="file" ref="fileInput" @change="handleFileChange" style="display: none" />
                        </button>
                    </div>


                </div>

                <div class="grid md:grid-cols-1 text-sm gap-y-1 mr-28">
                    <div class="flex items-center">
                        <div class="font-semibold mr-3">Nº {{this.selectedType.name}}:</div>
                        <div class="text-gray-700">{{this.selectedSerie.serie}}</div>
                        <input type="text" class="border border-gray-300 rounded-md ml-3 px-3 py-2 focus:outline-none focus:border-blue-400" v-model="this.selectedSerie.number">
                    </div>
                    <div class="flex items-center">
                        <div class="font-semibold mr-3">{{ $t('Date') }}:</div>
                        <div>
                            <input
                                type="date"
                                v-model="fecha"
                                @change="cambiarFormatoFecha"
                                class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-400"
                            />
                        </div>
                    </div>
                </div>  
                

            </div>
        
            <div class="selector flex flex-col md:flex-row justify-between mt-6 ml-12">
                <div class="showCompany">

                    <div class="flex justify-center">
                        
                        </div>
                            <div class="grid md:grid-cols-1 text-m gap-y-1">
                            <div class="flex items-center">
                                <div class="font-semibold mr-3">{{ $t('Company name') }}:</div>
                                <div class="text-gray-700">{{this.selectedCompany.name}}</div>
                            </div>
                            <div class="flex items-center">
                                <div class="font-semibold mr-3">{{ $t('Tax Number') }}:</div>
                                <div class="text-gray-700">{{this.selectedCompany.tax_number}}</div>
                            </div>
                            <div class="flex items-center">
                                <div class="font-semibold mr-3">{{ $t('Phone') }}:</div>
                                <div class="text-gray-700">{{this.selectedCompany.phone}}</div>
                            </div>
                            <div class="flex items-center">
                                <div class="font-semibold mr-3">{{ $t('Email') }}:</div>
                                <div class="text-gray-700">{{ this.selectedCompany.email }}</div>
                            </div>
                            
                            <div class="flex items-center">
                                <div class="font-semibold mr-3">{{ $t('Address') }}:</div>
                                <div class="text-gray-700">{{this.selectedCompany.address}}</div>
                            
                            </div>
                        
                        </div>
                    
                    </div>
                    

                    <div class="showCustomer" style="width: 21rem;"> <!-- Establece el ancho fijo -->
                        <div class="grid md:grid-cols-1 text-m gap-y-1">
                            <div class="flex items-center">
                                <div class="font-semibold mr-2">{{ $t('Customer name') }}:</div>
                                <div class="text-gray-700">{{ this.selectedCustomer.name }}</div>
                            </div>
                            <div class="flex items-center">
                                <div class="font-semibold mr-2">{{ $t('Tax number') }}:</div>
                                <div class="text-gray-700">{{ this.selectedCustomer.tax_number }}</div>
                            </div>
                            <div class="flex items-center">
                                <div class="font-semibold mr-2">{{ $t('Phone') }}:</div>
                                <div class="text-gray-700">{{ this.selectedCustomer.phone }}</div>
                            </div>
                            <div class="flex items-center">
                                <div class="font-semibold mr-2">{{ $t('Email') }}:</div>
                                <div class="text-gray-700">{{ this.selectedCustomer.email }}</div>
                            </div>
                            <div class="flex items-center">
                                <div class="font-semibold mr-3">{{ $t('Address') }}:</div>
                                <div class="text-gray-700">{{ this.selectedCustomer.address }}</div>
                            </div>
                        </div>
                    </div>

            </div>  
            <Toolbar class="mb-4 mt-8 border border-slate-200 ...">
                <template #start>
                    <div class="flex items-center justify-between ">
                        <div class="flex items-center">
                            <Button :label="$t('Concept')" icon="pi pi-plus" severity="success" class="mr-2 success-button" @click="addRow" />
                            <Button :label="$t('Delete')" icon="pi pi-trash" severity="danger" class="danger-button" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                        </div>
                        <div class="flex-grow"></div>
                    </div>
                </template>

                <template #end>
                    <div class="relative rounded-md shadow-sm">
                        <input type="search" class="block w-full h-11 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" v-model="filters['global'].value" :placeholder="$t('Search...')">
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </template>
            </Toolbar>


            <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id"
            :paginator="true" :rows="10" :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
            :currentPageReportTemplate="`${$t('Showing')} {first} ${$t('of')} {last} ${$t('of')} {totalRecords} ${$t('products')}`">
                <template #header>
                    <!-- Otros contenidos del encabezado -->
                </template>
            
                <Column selectionMode="multiple" :exportable="false" class="datetable checkbox"></Column>
                <Column field="reference" :header="$t('Reference')" sortable class="dateTable">
                    <template #body="slotProps">
                        <InputText class="input" :placeholder="$t('Reference')" v-model="slotProps.data.reference" />
                    </template>
                </Column>
                <Column field="product" :header="$t('Description')" sortable class="dateTable">
                    <template #body="slotProps">
                        <InputText class="input" :placeholder="$t('Description')" v-model="slotProps.data.description" />
                    </template>
                </Column>
                <Column field="quantity" :header="$t('Quantity')" sortable class="dateTable">
                    <template #body="slotProps">
                        <InputText class="input input-short" v-model="slotProps.data.quantity" />
                    </template>
                </Column>
                <Column field="price" :header="$t('Price')" sortable class="dateTable">
                    <template #body="slotProps">
                        <InputText class="input input-short" v-model="slotProps.data.price" />
                    </template>
                </Column>
                <Column field="tax" :header="$t('Tax (%)')" sortable class="dateTable">
                    <template #body="slotProps">
                        <Dropdown class="input-short" v-model="slotProps.data.tax" :options="taxOptions" optionLabel="label" optionValue="value" />
                    </template>
                </Column>
                <Column field="total" :header="$t('Total')" sortable class="dateTable">
                    <template #body="slotProps">
                        <InputText class="input input-short" :value="calculateTotal(slotProps.data)" readonly />
                    </template>
                </Column>
                <Column :exportable="false" class="dateTable">
                    <template #body="slotProps">
                        <Button icon="pi pi-trash" outlined rounded class="simpleDelete-button" severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
            

            <div class="flex justify-end mt-4 pr-4">
                <Button :label="$t('Concept')" icon="pi pi-plus" severity="success" class="success-button" @click="addRow()" />
            </div>
        </div>

        <!-- Totals section -->
        <div class="flex justify-end mt-4 pr-4 mb-4">
            <div class="totals-container w-1/3">
                <div class="totals bg-gray-100 p-4 rounded-md">
                    <div class="totals-item flex justify-between">
                        <span class="text-gray-600">{{ $t('Subtotal (excluding Tax)') }}:</span>
                        <span>{{ subtotal.toFixed(2) }}€</span>
                    </div>
                    <div class="totals-item flex justify-between">
                        <span class="text-gray-600">{{ $t('Total Tax') }}:</span>
                        <span>{{ totalIVA.toFixed(2) }}€</span>
                    </div>
                    <div class="totals-item flex justify-between">
                        <span class="text-gray-600">{{ $t('Total (with IVA)') }}:</span>
                        <span>{{ totalConIVA.toFixed(2) }}€</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- MODAL COMPANY -->
        <Dialog v-model:visible="productDialog" :style="{width: '450px'}" :header="$t('Select companies')" :modal="true" @change="handleCompanySelection">
            <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">{{ $t('Select your company') }}:</label>
            <Dropdown v-model="selectedCompany" :options="companies" filter optionLabel="name" class="w-full h-11 md:w-64rem mb-4 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500" @change="handleCompanySelection">
                <template #value="slotProps">
                    <div v-if="slotProps.value" class="flex align-items-center">
                        <div>{{ slotProps.value.name }}</div>
                    </div>
                </template>
                <template #option="slotProps">
                    <div class="flex align-items-center">
                        <div>{{ slotProps.option.name }}</div>
                    </div>
                </template>
            </Dropdown>
            <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">{{ $t('Select a customer') }}:</label>
            <Dropdown v-model="selectedCustomer" :options="this.customers" filter optionLabel="name" class="w-full h-11 md:w-64rem mb-4 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                <template #value="slotProps">
                    <div v-if="slotProps.value" class=" flex align-items-center ">
                        <div>{{ slotProps.value.name }}</div>
                    </div>
                </template>
                <template #option="slotProps">
                    <div class="flex align-items-center">
                        <div>{{ slotProps.option.name }}</div>
                    </div>
                </template>
            </Dropdown>  

        </Dialog>

        <!-- MODAL DOCUMENT -->

        <Dialog v-model:visible="documentDialog" :style="{width: '450px'}" :header="$t('Select document')" :modal="true" @change="handleTypeSelection">
            <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">{{ $t('Select document type') }}</label>
            <Dropdown v-model="selectedType" :options="types" filter optionLabel="name" class="w-full h-11 md:w-64rem mb-4 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500" @change="handleTypeSelection">
                <template #value="slotProps">
                    <div v-if="slotProps.value" class="flex align-items-center">
                        <div>{{ slotProps.value.name }}</div>
                    </div>
                </template>
                <template #option="slotProps">
                    <div class="flex align-items-center">
                        <div>{{ slotProps.option.name }}</div>
                    </div>
                </template>
            </Dropdown>
            <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">{{ $t('Select document serie') }}</label>
            <Dropdown v-model="selectedSerie" :options="this.series" filter optionLabel="serie" class="w-full h-11 md:w-64rem mb-4 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                <template #value="slotProps">
                    <div v-if="slotProps.value" class=" flex align-items-center ">
                        <div>{{ slotProps.value.serie }}</div>
                    </div>
                </template>
                <template #option="slotProps">
                    <div class="flex align-items-center">
                        <div>{{ slotProps.option.serie }}</div>
                    </div>
                </template>
            </Dropdown>  

        </Dialog>



        <!-- MODAL DELETE SIMPLE -->
        <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" :header="$t('Confirm')" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="companies"> {{ $t('Are you sure you want to delete') }}<b>{{companies.name}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
            </template>
        </Dialog>

        <!-- MODAL DELETE MULTIPLE -->
        <Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" :header="$t('Confirm')" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="companies">{{ $t('Are you sure you want to delete the selected concepts?') }}</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
            </template>
        </Dialog>
    </div>
</template>


<script>
import { FilterMatchMode } from 'primevue/api';

export default {
    props: ['documents', 'concepts','company','customer'],
    data() {
        return {
            fecha: '',
            fechaFormateada: '',
            isDisabled: true,
            taxOptions: [
                { label: '0%', value: 0.00 },
                { label: '4%', value: 4.00 },
                { label: '5%', value: 5.00 },
                { label: '7%', value: 7.00 },
                { label: '8%', value: 8.00 },
                { label: '10%', value: 10.00 },
                { label: '16%', value: 16.00 },
                { label: '18%', value: 18.00 },
                { label: '21%', value: 21.00 },
            ],
            imageUrl: 'https://placehold.co/300x300/e2e8f0/e2e8f0',
            companies: null,
            customers: null,
            types: [],
            series: [],
            serie: '',
            productDialog: false,
            documentDialog: false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
            products: [],
            selectedCompany: [],
            selectedCustomer: [],
            selectedType: [],
            selectedSerie: [],
            selectedProducts: [],
            filters: {},
            submitted: false,
            myDocument: { 
                number: '', 
                company_id_company: '',
                company_id_customer: '',
                documents_type_id: '',
                documents_series_id: '',
                date: '',
                amount: '',
                totalTax: '',
                subTotal: '',
                paid: false,                
                concept: [],
                

            },
        };
    },

    computed: {
        subtotal() {
            return this.products.reduce((acc, product) => acc + product.quantity * product.price, 0);
        },
        totalIVA() {
            return this.products.reduce((acc, product) => acc + (product.quantity * product.price * product.tax / 100), 0);
        },
        totalConIVA() {
            return this.subtotal + this.totalIVA;
        }
    },
    created() {
        this.filters = {
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        };

        // Inicializa la fecha con la fecha de hoy
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        this.fecha = `${year}-${month}-${day}`;
    },

    mounted() {
        this.products = this.concepts
        for (let i = 0; i < this.products.length; i++) {
            this.products[i].tax = parseFloat(this.concepts[i].tax);
        }

        console.log("description: " + this.products[0].tax)
        this.myDocument = this.documents
        this.selectedCompany = this.company
        this.selectedCustomer = this.customer
        this.selectedType = this.documents.document_type_name
        console.log("description: " + this.documents.document_type_name)
        this.selectedSerie.serie = this.documents.document_series_serie
        this.selectedSerie.number = this.documents.document_counter
        console.log("serie: " + this.documents.document_series_serie)
        this.fetchCompanies();
        this.fetchDocuments(); 
    },
    
    methods: {

        fetchCompanies() {
            
            axios.get('/companies-invoice')
                .then(response => {
                    this.companies = response.data.companies;     
                
                })
                .catch(error => {
                    console.error('Error fetching phone data:', error);
                });
        },

        handleCompanySelection() {
            this.selectedCustomer = [];
            axios.get('/customers/'+this.selectedCompany.id)
                .then(response => {
            
                    this.customers = response.data.customers;                 
                })
                .catch(error => {
                    console.error('Error fetching phone data:', error);
                });
        },

        fetchDocuments() {
            axios.get('/documents-type')
                .then(response => {
                    this.types = response.data.types;     
                
                })
                .catch(error => {
                    console.error('Error fetching phone data:', error);
                });
        },

        handleTypeSelection() {
            this.selectedSerie = [];
            axios.get('/documents-serie/'+this.selectedType.id+'/'+this.selectedCompany.id)
                .then(response => {
            
                    this.series = response.data.series;                 
                })
                .catch(error => {
                    console.error('Error fetching phone data:', error);
                });
        },
        
        selectCompany() {
            this.productDialog = true
        },

        selectDocument() {
            this.documentDialog = true
        },

        openFileInput() {
            this.$refs.fileInput.click();
        },
        
        handleFileChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            
            reader.onload = () => {
                this.imageUrl = reader.result;
            };
            
            reader.readAsDataURL(file);
        },
        
        addRow() {
            
            let newProduct = { 
                product: '',
                quantity: 0,
                price: 0,
                tax: 21.50,
                priceTax: 0,
                total: 0,
                id: this.products.length + 1,
            };
            this.products.push(newProduct);
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

                if (this.selectedSerie.number <= this.serie) {
                    
                    let respuesta = confirm("El número de documento ya existe, ¿deseas asignarle el siguiente valor disponible?");
                    if (respuesta) {
                        this.selectedSerie.number = ++this.serie
                        alert("Se ha asignado un número disponible: "+ this.selectedSerie.number);
                        this.serie = '';
                        this.saveDocument();
                    }


                } else if (this.date > this.fecha) {
                    let respuesta = confirm("La fecha seleccionada es anterior a la de la última factura, ¿deseas asignarle la fecha actual?");
                    if (respuesta) {
                        
                        const today = new Date();
                        const year = today.getFullYear();
                        const month = (today.getMonth() + 1).toString().padStart(2, '0');
                        const day = today.getDate().toString().padStart(2, '0');
                        this.fecha = `${year}-${month}-${day}`;
                        
                        alert("Se ha asignado la fecha actual");

                        this.saveDocument();
                    }
                
                
                }else{
                    this.saveDocument();
                }
            })
            .catch(error => {
                console.error('Error al guardar los datos del documento:', error.response);
                // Puedes manejar el error aquí si es necesario
            });

                
            
        },

        saveDocument(){

            this.myDocument.number = this.selectedSerie.serie + this.selectedSerie.number
            console.log("numero factura: " + this.myDocument.number)
            this.myDocument.company_id_company = this.selectedCompany.id 
            this.myDocument.company_id_customer = this.selectedCustomer.id
            this.myDocument.documents_type_id = this.selectedType.id
            this.myDocument.documents_series_id = this.selectedSerie.id
            this.myDocument.date = this.fecha
            this.myDocument.subTotal = this.subtotal.toFixed(2)
            this.myDocument.totalTax = this.totalIVA.toFixed(2)
            this.myDocument.amount = this.totalConIVA.toFixed(2)


            this.products.forEach(product => {

                console.log("description prueba" + product.description);
                // Creamos un nuevo objeto con los valores del producto
                let newProduct = {
                    reference: product.reference,
                    description: product.description,
                    quantity: product.quantity,
                    price: product.price,
                    tax: product.tax,
                    total: this.calculateTotal(product).toFixed(2)
                };
                // Agregamos el nuevo objeto al arreglo concept dentro de myDocument
                this.myDocument.concept.push(newProduct);

            });
            
            axios.post('/documents', {documentData: this.myDocument})
            .then(response => {
                
                this.resetData();

            })
            .catch(error => {
                console.error('Error al guardar los datos del documento:', error.response);
                console.log("ha mal pasao");
                // Puedes manejar el error aquí si es necesario
            });
        },

        resetData() {
            location.reload()
        },

        
        calculateTotal(product) {
            return product.quantity * product.price;
        },
        confirmDeleteProduct(product) {
            this.product = product;
            this.deleteProductDialog = true;
        },
        deleteProduct() {
            this.products = this.products.filter(val => val.id !== this.product.id);
            this.product = null;
            this.deleteProductDialog = false;
        },
        confirmDeleteSelected() {
            this.deleteProductsDialog = true;
        },
        deleteSelectedProducts() {
            this.selectedProducts.forEach(product => {
                this.products = this.products.filter(val => val.id !== product.id);
            });
            this.selectedProducts = [];
            this.deleteProductsDialog = false;
            
        },
    },
}
</script>

<style>

.checkbox {
    background-color: rgba(246, 246, 246, 0.609);
    border-top: #E2E8F0 1px solid;
    border-bottom: #E2E8F0 1px solid;
}

.input {
    border: none;
    border-radius: 10px;
    margin-top: 10px;
}

.input-short {
    width: 100px; 
}

.success-button {
    background-color: rgb(34, 197, 94);
    color: #ffffff;
    padding: 8px;
    font-size: 15px;
}
.danger-button {
    background-color: rgb(239, 68, 68);
    color: #ffffff;
    font-size: 15px;
    padding: 8px;
}
.export-button {
    background-color: #007BFF;
    color: #ffffff;
    font-size: 15px;
    padding: 8px;
}
.info-button {
    color: #007BFF;
    border: 1px solid;
}
.info-button:hover {
    background-color: rgba(0, 4, 252, 0.1);
    transition-duration: 0.5s;
    padding: 7px;
}
.edit-button {
    color: rgb(34, 197, 94);
    border: 1px solid;
}
.edit-button:hover {
    background-color: rgb(229, 245, 236);
    transition-duration: 0.5s;
    padding: 7px;
}
.simpleDelete-button {
    color: rgb(239, 68, 68);
    border: 1px solid;
}
.simpleDelete-button:hover {
    background-color: rgb(245, 229, 229);
    transition-duration: 0.5s;
    padding: 7px;
}
.save-button {
    color: rgb(34, 197, 94);
    padding: 7px;
}
.cancel-button {
    color: rgb(239, 68, 68);
    padding: 7px;
}
.save-button:hover {
    transition-duration: 0.5s;
    background-color: rgba(34, 197, 94, 0.1);
    padding: 7px;
}
.cancel-button:hover {
    transition-duration: 0.5s;
    background-color: rgba(239, 68, 68, 0.1);
    padding: 7px;
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
    left: 20px;
    top: 13px;
}
.search-box {
    border-radius: 8px;
    border: none;
    font-size: 15px;
    font-weight: 400;
    letter-spacing: 0.25px;
    color: #191919;
    background-color: #f2f2f2;
    padding: 13px 45px;
    width: 300px;
    height: 45px;
    box-sizing: border-box;
    transition: 0.4s;
}
.card {
    padding: 3% 3% 0% 3%;
}
.dateTable {
    border-top: #E2E8F0 1px solid;
    border-bottom: #E2E8F0 1px solid;
    min-width: 10rem;
}

.linea-grosor {
    border: none;
    border-top: #E2E8F0 1px solid; /* Grosor aumentado y color ajustado */
}

@media (max-width: 768px) { 
    .showCompany,
    .showCustomer {
        margin-bottom: 1.5rem;
    }
}
</style>

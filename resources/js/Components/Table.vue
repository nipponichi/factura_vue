<template>
    <div>
        <div class="card">
            <Toolbar class="mb-4 border border-slate-200 ...">
                <template #start>
                    <Button label="New" icon="pi pi-plus" severity="success" class="mr-2 success-button" @click="openNew" />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" class="danger-button" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                </template>

                <template #end>
                    <Button label="Export" class="export-button" icon="pi pi-upload" severity="help" @click="exportCSV($event)"  />
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
                <template #header>
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <h4 class="m-0">Manage Companies</h4>
						<IconField >
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText class="inputSearch" v-model="filters['global'].value" placeholder="Search..." />
                        </IconField>
					</div>
                </template>

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false" class="dateTable" ></Column>
                <Column field="name" header="Name" sortable style="min-width:12rem" class="dateTable"></Column>
                <Column field="taxNumber" header="Tax Number" sortable style="min-width:16rem" class="dateTable"></Column>
                <Column field="phone1" header="Phone" sortable style="min-width:10rem" class="dateTable"></Column>
                <Column field="email" header="Email" sortable style="min-width:10rem" class="dateTable"></Column>
                <Column field="town" header="Town" sortable style="min-width:10rem" class="dateTable"></Column>
                <Column :exportable="false" style="min-width:8rem" class="dateTable">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2 edit-button" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded class="simpleDelete-button" severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <!-- MODAL -->
        <Dialog v-model:visible="productDialog" :style="{width: '450px'}" header="Create company" id="titleCompany" :modal="true" class="p-fluid">
            
            <form>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div class="relative">
                        <input type="text" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Floating outlined</label>
                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                    </div>
                    <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                        <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                    </div>
                    <div>
                        <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
                        <input type="text" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required />
                    </div>  
                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                        <input type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                    </div>
                    <div>
                        <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website URL</label>
                        <input type="url" id="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="flowbite.com" required />
                    </div>
                    <div>
                        <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unique visitors (per month)</label>
                        <input type="number" id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                    </div>
                </div>
                <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                    <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                </div> 
                <div class="mb-6">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                </div> 
                <div class="mb-6">
                    <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                    <input type="password" id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                </div> 
                <div class="flex items-start mb-6">
                    <div class="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                    </div>
                    <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                </div>

                <label for="zip-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ZIP code:</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
            </svg>
        </div>
        <input type="text" id="zip-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="12345 or 12345-6789" pattern="^\d{5}(-\d{4})?$" required />
    </div>
    <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">Please select a 5 digit number from 0 to 9.</p>
                
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </Dialog>

        <!-- MODAL DELETE SIMPLE -->
        <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product">Are you sure you want to delete <b>{{product.name}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false"/>
                <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
            </template>
        </Dialog>

        <!-- MODAL DELETE MULTIPLE -->
        <Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product">Are you sure you want to delete the selected products?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false"/>
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
            products: null, // Aquí almacenarás los productos recuperados de alguna fuente, como una API
            productDialog: false, // Controla la visibilidad del diálogo de creación/edición de producto
            deleteProductDialog: false, // Controla la visibilidad del diálogo de borrado de producto individual
            deleteProductsDialog: false, // Controla la visibilidad del diálogo de borrado de productos en grupo
            productos: { // Aquí almacenas los datos del producto que se va a crear/editar
                name: '',
                taxNumber: '',
                email: '',
                phone1: '',
                phone2: '',
                address1: '',
                postCode: '',
                town: '',
                province: '',
                country: ''
            },
            selectedProducts: null, // Almacena los productos seleccionados para borrado en grupo
            filters: {}, // Almacena los filtros de búsqueda en tiempo real
            submitted: false, // Indica si se ha enviado el formulario de creación/edición de producto
        };
    },
    created() {
        this.initFilters();
    },
    mounted() {
        // Asigna los datos de la compañía pasados desde Laravel a una variable local
        this.products = this.$page.props.companies;

    },

    methods: {
        openNew() {
            this.productos = {};
            this.submitted = false;
            this.productDialog = true;
        },
        hideDialog() {
            this.productDialog = false;
            this.submitted = false;
        },
        
        saveProduct() {
            console.log('/'+this.$page.props.type);

            // Realiza la solicitud para guardar el producto
            axios.post('/'+ this.$page.props.type, this.productos)
                .then(response => {
                    // La solicitud se completó con éxito, puedes hacer lo que necesites con la respuesta, como imprimirlo en la consola
                    console.log(response);

                    // Cierra el diálogo de producto
                    this.productDialog = false;
                    this.submitted = true;
                    // Verifica si el nuevo producto ya existe en this.products
                    const productExists = this.products.some(product => product.id === this.productos.id);

                    // Si el producto no existe en la lista, añádelo
                    if (!productExists) {
                        this.products.push(this.productos);
                    }
                })
                .catch(error => {
                    // Si hay algún error en la solicitud, puedes manejarlo aquí
                    console.log(error.response);
                });
                //this.productos = {};
                this.submitted = true;
        },


        editProduct(productos) {

            console.log(productos);
            axios.get('/' + this.$page.props.type + '/' + productos.id + '/edit').then(response => {
                this.editedProduct = response.data;
                this.productDialog = true;
            })
            .catch(error => {
                console.error('Error al obtener los datos del producto para editar:', error);
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al obtener los datos del producto para editar.', life: 3000 });
            });
            this.product = {...productos};     
            this.productDialog = true;       
        },

        updateProduct() {

            console.log("Update" + this.product)
            axios.put('/' + this.$page.props.type + '/' + productos.id, this.product)
            .then(response => {
                console.log('Respuesta del servidor:', response.data);
                this.$toast.add({ severity: 'success', summary: 'Éxito', detail: response.data.message, life: 3000 });
                this.productDialog = false;  
            })
            .catch(error => {
                console.error('Error al actualizar la compañía:', error);
                // Mostrar un mensaje de error al usuario
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al actualizar la compañía.', life: 3000 });
            });
        },        

        confirmDeleteProduct(productos) {
            this.product = productos;
            this.deleteProductDialog = true;       
        },

        deleteProduct() {
            this.products = this.products.filter(val => val.id !== this.product.id);
            this.deleteProductDialog = false;

            console.log(this.product.id);

            axios.delete('/'+ this.$page.props.type+ '/'+ this.product.id)
                .then(response => { console.log(response)})
                .catch(error => { console.log(error.response)})
                
            this.product = {};
        },

        exportCSV() {
            this.$refs.dt.exportCSV();
        },

        
        confirmDeleteSelected() {
            this.deleteProductsDialog = true;
        },
        deleteSelectedProducts() {
            this.products = this.products.filter(val => !this.selectedProducts.includes(val));
            this.deleteProductsDialog = false;
            this.selectedProducts = null;
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        },
        initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            }
        },
    }
}
</script>


<style>
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
        background-color:rgb(147, 51, 234);
        color: #ffffff;
        font-size:15px;
        padding: 8px;
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

    .inputSearch{

        border:1px solid rgb(203, 213, 225);
        border-radius:10px;
        position: absolute;
        top: 0;
        right: 0;
        margin-right: 10px;
        text-indent: 20px; 

    }

    .inputSearch:focus{

        outline:none !important;
        border:1px solid rgb(34, 197, 94) !important;
        border-radius:10px;
        box-shadow: none !important;
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
    
    }

</style>
<template>
    <div>
        <div class="card">
            <Toolbar class="mb-4 border border-slate-200 ...">
                <template #start>
                    <Button label="Delete" icon="pi pi-trash" severity="danger" class="danger-button" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
                <template #header>
                    <div class="flex justify-between items-center mt-2">
                        <h4>Manage Companies</h4>
                        <div class="relative rounded-md shadow-sm w-1/4">
                            <input type="search" class="block w-full h-11 rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" v-model="filters['global'].value" placeholder="Search...">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                </template>

                <Column selectionMode="multiple" :exportable="false" class="datetable checkbox" ></Column>
                <Column field="name" header="Number" sortable class="dateTable"></Column>
                <Column field="receiver" header="Receiver" sortable class="dateTable"></Column>
                <Column field="date" header="Date" sortable class="dateTable"></Column>
                <Column field="total" header="Total" sortable class="dateTable"></Column>
                <Column :exportable="false" class="dateTable">
                    <template #body="slotProps">
                        <Button icon="pi pi-eye" outlined rounded class="mr-2 info-button" @click="handleInfoButtonClick(slotProps.data.id)" />
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2 edit-button" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded class="simpleDelete-button" severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

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
                <span v-if="productos">Are you sure you want to delete the selected invoi?</span>
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
                address2: '',
                postCode: '',
                town: '',
                province: '',
                country: ''
            },
            selectedProducts: [], // Almacena los productos seleccionados para borrado en grupo
            filters: {}, // Almacena los filtros de búsqueda en tiempo real
            submitted: false, // Indica si se ha enviado el formulario de creación/edición de producto
        };
    },
    created() {
        console.log("Created");
        this.filters = {
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        }
    },
    mounted() {
        // Asigna los datos de la compañía pasados desde Laravel a una variable local
        this.products = this.$page.props.documents;
        console.log("MOUNTED-----------------------");
    },

    
    methods: {
        hideDialog() {
            console.log("HIDE")
            this.productDialog = false;
            this.submitted = false;
        },


        editProduct(slotProduct) {


            axios.get('/' + this.$page.props.type + '/' + slotProduct.id + '/edit').then(response => {


                this.productos = response.data.product;
                this.productDialog = true;

            })
            .catch(error => {
                console.error('Error al obtener los datos del producto para editar:', error);
            });
            
            
        },

        updateProduct() {

            console.log("Update" + this.productos.name)



            axios.put('/' + this.$page.props.type + '/' + this.productos.id, this.productos)
            .then(response => {
                
                // Busca el índice del objeto en la lista actual
                const index = this.products.findIndex(producto => producto.id === this.productos.id);

                // Actualiza los valores del objeto existente en la lista
                if (index !== -1) {
                this.products[index] = response.data.company;
                } 
                this.productDialog = false; 
            })
            .catch(error => {
                console.error('Error al actualizar la compañía:', error);
                // Mostrar un mensaje de error al usuario
                
            });
        },        

        confirmDeleteProduct(productos) {
            console.log("Confirm deletee");
            this.product = productos;
            this.deleteProductDialog = true;       
        },

        deleteProduct() {
            console.log("DELETE")
            this.products = this.products.filter(val => val.id !== this.product.id);
            this.deleteProductDialog = false;

            console.log(this.product.id);

            axios.delete('/'+ this.$page.props.type+ '/'+ this.product.id)
                .then(response => { console.log(response)})
                .catch(error => { console.log(error.response)})
                
            this.product = {};
        },
        
        confirmDeleteSelected() {
            console.log("CONFIRM DELETE SELECTED")
            this.deleteProductsDialog = true;
        },
        
        deleteSelectedProducts() {
            // Envía una solicitud de eliminación para cada producto seleccionado
            this.selectedProducts.forEach(productos => {
            axios.delete('/' + this.$page.props.type + '/' + productos.id)
                .then(response => {
                console.log('Producto eliminado:', productos.id);
                // Elimina el producto de la lista de productos
                this.products = this.products.filter(p => p.id !== productos.id);
                })
                .catch(error => {
                console.error('Error al eliminar el producto:', error);
                });
            });
            this.selectedProducts = [];
            this.deleteProductsDialog = false;
        },


        handleInfoButtonClick(companyId) {
            this.$inertia.get('/' + this.$page.props.type + '/' + companyId);
        }
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
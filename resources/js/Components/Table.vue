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
            <div class="field">      
                <InputText class="input name" id="name" placeholder="Name" v-model.trim="productos.name" required="true" autofocus />
            </div>
            <div class="field">
                <InputText class="input taxNumber" placeholder="Tax Number" id="taxNumber" v-model="productos.taxNumber" required="true" />
            </div>
            <div class="field">
                <InputText class="input email" placeholder="Email" type="email" id="email" v-model="productos.email" />
            </div>
            <div class="field">
                <InputMask class="input phone1" id="phone1" v-model="productos.phone1"  mask="(99) 999-999-999" placeholder="(+34) 123-123-123" />
            </div>
            <div class="field">
                <InputMask class="input phone1" id="phone2" v-model="productos.phone2"  mask="(99) 999-999-999" placeholder="(+34) 123-123-123" />
            </div>
            <div class="field">
                <InputText class="input address1" id="address1" placeholder="Address" v-model="productos.address1"/>
            </div>
            <div class="field">
                <InputText class="input postCode" id="postCode" placeholder="Post code" v-model="productos.postCode" />
            </div>
            <div class="field">
                <InputText class="input town" id="town" placeholder="Town" v-model="productos.town"/>
            </div>
            <div class="field">
                <InputText class="input province" id="province" placeholder="Province" v-model="productos.province"/>
            </div>
            <div class="field">
                <InputText class="input country" id="country" placeholder="Country" v-model="productos.country"/>
            </div>

            
            <template #footer>
                <Button label="Cancel" class="cancel-button" icon="pi pi-times" text @click="hideDialog"/>
                <Button label="Save" class="save-button" icon="pi pi-check" text @click="saveProduct" />
            </template>
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
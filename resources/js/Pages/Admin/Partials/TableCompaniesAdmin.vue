<template>
    <div>
        <div class="card">
            <Toolbar class="mb-4 border border-slate-200 ...">
                <template #start>
                    <Button :label="$t('New')" icon="pi pi-plus" severity="success" class="mr-2 success-button" @click="openNew" />
                    <Button :label="$t('Delete')" icon="pi pi-trash" severity="danger" class="danger-button" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                :currentPageReportTemplate="`${$t('Showing')} {first} ${$t('of')} {last} ${$t('of')} {totalRecords} ${$t('companies')}`">
                <template #header>
                    <div class="flex justify-between items-center mt-2">
                        <h4><h4>{{ $t('Manage companies') }}</h4></h4>
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
                <Column field="user_email" :header="$t('User')" sortable class="dateTable"></Column>
                <Column field="name" :header="$t('Company')" sortable class="dateTable"></Column>
                <Column field="tax_number" :header="$t('Tax number')" sortable class="dateTable"></Column>
                <Column field="phone" :header="$t('Phone')" sortable class="dateTable"></Column>
                <Column field="email" :header="$t('Email')" sortable class="dateTable"></Column>
        
                <Column :exportable="false" class="dateTable">
                    <template #body="slotProps">
                        <Button icon="pi pi-eye" outlined rounded class="mr-2 info-button" @click="handleInfoButtonClick(slotProps.data.id)" />
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2 edit-button" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded class="simpleDelete-button" severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>


        <!-- MODAL -->
        <Dialog v-model:visible="productDialog" :header="productos.id ? $t('Modify company') : $t('Create company')" id="titleCompany" :modal="true" class="p-fluid">
    
            <form style="width: 800px;" @submit.prevent="saveProduct">
                
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{$t('Select an user')}}</label>
                <Dropdown v-model="selectedUser" :options="this.users" filter optionLabel="email" :placeholder="$t('Select an user')" class="w-full md:w-64rem mb-4 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                        
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class=" flex align-items-center ">
                            <div>{{ slotProps.value.email }}</div>
                        </div>
                        <span v-else>
                            {{ slotProps.placeholder }}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div class="flex align-items-center">
                            <div>{{ slotProps.option.email }}</div>
                        </div>
                    </template>
                </Dropdown>             
                
                
                <div class="grid gap-3 mb-6 md:grid-cols-2">
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Company name') }}</label>
                        <input type="text" id="name" v-model="productos.name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Company name')" required />
                    </div>
                    <div>
                        <label for="tax_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Tax number') }}</label>
                        <input type="text" id="tax_number" v-model="productos.tax_number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Tax number')" required />
                    </div>
                </div>
                <div v-if="!productos.id">
                    <div class="mb-6">
                        <div>
                            <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Address') }}</label>
                            <input type="text" id="address" v-model="productos.address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Address')" required />
                        </div>
                    </div>
                    <div class="grid gap-3 mb-6 md:grid-cols-2">  
                        
                        <div>
                            <label for="province" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Province') }}</label>
                            <input type="text" id="province" v-model="productos.province" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Province')" required />
                        </div>  
                        <div>
                            <label for="post_code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Post code') }}</label>
                            <input type="text" id="post_code" v-model="productos.post_code" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Post code')" pattern="^\d+$" required />
                        </div>
                        <div>
                            <label for="country" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Country') }}</label>
                            <input type="text" id="country" v-model="productos.country" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Country')" required />
                        </div> 
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Email') }}</label>
                            <input type="email" id="email" v-model="productos.email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('info@mycompany.com')" required />
                        </div>    
                        <div>
                            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Phone') }}</label>
                            <input type="tel" id="phone" v-model="productos.phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Phone')" pattern="^\+\d{1,3}\s?\d{1,14}$" required />
                        </div>
                        <div>
                            <label for="town" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Town') }}</label>
                            <input type="text" id="town" v-model="productos.town" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Town')" required />
                        </div> 
                        
                    </div>
                </div>
                <div class="grid gap-3 md:grid-cols-1 justify-items-end">
                    <div>
                        <button class="mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" text @click="hideDialog">{{ $t('Close') }}</button>
                        <button type="submit" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{{ productos.id ? $t('Update') : $t('Save') }}</button>
                    </div>    
                </div>
            </form>
        </Dialog>

        <!-- MODAL DELETE SIMPLE -->
        <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" :header="$t('Confirm')" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="products">{{ $t('Are you sure you want to delete') }}<b>{{product.name}}</b>?</span>
            </div>
            <template #footer>
                <Button :label="$t('No')" icon="pi pi-times" text @click="deleteProductDialog = false"/>
                <Button :label="$t('Yes')" icon="pi pi-check" text @click="deleteProduct" />
            </template>
        </Dialog>

        <!-- MODAL DELETE MULTIPLE -->
        <Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" :header="$t('Confirm')" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="productos">{{ $t('Are you sure you want to delete the selected companies?') }}</span>
            </div>
            <template #footer>
                <Button :label="$t('No')" icon="pi pi-times" text @click="deleteProductsDialog = false"/>
                <Button :label="$t('Yes')" icon="pi pi-check" text @click="deleteSelectedProducts" />
            </template>
        </Dialog>

	</div>
</template>


<script>
import { FilterMatchMode } from 'primevue/api';

import axios from 'axios';

console.log("Inicio");

export default {
    data() {
        console.log("PRIMER PASO");
        return {
            products: null,
            users: [],
            productDialog: false, // Controla la visibilidad del diálogo de creación/edición de producto
            deleteProductDialog: false, // Controla la visibilidad del diálogo de borrado de producto individual
            deleteProductsDialog: false, // Controla la visibilidad del diálogo de borrado de productos en grupo
            selectedCompany: '',
            
            productos: { // Aquí almacenas los datos del producto que se va a crear/editar
                name: '',
                tax_number: '',
                email: '',
                phone: '',
                address: '',
                post_code: '',
                town: '',
                province: '',
                country: '',
                user_id: '',
                user_email: ''
            },
            selectedUser: null,
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
        this.products = this.$page.props.companies;
        this.fetchUsers();
        
    },

    
    methods: {
                
        fetchUsers() {
            
            axios.get('/admin-reload-users')
                .then(response => {
                    this.users = response.data.users;                    
                })
                .catch(error => {
                    console.error('Error fetching phone data:', error);
                });
        },

        fetchCompanies() {
            
            axios.get('/admin-reload-companies')
                .then(response => {
                    this.products = response.data.companies;
                })
                .catch(error => {
                    console.error('Error fetching phone data:', error);
                });
        },

        openNew() {
            console.log("OPEN NEW-------------------")
            this.productos = {};
            this.submitted = false;
            this.productDialog = true;
            this.selectedUser = null;
        },

        hideDialog() {
            console.log("HIDE")
            this.productDialog = false;
            this.submitted = false;
        },
        
        saveProduct() {
            console.log("id: "+ this.selectedUser.id)
            this.productos.user_id = this.selectedUser.id;
            
            if (!this.productos.id) {
                
                // Realiza la solicitud para guardar el producto
                axios.post('/admin-companies', this.productos)
                .then(response => {
                    // La solicitud se completó con éxito, puedes hacer lo que necesites con la respuesta, como imprimirlo en la consola
                    console.log(response);

                    this.fetchCompanies()
                    // Cierra el diálogo de producto
                    this.productDialog = false;

                    
                
                })
                .catch(error => {
                    // Si hay algún error en la solicitud, puedes manejarlo aquí
                    console.log(error.response);
                    this.productDialog = false;
                });   

            }else {
                
                this.updateProduct();
                
            }
        },


        editProduct(slotProduct) {
            this.productDialog = true;
            this.productos.id = slotProduct.id;
            this.productos.user_id = slotProduct.user_id;
            this.productos.name = slotProduct.name;
            this.productos.tax_number = slotProduct.tax_number;
            const selectedUser = this.users.find(user => user.email === slotProduct.user_email);
            this.selectedUser = selectedUser;     
        },

        updateProduct() {


            axios.put('/admin-companies/' + this.productos.id, this.productos)
            .then(response => {
                
                
                this.fetchCompanies();
                this.productDialog = false; 
            })
            .catch(error => {
                console.error('Error al actualizar la compañía:', error);
                this.productDialog = false; 
                
            });
        },        

        confirmDeleteProduct(productos) {
            this.product = productos;
            this.deleteProductDialog = true;       
        },

        deleteProduct() {

            axios.delete('/admin-companies/' + this.product.id)
                .then(response => { 
                    
                    // Filtrar los teléfonos que no coincidan con el ID del teléfono a eliminar
                    this.products = this.products.filter(val => val.id !== this.productos);

                    // Limpiar el objeto myEmail después de la eliminación exitosa
                    this.productos = {};

                    // Cerrar el diálogo de eliminación de teléfono
                    this.deleteEmailDialog = false;
                
                })
                .catch(error => {
                    console.log(error.response)
                    this.deleteProductDialog = false;
                })
                
            
        },
        
        confirmDeleteSelected() {
            this.deleteProductsDialog = true;
        },
        
        deleteSelectedProducts() {

            // Envía una solicitud de eliminación para cada producto seleccionado
            this.selectedProducts.forEach(productos => {
            axios.delete('/admin-companies/' + productos.id)
                .then(response => {


                    // Solo elimina la compañía de la lista si la solicitud DELETE tiene éxito
                    this.products = this.products.filter(val => val.id !== this.productos);

                })
                .catch(error => {
                console.error('Error al eliminar el producto:', error);
                this.deleteProductsDialog = false;
                });
            });
            this.selectedProducts = [];
            this.deleteProductsDialog = false;
            
        },


        handleInfoButtonClick(companyId) {
            this.$inertia.get('/admin-companies/' + companyId);
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
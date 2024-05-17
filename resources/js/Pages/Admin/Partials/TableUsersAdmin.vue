<template>
    <div>
        <div class="card">
            <Toolbar class="mb-4 border border-slate-200 ...">
                <template #start>
                    <Button label="New" icon="pi pi-plus" severity="success" class="mr-2 success-button" @click="openNew" />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" class="danger-button" @click="confirmDeleteSelected" :disabled="!selectedAdminUsers || !selectedAdminUsers.length" />
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="users" v-model:selection="selectedAdminUsers" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users">
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
                <Column field="id" header="ID" sortable class="dateTable"></Column>
                <Column field="userName" header="Username" sortable class="dateTable"></Column>
                <Column field="email" header="Email" sortable class="dateTable"></Column>
                <Column field="roleName" header="Role" sortable class="dateTable"></Column>
                <Column field="active" header="Active" sortable class="dateTable">
                    <template #body="slotProps">
                        <template v-if="slotProps.data.active === null">
                            <Button icon="pi pi-check" outlined rounded class="mr-2 info-active" severity="danger" @click="changeUserState(slotProps.data)"/>
                        </template>
                        <template v-else>
                            <Button icon="pi pi-times" outlined rounded class="mr-2 info-disable" severity="danger" @click="changeUserState(slotProps.data)"  />
                        </template>
                    </template>
                </Column>
                

                
                <Column :exportable="false" header="Utility" class="dateTable">
                    <template #body="slotProps">
                        <Button icon="pi pi-eye" outlined rounded class="mr-2 info-button" @click="handleInfoButtonClick(slotProps.data.id)" />
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2 edit-button" @click="editUser(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <!-- MODAL -->
        <Dialog v-model:visible="userDialog" :header="myUser.id ? 'Modify company' : 'Create company'" id="titleCompany" :modal="true" class="p-fluid">
            
            <form style="width: 800px;" @submit.prevent="saveUser">
                <div class="grid gap-3 mb-6 md:grid-cols-2">
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company name</label>
                        <input type="text" id="name" v-model="myUser.name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Company name" required />
                    </div>
                    <div>
                        <label for="taxNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tax number</label>
                        <input type="text" id="taxNumber" v-model="myUser.taxNumber" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tax number" required />
                    </div>
                </div>
                <div class="mb-6">
                    <div>
                        <label for="address1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address 1</label>
                        <input type="text" id="address1" v-model="myUser.address1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address" required />
                    </div>
                </div>
                <div class="grid gap-3 mb-6 md:grid-cols-2">  
                    <div>
                        <label for="address2" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address 2</label>
                        <input type="text" id="address2" v-model="myUser.address2" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address line 2" />
                    </div>
                    <div>
                        <label for="town" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Town</label>
                        <input type="text" id="town" v-model="myUser.town" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Town" required />
                    </div>  
                    <div>
                        <label for="province" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Province</label>
                        <input type="text" id="province" v-model="myUser.province" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Province" required />
                    </div>  
                    <div>
                        <label for="postCode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post code</label>
                        <input type="text" id="postCode" v-model="myUser.postCode" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Post code" pattern="^\d+$" required />
                    </div>
                    <div>
                        <label for="country" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                        <input type="text" id="country" v-model="myUser.country" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Country" required />
                    </div> 
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                        <input type="email" id="email" v-model="myUser.email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="info@mycompany.com" required />
                    </div>    
                    <div>
                        <label for="phone1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                        <input type="tel" id="phone1" v-model="myUser.phone1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone" pattern="^\+\d{1,3}\s?\d{1,14}$" required />
                    </div>
                    <div>
                        <label for="phone2" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile phone</label>
                        <input type="tel" id="phone2" v-model="myUser.phone2" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mobile phone" pattern="^\+\d{1,3}\s?\d{1,14}$" />
                    </div>
                </div>
                <div class="grid gap-3 md:grid-cols-1 justify-items-end">
                    <div>
                        <button class="mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" text @click="hideDialog">Close</button>
                        <button type="submit" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{{ myUser.id ? 'Modify' : 'Save' }}</button>
                    </div>    
                </div>
            </form>
        </Dialog>

        <!-- MODAL DELETE SIMPLE -->
        <Dialog v-model:visible="deleteUserDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="users">Are you sure you want to change company state<b>{{users.name}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteUserDialog = false"/>
                <Button label="Yes" icon="pi pi-check" text @click="confirmChangeState" />
            </template>
        </Dialog>

        <!-- MODAL DELETE MULTIPLE -->
        <Dialog v-model:visible="deleteUsersDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="myUser">Are you sure you want to delete the selected users?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteUsersDialog = false"/>
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedUsers" />
            </template>
        </Dialog>

        

        <!--
            Toast alertas
        <div id="toast-success" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                </svg>
                <span class="sr-only">Check icon</span>
            </div>

            <div class="ms-3 text-sm font-normal">Item moved successfully.</div>
        </div>
        <div id="toast-danger" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                </svg>
                <span class="sr-only">Error icon</span>
            </div>
            <div class="ms-3 text-sm font-normal">Item has been deleted.</div>
        </div>
        <div id="toast-warning" class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
                </svg>
                <span class="sr-only">Warning icon</span>
            </div>
        </div>-->


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
            users: null, // Aquí almacenarás los myUser recuperados de alguna fuente, como una API
            userDialog: false, // Controla la visibilidad del diálogo de creación/edición de producto
            deleteUserDialog: false, // Controla la visibilidad del diálogo de borrado de producto individual
            deleteUsersDialog: false,
             // Controla la visibilidad del diálogo de borrado de myUser en grupo
            myUser: { // Aquí almacenas los datos del producto que se va a crear/editar
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
            
            selectedAdminUsers: [], // Almacena los myUser seleccionados para borrado en grupo
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
        this.users = this.$page.props.users;
        
    },

    
    methods: {

        fecthUsers() {
            
            axios.get('/recargar-users')
                .then(response => {
                    this.users = response.data.users;
                    
                })
                .catch(error => {
                    console.error('Error fetching phone data:', error);
                });
        },

        updateUser(id, updatedData) {
            // Encuentra el índice del usuario que quieres actualizar
            const index = this.users.findIndex(user => user.id === id);
            if (index !== -1) {
                // Si updatedData es nulo, actualiza el campo deseado a null
                if (updatedData === null) {
                    this.$set(this.users, index, { ...this.users[index], dt_end: null });
                } else {
                    // Actualiza los datos del usuario directamente
                    this.$set(this.users, index, { ...this.users[index], ...updatedData });
                }
            }
        },


        openNew() {
            console.log("")
            this.myUser = {};
            this.submitted = false;
            this.userDialog = true;
        },
        hideDialog() {
            console.log("HIDE")
            this.userDialog = false;
            this.submitted = false;
        },
        
        saveUser() {
            if (!this.myUser.id) {
                
                // Realiza la solicitud para guardar el producto
                axios.post('/'+ this.$page.props.type, this.myUser)
                .then(response => {
                    // La solicitud se completó con éxito, puedes hacer lo que necesites con la respuesta, como imprimirlo en la consola
                    console.log(response);

                    // Cierra el diálogo de producto
                    this.userDialog = false;

                    this.users.push(response.data.company)
                
                })
                .catch(error => {
                    // Si hay algún error en la solicitud, puedes manejarlo aquí
                    console.log(error.response);
                });   

            }else {
                
                this.updateUser();
                
            }
        },


        editUser(slotProduct) {


            axios.get('/' + this.$page.props.type + '/' + slotProduct.id + '/edit').then(response => {


                this.myUser = response.data.product;
                this.userDialog = true;

            })
            .catch(error => {
                console.error('Error al obtener los datos del producto para editar:', error);
            });
            
            
        },

        updateUser() {

            console.log("Update" + this.myUser.name)



            axios.put('/' + this.$page.props.type + '/' + this.myUser.id, this.myUser)
            .then(response => {
                
                // Busca el índice del objeto en la lista actual
                const index = this.users.findIndex(producto => producto.id === this.myUser.id);

                // Actualiza los valores del objeto existente en la lista
                if (index !== -1) {
                this.users[index] = response.data.company;
                } 
                this.userDialog = false; 
            })
            .catch(error => {
                console.error('Error al actualizar la compañía:', error);
                // Mostrar un mensaje de error al usuario
                
            });
        },        


        changeUserState(user) {
            this.myUser = user;
            this.deleteUserDialog = true;       
        },

        confirmChangeState() {
            // Realizar la solicitud de eliminación al servidor
            axios.delete('/admin-users/' + this.myUser.id)
                .then(response => {
                    console.log(response);
                    
                    this.fecthUsers()
        
                    this.deleteUserDialog = false;
                })
                .catch(error => {
                    if (error.response) {
                        // Si se recibe un error 400, no hacer nada, solo imprimir un mensaje de advertencia
                        console.warn('Error: No se pudo eliminar el usuario con ID:', this.myUser.id);
                        this.deleteUserDialog = false;
                    }
                });
        },
    
        
        confirmDeleteSelected() {
            console.log("CONFIRM DELETE SELECTED")
            this.deleteUsersDialog = true;
        },
        
        deleteSelectedUsers() {
            // Envía una solicitud de eliminación para cada producto seleccionado
            this.selectedAdminUsers.forEach(myUser => {
            axios.delete('/admin-users/' + myUser.id)
                .then(response => {
                    this.fecthUsers()
                })
                .catch(error => {
                console.error('Error al eliminar el producto:', error);
                });
            });
            this.deleteUsersDialog = false;
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

    .info-active {
        color:#01bd0a;
        border: 1px solid;
    }

    .info-active:hover {
        background-color:rgba(0, 252, 0, 0.1);
        transition-duration: 0.5s;
        padding:7px;
    }

    .info-disable {
        color:rgb(255, 0, 0);
        border: 1px solid;
    }

    .info-disable:hover {
        background-color:rgba(155, 1, 1, 0.1);
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
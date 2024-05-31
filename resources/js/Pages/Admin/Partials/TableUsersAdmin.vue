<template>
    <div>
        <div class="card">
            <Toolbar class="mb-4 border border-slate-200 ...">
                <template #start>
                    <Button :label="$t('New')" icon="pi pi-plus" severity="success" class="mr-2 success-button" @click="openNew" />
                    <Button :label="$t('Change status')" icon="pi pi-cog" class="status-button" @click="confirmDeleteSelected" :disabled="!selectedAdminUsers || !selectedAdminUsers.length" />
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="users" v-model:selection="selectedAdminUsers" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                :currentPageReportTemplate="`${$t('Showing')} {first} ${$t('of')} {last} ${$t('of')} {totalRecords} ${$t('users')}`">
                <template #header>
                    <div class="flex justify-between items-center mt-2">
                        <h4>{{ $t('Manage users') }}</h4>
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
                <Column field="id" header="ID" sortable class="dateTable"></Column>
                <Column field="name" :header="$t('Username')" sortable class="dateTable"></Column>
                <Column field="email" :header="$t('Email')" sortable class="dateTable"></Column>
                <Column field="role_type" :header="$t('Role')" sortable class="dateTable"></Column>
                <Column field="active" :header="$t('Active')" sortable class="dateTable">
                    <template #body="slotProps">
                        <template v-if="slotProps.data.active === null">
                            <Button icon="pi pi-check" outlined rounded class="mr-2 info-active" severity="danger" @click="changeUserState(slotProps.data)"/>
                        </template>
                        <template v-else>
                            <Button icon="pi pi-times" outlined rounded class="mr-2 info-disable" severity="danger" @click="changeUserState(slotProps.data)"  />
                        </template>
                    </template>
                </Column>
                

                
                <Column :exportable="false" :header="$t('Utility')" class="dateTable">
                    <template #body="slotProps">
                        <Button icon="pi pi-key" outlined rounded class="mr-2 pass-button" @click="editPass(slotProps.data)" />
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2 edit-button" @click="editUser(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>


        <!-- MODAL -->

        <Dialog v-model:visible="userDialog" :header="myUser.id ? $t('Modify user') : $t('Create user')" id="titleCompany" :modal="true" class="p-fluid">
            
            <form style="width: 800px;" @submit.prevent="saveUser">
                <div class="grid gap-3 mb-6 md:grid-cols-2">
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Username') }}</label>
                        <input type="text" id="name" v-model="myUser.name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required />
                    </div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Email') }} </label>
                        <input type="email" id="email" v-model="myUser.email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="info@user.com" required />
                    </div>  
                </div>

                <div class="grid gap-3 mb-6 md:grid-cols-2">
                    <div v-if="!myUser.id"> <!-- Mostrar solo si no se está modificando -->
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Password') }}</label>
                        <input type="password" id="password" v-model="myUser.password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password" required/>
                    </div>
                    <div v-if="!myUser.id"> <!-- Mostrar solo si no se está modificando -->
                        <label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Confirm password') }}</label>
                        <input type="password" id="confirmPassword" v-model="myUser.confirmPassword" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password" required />
                    </div>  
                </div>

                <div class="grid gap-3 mb-6 md:grid-cols-2">  
                            
                    <div class="mt-4">
                        <label for="role_type" class="block font-medium text-gray-700">{{ $t('Define the role') }}</label>
                        <div class="mt-2 ml-12 flex justify-center">
                            <label class="inline-flex items-center">
                                <input type="radio" id="sole_proprietorship" v-model="myUser.role_type" value="freelancer" class="form-radio text-indigo-600" required>
                                <span class="ml-2">{{ $t('Freelance') }}</span>
                            </label>
                            <label class="inline-flex items-center ml-6">
                                <input type="radio" id="partnership" v-model="myUser.role_type" value="company" class="form-radio text-indigo-600">
                                <span class="ml-2">{{ $t('Company') }}</span>
                            </label>
                            <label class="inline-flex items-center ml-6">
                                <input type="radio" id="corporation" v-model="myUser.role_type" value="consulting" class="form-radio text-indigo-600">
                                <span class="ml-2">{{ $t('Consulting') }}</span>
                            </label>
                            <label class="inline-flex items-center ml-6">
                                <input type="radio" id="corporation" v-model="myUser.role_type" value="admin" class="form-radio text-indigo-600">
                                <span class="ml-2">{{ $t('Admin') }}</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="grid gap-3 md:grid-cols-1 justify-items-end">
                    <div>
                        <button class="mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" text @click="hideDialog">{{ $t('Close') }}</button>
                        <button type="submit" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{{ myUser.id ? $t('Update') : $t('Save') }}</button>
                    </div>    
                </div>
            </form>
        </Dialog>

        <!-- MODAL RESET PASSWORD -->

        <Dialog v-model:visible="resetPassDialog" :header="$t('Reset password') + ': ' + myUser.name" id="titleCompany" :modal="true" class="p-fluid">
            <form style="width: 800px;" @submit.prevent="resetPassUser">
                
                <div class="grid gap-3 mb-6 md:grid-cols-2">
                    <div v-if="myUser.id"> <!-- Mostrar solo si se está modificando -->
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Password') }}</label>
                        <input type="password" id="password" v-model="myUser.password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password"/>
                    </div>
                    <div v-if="myUser.id"> <!-- Mostrar solo si se está modificando -->
                        <label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Confirm password') }}</label>
                        <input type="password" id="confirmPassword" v-model="myUser.confirmPassword" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password" />
                    </div>  
                </div>

                <div class="grid gap-3 md:grid-cols-1 justify-items-end">
                    <div>
                        <button class="mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" text @click="hideDialog">{{$t('Close')}}</button>
                        <button type="submit" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{{ myUser.id ? $t('Reset') : $t('Save') }}</button>
                    </div>    
                </div>
            </form>
        </Dialog>


        <!-- MODAL DELETE SIMPLE -->
        <Dialog v-model:visible="deleteUserDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="users">{{ $t('Are you sure you want to disable the user? ') }} {{users.name}}</span>
            </div>
            <template #footer>
                <Button :label="$t('No')" icon="pi pi-times" text @click="deleteUserDialog = false" />
                <Button :label="$t('Yes')" icon="pi pi-check" text @click="confirmChangeState" />
            </template>
        </Dialog>

        <!-- MODAL DELETE MULTIPLE -->
        <Dialog v-model:visible="deleteUsersDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="myUser">{{ $t('Are you sure you want to disable selected users?') }}</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteUsersDialog = false"/>
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedUsers" />
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
            users: null, 
            userDialog: false, 
            deleteUserDialog: false, 
            deleteUsersDialog: false,
            resetPassDialog: false,

            myUser: { 
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                role_type: ''
            },
            
            selectedAdminUsers: [], // Almacena los myUser seleccionados para borrado en grupo
            filters: {}, // Almacena los filtros de búsqueda en tiempo real
            submitted: false, // Indica si se ha enviado el formulario de creación/edición de producto
        };
    },
    created() {
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
            
            axios.get('/admin-reload-users')
                .then(response => {
                    this.users = response.data.users;
                    
                })
                .catch(error => {
                    console.error('Error fetching phone data:', error);
                });
        },

        openNew() {
            this.myUser = {};
            this.submitted = false;
            this.userDialog = true;
        },
        hideDialog() {
            this.userDialog = false;
            this.submitted = false;
            this.resetPassDialog = false;
        },
        
        saveUser() {
            if(this.checkPassword()){
                if (!this.myUser.id) {
                    // Realiza la solicitud para guardar el producto
                    axios.post('/admin-users', this.myUser)
                    .then(response => {



                        // Cierra el diálogo de producto
                        this.userDialog = false;

                        this.fecthUsers();
                
                    })
                    .catch(error => {
                        // Si hay algún error en la solicitud, puedes manejarlo aquí
                        console.log(error.response);
                    });   

                    }else {
                    
                        this.updateUser();   
                    }
                }else{
                    alert("Fulfill the form")
                }
            

        },

        editUser(slotProps) {
            this.myUser.name = slotProps.name;
            this.myUser.email = slotProps.email;
            this.myUser.role_type = slotProps.role_type;
            this.myUser.id = slotProps.id;
        
            this.userDialog = true;     
        },

        updateUser() {

            axios.put('/admin-users/' + this.myUser.id, this.myUser)
            .then(response => { 
                this.userDialog = false; 
                this.fecthUsers();
            })
            .catch(error => {
                console.error('Error al actualizar el usuario', error);
                this.userDialog = false; 
            });
        },  

        editPass(slotProps) {
            this.myUser.password = "";
            this.myUser.confirmPassword = "";
            this.myUser.id = slotProps.id;
            this.myUser.name = slotProps.name;
            this.resetPassDialog = true;     
        },

        resetPassUser(){
            if(this.checkPassword()){

                axios.put('/admin-users-pass/' + this.myUser.id, this.myUser)
                .then(response => { 
                    this.resetPassDialog = false; 
                    this.fecthUsers();
                })
                .catch(error => {
                    console.error('Error al actualizar la contraseña del usuario ', error);
                    this.resetPassDialog = false; 
                });
            }else{
                alert("Passwords do not match")
            }
        },

        changeUserState(user) {
            this.myUser = user;
            this.deleteUserDialog = true;       
        },

        confirmChangeState() {
            // Realizar la solicitud de eliminación al servidor
            axios.delete('/admin-users/' + this.myUser.id)
                .then(response => {
                    
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
            this.deleteUsersDialog = true;
        },
        
        deleteSelectedUsers() {
            // Envía una solicitud de eliminación para cada producto seleccionado
            this.selectedAdminUsers.forEach(myUser => {
            axios.delete('/admin-users/' + myUser.id)
                .then(response => {
                    
                })
                .catch(error => {
                    console.error('Error al eliminar el producto:', error);
                    this.deleteUsersDialog = false;
                });
            });
            this.fecthUsers()
            this.deleteUsersDialog = false;
        },


        handleInfoButtonClick(companyId) {
            this.$inertia.get('/' + this.$page.props.type + '/' + companyId);
        },
        
        checkPassword() {           
            if(this.myUser.password == this.myUser.confirmPassword) {
                return true
            }else{
                return false
            }
    
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
    .status-button {
        background-color:rgb(129, 27, 247);
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
    
    .pass-button {
        color:#a9ba3d;
        border: 1px solid;
    }

    .pass-button:hover {
        background-color:rgba(158, 178, 61, 0.1);
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
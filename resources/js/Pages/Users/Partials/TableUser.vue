<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
</script>

<template>
    <AppLayout title="Profile">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                {{ $t('Users') }}
            </h2>
        </template>
        <div>
            <div class="card">
                <Toolbar class="mb-4 border border-slate-200 ...">
                    <template #start>
                        <Button :label="$t('New')" icon="pi pi-plus" severity="success" class="mr-2 success-button" @click="openNew" />
                        <Button :label="$t('Delete')" icon="pi pi-trash" severity="danger" class="mr-2 danger-button" @click="confirmDeleteSelected" :disabled="!selectedUsers || !selectedUsers.length" />
                        <Button :label="$t('Change status')" icon="pi pi-cog" class="status-button" @click="confirmChangeSelected" :disabled="!selectedUsers || !selectedUsers.length" />
                    </template>
                </Toolbar>

                <DataTable ref="dt" :value="users" v-model:selection="selectedUsers" dataKey="id" 
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
                    <Column field="name" :header="$t('Username')" sortable class="dateTable"></Column>
                    <Column field="email" :header="$t('Email')" sortable class="dateTable"></Column>
                    <Column field="role_type" :header="$t('Role')" sortable class="dateTable"></Column>
                    <Column field="isActive" :header="$t('Active')" sortable class="dateTable">
                        <template #body="slotProps">
                            <template v-if="slotProps.data.isActive === 1">
                                <Button icon="pi pi-check" outlined rounded class="mr-2 info-active" severity="danger" @click="changeUserState(slotProps.data)"/>
                            </template>
                            <template v-else>
                                <Button icon="pi pi-times" outlined rounded class="mr-2 info-disable" severity="danger" @click="changeUserState(slotProps.data)"  />
                            </template>
                        </template>
                    </Column>
                    <Column field="user_who_created" :header="$t('Created by')" sortable class="dateTable"></Column>
                    <Column field="user_who_modified" :header="$t('Modified by')" sortable class="dateTable"></Column>
                    
                    

                    
                    <Column :exportable="false" :header="$t('Utility')" class="dateTable">
                        <template #body="slotProps">
                            <Button icon="pi pi-key" outlined rounded class="mr-2 pass-button" @click="editPass(slotProps.data)" />
                            <Button icon="pi pi-pencil" outlined rounded class="mr-2 edit-button" @click="editUser(slotProps.data)" />
                            <Button icon="pi pi-trash" outlined rounded class="simpleDelete-button" severity="danger" @click="confirmDeleteUser(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>
            </div>


            <!-- CREATE/ EDIT USER -->

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

                    <DataTable ref="dt" :value="companies" v-model:selection="selectedCompany" dataKey="id" @row-select="onRowSelect"
                        :paginator="true" :rows="10" :filters="filters"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                        :currentPageReportTemplate="`${$t('Showing')} {first} ${$t('of')} {last} ${$t('of')} {totalRecords} ${$t('companies')}`">
                        <template #header>
                            <div class="flex justify-between items-center mt-2">
                                <h4>{{ $t('Assigns a company') }}</h4>
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
        
                        <Column selectionMode="multiple" :exportable="false" class="datetable checkbox w-16" ></Column>
                        <Column field="name" :header="$t('Name')" sortable class="dateTable"></Column>
                        <Column field="tax_number" :header="$t('Tax number')" sortable class="dateTable"></Column>
                        
                    </DataTable>

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


            <!-- MODAL DESACTIVE SIMPLE -->
            <Dialog v-model:visible="changeUserDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                <div class="confirmation-content">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <span v-if="users">{{ $t('Are you sure you want to disable the user') }} {{myUser.name}}?</span>
                </div>
                <template #footer>
                    <Button :label="$t('No')" icon="pi pi-times" text @click="deleteUserDialog = false" />
                    <Button :label="$t('Yes')" icon="pi pi-check" text @click="confirmChangeState" />
                </template>
            </Dialog>

            <!-- MODAL CHANGE MULTIPLE -->
            <Dialog v-model:visible="changeUsersDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                <div class="confirmation-content">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <span v-if="myUser">{{ $t('Are you sure you want to disable selected users?') }}</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" text @click="changeUsersDialog = false"/>
                    <Button label="Yes" icon="pi pi-check" text @click="changeSelectedUsers" />
                </template>
            </Dialog>

            <!-- MODAL DELETE SIMPLE -->
            <Dialog v-model:visible="deleteUserDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                <div class="confirmation-content">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <span v-if="users">{{ $t('Are you sure you want to delete') }} {{myUser.name}}?</span>
                </div>
                <template #footer>
                    <Button :label="$t('No')" icon="pi pi-times" text @click="deleteUserDialog = false" />
                    <Button :label="$t('Yes')" icon="pi pi-check" text @click="deleteMyUser" />
                </template>
            </Dialog>

            <!-- MODAL DELETE MULTIPLE -->
            <Dialog v-model:visible="deleteUsersDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                <div class="confirmation-content">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <span v-if="myUser">{{ $t('Are you sure you want to delete selected users?') }}</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" text @click="deleteUsersDialog = false"/>
                    <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedUsers" />
                </template>
            </Dialog>

            
        </div>
    </AppLayout>
</template>


<script>
import { FilterMatchMode } from 'primevue/api';



import axios from 'axios';


export default {
    data() {
        return {
            users: null, 
            companies:null,
            userDialog: false, 
            changeUserDialog: false,
            changeUsersDialog: false,
            deleteUserDialog: false, 
            deleteUsersDialog: false,
            resetPassDialog: false,

            myUser: { 
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                role_type: '',
                selectedCompany: [],
            },
            selectedCompany: [],
            selectedUsers: [], // Almacena los myUser seleccionados para borrado en grupo
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
        console.log(this.users)
        
    },

    
    methods: {

        async fetchCompanies() {
            try {
                const response = await axios.get('/companies-invoice');
                this.companies = response.data.companies;

                if (this.companies.length === 1) {
                    this.selectedCompany = this.companies[0];
                    this.companyId = this.selectedCompany.id;
                } 

                
            } catch (error) {
                this.$toast(this.$t('Error connecting to the server'), 'error');
            }
        },

        async openNew() {
            this.myUser = {};
            await this.fetchCompanies()
            this.submitted = false;
            this.userDialog = true;
        },
        hideDialog() {
            this.userDialog = false;
            this.submitted = false;
            this.resetPassDialog = false;
        },
        
        saveUser() {

            if (!this.myUser.id) {
                this.myUser.selectedCompany = this.selectedCompany
                // Realiza la solicitud para guardar el producto
                axios.post('/users', this.myUser)
                .then(response => {
                    this.userDialog = false;

                    if(response.data.type === 'success'){
                        // Encuentra el usuario en la lista
                        this.myUser = response.data.user;
                        console.log(response.data.user)
                        this.users.push(this.myUser);
                        
                    }
                    this.$toast(this.$t(response.data.message), response.data.type);
                    
                    
            
                })
                .catch(error => {
                    this.$toast(this.$t('Error connecting to the server'), 'error');
                });   

            }else {
            
                this.updateUser();   
            }
        },

        async editUser(slotProps) {

            //Limpia selectedCompany para eliminar residuos
            this.selectedCompany = [];    
            this.myUser = slotProps;
            await this.fetchCompanies()
    
            for (let i = 0; i < slotProps.company_ID.length; i++) {
                // Encontrar la empresa correspondiente al ID actual
                let company = this.companies.find(company => company.id === slotProps.company_ID[i]);
                
                // Si se encuentra una empresa, añadirla al array de empresas seleccionadas
                if (company) {
                    this.selectedCompany.push(company);
                }

                // Imprimir el índice y la empresa seleccionada en la consola
                console.log("i: " + i);
                console.log("Selected Company: ", company);
            }

            
            this.userDialog = true;
            
        },

        updateUser() {
            this.myUser.selectedCompany = this.selectedCompany
            axios.put('/users/' + this.myUser.id, this.myUser)
            .then(response => {
                this.$toast(this.$t(response.data.message), response.data.type);
                this.userDialog = false; 

            })
            .catch(error => {
                this.$toast(this.$t('Error connecting to the server'), 'error');
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

                axios.put('/users-pass/' + this.myUser.id, this.myUser)
                .then(response => { 
                    this.$toast(this.$t(response.data.message), response.data.type);
                    this.resetPassDialog = false; 
                })
                .catch(error => {
                    this.$toast(this.$t('Error connecting to the server'), 'error');
                });
            }else{
                this.$toast(this.$t("Passwords do not match"), 'warning');
            }
        },

        changeUserState(user) {
            this.myUser = user;
            this.changeUserDialog = true;       
        },

        confirmChangeState() {
            
            axios.put('/user-active/' + this.myUser.id)
                .then(response => {

                    if(response.data.type === 'success'){
                        // Encuentra el usuario en la lista
                        let user = this.users.find(user => user.id === this.myUser.id);
                        // Actualiza el usuario
                        user.isActive = user.isActive === 1 ? 0 : 1;
                    }

                    this.$toast(this.$t(response.data.message), response.data.type);
                    this.changeUserDialog = false;
                })
                .catch(error => {
                    this.$toast(this.$t('Error connecting to the server'), 'error');
                });
        },


        confirmChangeSelected() {
            this.changeUsersDialog = true;
        },
        
        changeSelectedUsers() {
            // Envía una solicitud de eliminación para cada usuario seleccionado
            this.selectedUsers.forEach(myUser => {
                axios.put('/user-active/' + myUser.id)
                    .then(response => {
                        if (response.data.type === 'success') {
                            // Encuentra el usuario en la lista
                            let user = this.users.find(user => user.id === myUser.id);
                            if (user) {
                                // Actualiza el estado del usuario
                                user.isActive = user.isActive === 1 ? 0 : 1;
                            }
                        }

                        // Muestra un mensaje de éxito o error
                        this.$toast(this.$t(response.data.message), response.data.type);
                        this.selectedUsers = []
                        this.changeUsersDialog = false;
                    })
                    .catch(error => {
                        this.$toast(this.$t('Error connecting to the server'), 'error');
                    });
            });
        },


        confirmDeleteUser(user) {
            this.myUser = user;
            this.deleteUserDialog = true;       
        },
        
        deleteMyUser() {

            // Realizar la solicitud de eliminación al servidor
            axios.delete('/users/' + this.myUser.id)
                .then(response => {

                    if(response.data.type === 'success'){
                        // Filtrar los usuarios que no coincidan con el ID del teléfono a eliminar
                        this.users = this.users.filter(val => val.id !== this.myUser.id);

                    }
                    this.$toast(this.$t(response.data.message), response.data.type);
                    
                    
                })
                .catch(error => {
                    this.$toast(this.$t('Error connecting to the server'), 'error');
                });
                this.deleteUserDialog = false;
        },

        confirmDeleteSelected() {
            this.deleteUsersDialog = true;
        },
        
        deleteSelectedUsers() {
            // Envía una solicitud de eliminación para cada compañía seleccionada
            console.log("selectedUsers")
            console.log(this.selectedUsers)
            this.selectedUsers.forEach(user => {
                axios.delete('/users/' + user.id)
                    .then(response => {

                        if(response.data.type === 'success'){
                            // Solo elimina la compañía de la lista si la solicitud DELETE tiene éxito
                            this.users = this.users.filter(p => p.id !== user.id);
                        }
                        this.$toast(this.$t(response.data.message), response.data.type);
                        

                    })
                    .catch(error => {
                        this.$toast(this.$t('Error connecting to the server'), 'error');
                    });
            });
            this.deleteUsersDialog = false;
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

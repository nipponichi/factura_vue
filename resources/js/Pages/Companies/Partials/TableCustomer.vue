<template>
    <div>
        <div class="card">
            <Toolbar class="mb-4 border border-slate-200 ...">
                <template #start>
                    <Button :label="$t('New')"  icon="pi pi-plus" severity="success" class="mr-2 success-button" @click="openNew" v-if="$page.props.user.permissions.includes('create customer')"/>
                    <Button :label="$t('Delete')" icon="pi pi-trash" severity="danger" class="danger-button" @click="confirmDeleteSelected" :disabled="!selectedCompanies || !selectedCompanies.length" v-if="$page.props.user.permissions.includes('delete customer')" />
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="companies" v-model:selection="selectedCompanies" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                :currentPageReportTemplate="`${$t('Showing')} {first} ${$t('of')} {last} ${$t('of')} {totalRecords} ${$t('customers')}`">
                <template #header>
                    <div class="flex justify-between items-center mt-2">
                        <h4>{{ $t('Manage customers') }}</h4>
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
                <Column field="name" :header="$t('Name')" sortable class="dateTable"></Column>
                <Column field="tax_number" :header="$t('Tax Number')" sortable class="dateTable"></Column>
                <Column field="phone" :header="$t('Phone')" sortable class="dateTable"></Column>
                <Column field="email" :header="$t('Email')" sortable class="dateTable"></Column>
                <Column field="town" :header="$t('Town')" sortable class="dateTable"></Column>
                <Column :exportable="false" class="dateTable">
                    <template #body="slotProps">
                        <Button icon="pi pi-eye" outlined rounded class="mr-2 view-button" @click="handleInfoButtonClick(slotProps.data.id)" v-if="$page.props.user.permissions.includes('read customer')" />
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2 edit-button" @click="editCompany(slotProps.data)" v-if="$page.props.user.permissions.includes('update customer')" />
                        <Button icon="pi pi-trash" outlined rounded class="simpleDelete-button" severity="danger" @click="confirmDeleteCompany(slotProps.data)" v-if="$page.props.user.permissions.includes('delete customer')" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <!-- MODAL -->
        <Dialog v-model:visible="companyDialog" :header="myCompany.id ? $t('Modify myCompany') : $t('Create myCompany')" id="titleCompany" :modal="true" class="p-fluid">
            
            <form style="width: 800px;" @submit.prevent="saveCompany">
                <div class="grid gap-3 mb-6 md:grid-cols-2">
                <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Company name') }}</label>
                        <input type="text" id="name" v-model="myCompany.name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Company name')" required />
                    </div>
                    <div>
                        <label for="tax_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Tax number') }}</label>
                        <input type="text" id="tax_number" v-model="myCompany.tax_number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Tax number')" required />
                    </div>
                </div>

                
                <div v-if="!this.myCompany.id">

                    <div class="mb-6">

                        <div>
                            <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Address') }}</label>
                            <input type="text" id="address1" v-model="myCompany.address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Address')" required />
                        </div>
                    </div>
                    <div class="grid gap-3 mb-6 md:grid-cols-2"> 
                        
                        <div>
                            <label for="town" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Town') }}</label>
                            <input type="text" id="town" v-model="myCompany.town" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Town')" required />
                        </div>  
                        <div>
                            <label for="province" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Province') }}</label>
                            <input type="text" id="province" v-model="myCompany.province" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Province')" required />
                        </div>  
                        <div>
                            <label for="post_code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Post code') }}</label>
                            <input type="text" id="post_code" v-model="myCompany.post_code" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Post code')" pattern="^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$" required />
                        </div>
                        <div>
                            <label for="country" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Country') }}</label>
                            <input type="text" id="country" v-model="myCompany.country" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Country')" required />
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Email') }}</label>
                            <input type="email" id="email" v-model="myCompany.email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('info@mycompany.com')" required />
                        </div>    
                        <div>
                            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Phone') }}</label>
                            <input type="tel" id="phone" v-model="myCompany.phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Phone')" pattern="(\+34\s?)?(\d{9})" required />
                        </div>

                        
                    </div>
                </div>
                
                <div class="grid gap-3 md:grid-cols-1 justify-items-end">
                    <div>
                        <button type="button" class="mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="hideDialog">{{ $t('Close') }}</button>
                        <button type="submit" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{{ myCompany.id ? $t('Update') : $t('Save') }}</button>
                    </div>    
                </div>
            </form>
        </Dialog>

        <!-- MODAL DELETE SIMPLE -->
        <Dialog v-model:visible="deleteCompanyDialog" :style="{width: '450px'}" :header="$t('Confirm')" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="myCompany"> {{$t('Are you sure you want to delete')}}<b>{{myCompany.name}}</b>?</span>
            </div>
            <template #footer>
                <Button :label="$t('No')" icon="pi pi-times" text @click="deleteCompanyDialog = false"/>
                <Button :label="$t('Yes')" icon="pi pi-check" text @click="deleteCompany" />
            </template>
        </Dialog>

        <!-- MODAL DELETE MULTIPLE -->
        <Dialog v-model:visible="deleteCompaniesDialog" :style="{width: '450px'}" :header="$t('Confirm')" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="myCompany">{{ $t('Are you sure you want to delete the selected customers?') }}</span>
            </div>
            <template #footer>
                <Button :label="$t('No')" icon="pi pi-times" text @click="deleteCompaniesDialog = false"/>
                <Button :label="$t('Yes')" icon="pi pi-check" text @click="deleteSelectedCompanies" />
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
            companies: null, 
            companyDialog: false, 
            deleteCompanyDialog: false, 
            deleteCompaniesDialog: false, 
            myCompany: {
                id:'',
                name: '',
                tax_number: '',
                email: '',
                phone: '',
                address: '',
                post_code: '',
                town: '',
                province: '',
                country: ''
            },
            originalCompany: [],
            selectedCompanies: [], 
            filters: {}, 
            submitted: false,
        };
    },
    created() {
        this.filters = {
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        }
    },
    mounted() {
        
        this.fetchCustomers();
    },

    
    methods: {
        fetchCustomers() {
            let myCompanyId = window.location.pathname.split('/').pop();

            axios.get('/customers/' + myCompanyId)
            .then(response => {
            // Asigna los datos de los clientes a la propiedad 'companies'
            this.companies = response.data.customers;

        })
        .catch(error => {
            this.$toast(this.$t('Error connecting to the server'), 'error');
        });
        },

        openNew() {
            // Para hacer asociación en tabla Companies_Customers
            this.myCompany = {
                companyID: window.location.pathname.split('/').pop(),
            };
            this.submitted = false;
            this.companyDialog = true;
        },
        
        hideDialog() {
            this.companyDialog = false;
            this.submitted = false;
        },
        
        saveCompany() {
            if (!this.myCompany.id) {

                axios.post('/customer', this.myCompany)
                .then(response => {

                    this.$toast(this.$t(response.data.message), response.data.type);
                    this.companyDialog = false;
                    this.fetchCustomers();
                })
                .catch(error => {
                    this.$toast(this.$t('Error connecting to the server'), 'error');
                    this.companyDialog = false;
                });   

            }else {
                this.updateCompany();
            }
        },


        editCompany(slotCompany) {

            this.originalCompany = {
                tax_number: slotCompany.tax_number,
                name: slotCompany.name
            };
            this.myCompany.id = slotCompany.id;    
            this.myCompany.name = slotCompany.name;
            this.myCompany.tax_number = slotCompany.tax_number;
            this.companyDialog = true;
            
        },

        updateCompany() {

            if (this.originalCompany.tax_number === this.myCompany.tax_number &&
                this.originalCompany.name === this.myCompany.name) {
                this.$toast(this.$t('Successfully updated.'), 'success');
                this.companyDialog = false;
                return;
            }
            axios.put('/customer/' + this.myCompany.id, this.myCompany)
            .then(response => {
                this.$toast(this.$t(response.data.message), response.data.type);
                this.fetchCustomers();
                this.companyDialog = false; 
            })
            .catch(error => {
                this.$toast(this.$t('Error connecting to the server'), 'error');
                this.companyDialog = false; 
                
            });
        },        

        confirmDeleteCompany(myCompany) {
            this.myCompany = myCompany;
            this.deleteCompanyDialog = true;       
        },

        deleteCompany() {
            

            axios.delete('/customer/'+ this.myCompany.id)
                .then(response => {
                    
                    if(response.data.type === 'success'){
                        // Filtrar los teléfonos que no coincidan con el ID del teléfono a eliminar
                        this.companies = this.companies.filter(val=> val.id !== this.myCompany.id);

                    }
                    this.$toast(this.$t(response.data.message), response.data.type);
                    this.updateFields();
                })
                .catch(error => { 
                    this.$toast(this.$t(error.response.message), error.response.type);
                    
                })
                this.deleteCompanyDialog = false;
            
        },
        
        confirmDeleteSelected() {
            this.deleteCompaniesDialog = true;
        },
        
        deleteSelectedCompanies() {
            // Envía una solicitud de eliminación para cada compañia seleccionado
            this.selectedCompanies.forEach(myCompany => {
                axios.delete('/customer/' + myCompany.id)
                .then(response => {

                    if(response.data.type === 'success'){
                        // Elimina el compañia de la lista de myCompany
                        this.companies = this.companies.filter(p => p.id !== myCompany.id);
                    }
                    this.$toast(this.$t(response.data.message), response.data.type);
                        
                    this.updateFields();
                    
                    
                })
                .catch(error => {
                    if (error.response || error.response.status === 400) {
                        this.$toast(this.$t(error.response.message), error.response.type);
                    }
                });
            });
            this.deleteCompaniesDialog = false;
        },


        handleInfoButtonClick(customerID) {
            let companyID = window.location.pathname.split('/').pop();
            this.$inertia.get(`/companies/${companyID}/customer/${customerID}`);
        },

        updateFields() {

            this.$emit('updateCustomer', 1);

        },

    }
}
</script>
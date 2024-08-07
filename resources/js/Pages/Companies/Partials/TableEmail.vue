<template>
    <div>
        <div class="card">
            <Toolbar class="mb-4 border border-slate-200 ...">
                <template #start>
                    <Button :label="$t('New')" icon="pi pi-plus" severity="success" class="mr-2 success-button" @click="openNew" v-if="$page.props.user.permissions.includes('create email')" />
                    <Button :label="$t('Delete')" icon="pi pi-trash" severity="danger" class="danger-button" @click="confirmDeleteSelected" :disabled="!selectedEmails || !selectedEmails.length" v-if="$page.props.user.permissions.includes('delete email')"/>
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="emails" v-model:selection="selectedEmails" dataKey="id" @row-select="onRowSelect"
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                :currentPageReportTemplate="`${$t('Showing')} {first} ${$t('of')} {last} ${$t('of')} {totalRecords} ${$t('emails')}`">
                <template #header>
                    <div class="flex justify-between items-center mt-2">
                        <h4> {{ $t('Manage Emails') }} </h4>
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
                
                <Column field="email" :header="$t('Email')" sortable class="dateTable"></Column>
                
                <Column :exportable="false" :header="$t('Favourite')" class="dateTable w-24 text-center" v-if="$page.props.user.permissions.includes('update email')">
            
                    <template #body="slotProps">
                        <Button v-if="slotProps.data.favourite" icon="pi pi-star-fill"  class="mr-2 fav-button" @click="makeFavourite(slotProps.data)" />
                        <Button v-else icon="pi pi-star" class="mr-2 fav-button" @click="makeFavourite(slotProps.data)" />
                    </template>
                </Column>

                
                
                <div class="utility-button">
                    <Column :exportable="false" :header="$t('Utilities')" class="headerUtil dateTable w-24">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" outlined rounded class="mr-2 edit-button" @click="editMyEmail(slotProps.data)" v-if="$page.props.user.permissions.includes('update email')" />
                            <Button icon="pi pi-trash" outlined rounded class="simpleDelete-button" severity="danger" @click="confirmDeleteEmail(slotProps.data)" v-if="$page.props.user.permissions.includes('delete email')"/>
                        </template>
                    </Column>
                </div>

    
                
            </DataTable>
        </div>

        <!-- MODAL -->
            <template>
                <Dialog v-model:visible="emailDialog" :header="myEmail.id ?  $t('Update email') : $t('Create email')" id="titleEmail" :modal="true" class="p-fluid">
                <form style="width: 800px;" @submit.prevent="saveMyEmail">
                    <div class="grid gap-3 mb-6 md:grid-cols-1">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Email') }}</label>
                            <input type="email" id="email" v-model="myEmail.email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="info@mycompany.com" required />
                        </div>  
                    <div v-if="!myEmail.id" class="flex items-center">
                        <input id="link-checkbox" type="checkbox" v-model="myEmail.favourite" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ $t('Mark this email as a favourite') }}.</label>
                    </div>
                    </div>
                    <div class="grid gap-3 md:grid-cols-1 justify-items-end">
                    <div>
                        <button type="button" class="mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="hideDialog">{{ $t('Close') }}</button>
                        <button type="submit" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{{ myEmail.id ? $t('Update') : $t('Save') }}</button>
                    </div>
                    </div>
                </form>
                </Dialog>
            </template>
            

        <!-- MODAL DELETE SIMPLE -->
        <Dialog v-model:visible="deleteEmailDialog" :style="{width: '450px'}" :header="$t('Confirm')" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="myEmail">{{ $t('Are you sure you want to delete') }} <b>{{emails.email}}</b>?</span>
            </div>
            <template #footer>
                <Button :label="$t('No')" icon="pi pi-times" text @click="deleteEmailDialog = false"/>
                <Button :label="$t('Yes')"  icon="pi pi-check" text @click="deleteMyEmail" />
            </template>
        </Dialog>

        <!-- MODAL DELETE MULTIPLE -->
        <Dialog v-model:visible="deleteEmailsDialog" :style="{width: '450px'}" :header="$t('Confirm')" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="myEmail">{{ $t('Are you sure you want to delete the selected emails?') }}</span>
            </div>
            <template #footer>
                <Button :label="$t('No')" icon="pi pi-times" text @click="deleteEmailsDialog = false"/>
                <Button :label="$t('Yes')" icon="pi pi-check" text @click="deleteSelectedEmails" />
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
            emails: null, 
            emailDialog: false, 
            deleteEmailDialog: false, 
            deleteEmailsDialog: false, 
            myEmail: { 
                id: '',             
                email: '',
                favourite: '',
                companyID: window.location.pathname.split('/').pop(),
            },
            originalEmail: {},
            selectedEmails: [], 
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
        
        this.fetchEmails();
            
    },
    
    methods: {

        fetchEmails() {
            let myCompanyId = window.location.pathname.split('/').pop();
            return axios.get('/emails/' + myCompanyId)
                .then(response => {
                    this.emails = response.data.emails;
                    
                })
                .catch(error => {
                    this.$toast(this.$t('Error connecting to the server'), 'error');
                    throw error;
                });
            },
        openNew() {
            this.myEmail = {
                email: '',
                companyID: window.location.pathname.split('/').pop(),
            };
            this.submitted = false;
            this.emailDialog = true;
        },
        hideDialog() {
            this.emailDialog = false;
            this.submitted = false;
        },


        async saveMyEmail() {
            if (this.myEmail.favourite == null) {
                this.myEmail.favourite = false;
            }
            try {
                
                if (!this.myEmail.id) {
                    const response = await axios.post('/email', this.myEmail);
                    this.$toast(this.$t(response.data.message), response.data.type);
                } else {
                    await this.updateMyEmail();
                }

            
                await this.fetchEmails(); // Esperar a que fetchEmails() complete
                this.emailDialog = false;
                this.updateFields();
            } catch (error) {
                this.$toast(this.$t('Error connecting to the server'), 'error');
                this.emailDialog = false;
            }
        },


        editMyEmail(slotProps) {

            this.originalEmail = { ...slotProps };
            this.myEmail.email = slotProps.email;
            this.myEmail.id = slotProps.id;
            this.myEmail.favourite = slotProps.favourite;
            this.emailDialog = true;
        },

        updateMyEmail() {


            this.originalEmail.companyID = this.myEmail.companyID;

            
            if (JSON.stringify(this.originalEmail) === JSON.stringify(this.myEmail)) {
                this.$toast(this.$t('Successfully updated.'), 'success');
                this.emailDialog = false;
                return;
            }

            axios.put('/email/' + this.myEmail.id, this.myEmail)
            .then(async response => {

                this.$toast(this.$t(response.data.message), response.data.type);
                await this.fetchEmails();
                this.emailDialog = false;
                this.updateFields();
            })
            .catch(error => {
                this.$toast(this.$t('Error connecting to the server'), 'error');
                this.emailDialog = false; 
                // Mostrar un mensaje de error al usuario
                
            });
        },

        async makeFavourite(slotProps) {
            if (slotProps.favourite) {
                return this.$toast(this.$t('Already selected as a favorite.'), 'warning');
            }

            try {
                const response = await axios.put('/emails/' + slotProps.id);
                await this.fetchEmails(); // Espera a que fetchEmails() complete
                this.$toast(this.$t(response.data.message), response.data.type);
                this.emailDialog = false;
                this.updateFields();
            } catch (error) {
                this.$toast(this.$t('Error connecting to the server'), 'error');
                this.emailDialog = false;
            }
        },
        
        confirmDeleteEmail(email) {
            this.myEmail = email;
            this.deleteEmailDialog = true;       
        },
        deleteMyEmail() {

            // Realizar la solicitud de eliminación al servidor
            axios.delete('/email/' + this.myEmail.id)
                .then(response => {
                    
                    if(response.data.type === 'success'){
                        // Filtrar los teléfonos que no coincidan con el ID del teléfono a eliminar
                        this.emails = this.emails.filter(val => val.id !== this.myEmail.id);
                    }

                    this.$toast(this.$t(response.data.message), response.data.type);
                })
                .catch(error => {
                    this.$toast(this.$t(error.response.message), error.response.type);
                    this.emailDialog = false; 
                });
        },
        
        confirmDeleteSelected() {
            console.log("CONFIRM DELETE SELECTED")
            this.deleteEmailsDialog = true;
        },
        
        deleteSelectedEmails() {
            // Envía una solicitud de eliminación para cada compañía seleccionada
            this.selectedEmails.forEach(email => {
                axios.delete('/email/' + email.id)
                    .then(response => {

                        if(response.data.type === 'success'){
                            // Solo elimina la compañía de la lista si la solicitud DELETE tiene éxito
                            this.emails = this.emails.filter(p => p.id !== email.id);
                        }
                        this.$toast(this.$t(response.data.message), response.data.type);
                        

                    })
                    .catch(error => {
                        if (error.response || error.response.status === 400) {
                            this.$toast(this.$t(error.response.message), error.response.type);
                        }
                    });
            });
            this.deleteEmailsDialog = false;
        },

        updateFields() {

            this.emails.forEach(email => {
                if (email.favourite) {
                    this.$emit('updateEmail', email.email);
                }
            });
        },

    }
}
</script>
<template>
    <div>
        <div class="card">
            <Toolbar class="mb-4 border border-slate-200 ...">
                <template #start>
                    <Button label="New" icon="pi pi-plus" severity="success" class="mr-2 success-button" @click="openNew" />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" class="danger-button" @click="confirmDeleteSelected" :disabled="!selectedEmails || !selectedEmails.length" />
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="emails" v-model:selection="selectedEmails" dataKey="id" @row-select="onRowSelect"
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} companies">
                <template #header>
                    <div class="flex justify-between items-center mt-2">
                        <h4>Manage Emails</h4>
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

                <Column selectionMode="multiple" :exportable="false" class="datetable checkbox w-16" ></Column>
                
                <Column field="email" header="Email" sortable class="dateTable"></Column>
                
                <Column :exportable="false"  header="Favourite" class="dateTable w-24 text-center">
            
                    <template #body="slotProps">
                        <Button v-if="slotProps.data.favourite" icon="pi pi-star-fill"  class="mr-2 info-button" @click="makeFavourite(slotProps.data)" />
                        <Button v-else icon="pi pi-star" class="mr-2 info-button" @click="makeFavourite(slotProps.data)" />
                    </template>
                </Column>

                
                
                <div class="utility-button">
                    <Column :exportable="false" header="Utilities" class="headerUtil dateTable w-24">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" outlined rounded class="mr-2 edit-button" @click="editMyEmail(slotProps.data)" />
                            <Button icon="pi pi-trash" outlined rounded class="simpleDelete-button" severity="danger" @click="confirmDeleteEmail(slotProps.data)" />
                        </template>
                    </Column>
                </div>

    
                
            </DataTable>
        </div>

        <!-- MODAL -->
            <template>
                <Dialog v-model:visible="emailDialog" :header="myEmail.id ? 'Update email' : 'Create email'" id="titleEmail" :modal="true" class="p-fluid">
                <form style="width: 800px;" @submit.prevent="saveMyEmail">
                    <div class="grid gap-3 mb-6 md:grid-cols-1">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                            <input type="email" id="email" v-model="myEmail.email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="info@mycompany.com" required />
                        </div>  
                    <div v-if="!myEmail.id" class="flex items-center">
                        <input id="link-checkbox" type="checkbox" v-model="myEmail.favourite" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mark this email as a favourite.</label>
                    </div>
                    </div>
                    <div class="grid gap-3 md:grid-cols-1 justify-items-end">
                    <div>
                        <button type="button" class="mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="hideDialog">Close</button>
                        <button type="submit" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{{ myEmail.id ? 'Update' : 'Save' }}</button>
                    </div>
                    </div>
                </form>
                </Dialog>
            </template>
            

        <!-- MODAL DELETE SIMPLE -->
        <Dialog v-model:visible="deleteEmailDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="myEmail">Are you sure you want to delete <b>{{myEmail.email}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteEmailDialog = false"/>
                <Button label="Yes" icon="pi pi-check" text @click="deleteMyEmail" />
            </template>
        </Dialog>

        <!-- MODAL DELETE MULTIPLE -->
        <Dialog v-model:visible="deleteEmailsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="myEmail">Are you sure you want to delete the selected emails?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteEmailsDialog = false"/>
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedEmails" />
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
            axios.get('/emails/' + myCompanyId)
                .then(response => {
                    this.emails = response.data.emails;
                    
                })
                .catch(error => {
                    console.error('Error fetching emails data:', error);
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


        saveMyEmail() {
            console.log("companyId: "+ this.myEmail.companyID)
            if(this.myEmail.favourite == null) {
                this.myEmail.favourite = false
            }
            this.myEmail.isMobile = 0;
            if (!this.myEmail.id) {
                axios.post('/email', this.myEmail)
                .then(response => {
                    
                    this.fetchEmails();
                    
                    this.emailDialog = false;
                        
                })
                .catch(error => {
                    console.error('Error saving email data:', error.response);
                    this.emailDialog = false;
                });

            }else {               
                this.updateMyEmail();
            }
        },

        editMyEmail(slotProps) {
            console.log('edit: ' + slotProps.favourite)
            
                this.myEmail.email = slotProps.email;
                this.myEmail.id = slotProps.id;
                this.myEmail.favourite = slotProps.favourite;
                this.emailDialog = true;
        },

        updateMyEmail() {
            console.log("Update: " + this.myEmail.favourite)

            axios.put('/email/' + this.myEmail.id, this.myEmail)
            .then(response => {
                this.fetchEmails();
                this.emailDialog = false;
            })
            .catch(error => {
                console.error('Error al actualizar la compañía:', error);
                this.emailDialog = false; 
                // Mostrar un mensaje de error al usuario
                
            });
        },

        makeFavourite(slotProps) {

            if (slotProps.favourite) {
                return alert("El telefono ya está seleccionado como favorito")
            }

            axios.put('/emails/' + slotProps.id)
            .then(response => {
                this.emailDialog = false;
                this.fetchEmails();             
            })         
            .catch(error => {
                console.error('Error al seleccionar un email', error);
                this.emailDialog = false;
            });
        },
        
        confirmDeleteEmail(email) {
            this.myEmail = email;
            this.deleteEmailDialog = true;       
        },
        deleteMyEmail() {

            // Realizar la solicitud de eliminación al servidor
            axios.delete('/email/' + this.myEmail.id)
                .then(response => {
                    console.log(response);
                    
                    // Filtrar los teléfonos que no coincidan con el ID del teléfono a eliminar
                    this.emails = this.emails.filter(val => val.id !== this.myEmail.id);

                    // Limpiar el objeto myEmail después de la eliminación exitosa
                    this.myEmail = {};

                    // Cerrar el diálogo de eliminación de teléfono
                    this.deleteEmailDialog = false;
                })
                .catch(error => {
                    if (error.response || error.response.status === 400) {
                        // Si se recibe un error 400, no hacer nada, solo imprimir un mensaje de advertencia
                        console.warn('Error 400: No se pudo eliminar el email con ID:', emailId);
                        this.deleteEmailDialog = false;
                    }
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
                        console.log('Compañía eliminada con ID:', email.id);
                        
                        // Solo elimina la compañía de la lista si la solicitud DELETE tiene éxito
                        this.emails = this.emails.filter(p => p.id !== email.id);
                        

                    })
                    .catch(error => {
                        if (error.response || error.response.status === 400) {
                            // Si se recibe un error 400, no hacer nada, solo imprimir un mensaje de advertencia
                            console.warn('Error 400: No se pudo eliminar la compañía con ID:', email.id);
                        }
                    });
            });
            this.selectedEmails = [];
            this.deleteEmailsDialog = false;
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
        color: #FFB500;
        border: none;
        margin-right: 55px;
        box-shadow: none !important;
        
    }
    
    .info-button .pi {
        font-size: 26px;
    }
    
    .info-button:hover {
        background: #ffffff;
        transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
        transform: scale(1.2);
    }
    
    .edit-button {
        color:rgb(34, 197, 94);
        border: 1px solid;
        margin-right: 5px;
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
<template>
    <div>
        <div class="card">
            <Toolbar class="mb-4 border border-slate-200 ...">
                <template #start>
                    <Button :label="$t('New')" icon="pi pi-plus" severity="success" class="mr-2 success-button" @click="openNew" />
                    <Button :label="$t('Delete')" icon="pi pi-trash" severity="danger" class="danger-button" @click="confirmDeleteSelected" :disabled="!selectedPhones || !selectedPhones.length" />
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="phones" v-model:selection="selectedPhones" dataKey="id" @row-select="onRowSelect"
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                :currentPageReportTemplate="`${$t('Showing')} {first} ${$t('of')} {last} ${$t('of')} {totalRecords} ${$t('phones')}`">
                <template #header>
                    <div class="flex justify-between items-center mt-2">
                        <h4>{{ $t('Manage Phones') }}</h4>
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
                
                <Column field="phone" :header="$t('Phone')" sortable class="dateTable"></Column>
                
                <Column :exportable="false" :header="$t('Favourite')" class="dateTable w-24 text-center">
            
                    <template #body="slotProps">
                        <Button v-if="slotProps.data.favourite" icon="pi pi-star-fill"  class="mr-2 info-button" @click="makeFavourite(slotProps.data)" />
                        <Button v-else icon="pi pi-star" class="mr-2 info-button" @click="makeFavourite(slotProps.data)" />
                    </template>
                </Column>

                
                
                <div class="utility-button">
                    <Column :exportable="false" :header="$t('Utilities')" class="headerUtil dateTable w-24">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" outlined rounded class="mr-2 edit-button" @click="editMyPhone(slotProps.data)" />
                            <Button icon="pi pi-trash" outlined rounded class="simpleDelete-button" severity="danger" @click="confirmDeletePhone(slotProps.data)" />
                        </template>
                    </Column>
                </div>

    
                
            </DataTable>
        </div>

        <!-- MODAL -->
            <template>
                <Dialog v-model:visible="phoneDialog" :header="myPhone.id ? $t('Update phone') : $t('Create phone') " id="titlePhone" :modal="true" class="p-fluid">
                <form style="width: 800px;" @submit.prevent="saveMyPhone">
                    <div class="grid gap-3 mb-6 md:grid-cols-1">
                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Phone') }}</label>
                        <input type="tel" id="phone" v-model="myPhone.phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Update phone')" pattern="^\+\d{1,3}\s?\d{1,14}$" required />
                    </div>
                    <div v-if="!myPhone.id" class="flex items-center">
                        <input id="link-checkbox" type="checkbox" v-model="myPhone.favourite" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ $t('Mark this phone number as a favourite') }}.</label>
                    </div>
                    </div>
                    <div class="grid gap-3 md:grid-cols-1 justify-items-end">
                    <div>
                        <button type="button" class="mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="hideDialog">{{ $t('Close') }}</button>
                        <button type="submit" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{{ myPhone.id ? $t('Update') : $t('Save') }}</button>
                    </div>
                    </div>
                </form>
                </Dialog>
            </template>
            

        <!-- MODAL DELETE SIMPLE -->
        <Dialog v-model:visible="deletePhoneDialog" :style="{width: '450px'}" :header="$t('Confirm')" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="myPhone">{{ $t('Are you sure you want to delete') }}<b>{{myPhone.phone}}</b>?</span>
            </div>
            <template #footer>
                <Button :label="$t('No')" icon="pi pi-times" text @click="deletePhoneDialog = false"/>
                <Button :label="$t('Yes')" icon="pi pi-check" text @click="deleteMyPhone" />
            </template>
        </Dialog>

        <!-- MODAL DELETE MULTIPLE -->
        <Dialog v-model:visible="deletePhonesDialog" :style="{width: '450px'}" :header="$t('Confirm')" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="myPhone">{{ $t('Are you sure you want to delete the selected phones?') }}</span>
            </div>
            <template #footer>
                <Button :label="$t('No')" icon="pi pi-times" text @click="deletePhonesDialog = false"/>
                <Button :label="$t('Yes')" icon="pi pi-check" text @click="deleteSelectedPhones" />
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
            phones: null, 
            phoneDialog: false, 
            deletePhoneDialog: false, 
            deletePhonesDialog: false, 
            myPhone: { 
                id: '',             
                phone: '',
                favourite: '',
                isMobile: 0,
                companyID: window.location.pathname.split('/').pop(),
            },
            selectedPhones: [], 
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
        
        this.fetchPhones();
            
    },
    methods: {
        fetchPhones() {
            let myCompanyId = window.location.pathname.split('/').pop();
        axios.get('/phones/' + myCompanyId)
            .then(response => {
                this.phones = response.data.phones;
                
            })
            .catch(error => {
                console.error('Error fetching phone data:', error);
            });
    },
        openNew() {
            this.myPhone = {
                phone: '',
                companyID: window.location.pathname.split('/').pop(),
            };
            this.submitted = false;
            this.phoneDialog = true;
        },
        hideDialog() {
            this.phoneDialog = false;
            this.submitted = false;
        },


        saveMyPhone() {
            console.log("companyId: "+ this.myPhone.companyID)
            if(this.myPhone.favourite == null) {
                this.myPhone.favourite = false
            }
            this.myPhone.isMobile = 0;
            if (!this.myPhone.id) {
                axios.post('/phone', this.myPhone)
                .then(response => {
                    
                    this.fetchPhones();
                    
                    this.phoneDialog = false;
                        
                })
                .catch(error => {
                    console.error('Error saving phone data:', error.response);
                    this.phoneDialog = false;
                });

            }else {               
                this.updateMyPhone();
            }
        },

        editMyPhone(slotProps) {
            console.log('edit: ' + slotProps.favourite)
            
                this.myPhone.phone = slotProps.phone;
                this.myPhone.id = slotProps.id;
                this.myPhone.favourite = slotProps.favourite;
                this.phoneDialog = true;


        },

        updateMyPhone() {
            console.log("Update: " + this.myPhone.favourite)

            axios.put('/phone/' + this.myPhone.id, this.myPhone)
            .then(response => {
                this.fetchPhones();
                this.phoneDialog = false;
            })
            .catch(error => {
                console.error('Error al actualizar la compañía:', error);
                this.phoneDialog = false; 
                // Mostrar un mensaje de error al usuario
                
            });
        },

        makeFavourite(slotProps) {

            if (slotProps.favourite) {
                return alert("El telefono ya está seleccionado como favorito")
            }

            axios.put('/phones/' + slotProps.id)
            .then(response => {
                this.phoneDialog = false;
                this.fetchPhones();             
            })         
            .catch(error => {
                console.error('Error al seleccionar un teléfono', error);
                this.phoneDialog = false;
            });
        },
        
        confirmDeletePhone(phone) {
            this.myPhone = phone;
            this.deletePhoneDialog = true;       
        },
        deleteMyPhone() {
            const phoneId = this.myPhone.id;

            // Realizar la solicitud de eliminación al servidor
            axios.delete('/phone/' + this.myPhone.id)
                .then(response => {
                    console.log(response);
                    
                    // Filtrar los teléfonos que no coincidan con el ID del teléfono a eliminar
                    this.phones = this.phones.filter(val => val.id !== phoneId);

                    // Limpiar el objeto myPhone después de la eliminación exitosa
                    this.myPhone = {};

                    // Cerrar el diálogo de eliminación de teléfono
                    this.deletePhoneDialog = false;
                })
                .catch(error => {
                    if (error.response || error.response.status === 400) {
                        // Si se recibe un error 400, no hacer nada, solo imprimir un mensaje de advertencia
                        console.warn('Error 400: No se pudo eliminar el teléfono con ID:', phoneId);
                        this.deletePhoneDialog = false;
                    }
                });
        },
        
        confirmDeleteSelected() {
            console.log("CONFIRM DELETE SELECTED")
            this.deletePhonesDialog = true;
        },
        
        deleteSelectedPhones() {
            // Envía una solicitud de eliminación para cada compañía seleccionada
            this.selectedPhones.forEach(phone => {
                axios.delete('/phone/' + phone.id)
                    .then(response => {
                        console.log('Compañía eliminada con ID:', phone.id);
                        
                        // Solo elimina la compañía de la lista si la solicitud DELETE tiene éxito
                        this.phones = this.phones.filter(p => p.id !== phone.id);
                        

                    })
                    .catch(error => {
                        if (error.response || error.response.status === 400) {
                            // Si se recibe un error 400, no hacer nada, solo imprimir un mensaje de advertencia
                            console.warn('Error 400: No se pudo eliminar la compañía con ID:', phone.id);
                        }
                    });
            });
            this.selectedPhones = [];
            this.deletePhonesDialog = false;
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
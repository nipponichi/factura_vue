<template>
    <div>
        <div class="card">
            <Toolbar class="mb-4 border border-slate-200 ...">
                <template #start>
                    <Button :label="$t('New')" icon="pi pi-plus" severity="success" class="mr-2 success-button" @click="openNew" />
                    <Button :label="$t('Delete')" icon="pi pi-trash" severity="danger" class="danger-button" @click="confirmDeleteSelected" :disabled="!selectedBanks || !selectedBanks.length" />
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="banks" v-model:selection="selectedBanks" dataKey="id" @row-select="onRowSelect"
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                :currentPageReportTemplate="`${$t('Showing')} {first} ${$t('of')} {last} ${$t('of')} {totalRecords} ${$t('Banks accounts')}`">
                <template #header>
                    <div class="flex justify-between items-center mt-2">
                        <h4>{{ $t('Manage Bank account') }}</h4>
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
                
                <Column field="complete_bank_account" :header="$t('Bank account')" sortable class="dateTable"></Column>
                <Column field="bank_name" :header="$t('Bank name')" sortable class="dateTable"></Column>
                <Column field="swift" :header="$t('SWIFT')" sortable class="dateTable"></Column>
                <Column field="currency" :header="$t('Currency')" sortable class="dateTable"></Column>
                
                <Column :exportable="false" :header="$t('Favourite')" class="dateTable w-24 text-center">
            
                    <template #body="slotProps">
                        <Button v-if="slotProps.data.favourite" icon="pi pi-star-fill"  class="mr-2 info-button" @click="makeFavourite(slotProps.data)" />
                        <Button v-else icon="pi pi-star" class="mr-2 info-button" @click="makeFavourite(slotProps.data)" />
                    </template>
                </Column>

                
                
                <div class="utility-button">
                    <Column :exportable="false" :header="$t('Utilities')" class="headerUtil dateTable w-24">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" outlined rounded class="mr-2 edit-button" @click="editMyBank(slotProps.data)" />
                            <Button icon="pi pi-trash" outlined rounded class="simpleDelete-button" severity="danger" @click="confirmDeleteBank(slotProps.data)" />
                        </template>
                    </Column>
                </div>

    
                
            </DataTable>
        </div>

        <!-- MODAL -->
        <template>
            <Dialog v-model:visible="bankDialog" :header="myBank.id ? $t('Update bank') : $t('Add bank')" id="titleBank" :modal="true" class="p-fluid">
                <form style="width: 800px;" @submit.prevent="saveMyBank">
                    <div class="grid gap-3 mb-6 md:grid-cols-1">
                        <div>
                            <label for="iban" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('IBAN') }}</label>
                            <input type="text" id="complete_bank_account" v-model="myBank.complete_bank_account" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('ES12 3456 7890 90 1234567890')" pattern="[A-Za-z]{2}[0-9\s]*" required />
                        </div>
                        <div>
                            <label for="bank_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Bank Name') }}</label>
                            <input type="text" id="bank_name" v-model="myBank.bank_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Enter bank name')" required />
                        </div>
                        <div>
                            <label for="country" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Country') }}</label>
                            <input type="text" id="country" v-model="myBank.country" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Enter country')" required />
                        </div>
                        <div>
                            <label for="swift" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('SWIFT') }}</label>
                            <input type="text" id="swift" v-model="myBank.swift" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Enter SWIFT')" required />
                        </div>
                        <div>
                            <label for="currency" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Currency') }}</label>
                            <input type="text" id="currency" v-model="myBank.currency" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Enter currency')" required />
                        </div>
                        <div v-if="!myBank.id" class="flex items-center">
                            <input id="favourite-checkbox" type="checkbox" v-model="myBank.favourite" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="favourite-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ $t('Mark this bank account as a favourite') }}.</label>
                        </div>
                    </div>
                    <div class="grid gap-3 md:grid-cols-1 justify-items-end">
                        <div>
                            <button type="button" class="mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="hideDialog">{{ $t('Close') }}</button>
                            <button type="submit" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{{ myBank.id ? $t('Update') : $t('Save') }}</button>
                        </div>
                    </div>
                </form>
            </Dialog>
        </template>
            

        <!-- MODAL DELETE SIMPLE -->
        <Dialog v-model:visible="deleteBankDialog" :style="{width: '450px'}" :header="$t('Confirm')" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="myBank">{{ $t('Are you sure you want to delete') }}<b>{{myBank.complete_bank_account}}</b>?</span>
            </div>
            <template #footer>
                <Button :label="$t('No')" icon="pi pi-times" text @click="deleteBankDialog = false"/>
                <Button :label="$t('Yes')" icon="pi pi-check" text @click="deleteMyBank" />
            </template>
        </Dialog>

        <!-- MODAL DELETE MULTIPLE -->
        <Dialog v-model:visible="deleteBanksDialog" :style="{width: '450px'}" :header="$t('Confirm')" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="myBank">{{ $t('Are you sure you want to delete the selected banks?') }}</span>
            </div>
            <template #footer>
                <Button :label="$t('No')" icon="pi pi-times" text @click="deleteBanksDialog = false"/>
                <Button :label="$t('Yes')" icon="pi pi-check" text @click="deleteSelectedBanks" />
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
            banks: null, 
            bankDialog: false, 
            deleteBankDialog: false, 
            deleteBanksDialog: false, 
            myBank: { 
                id: '',             
                iban: '',
                entity: '',
                office: '',
                control_digit: '',
                account_number: '',
                bank_name: '',
                country: '',
                swift: '',
                currency: '',
                favourite: '',
                complete_bank_account: '',
                companyID: window.location.pathname.split('/').pop(),
            },

            selectedBanks: [], 
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
        
        this.fetchBanks();
            
    },
    methods: {
        fetchBanks() {
            let myCompanyId = window.location.pathname.split('/').pop();
            axios.get('/banks/' + myCompanyId)
            .then(response => {
                this.banks = response.data.accounts;
                console.log("cuenta 1 id: " + this.banks[0].id)
                console.log("cuenta 1 id: " + this.banks[0].id)
            })
            .catch(error => {
                console.error('Error fetching bank data:', error);
            });
    },
        openNew() {
            this.myBank = {
                bank: '',
                companyID: window.location.pathname.split('/').pop(),
            };
            this.submitted = false;
            this.bankDialog = true;
        },
        hideDialog() {
            this.bankDialog = false;
            this.submitted = false;
        },

        saveMyBank() {
            if (this.myBank.favourite == null) {
                this.myBank.favourite = false;
            }
            
            
            let cleanedIban = this.myBank.complete_bank_account.replace(/\s+/g, '');
            console.log("ID: " + this.myBank.id)


            if(cleanedIban.length == 24) {
                let countryCode = cleanedIban.substring(0, 2).toUpperCase();
                let controlCode = cleanedIban.substring(2, 4);
                let iban = countryCode + controlCode;
                let entity = cleanedIban.substring(4, 8);
                let office = cleanedIban.substring(8, 12);
                let controlDigit = cleanedIban.substring(12, 14);
                let accountNumber = cleanedIban.substring(14, 24);
                this.myBank.iban = iban;
                this.myBank.entity = entity;
                this.myBank.office = office;
                this.myBank.control_digit = controlDigit;
                this.myBank.account_number = accountNumber;
                this.myBank.complete_bank_account = iban + ' ' + entity + ' ' + office + ' ' + controlDigit + ' ' + accountNumber;
                console.log(" Process Iban limpio " + this.myBank.complete_bank_account.length)
            }
            
            let value = cleanedIban.length
            console.log('value: ', value);

            switch (true) {
                case value > 24:
                    alert("El número de cuenta introducido es demasiado largo")
                    break;
                case value < 24:
                    alert("El número de cuenta introducido es demasiado corto")
                    break;
                case value == 24:
                if (!this.myBank.id) {
                    axios.post('/bank', this.myBank)
                    .then(response => {
                        this.fetchBanks();
                        this.bankDialog = false;
                    })
                    .catch(error => {
                        console.error('Error saving bank data:', error.response);
                        this.bankDialog = false;
                    });
                }else {
                    this.updateMyBank();
                }
                break;
            }     
        },

        editMyBank(slotProps) {    

            this.myBank.id = slotProps.id;
            this.myBank.complete_bank_account = slotProps.complete_bank_account;
            this.myBank.bank_name = slotProps.bank_name;
            this.myBank.country = slotProps.country;
            this.myBank.swift = slotProps.swift;
            this.myBank.currency = slotProps.currency;
            this.myBank.favourite = slotProps.favourite;
            this.bankDialog = true;
        },

        updateMyBank() {

            axios.put('/bank/' + this.myBank.id, this.myBank)
            .then(response => {
                this.fetchBanks();
                this.bankDialog = false;
            })
            .catch(error => {
                console.error('Error al actualizar la cuenta bancaria:', error);
                this.bankDialog = false; 
                
            });
        },

        makeFavourite(slotProps) {

            if (slotProps.favourite) {
                return alert("El telefono ya está seleccionado como favorito")
            }

            axios.put('/banks/' + slotProps.id)
            .then(response => {
                this.bankDialog = false;
                this.fetchBanks();             
            })         
            .catch(error => {
                console.error('Error al seleccionar un teléfono', error);
                this.bankDialog = false;
            });
        },
        
        confirmDeleteBank(bank) {
            this.myBank = bank;
            this.deleteBankDialog = true;       
        },
        deleteMyBank() {
            const bankId = this.myBank.id;

            // Realizar la solicitud de eliminación al servidor
            axios.delete('/bank/' + this.myBank.id)
                .then(response => {
                    console.log(response);
                    
                    // Filtrar los teléfonos que no coincidan con el ID del teléfono a eliminar
                    this.banks = this.banks.filter(val => val.id !== bankId);

                    // Limpiar el objeto myBank después de la eliminación exitosa
                    this.myBank = {};

                    // Cerrar el diálogo de eliminación de teléfono
                    this.deleteBankDialog = false;
                })
                .catch(error => {
                    if (error.response || error.response.status === 400) {
                        // Si se recibe un error 400, no hacer nada, solo imprimir un mensaje de advertencia
                        console.warn('Error 400: No se pudo eliminar el teléfono con ID:', bankId);
                        this.deleteBankDialog = false;
                    }
                });
        },
        
        confirmDeleteSelected() {
            console.log("CONFIRM DELETE SELECTED")
            this.deleteBanksDialog = true;
        },
        
        deleteSelectedBanks() {
            // Envía una solicitud de eliminación para cada compañía seleccionada
            this.selectedBanks.forEach(bank => {
                axios.delete('/bank/' + bank.id)
                    .then(response => {
                        console.log('Compañía eliminada con ID:', bank.id);
                        
                        // Solo elimina la compañía de la lista si la solicitud DELETE tiene éxito
                        this.banks = this.banks.filter(p => p.id !== bank.id);
                        

                    })
                    .catch(error => {
                        if (error.response || error.response.status === 400) {
                            // Si se recibe un error 400, no hacer nada, solo imprimir un mensaje de advertencia
                            console.warn('Error 400: No se pudo eliminar la compañía con ID:', bank.id);
                        }
                    });
            });
            this.selectedBanks = [];
            this.deleteBanksDialog = false;
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
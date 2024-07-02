<template>
    <div>
        <div class="card">
            <Toolbar class="mb-4 border border-slate-200 ...">
                <template #start>
                    <Button :label="$t('New')" icon="pi pi-plus" severity="success" class="mr-2 success-button" @click="openNew" />
                    <Button :label="$t('Delete')" icon="pi pi-trash" severity="danger" class="danger-button" @click="confirmDeleteSelected" :disabled="!selectedAddresses || !selectedAddresses.length" />
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="addresses" v-model:selection="selectedAddresses" dataKey="id" @row-select="onRowSelect"
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                :currentPageReportTemplate="`${$t('Showing')} {first} ${$t('of')} {last} ${$t('of')} {totalRecords} ${$t('addresses')}`">
                <template #header>
                    <div class="flex justify-between items-center mt-2">
                        <h4>{{ $t('Manage Addresses') }}</h4>
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
                <Column field="post_code" :header="$t('Post code')" sortable class="dateTable"></Column>
                <Column field="town" :header="$t('Town')" sortable class="dateTable"></Column>
                <Column field="address" :header="$t('Address')" sortable class="dateTable"></Column>
                <Column field="province" :header="$t('Province')" sortable class="dateTable"></Column>
                <Column field="country" :header="$t('Country')" sortable class="dateTable"></Column>
                
                <Column :exportable="false" :header="$t('Favourite')" class="dateTable w-24 text-center">
            
                    <template #body="slotProps">
                        <Button v-if="slotProps.data.favourite" icon="pi pi-star-fill"  class="mr-2 fav-button" @click="makeFavourite(slotProps.data)" />
                        <Button v-else icon="pi pi-star" class="mr-2 fav-button" @click="makeFavourite(slotProps.data)" />
                    </template>
                </Column>

                
                
                <div class="utility-button">
                    <Column :exportable="false" :header="$t('Utilities')" class="headerUtil dateTable w-24">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" outlined rounded class="mr-2 edit-button" @click="editMyAddress(slotProps.data)" />
                            <Button icon="pi pi-trash" outlined rounded class="simpleDelete-button" severity="danger" @click="confirmDeleteAddress(slotProps.data)" />
                        </template>
                    </Column>
                </div>

    
                
            </DataTable>
        </div>

        <!-- MODAL -->
            <template>
                <Dialog v-model:visible="addressDialog" :header="myAddress.id ? $t('Update address') : $t('Create address')" id="titleAddress" :modal="true" class="p-fluid">
                <form style="width: 800px;" @submit.prevent="saveMyAddress">
                    
                    <div class="mb-6">
                        <div>
                            <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Address') }}</label>
                            <input type="text" id="address" v-model="myAddress.address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Address')" required />
                        </div>
                    </div>
                    <div class="grid gap-3 mb-6 md:grid-cols-2">                
                        <div>
                            <label for="town" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Town') }}</label>
                            <input type="text" id="town" v-model="myAddress.town" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Town')" required />
                        </div>  
                        <div>
                            <label for="province" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Province') }}</label>
                            <input type="text" id="province" v-model="myAddress.province" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Province')" required />
                        </div>  
                        <div>
                            <label for="post_code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Post code') }}</label>
                            <input type="text" id="post_code" v-model="myAddress.post_code" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Post code')" pattern="^\d+$" required />
                        </div>
                        <div>
                            <label for="country" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Country') }}</label>
                            <input type="text" id="country" v-model="myAddress.country" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Country')" required />
                        </div>            
                    </div>
                    
                        
                    <div class="flex items-center">
                        <input id="link-checkbox" type="checkbox" v-model="myAddress.favourite" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ $t('Mark this email as a favourite') }}</label>
                    </div>
                    
                    <div class="grid gap-3 md:grid-cols-1 justify-items-end">
                    <div>
                        <button type="button" class="mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="hideDialog">{{ $t('Close') }}</button>
                        <button type="submit" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{{ myAddress.id ? $t('Update') : $t('Save') }}</button>
                    </div>
                    </div>
                </form>
                </Dialog>
            </template>
            

        <!-- MODAL DELETE SIMPLE -->
        <Dialog v-model:visible="deleteAddressDialog" :style="{width: '450px'}" :header="$t('Confirm')" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="myAddress">{{ $t('Are you sure you want to delete') }}<b>{{myAddress.address}}</b>?</span>
            </div>
            <template #footer>
                <Button :label="$t('No')" icon="pi pi-times" text @click="deleteAddressDialog = false"/>
                <Button :label="$t('Yes')" icon="pi pi-check" text @click="deleteMyAddress" />
            </template>
        </Dialog>

        <!-- MODAL DELETE MULTIPLE -->
        <Dialog v-model:visible="deleteAddressesDialog" :style="{width: '450px'}" :header="$t('Confirm')" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="myAddress">{{ $t('Are you sure you want to delete the selected addresses?') }}</span>
            </div>
            <template #footer>
                <Button :label="$t('No')" icon="pi pi-times" text @click="deleteAddressesDialog = false"/>
                <Button :label="$t('Yes')" icon="pi pi-check" text @click="deleteSelectedAddresses" />
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
            addresses: null, 
            addressDialog: false, 
            deleteAddressDialog: false, 
            deleteAddressesDialog: false, 
            myAddress: { 
                id: '',             
                address: '',
                post_code: '',
                town: '',
                province: '',
                country: '',
                favourite: '',
                companyID: window.location.pathname.split('/').pop(),
            },
            selectedAddresses: [], 
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
        
        this.fetchAddresses();
            
    },
    methods: {
        fetchAddresses() {
            let myCompanyId = window.location.pathname.split('/').pop();
            axios.get('/addresses/' + myCompanyId)
                .then(response => {
                    this.addresses = response.data.addresses;
                    
                })
                .catch(error => {
                    this.$toast(this.$t('Error connecting to the server'), 'error');
                });
        },
        openNew() {
            this.myAddress = {
                address: '',
                companyID: window.location.pathname.split('/').pop(),
            };
            this.submitted = false;
            this.addressDialog = true;
        },
        hideDialog() {
            this.addressDialog = false;
            this.submitted = false;
        },


        saveMyAddress() {

            if(this.myAddress.favourite == null) {
                this.myAddress.favourite = false
            }
            if (!this.myAddress.id) {
                axios.post('/address', this.myAddress)
                .then(response => {
                    this.$toast(this.$t(response.data.message), response.data.type);
                    this.fetchAddresses();
                    
                    this.addressDialog = false;
                        
                })
                .catch(error => {
                    this.$toast(this.$t('Error connecting to the server'), 'error');
                    this.addressDialog = false;
                });

            }else {               
                this.updateMyAddress();
            }
        },

        editMyAddress(slotProps) { 
            this.myAddress.id = slotProps.id;
            this.myAddress.address = slotProps.address;
            this.myAddress.town = slotProps.town;
            this.myAddress.post_code = slotProps.post_code;
            this.myAddress.country = slotProps.country;
            this.myAddress.province = slotProps.province;
            this.updateFavoriteStatus(slotProps.favourite)
            this.addressDialog = true;
        },

        updateFavoriteStatus(favourite) {
            if (favourite == 1) {
                this.myAddress.favourite = true;
            } else {
                this.myAddress.favourite = false;
            }
        },


        updateMyAddress() {

            axios.put('/address/' + this.myAddress.id, this.myAddress)

            .then(response => {

                this.$toast(this.$t(response.data.message), response.data.type);
                this.fetchAddresses();
                this.addressDialog = false;
            })
            .catch(error => {
                this.$toast(this.$t('Error connecting to the server'), 'error');
                this.addressDialog = false; 
                // Mostrar un mensaje de error al usuario
                
            });
        },

        makeFavourite(slotProps) {

            if (slotProps.favourite) {
                return this.$toast(this.$t('Already selected as a favorite.'), 'warning');
            }

            axios.put('/addresses/' + slotProps.id)
            .then(response => {
                this.$toast(this.$t(response.data.message), response.data.type);
                this.addressDialog = false;
                this.fetchAddresses();             
            })         
            .catch(error => {
                this.$toast(this.$t('Error connecting to the server'), 'error');
                this.addressDialog = false;
            });
        },
        
        confirmDeleteAddress(address) {
            this.myAddress.address = address.address;
            this.myAddress.id = address.id;
            this.deleteAddressDialog = true;       
        },

        deleteMyAddress() {
            let addressId = this.myAddress.id

            // Realizar la solicitud de eliminación al servidor
            axios.delete('/address/' + this.myAddress.id)
                .then(response => {
                    if(response.data.type === 'success'){
                        // Filtrar los teléfonos que no coincidan con el ID del teléfono a eliminar
                        this.addresses = this.addresses.filter(val => val.id !== addressId);

                    }
                    this.$toast(this.$t(response.data.message), response.data.type);
                })
                .catch(error => {
                    if (error.response || error.response.status === 400) {
                        this.$toast(this.$t(error.response.message), error.response.type);
                    }
                });
                this.deleteAddressDialog = false;
        },
        
        confirmDeleteSelected() {

            this.deleteAddressesDialog = true;
        },
        
        deleteSelectedAddresses() {
            // Envía una solicitud de eliminación para cada compañía seleccionada
            this.selectedAddresses.forEach(address => {
                axios.delete('/address/' + address.id)
                    .then(response => {
                    
                        if(response.data.type === 'success'){
                            // Solo elimina la compañía de la lista si la solicitud DELETE tiene éxito
                            this.addresses = this.addresses.filter(p => p.id !== address.id);
                        }
                        this.$toast(this.$t(response.data.message), response.data.type);

                    })
                    .catch(error => {
                        if (error.response || error.response.status === 400) {
                            this.$toast(this.$t(error.response.message), error.response.type);
                        }
                    });
            });
            this.deleteAddressesDialog = false;
        },

    }
}
</script>
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
                        <Button v-if="slotProps.data.favourite" icon="pi pi-star-fill"  class="mr-2 fav-button" @click="makeFavourite(slotProps.data)" />
                        <Button v-else icon="pi pi-star" class="mr-2 fav-button" @click="makeFavourite(slotProps.data)" />
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
            <form style="max-width: 600px;" @submit.prevent="saveMyPhone">
                <div class="grid gap-3 mb-6 md:grid-cols-1">
                <div>
                    <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Phone') }}</label>
                    <input type="tel" id="phone" v-model="myPhone.phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="myPhone.id ? $t('Update phone') : $t('Create phone')" pattern="(\+34\s?)?(\d{9})" required />
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
            originalPhone: {},
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
                    this.$toast(this.$t('Error connecting to the server'), 'error');
                    throw error; // Propaga el error para manejarlo en makeFavourite() si es necesario
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

        async saveMyPhone() {
            

            if (this.myPhone.favourite == null) {
                this.myPhone.favourite = false;
            }
            this.myPhone.isMobile = 0;

            try {
                if (!this.myPhone.id) {
                    const response = await axios.post('/phone', this.myPhone);

                    //this.phones.push({ id: newPhoneId, number: newPhoneNumber,});
                    this.$toast(this.$t(response.data.message), response.data.type);
                } else {
                    this.updateMyPhone();
                }

                this.fetchPhones();
                this.phoneDialog = false;
                this.updateFields();
            } catch (error) {
                this.$toast(this.$t('Error connecting to the server'), 'error');
                this.phoneDialog = false;
            }
        },

        editMyPhone(slotProps) {

            this.originalPhone = { ...slotProps };
            this.myPhone.phone = slotProps.phone;
            this.myPhone.id = slotProps.id;
            this.myPhone.favourite = slotProps.favourite;
            this.phoneDialog = true;

        },

        updateMyPhone() {

            
            this.originalPhone.companyID = this.myPhone.companyID;
            this.originalPhone.isMobile = this.myPhone.isMobile;
            console.log(JSON.stringify(this.originalPhone) );
            console.log(JSON.stringify(this.myPhone));
            if (JSON.stringify(this.originalPhone) === JSON.stringify(this.myPhone)) {
                this.$toast(this.$t('Successfully updated.'), 'success');
                this.phoneDialog = false;
                return;
            }

            axios.put('/phone/' + this.myPhone.id, this.myPhone)
                .then(async response => {
                    this.$toast(this.$t(response.data.message), response.data.type);
                    this.phoneDialog = false;

                    this.fetchPhones(); 
                    this.updateFields();
                })
                .catch(error => {
                    this.$toast(this.$t('Error connecting to the server'), 'error');
                    this.phoneDialog = false;
                });
        },


        async makeFavourite(slotProps) {
            if (slotProps.favourite) {
                return this.$toast(this.$t('Already selected as a favorite.'), 'warning');
            }

            try {
                const response = await axios.put('/phones/' + slotProps.id);
                this.$toast(this.$t(response.data.message), response.data.type);
                this.phoneDialog = false;

                this.fetchPhones(); // Espera a que fetchPhones() complete

                this.updateFields(); // Se ejecuta después de que fetchPhones() haya completado
            } catch (error) {
                this.$toast(this.$t('Error connecting to the server'), 'error');
                this.phoneDialog = false;
            }
        },


        confirmDeletePhone(phone) {
            this.myPhone = phone;
            this.deletePhoneDialog = true;       
        },
        
        deleteMyPhone() {

            // Realizar la solicitud de eliminación al servidor
            axios.delete('/phone/' + this.myPhone.id)
                .then(response => {
                    if(response.data.type === 'success'){
                        // Filtrar los teléfonos que no coincidan con el ID del teléfono a eliminar
                        this.phones = this.phones.filter(val => val.id !== this.myPhone.id);

                    }
                    this.$toast(this.$t(response.data.message), response.data.type);
                    
                    
                })
                .catch(error => {
                    this.$toast(this.$t(error.response.message), error.response.type);
                    
                });
                this.deletePhoneDialog = false;
        },
        
        confirmDeleteSelected() {
            this.deletePhonesDialog = true;
        },
        
        deleteSelectedPhones() {
            // Envía una solicitud de eliminación para cada compañía seleccionada
            this.selectedPhones.forEach(phone => {
                axios.delete('/phone/' + phone.id)
                    .then(response => {

                        if(response.data.type === 'success'){
                            // Solo elimina la compañía de la lista si la solicitud DELETE tiene éxito
                            this.phones = this.phones.filter(p => p.id !== phone.id);
                        }
                        this.$toast(this.$t(response.data.message), response.data.type);
                        

                    })
                    .catch(error => {
                        if (error.response || error.response.status === 400) {
                            this.$toast(this.$t(error.response.message), error.response.type);
                        }
                    });
            });
            this.deletePhonesDialog = false;
        },



        updateFields() {

            this.phones.forEach(phone => {
                if (phone.favourite) {
                    this.$emit('updatePhone', phone.phone);
                }
            });
        },

    }
}
</script>
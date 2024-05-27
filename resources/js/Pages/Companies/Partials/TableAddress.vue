<template>
    <div>
        <div class="card">
            <Toolbar class="mb-4 border border-slate-200 ...">
                <template #start>
                    <Button label="New" icon="pi pi-plus" severity="success" class="mr-2 success-button" @click="openNew" />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" class="danger-button" @click="confirmDeleteSelected" :disabled="!selectedAddresses || !selectedAddresses.length" />
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="addresses" v-model:selection="selectedAddresses" dataKey="id" @row-select="onRowSelect"
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} companies">
                <template #header>
                    <div class="flex justify-between items-center mt-2">
                        <h4>Manage addresses</h4>
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
                <Column field="post_code" header="PostCode" sortable class="dateTable"></Column>
                <Column field="town" header="Town" sortable class="dateTable"></Column>
                <Column field="address" header="Address" sortable class="dateTable"></Column>
                <Column field="province" header="Province" sortable class="dateTable"></Column>
                <Column field="country" header="Country" sortable class="dateTable"></Column>
                
                <Column :exportable="false"  header="Favourite" class="dateTable w-24 text-center">
            
                    <template #body="slotProps">
                        <Button v-if="slotProps.data.favourite" icon="pi pi-star-fill"  class="mr-2 info-button" @click="makeFavourite(slotProps.data)" />
                        <Button v-else icon="pi pi-star" class="mr-2 info-button" @click="makeFavourite(slotProps.data)" />
                    </template>
                </Column>

                
                
                <div class="utility-button">
                    <Column :exportable="false" header="Utilities" class="headerUtil dateTable w-24">
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
                <Dialog v-model:visible="addressDialog" :header="myAddress.id ? 'Update address' : 'Create address'" id="titleAddress" :modal="true" class="p-fluid">
                <form style="width: 800px;" @submit.prevent="saveMyAddress">
                    
                    <div class="mb-6">
                        <div>
                            <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                            <input type="text" id="address" v-model="myAddress.address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address" required />
                        </div>
                    </div>
                    <div class="grid gap-3 mb-6 md:grid-cols-2">                
                        <div>
                            <label for="town" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Town</label>
                            <input type="text" id="town" v-model="myAddress.town" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Town" required />
                        </div>  
                        <div>
                            <label for="province" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Province</label>
                            <input type="text" id="province" v-model="myAddress.province" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Province" required />
                        </div>  
                        <div>
                            <label for="post_code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post code</label>
                            <input type="text" id="post_code" v-model="myAddress.post_code" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Post code" pattern="^\d+$" required />
                        </div>
                        <div>
                            <label for="country" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                            <input type="text" id="country" v-model="myAddress.country" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Country" required />
                        </div>            
                    </div>
                    
                        
                    <div class="flex items-center">
                        <input id="link-checkbox" type="checkbox" v-model="myAddress.favourite" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mark this address as a favourite.</label>
                    </div>
                    
                    <div class="grid gap-3 md:grid-cols-1 justify-items-end">
                    <div>
                        <button type="button" class="mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="hideDialog">Close</button>
                        <button type="submit" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{{ myAddress.id ? 'Update' : 'Save' }}</button>
                    </div>
                    </div>
                </form>
                </Dialog>
            </template>
            

        <!-- MODAL DELETE SIMPLE -->
        <Dialog v-model:visible="deleteAddressDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="myAddress">Are you sure you want to delete <b>{{myAddress.address}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteAddressDialog = false"/>
                <Button label="Yes" icon="pi pi-check" text @click="deleteMyAddress" />
            </template>
        </Dialog>

        <!-- MODAL DELETE MULTIPLE -->
        <Dialog v-model:visible="deleteAddressesDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="myAddress">Are you sure you want to delete the selected addresses?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteAddressesDialog = false"/>
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedAddresses" />
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
                    console.error('Error fetching addresses data:', error);
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
            console.log("companyId: "+ this.myAddress.companyID)
            if(this.myAddress.favourite == null) {
                this.myAddress.favourite = false
            }
            if (!this.myAddress.id) {
                axios.post('/address', this.myAddress)
                .then(response => {
                    
                    this.fetchAddresses();
                    
                    this.addressDialog = false;
                        
                })
                .catch(error => {
                    console.error('Error saving address data:', error.response);
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
                this.fetchAddresses();
                this.addressDialog = false;
            })
            .catch(error => {
                console.error('Error al actualizar la compañía:', error);
                this.addressDialog = false; 
                // Mostrar un mensaje de error al usuario
                
            });
        },

        makeFavourite(slotProps) {
            console.log(slotProps)

            if (slotProps.favourite) {
                return alert("El telefono ya está seleccionado como favorito")
            }

            axios.put('/addresses/' + slotProps.id)
            .then(response => {
                this.addressDialog = false;
                this.fetchAddresses();             
            })         
            .catch(error => {
                console.error('Error al seleccionar un address', error);
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
            console.log(this.myAddress.id)

            // Realizar la solicitud de eliminación al servidor
            axios.delete('/address/' + this.myAddress.id)
                .then(response => {
                    console.log(response);
                    
                    // Filtrar los teléfonos que no coincidan con el ID del teléfono a eliminar
                    this.addresses = this.addresses.filter(val => val.id !== addressId);

                    // Limpiar el objeto myAddress después de la eliminación exitosa
                    this.myAddress = {};

                    // Cerrar el diálogo de eliminación de teléfono
                    this.deleteAddressDialog = false;
                })
                .catch(error => {
                    if (error.response || error.response.status === 400) {
                        // Si se recibe un error 400, no hacer nada, solo imprimir un mensaje de advertencia
                        console.warn('Error 400: No se pudo eliminar el address con ID:', addressId);
                        this.deleteAddressDialog = false;
                    }
                });
        },
        
        confirmDeleteSelected() {
            console.log("CONFIRM DELETE SELECTED")
            this.deleteAddressesDialog = true;
        },
        
        deleteSelectedAddresses() {
            // Envía una solicitud de eliminación para cada compañía seleccionada
            this.selectedAddresses.forEach(address => {
                axios.delete('/address/' + address.id)
                    .then(response => {
                        console.log('Compañía eliminada con ID:', address.id);
                        
                        // Solo elimina la compañía de la lista si la solicitud DELETE tiene éxito
                        this.addresses = this.addresses.filter(p => p.id !== address.id);
                        

                    })
                    .catch(error => {
                        if (error.response || error.response.status === 400) {
                            // Si se recibe un error 400, no hacer nada, solo imprimir un mensaje de advertencia
                            console.warn('Error 400: No se pudo eliminar la compañía con ID:', address.id);
                        }
                    });
            });
            this.selectedAddresses = [];
            this.deleteAddressesDialog = false;
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
<template>
    <div>
        <div class="card">


            <div class="selector flex justify-between">  
                <div class="showCompany">
                    <Dropdown v-model="selectedUser" :options="this.users" filter optionLabel="email" placeholder="Select your company" class="w-full md:w-4rem mb-4 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                        <template #value="slotProps">
                            <div v-if="slotProps.value" class="flex align-items-center">
                                <div>{{ slotProps.value.email }}</div>
                            </div>
                            <span v-else>
                                {{ slotProps.placeholder }}
                            </span>
                        </template>
                        <template #option="slotProps">
                            <div class="flex align-items-center">
                                <div>{{ slotProps.option.email }}</div>
                            </div>
                        </template>
                    </Dropdown>

                    <div class="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16 p-6">
                        <div>
                            <div class="w-32 h-32 mb-1 border rounded-lg overflow-hidden relative bg-gray-100">
                                <img alt="Company Logo" id="image" class="object-cover w-full h-32" src="https://placehold.co/300x300/e2e8f0/e2e8f0" />             
                                <div class="absolute top-0 left-0 right-0 bottom-0 w-full block cursor-pointer flex items-center justify-center" onClick="document.getElementById('fileInput').click()">
                                    <button type="button"
                                        style="background-color: rgba(255, 255, 255, 0.65)"
                                        class="hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 text-sm border border-gray-300 rounded-lg shadow-sm"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-camera" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                                            <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                                            <circle cx="12" cy="13" r="3" />
                                        </svg>							  
                                    </button>
                                </div>
                            </div>
                            <input name="photo" id="fileInput" accept="image/*" class="hidden" type="file" onChange="let file = this.files[0]; 
                                var reader = new FileReader();
            
                                reader.onload = function (e) {
                                    document.getElementById('image').src = e.target.result;
                                    document.getElementById('image2').src = e.target.result;
                                };
                            
                                reader.readAsDataURL(file);
                            ">
                        </div>
                        <div class="grid md:grid-cols-2 text-sm gap-y-2">
                            <div class="flex items-center">
                                <div class="font-semibold">Company name:</div>
                                <div></div>
                            </div>

                            <div class="flex items-center">
                                <div class="font-semibold">Tax Number:</div>
                                <div></div>
                            </div>
                            <div class="flex items-center">
                                <div class="font-semibold">Phone:</div>
                                <div></div>
                            </div>
                            <div class="flex items-center">
                                <div class="font-semibold">Email:</div>
                                <div>
                                    <a href="" class="text-blue-800 underline hover:no-underline">example@example.com</a>
                                </div>
                            </div>
                            
                            <div class="flex items-center">
                                <div class="font-semibold">Address:</div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="showCustomer">
                    <div class="invoiceDetails">
                        <div class="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16 p-6">
                            <div class="grid md:grid-cols-1 text-sm gap-y-2">
                                <div class="flex items-center">
                                    <div class="font-semibold mr-3">Invoice number:</div>
                                    <div></div>
                                </div>
    
                                <div class="flex items-center">
                                    <label class="font-semibold mr-3" for="birth_date">Date:</label>
                                    <FloatLabel>
                                        <Calendar v-model="date" inputId="birth_date" :locale="es" />                                    
                                    </FloatLabel>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Dropdown v-model="selectedUser" :options="this.users" filter optionLabel="email" placeholder="Select a customer" class="w-full md:w-4rem mb-4 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                        <template #value="slotProps">
                            <div v-if="slotProps.value" class="flex align-items-center">
                                <div>{{ slotProps.value.email }}</div>
                            </div>
                            <span v-else>
                                {{ slotProps.placeholder }}
                            </span>
                        </template>
                        <template #option="slotProps">
                            <div class="flex align-items-center">
                                <div>{{ slotProps.option.email }}</div>
                            </div>
                        </template>
                    </Dropdown>   

                    <div class="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16 p-6">
                        <div class="grid md:grid-cols-2 text-sm gap-y-2">
                            <div class="flex items-center">
                                <div class="font-semibold">Company name:</div>
                                <div></div>
                            </div>

                            <div class="flex items-center">
                                <div class="font-semibold">Tax Number:</div>
                                <div></div>
                            </div>
                            <div class="flex items-center">
                                <div class="font-semibold">Phone:</div>
                                <div></div>
                            </div>
                            <div class="flex items-center">
                                <div class="font-semibold">Email:</div>
                                <div>
                                    <a href="" class="text-blue-800 underline hover:no-underline">example@example.com</a>
                                </div>
                            </div>
                            
                            <div class="flex items-center">
                                <div class="font-semibold">Address:</div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
            <Toolbar class="mb-4 border border-slate-200 ...">
                <template #start>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <Button label="Add" icon="pi pi-plus" severity="success" class="mr-2 success-button" @click="addRow" />
                            <Button label="Delete" icon="pi pi-trash" severity="danger" class="danger-button" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                        </div>
                        <div class="flex-grow"></div>
                    </div>
                </template>

                <template #end>
                    <div class="relative rounded-md shadow-sm">
                        <input type="search" class="block w-full h-11 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" v-model="filters['global'].value" placeholder="Search...">
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </template>
            </Toolbar>



            <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id"
            :paginator="true" :rows="10" :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
                <template #header>

                </template>

                <Column selectionMode="multiple" :exportable="false" class="datetable checkbox"></Column>
                <Column field="product" header="Product" sortable class="dateTable">
                    <template #body="slotProps">
                        <InputText class="input" v-model="slotProps.data.product" />
                    </template>
                </Column>
                <Column field="amount" header="Amount" sortable class="dateTable">
                    <template #body="slotProps">
                        <InputText class="input input-short" v-model="slotProps.data.amount" />
                    </template>
                </Column>
                <Column field="price" header="Price" sortable class="dateTable">
                    <template #body="slotProps">
                        <InputText class="input input-short" v-model="slotProps.data.price" />
                    </template>
                </Column>
                <Column field="taxes" header="IVA (%)" sortable class="dateTable">
                    <template #body="slotProps">
                        <Dropdown class="input-short" v-model="slotProps.data.taxes" :options="taxOptions" optionLabel="label" optionValue="value" />
                    </template>
                </Column>
                <Column field="total" header="Total" sortable class="dateTable">
                    <template #body="slotProps">
                        <InputText class="input input-short" :value="calculateTotal(slotProps.data)" readonly />
                    </template>
                </Column>


                <Column :exportable="false" class="dateTable">
                    <template #body="slotProps">
                        <Button icon="pi pi-trash" outlined rounded class="simpleDelete-button" severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>

            <div class="flex justify-end mt-4 pr-4">
                <Button label="Add" icon="pi pi-plus" severity="success" class="success-button" @click="addRow" />
            </div>
        </div>

        <!-- Totals section -->
        <div class="flex justify-end mt-4 pr-4 mb-4">
            <div class="totals-container w-1/3">
                <div class="totals bg-gray-100 p-4 rounded-md">
                    <div class="totals-item flex justify-between">
                        <span class="text-gray-600">Subtotal (sin IVA):</span>
                        <span>{{ subtotal.toFixed(2) }}€</span>
                    </div>
                    <div class="totals-item flex justify-between">
                        <span class="text-gray-600">Total IVA:</span>
                        <span>{{ totalIVA.toFixed(2) }}€</span>
                    </div>
                    <div class="totals-item flex justify-between">
                        <span class="text-gray-600">Total (con IVA):</span>
                        <span>{{ totalConIVA.toFixed(2) }}€</span>
                    </div>
                </div>
            </div>
        </div>


        <!-- MODAL DELETE SIMPLE -->
        <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product">Are you sure you want to delete <b>{{product.name}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
            </template>
        </Dialog>

        <!-- MODAL DELETE MULTIPLE -->
        <Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="companies">Are you sure you want to delete the selected products?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
            </template>
        </Dialog>
    </div>
</template>
<script>
import { FilterMatchMode } from 'primevue/api';
import es from 'primevue/calendar/locale/es';



export default {
    data() {
        return {

            taxOptions: [
                { label: '0%', value: 0 },
                { label: '4%', value: 4 },
                { label: '5%', value: 5 },
                { label: '10%', value: 10 },
                { label: '21%', value: 21 },
            ],
            users: [],
            productDialog: false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
            selectedCompany: '',
            products: [],
            selectedUser: null,
            selectedProducts: [],
            filters: {},
            submitted: false,
        };
    },

    computed: {
        subtotal() {
            return this.products.reduce((acc, product) => acc + product.amount * product.price, 0);
        },
        totalIVA() {
            return this.products.reduce((acc, product) => acc + (product.amount * product.price * product.taxes / 100), 0);
        },
        totalConIVA() {
            return this.subtotal + this.totalIVA;
        }
    },
    created() {
        this.filters = {
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        };
    },

    
    methods: {

        
        
        addRow() {
            let newProduct = {
                product: '',
                amount: 0,
                price: 0,
                taxes: 21,
                priceTax: 0,
                id: this.products.length + 1,
            };
            this.products.push(newProduct);
        },

        calculateTotal(product) {
            return product.amount * product.price;
        },
        confirmDeleteProduct(product) {
            this.product = product;
            this.deleteProductDialog = true;
        },
        deleteProduct() {
            this.products = this.products.filter(val => val.id !== this.product.id);
            this.product = null;
            this.deleteProductDialog = false;
        },
        confirmDeleteSelected() {
            this.deleteProductsDialog = true;
        },
        deleteSelectedProducts() {
            this.selectedProducts.forEach(product => {
                this.products = this.products.filter(val => val.id !== product.id);
            });
            this.selectedProducts = [];
            this.deleteProductsDialog = false;
        },
    },
};
</script>

<style>


.input {
    border: none;
    border-radius: 10px;
    margin-top: 10px;
}

.input-short {
    width: 100px; 
}


.checkbox {
    background-color: rgba(246, 246, 246, 0.609);
    border-top: #E2E8F0 1px solid;
    border-bottom: #E2E8F0 1px solid;
}
.success-button {
    background-color: rgb(34, 197, 94);
    color: #ffffff;
    padding: 8px;
    font-size: 15px;
}
.danger-button {
    background-color: rgb(239, 68, 68);
    color: #ffffff;
    font-size: 15px;
    padding: 8px;
}
.export-button {
    background-color: #007BFF;
    color: #ffffff;
    font-size: 15px;
    padding: 8px;
}
.info-button {
    color: #007BFF;
    border: 1px solid;
}
.info-button:hover {
    background-color: rgba(0, 4, 252, 0.1);
    transition-duration: 0.5s;
    padding: 7px;
}
.edit-button {
    color: rgb(34, 197, 94);
    border: 1px solid;
}
.edit-button:hover {
    background-color: rgb(229, 245, 236);
    transition-duration: 0.5s;
    padding: 7px;
}
.simpleDelete-button {
    color: rgb(239, 68, 68);
    border: 1px solid;
}
.simpleDelete-button:hover {
    background-color: rgb(245, 229, 229);
    transition-duration: 0.5s;
    padding: 7px;
}
.save-button {
    color: rgb(34, 197, 94);
    padding: 7px;
}
.cancel-button {
    color: rgb(239, 68, 68);
    padding: 7px;
}
.save-button:hover {
    transition-duration: 0.5s;
    background-color: rgba(34, 197, 94, 0.1);
    padding: 7px;
}
.cancel-button:hover {
    transition-duration: 0.5s;
    background-color: rgba(239, 68, 68, 0.1);
    padding: 7px;
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
    left: 20px;
    top: 13px;
}
.search-box {
    border-radius: 8px;
    border: none;
    font-size: 15px;
    font-weight: 400;
    letter-spacing: 0.25px;
    color: #191919;
    background-color: #f2f2f2;
    padding: 13px 45px;
    width: 300px;
    height: 45px;
    box-sizing: border-box;
    transition: 0.4s;
}
.card {
    padding: 3% 3% 0% 3%;
}
.dateTable {
    border-top: #E2E8F0 1px solid;
    border-bottom: #E2E8F0 1px solid;
    min-width: 10rem;
}
</style>

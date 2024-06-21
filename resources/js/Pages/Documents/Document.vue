<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
</script>
<template>
    <div class="no-imprimir">
        <AppLayout title="Document">
            <template #header>
                <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {{ $t('New invoice') }}
                </h2>
            </template>
            <div class="py-12">
                <div class="container mx-auto px-4 sm:px-6 lg:px-4">
                    <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">

                        <div class="card">
                            <div class="relative inline-block flex mb-5">
                                <button                                     
                                    v-if="!loading && (companies.length > 0)"
                                    type="button" 
                                    class="px-4 py-2 bg-black text-white border border-gray-200 rounded-md flex items-center justify-between" 
                                    @click="selectCompany">
                                    <span class="font-bold text-lg">
                                        <i class="pi pi-plus mr-2"></i>
                                        {{ this.selectedCompany.name }}
                                    </span>
                                </button>                             
                            </div>
                            
                            <div class="select flex flex-col md:flex-row justify-between mb-4 items-center">

                                <div class="flex flex-wrap justify-start md:justify-end items-center mb-3 md:mb-0">

                                    <div class="relative inline-block w-50">
                                        <Button :label="$t('Customer')" icon="pi pi-plus" class="success-button text-white p-2" @click="selectACustomer()" />
                                    </div>

                                    <div class="relative inline-block w-50 ml-2">

                                    </div>
                                    <div class="flex items-center ml-2">
                                        <label for="link-checkbox" class="ms-2 mr-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ $t('Mark as paid') }}</label>
                                        <input id="link-checkbox" type="checkbox" v-model="this.myDocument.paid" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    </div>
                                </div>
                            
                                <div class="flex justify-end">


                                    <div id="app" class="relative inline-block w-50 ml-2">
                                        
                                        <div class="flex">
                                            <button 
                                            type="button" 
                                            class="px-4 py-2 mr-2 success-button text-white rounded flex items-center justify-between" 
                                            @click="selectDocument()"
                                            :class="{ 'opacity-50': !this.selectedCompany.id }"
                                            :disabled="!this.selectedCompany.id"
                                        >
                                            <span>
                                                <i class="pi pi-plus mr-2"></i>
                                                {{ $t('Document type') }}
                                            </span>
                                        </button>
                                            <button 
                                                type="button" 
                                                class="px-4 py-2 bg-purple-600 text-white rounded-md flex items-center justify-between" 
                                                @click="toggleDropdownExport"
                                                :class="{ 'opacity-50': totalConIVA <= 0 }"
                                                :disabled="totalConIVA <= 0"
                                            >
                                                <i class="pi pi-upload mr-2"></i>
                                                {{ $t('Export') }}
                                            </button>
                                            
                                        </div>
                                    
                                        <!-- Desplegable -->
                                        <div 
                                            v-show="isDropdownOpenExport"
                                            class="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg"
                                        >
                                        
                                            <button 
                                                type="button" 
                                                class="px-4 py-2 rounded-l flex items-center justify-between" 
                                                @click="exportToPDF()"
                                                :class="{ 'opacity-50': totalConIVA <= 0 }"
                                                :disabled="totalConIVA <= 0"
                                            >
                                                <span>
                                                    <i class="pi pi-file-pdf mr-2"></i>
                                                    {{ $t('PDF') }}
                                                </span>
                                            </button>

                                            <button 
                                            type="button" 
                                            class="px-4 py-2 rounded-r flex items-center" 
                                            @click="exportToXML()"
                                            :class="{ 'opacity-50': totalConIVA <= 0 }"
                                            :disabled="totalConIVA <= 0"
                                        >
                                            <span>
                                                <i class="pi pi-file-export mr-2"></i>
                                                {{ $t('XML') }}
                                            </span>
                                            
                                        </button>

                                        </div>
                                    </div>
                                    
                            
                                    <div id="app" class="relative inline-block w-50 ml-2">
                                        <div class="flex">
                                            <button 
                                                type="button" 
                                                class="px-4 py-2 bg-blue-500 text-white rounded-l flex items-center justify-between" 
                                                @click="checkDocument()"
                                                :class="{ 'opacity-50': totalConIVA <= 0 }"
                                                :disabled="totalConIVA <= 0"
                                            >
                                                <i class="pi pi-save mr-2"></i>
                                                {{ $t('Save') }}
                                            </button>
                                            <button 
                                                type="button" 
                                                class="px-4 py-2 bg-blue-500 text-white rounded-r flex items-center" 
                                                @click="toggleDropdown"
                                                :class="{ 'opacity-50': totalConIVA <= 0 }"
                                                :disabled="totalConIVA <= 0"
                                            >
                                                <i class="pi pi-chevron-down"></i>
                                            </button>
                                        </div>
                                    
                                        <!-- Desplegable Save-->
                                        <div 
                                            v-show="isDropdownOpen"
                                            class="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg"
                                        >
                                            <button 
                                                class="px-4 py-2 text-gray-800 hover:bg-gray-200 bg-white border border-gray-300 rounded whitespace-nowrap" 
                                                @click="saveAndReset()" 
                                            >
                                                {{ $t('Save and create new') }}
                                            </button>
                                            <button class="text-left block w-full px-4 py-2 text-gray-800 hover:bg-gray-200" @click="cancelInvoice()">
                                                {{ $t('Cancel') }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            

                            <hr class="linea-grosor">
                        
                            <div class="selector flex flex-col md:flex-row justify-between mt-6 ml-12">
                                
                                <div class="showCustomer"> 
                                    <div class="grid md:grid-cols-1 text-m gap-y-1">
                                        <div class="flex items-center justify-between w-full">
                                            <div class="font-semibold mr-3 flex-shrink-0 w-32">{{ $t('Customer') }}:</div>
                                            <div class="text-gray-700 w-full font-bold text-lg">{{ this.selectedCustomer.name }}</div>
                                        </div>
                                        <div class="flex items-center justify-between w-full">
                                            <div class="font-semibold mr-3 flex-shrink-0 w-32">{{ $t('Tax number') }}:</div>
                                            <div class="text-gray-700 w-full uppercase">{{ this.selectedCustomer.tax_number }}</div>
                                        </div>
                                        <div class="flex items-center justify-between w-full">
                                            <div class="font-semibold mr-3 flex-shrink-0 w-32">{{ $t('Phone') }}:</div>
                                            <div class="text-gray-700 w-full">{{ this.selectedCustomer.phone }}</div>
                                        </div>
                                        <div class="flex items-center justify-between w-full">
                                            <div class="font-semibold mr-3 flex-shrink-0 w-32">{{ $t('Email') }}:</div>
                                            <div class="text-gray-700 w-full">{{ this.selectedCustomer.email }}</div>
                                        </div>
                                        <div class="flex items-center justify-between w-full">
                                            <div class="font-semibold mr-3 flex-shrink-0 w-32">{{ $t('Address') }}:</div>
                                            <div class="text-gray-700 w-full">
                                                {{ this.selectedCustomer.address }}, {{ this.selectedCustomer.post_code }}, {{ this.selectedCustomer.town }}, {{ this.selectedCustomer.province }} ( {{ this.selectedCustomer.country }} )
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="grid md:grid-cols-1 text-sm gap-y-1 mr-28">
                                    <div class="flex items-center justify-between w-full">
                                        <div class="font-semibold mr-3 min-w-20 flex-shrink-0">Nº {{ selectedType.name }}:</div>
                                        <div class="text-gray-700 ml-3 flex-shrink-0 font-bold text-lg">{{ selectedSerie.serie }}&nbsp;&nbsp;/&nbsp;</div>
                                        <input type="text" class="border border-gray-300 rounded-md w-48 px-3 py-2 focus:outline-none focus:border-blue-400" v-model="selectedSerie.number">
                                    </div>
                                    <div class="flex items-center justify-between w-full">
                                        <div class="font-semibold mr-3 flex-shrink-0">{{ $t('Date') }}:</div>
                                        <input type="date" v-model="fecha" @change="cambiarFormatoFecha" class="border border-gray-300 rounded-md w-48 px-3 py-2 focus:outline-none focus:border-blue-400">
                                    </div>
                                    <div class="flex items-center justify-between w-full">
                                        <div class="font-semibold mr-3 flex-shrink-0">{{ $t('Expiration') }}:</div>
                                        <input type="date" v-model="expiration" @change="cambiarFormatoFecha" class="border border-gray-300 rounded-md w-48 px-3 py-2 focus:outline-none focus:border-blue-400">
                                    </div>
                                </div>
                                        
                            </div>  
                            <Toolbar class="mb-4 mt-8 border border-slate-200 ...">
                                <template #start>
                                    <div class="flex items-center justify-between ">
                                        <div class="flex items-center">
                                            <Button :label="$t('Concept')" icon="pi pi-plus" severity="success" class="mr-2 success-button" @click="addRow" />
                                            <Button :label="$t('Delete')" icon="pi pi-trash" severity="danger" class="danger-button" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                                        </div>
                                        <div class="flex-grow"></div>
                                    </div>
                                </template>

                                <template #end>
                                    <div class="relative rounded-md shadow-sm">
                                        <input type="search" class="block w-full h-11 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" v-model="filters['global'].value" :placeholder="$t('Search...')">
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
                            :currentPageReportTemplate="`${$t('Showing')} {first} ${$t('of')} {last} ${$t('of')} {totalRecords} ${$t('products')}`">

                                <Column selectionMode="multiple" :exportable="false" class="datetable checkbox"></Column>
                                <Column field="reference" :header="$t('Reference')" sortable class="dateTable">
                                    <template #body="slotProps">
                                        <InputText class="input" :placeholder="$t('Reference')" v-model="slotProps.data.reference" />
                                    </template>
                                </Column>
                                <Column field="product" :header="$t('Description')" sortable class="dateTable">
                                    <template #body="slotProps">
                                        <InputText class="input" :placeholder="$t('Description')" v-model="slotProps.data.description" />
                                    </template>
                                </Column>
                                <Column field="quantity" :header="$t('Quantity')" sortable class="dateTable">
                                    <template #body="slotProps">
                                        <InputText class="input input-short" v-model="slotProps.data.quantity" />
                                    </template>
                                </Column>
                                <Column field="price" :header="$t('Price')" sortable class="dateTable">
                                    <template #body="slotProps">
                                        <InputText class="input input-short" v-model="slotProps.data.price" />
                                    </template>
                                </Column>
                                <Column field="taxes" :header="$t('Tax (%)')" sortable class="dateTable">
                                    <template #body="slotProps">
                                        <Dropdown class="input-short" v-model="slotProps.data.taxes" :options="taxOptions" optionLabel="label" optionValue="value" />
                                    </template>
                                </Column>
                                <Column field="discount" :header="$t('Discount (%)')" sortable class="dateTable">
                                    <template #body="slotProps">
                                        <InputText class="input input-short" v-model="slotProps.data.discount" />
                                    </template>
                                </Column>
                                <Column field="total" :header="$t('Total')" sortable class="dateTable">
                                    <template #body="slotProps">
                                        <InputText class="input input-short" :value="calculateTotal(slotProps.data)" readonly />
                                    </template>
                                </Column>

                                <Column :exportable="false" :header="$t('Utility')" class="dateTable">
                                    <template #body="slotProps">
                                        <Button icon="pi pi-trash" outlined rounded class="simpleDelete-button" severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                                    </template>
                                </Column>
                            </DataTable>

                            <div class="flex justify-end mt-4 pr-4" v-if="showButton">
                                <Button :label="$t('Concept')" icon="pi pi-plus" severity="success" class="success-button" @click="addRow()" />
                            </div>
                        </div>

                        <!-- Totals section for large screens -->
                        <div class="hidden md:flex justify-between mt-4 pr-4 mb-4">
                            <!-- Columna izquierda -->
                            <div class="totals-container w-1/3">
                                <button class="ml-4 mb-2 success-button text-white rounded-md p-2" @click="selectAPaymentMethod()">
                                    <i class="pi pi-plus"></i> {{ $t('Payment method') }}
                                </button>
                                <div class="ml-4 totals p-4 rounded-md">
                                    <table class="w-full">
                                        <tbody>
                                            <tr>
                                                <td class="text-gray-600 pr-4">{{ $t('Payment method') }}:</td>
                                                <td class="pl-4">{{ this.selectedPaymentMethod.name }}</td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <hr class="my-2 border-gray-300">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-gray-600 pr-4">
                                                    <span v-if="selectedPaymentMethod.id === 2">{{ '' }}</span>
                                                    <span v-else-if="selectedPaymentMethod.id === 3">{{ $t('Phone') }}:</span>
                                                    <span v-else-if="selectedPaymentMethod.id === 4">{{ $t('Email') }}:</span>
                                                    <span v-else>{{ $t('Bank account') }}:</span>
                                                </td>
                                                <td class="pl-4">
                                                    <span v-if="selectedPaymentMethod.id === 2">{{ '' }}</span>
                                                    <span v-else-if="selectedPaymentMethod.id === 3">{{ this.selectedPhone.phone }}</span>
                                                    <span v-else-if="selectedPaymentMethod.id === 4">{{ this.selectedEmail.email }}</span>
                                                    <span v-else>{{ this.selectedBankAccount.complete_bank_account }}</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <!-- Espacio entre las tablas -->
                            <div class="w-1/12"></div>

                            <!-- Columna central (Totales) -->
                            <div class="totals-container w-1/3">
                                <button class="ml-4 mb-5 rounded-md" @click="selectAPaymentMethod()">
                                    
                                </button>
                                <div class="totals p-4 rounded-md">
                                    <table class="w-full">
                                        <tbody>
                                            <tr>
                                                <td class="text-gray-600 pr-4">{{ $t('Subtotal (excluding Tax)') }}:</td>
                                                <td class="pl-4">{{ subtotal.toFixed(2) }}€</td>
                                            </tr>
                                            <hr class="my-2 border-gray-300">
                                            <tr>
                                                <td class="text-gray-600 pr-4">{{ $t('Total Tax') }}:</td>
                                                <td class="pl-4">{{ totalIVA.toFixed(2) }}€</td>
                                            </tr>
                                            <hr class="my-2 border-gray-300">
                                            <tr>
                                                <td class="text-gray-600 pr-4">{{ $t('Total (with IVA)') }}:</td>
                                                <td class="pl-4">{{ totalConIVA.toFixed(2) }}€</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <!-- Totals section for small screens -->
                        <div class="flex flex-wrap justify-between mt-4 pr-4 mb-4 md:hidden">
                            <!-- Columna izquierda -->
                            <div class="totals-container w-full md:w-1/3 flex flex-col mb-4 md:mb-0">
                                <button class="ml-4 mb-2 success-button rounded-md" @click="selectAPaymentMethod()">
                                    <i class="pi pi-plus"></i> {{ $t('Payment method') }}
                                </button>
                                <div class="ml-4 totals p-4 rounded-md flex-grow">
                                    <table class="w-full">
                                        <tbody>
                                            <tr>
                                                <td class="text-gray-600 pr-4">{{ $t('Payment method') }}:</td>
                                                <td class="pl-4">{{ this.selectedPaymentMethod.name }}</td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <hr class="my-2 border-gray-300">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-gray-600 pr-4">{{ $t('Bank account') }}:</td>
                                                <td class="pl-4">{{ this.selectedBankAccount.complete_bank_account }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <!-- Espacio entre las tablas en pantallas grandes -->
                            <div class="hidden md:block w-1/12"></div>

                            <!-- Columna central (Totales) -->
                            <div class="totals-container w-full md:w-1/3 flex flex-col">
                                <div class="ml-4 totals bg-gray-100 p-4 rounded-md flex-grow">
                                    <table class="w-full">
                                        <tbody>
                                            <tr>
                                                <td class="text-gray-600 pr-4">{{ $t('Subtotal (excluding Tax)') }}:</td>
                                                <td class="pl-4">{{ subtotal.toFixed(2) }}€</td>
                                            </tr>
                                            <tr>
                                                <td class="text-gray-600 pr-4">{{ $t('Total Tax') }}:</td>
                                                <td class="pl-4">{{ totalIVA.toFixed(2) }}€</td>
                                            </tr>
                                            <tr>
                                                <td class="text-gray-600 pr-4">{{ $t('Total (with IVA)') }}:</td>
                                                <td class="pl-4">{{ totalConIVA.toFixed(2) }}€</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <!-- MODAL COMPANY -->
                        <Dialog v-model:visible="productDialog" :header="$t('Select companies')" :modal="true" @change="handleCompanySelection" class="p-fluid w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-4xl">
                            <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">{{ $t('Select your company') }}:</label>
                            <Dropdown v-model="selectedCompany" :options="companies" filter optionLabel="name" class="w-full h-11 md:w-64rem mb-4 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500" @change="handleCompanySelection">
                                <template #value="slotProps">
                                    <div v-if="slotProps.value" class="flex align-items-center">
                                        <div>{{ slotProps.value.name }}</div>
                                    </div>
                                </template>
                                <template #option="slotProps">
                                    <div class="flex align-items-center">
                                        <div>{{ slotProps.option.name }}</div>
                                    </div>
                                </template>
                            </Dropdown>
                        </Dialog>

                        <!-- MODAL DOCUMENT -->
                        <Dialog v-model:visible="documentDialog" :style="{width: '450px'}" :header="$t('Select document')" :modal="true" @change="handleTypeSelection">
                            <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">{{ $t('Select document type') }}</label>
                            <Dropdown v-model="selectedType" :options="types" filter optionLabel="name" class="w-full h-11 md:w-64rem mb-4 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500" @change="handleTypeSelection">
                                <template #value="slotProps">
                                    <div v-if="slotProps.value" class="flex align-items-center">
                                        <div>{{ slotProps.value.name }}</div>
                                    </div>
                                </template>
                                <template #option="slotProps">
                                    <div class="flex align-items-center">
                                        <div>{{ slotProps.option.name }}</div>
                                    </div>
                                </template>
                            </Dropdown>
                            <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">{{ $t('Select document serie') }}</label>
                            <Dropdown v-model="selectedSerie" :options="this.series" filter optionLabel="serie" class="w-full h-11 md:w-64rem mb-4 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                                <template #value="slotProps">
                                    <div v-if="slotProps.value" class=" flex align-items-center ">
                                        <div>{{ slotProps.value.serie }}</div>
                                    </div>
                                </template>
                                <template #option="slotProps">
                                    <div class="flex align-items-center">
                                        <div>{{ slotProps.option.serie }}</div>
                                    </div>
                                </template>
                            </Dropdown>  

                        </Dialog>

                        <!-- MODAL DELETE SIMPLE -->
                        <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" :header="$t('Confirm')" :modal="true">
                            <div class="confirmation-content">
                                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                <span v-if="companies"> {{ $t('Are you sure you want to delete') }}<b>{{companies.name}}</b>?</span>
                            </div>
                            <template #footer>
                                <Button :label="$t('No')" icon="pi pi-times" text @click="deleteProductDialog = false" />
                                <Button :label="$t('Yes')" icon="pi pi-check" text @click="deleteProduct" />
                            </template>
                        </Dialog>

                        <!-- MODAL DELETE MULTIPLE -->
                        <Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" :header="$t('Confirm')" :modal="true">
                            <div class="confirmation-content">
                                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                <span v-if="companies">{{ $t('Are you sure you want to delete the selected concepts?') }}</span>
                            </div>
                            <template #footer>
                                <Button :label="$t('No')" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                                <Button :label="$t('Yes')" icon="pi pi-check" text @click="deleteSelectedProducts" />
                            </template>
                        </Dialog>
                    </div>

                    <!-- SELECT A CUSTOMER -->
                    <Dialog v-model:visible="selectACustomerDialog" :header="$t('Select a customer')" id="titleCompany" :modal="true" class="p-fluid w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-4xl">
                        <Dropdown v-model="selectedCustomer" :options="this.customers" filter optionLabel="name" class="w-full h-11 md:w-64rem mb-4 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class=" flex align-items-center ">
                                    <div>{{ slotProps.value.name }}</div>
                                </div>
                            </template>
                            <template #option="slotProps">
                                <div class="flex align-items-center">
                                    <div>{{ slotProps.option.name }}</div>
                                </div>
                            </template>
                        </Dropdown>
                        <div class="grid gap-3 md:grid-cols-1 justify-items">
                            <div class="flex justify-between">
                                <button class="success-button mr-1 mr-1 rounded-md" @click="openNew">
                                    <i class="pi pi-plus"></i> {{ $t('Create customer') }}
                                </button>
                                <button class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="hideDialog()">{{ $t('Close') }}</button>
                            </div>   
                        </div>
                    </Dialog> 

                    <!-- MODAL PAYMENT METHOD -->
                    <Dialog v-model:visible="selectAPaymentMethodDialog" :header="$t('Select a payment method')" id="titleCompany" :modal="true" class="p-fluid w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-4xl">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Payment method') }}</label>
                        <Dropdown v-model="selectedPaymentMethod" :options="this.payment_methods" filter optionLabel="name" class="w-full h-11 md:w-64rem mb-4 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex items-center">
                                    <div>{{ slotProps.value.name }}</div>
                                </div>
                            </template>
                            <template #option="slotProps">
                                <div class="flex items-center">
                                    <div>{{ slotProps.option.name }}</div>
                                </div>
                            </template>
                        </Dropdown>
                        <label v-if="!isDropdownHidden" for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Select an option') }}</label>
                        <Dropdown v-if="!isDropdownHidden" v-model="selectedOption" :options="this.options" filter :optionLabel="dynamicOptionLabel" class="w-full h-11 md:w-64rem mb-4 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex items-center">
                                    <div>{{ slotProps.value[dynamicOptionLabel]  }}</div>
                                </div>
                            </template>
                            <template #option="slotProps">
                                <div class="flex items-center">
                                    <div>{{ slotProps.option[dynamicOptionLabel]  }}</div>
                                </div>
                            </template>
                        </Dropdown>
                        <div class="flex justify-end">
                            <button class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="hideDialog()">
                                {{ $t('Close') }}
                            </button>
                        </div>
                    </Dialog>

                    <!-- MODAL NEW CUSTOMER -->
                    <Dialog v-model:visible="customerDialog" :header="$t('Create company')" id="titleCompany" :modal="true" class="p-fluid">
                        <form style="width: 800px;" @submit.prevent="saveCustomer">
                            <div class="grid gap-3 mb-6 md:grid-cols-2">
                                <div>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Company name') }}</label>
                                <input type="text" id="name" v-model="customer.name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Company name')" :required="!selectedCustomer" />
                                </div>
                                <div>
                                <label for="tax_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Tax number') }}</label>
                                <input type="text" id="tax_number" v-model="customer.tax_number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Tax number')"  :required="!selectedCustomer" />
                                </div>
                            </div>
                        
                            <div class="mb-6">
                                <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Address') }}</label>
                                <input type="text" id="address1" v-model="customer.address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Address')" :required="!selectedCustomer" />
                            </div>
                        
                            <div class="grid gap-3 mb-6 md:grid-cols-2"> 
                                <div>
                                <label for="town" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Town') }}</label>
                                <input type="text" id="town" v-model="customer.town" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Town')" :required="!selectedCustomer" />
                                </div>  
                                <div>
                                <label for="province" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Province') }}</label>
                                <input type="text" id="province" v-model="customer.province" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Province')" :required="!selectedCustomer" />
                                </div>  
                                <div>
                                <label for="post_code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Post code') }}</label>
                                <input type="text" id="post_code" v-model="customer.post_code" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Post code')" pattern="^\d+$" :required="!selectedCustomer" />
                                </div>
                                <div>
                                <label for="country" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Country') }}</label>
                                <input type="text" id="country" v-model="customer.country" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Country')" :required="!selectedCustomer" />
                                </div>
                                <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Email') }}</label>
                                <input type="email" id="email" v-model="customer.email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('info@mycompany.com')" :required="!selectedCustomer" />
                                </div>    
                                <div>
                                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Phone') }}</label>
                                <input type="tel" id="phone" v-model="customer.phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Phone')" pattern="^\+\d{1,3}\s?\d{1,14}$" :required="!selectedCustomer" />
                                </div>
                            </div>
                        
                            <div class="grid gap-3 md:grid-cols-1 justify-items-end">
                                <div>
                                <button class="mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click.prevent="hideDialog()">{{ $t('Close') }}</button>
                                <button type="submit" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{{ $t('Save') }}</button>
                                </div>    
                            </div>
                        </form>
                    </Dialog>  
                </div>
            </div>
        </AppLayout>
    </div>
    
    <!-- PDF -->

    <div class="imprimir">
    
        <div class="invoice">
                <div class="invoice-header">
                    <div class="logo">
                        <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/company-logo-design-template-e089327a5c476ce5c70c74f7359c5898_screen.jpg?ts=1672291305" alt="Logo de la empresa" />
                    </div>
                    <div class="invoice_details">
                        <h3>{{ selectedType.name }}</h3>
                        <p><strong>{{ $t('Date') }}: </strong>{{ fecha }}</p>
                        <p><strong>{{ $t('Expiration') }}: </strong>{{ expiration }}</p>
                        <p><strong>{{ $t('Number of') }} {{ selectedType.name }}:</strong> {{ selectedSerie.serie }} {{ selectedSerie.number }}</p>
                    </div>
                </div>
                <div class="invoice-info">
                    <div class="company-details">
                        <h3><strong>{{ $t('Company') }}</strong></h3>
                        <p class="name">{{ selectedCompany.name }}</p>
                        <p>{{ selectedCompany.tax_number }}</p>
                        <p> {{ selectedCompany.address }}<br> {{ selectedCompany.post_code }}, {{ selectedCompany.town}}, {{ selectedCompany.province }}, {{'(' }} {{ selectedCompany.country }} {{ ')' }}</p>
                        <p> {{ selectedCompany.email }}</p>   
                        <p> {{ selectedCompany.phone }}</p>
                    </div>
                    <div class="customer-details">
                        <h3><strong>{{ $t('Customer') }}</strong></h3>
                        <p class="name">{{ selectedCustomer.name }}</p>
                        <p>{{ selectedCustomer.tax_number }}</p>
                        <p> {{ selectedCustomer.address }}<br> {{ selectedCustomer.post_code }}, {{ selectedCustomer.town}}, {{ selectedCustomer.province }}, {{'(' }} {{ selectedCustomer.country }} {{ ')' }}</p>
                        <p> {{ selectedCustomer.email }}</p>   
                        <p> {{ selectedCustomer.phone }}</p>
                    </div>
                </div>

                <table class="invoice-table">
                    <thead>
                        <tr class="header">
                            <th>{{ $t('Reference') }}</th>
                            <th>{{ $t('Description') }}</th>
                            <th>{{ $t('Quantity') }}</th>
                            <th>{{ $t('Price') }}</th>
                            <th>{{ $t('Tax (%)') }}</th>
                            <th>{{ $t('Total') }}</th>                      
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" :key="product.id">
                            <td>{{ product.reference }}</td>
                            <td>{{ product.description}}</td>
                            <td>{{ product.quantity }}</td>
                            <td>{{ product.price }}</td>
                            <td>{{ product.taxes }}</td>
                            <td>{{ calculateTotal(product) }}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="table-break">
                    <div class="table-container">
                        <table class="totals">  
                            <tr>
                                <td class="title">{{ $t('Subtotal (excluding Tax)') }}</td>
                                <td>{{ subtotal.toFixed(2) }}€</td>
                            </tr>
                            <hr>
                            <tr>
                                <td class="title">{{ $t('Total Tax') }}</td>
                                <td>{{ totalIVA.toFixed(2) }}€</td>
                            </tr>
                            <hr>
                            <tr>
                                <td class="title"><strong>{{ $t('Total (with IVA)') }}</strong></td>
                                <td><strong>{{ totalConIVA.toFixed(2) }}€</strong></td>
                            </tr>
                        </table>

                    </div>
                    <table class="bank">  
                        <tr>
                            <td>{{ $t('Payment method') }}:</td>
                            <td>{{ this.selectedPaymentMethod.name }}</td>    
                        </tr>
                        <tr>
                            <td class="text-gray-600 pr-4">
                                <span v-if="selectedPaymentMethod.id === 2">{{ '' }}</span>
                                <span v-else-if="selectedPaymentMethod.id === 3">{{ $t('Phone') }}:</span>
                                <span v-else-if="selectedPaymentMethod.id === 4">{{ $t('Email') }}:</span>
                                <span v-else>{{ $t('Bank account') }}:</span>
                            </td>
                            <td class="pl-4">
                                <span v-if="selectedPaymentMethod.id === 2">{{ '' }}</span>
                                <span v-else-if="selectedPaymentMethod.id === 3">{{ this.selectedPhone.phone }}</span>
                                <span v-else-if="selectedPaymentMethod.id === 4">{{ this.selectedEmail.email }}</span>
                                <span v-else>{{ this.selectedBankAccount.complete_bank_account }}</span>
                            </td>
                        </tr>

                    </table>
                </div>
        </div>
    </div>

    
</template>


<script>
import { FilterMatchMode } from 'primevue/api';

export default {
    data() {
        return {
            fecha: '',
            expiration: '',
            fechaFormateada: '',
            loading: true,
            showTable: false,
            isDropdownOpen: false,
            isDropdownOpenExport: false,
            saveRestart: false,
            taxOptions: [
                { label: '0', value: 0 },
                { label: '4', value: 4 },
                { label: '5', value: 5 },
                { label: '7', value: 7 },
                { label: '8', value: 8 },
                { label: '10', value: 10 },
                { label: '16', value: 16 },
                { label: '18', value: 18},
                { label: '21', value: 21 },
            ],

            paymentMethods: [
                { id: 1 },
                { id: 2 },
                { id: 3 },
                { id: 4 }
            ],
            imageUrl: 'https://placehold.co/300x300/e2e8f0/e2e8f0',
            companies: null,
            customers: null,
            types: [],
            series: [],
            serie: '',
            counter: '',
            showButton: false,
            productDialog: false,
            documentDialog: false,
            customerDialog: false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
            selectACustomerDialog: false,
            selectAPaymentMethodDialog: false,
            selectedOption: [],
            options: [],
            selectedBankAccount: [],
            selectedEmail: [],
            selectedPhone: [],
            products: [],
            selectedCompany: [],
            selectedCustomer: [],
            selectedType: [],
            selectedSerie: [],
            emails:[],
            phones:[],
            selectedProducts: [],
            selectedPaymentMethod: [],
            filters: {},
            submitted: false,
            myDocument: { 
                document_counter: '',
                number: '', 
                company_id_company: '',
                company_id_customer: '',
                documents_type_id: '',
                documents_series_id: '',
                bank_account_id: '',
                expiration: '',
                date: '',
                amount: '',
                payment_methods_id: '',
                totalTax: '',
                subTotal: '',
                paid: false, 
                invoiced: false,               
                concept: [],
            
            },
            customer: {
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
        };
    },

    computed: {

        dynamicOptionLabel() {
            switch (this.selectedPaymentMethod.id) {
                case 1:
                return 'complete_bank_account'; 
                case 3:
                return 'phone';
                case 4:
                return 'email';
                default:
                return '';
            }
        },

        isDropdownHidden() {
            return this.dynamicOptionLabel === '';
        },

        subtotal() {
            return this.products.reduce((acc, product) => acc + product.quantity * product.price, 0);
        },
        totalIVA() {
            return this.products.reduce((acc, product) => acc + (product.quantity * product.price * product.taxes / 100), 0);
        },
        totalConIVA() {
            return this.subtotal + this.totalIVA;
        }
    },
    created() {
        this.filters = {
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        };

        // Inicializa la fecha con la fecha de hoy
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        this.fecha = `${year}-${month}-${day}`;
        this.expiration = `${year}-${month}-${day}`;
    },

    mounted() {
        this.fetchCompanies();
        this.fetchDocuments();
        this.fetchPayments();
    },

    watch: {
        selectedPaymentMethod(newMethod) {
            this.handlePaymentMethodChange(newMethod);
        }
    },
    
    methods: {

        handlePaymentMethodChange(paymentMethod) {
            switch (paymentMethod.id) {
                case 1:
                    console.log('Transferencia');
                    this.fetchBanks();
                    break;
                case 2:
                    console.log('Efectivo');
                    break;
                case 3:
                    console.log('Bizum');
                    this.fetchPhones();
                    break;
                case 4:
                    console.log('PayPal');
                    this.fetchEmails();
                    break;
                default:
                    console.log('Error');
            }
        },

        fetchBanks() {
            console.log("id " + this.selectedCompany.id)
            axios.get('/banks/' + this.selectedCompany.id)
                .then(response => {
                    this.banks = response.data.accounts;
                    console.log("aqui")
                    console.log(this.banks[0])
                    this.selectedBankAccount = this.banks[0]
                    this.options = this.banks
                })
                .catch(error => {
                    console.error('Error fetching bank data:', error);
                });
        },

        fetchEmails() {
            axios.get('/emails/' + this.selectedCompany.id)
                .then(response => {
                    this.emails = response.data.emails;
                    this.selectedEmail = this.emails[0]
                    this.options = this.emails
                })
                .catch(error => {
                    this.$toast(this.$t('Error connecting to the server'), 'error');
                });
        },

        fetchPhones() {
            axios.get('/phones/' + this.selectedCompany.id)
                .then(response => {
                    this.phones = response.data.phones;
                    this.selectedPhone = this.phones[0]
                    this.options = this.phones
                })
                .catch(error => {
                    this.$toast(this.$t('Error connecting to the server'), 'error');
                });
        },

        fetchPayments () {
            console.log("dentro payments")
            axios.get('/payment')
            .then(response => {
                console.log("dentro payments2")
                this.payment_methods = response.data.methods;
                this.selectedPaymentMethod = this.payment_methods[0]
            })
        },

        handleScroll() {
            let scrollPosition = window.scrollY;
            console.log(scrollPosition);
            if (scrollPosition > 200) {
                this.showButton = true;
            } else {
                this.showButton = false;
            }
        },
        
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },

        toggleDropdownExport() {
            this.isDropdownOpenExport = !this.isDropdownOpenExport;
        },

        fetchCompanies() {
            axios.get('/companies-invoice')
            .then(response => {
            this.companies = response.data.companies;
            console.log(this.companies)
            if (this.companies.length === 1) {
                this.selectedCompany = this.companies[0];
            
                return axios.get('/customers/' + this.selectedCompany.id);
            } else {

                this.selectedCompany = this.companies[0];
                this.loading = false;
                return axios.get('/customers/' + this.selectedCompany.id);
            }
            })
            .then(response => {
            if (response) {
                this.customers = response.data.customers;

                if (this.customers.length === 1) {
                    this.selectedCustomer = this.customers[0];
                }
            }
            this.loading = false;
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            this.loading = false;
            });
        },

        hideDialog() {
            this.selectACustomerDialog = false
            this.selectAPaymentMethodDialog = false
            this.customerDialog = false
            this.submitted = false;
            console.log("hideDialog " + this.selectACustomerDialog)
        },
        
        openNew() {
            this.selectACustomerDialog = false;
            this.customer = {
                companyID: this.selectedCompany.id,
            };
            console.log("Prueba cogiendo compañia " + this.customer.companyID)
            this.submitted = false;
            this.customerDialog = true;
        },

        selectACustomer() {
            this.selectACustomerDialog = true;
            console.log("selectACustomer " + this.selectACustomerDialog)
        },

        selectAPaymentMethod() {
            this.selectAPaymentMethodDialog = true;
            console.log("selectAPaymentMethod")
        },

        saveCustomer() {

            axios.post('/customer', this.customer)
            .then(response => {
                this.customer.id = response.data.companyId;
                this.selectedCustomer = this.customer;
                this.customerDialog = false;      
            })
            .catch(error => {
                console.log(error.response);
                this.customerDialog = false;
            });   

        },

        handleCompanySelection() {
            this.selectedCustomer = [];
            axios.get('/customers/'+this.selectedCompany.id)
                .then(response => {
            
                    this.customers = response.data.customers;   
                    
                    if (this.customers.length === 1) {
                        this.selectedCustomer = this.customers[0];
                    }

                })
                .catch(error => {
                    console.error('Error fetching phone data:', error);
                });
        },

        fetchDocuments() {
            axios.get('/documents-type')
                .then(response => {
                    this.types = response.data.types;     
                    this.selectedType = this.types[0];
                    return axios.get('/documents-serie/'+this.selectedType.id+'/'+this.selectedCompany.id)
                })
                .catch(error => {
                    console.error('Error fetching phone data:', error);
                })
                .then(response => {
                    if (response) {
                        this.series = response.data.series;
                        this.selectedSerie = this.series[0];
                    }
                })
                .catch(error => {
                console.error('Error fetching data:', error);
                this.loading = false;
                });
        },


        handleTypeSelection() {
            this.selectedSerie = [];
            axios.get('/documents-serie/'+this.selectedType.id+'/'+this.selectedCompany.id)
                .then(response => {
            
                    this.series = response.data.series; 
                
                })
                .catch(error => {
                    console.error('Error fetching phone data:', error);
                });
        },
        
        selectCompany() {
            this.productDialog = true
        },

        selectDocument() {
            this.documentDialog = true
        },

        openFileInput() {
            this.$refs.fileInput.click();
        },
        
        handleFileChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            
            reader.onload = () => {
                this.imageUrl = reader.result;
            };
            
            reader.readAsDataURL(file);
        },
        
        addRow() {

            let newProduct = {
                reference: '',
                description: '',
                product: '',
                quantity: 0,
                price: 0,
                taxes: 21,
                priceTax: 0,
                total: 0,
                id: this.products.length + 1,
            };
            this.products.push(newProduct);
        },

        //Identifica que boton de guardado le ha dado
        saveAndReset() {
            this.saveRestart = true;
            this.checkDocument(); 
        },

        checkDocument() {
            
            axios.get('/documents-serie/'+this.selectedType.id+'/'+this.selectedCompany.id+'/'+this.selectedSerie.serie)
            .then(response => {             
                this.date = response.data.date.date
                console.log("date "+ this.date);
                console.log("fecha "+ this.fecha);
                this.serie = response.data.serie.number;
                console.log("Serie "+ this.serie);
                console.log("selectedSerie "+ this.selectedSerie.number );
                //this.counter = response.data.counter.document_counter;
                //console.log("Counter "+ this.counter);

                if (this.selectedSerie.number <= this.serie) {
                    
                   /* let respuesta = confirm("El número de documento ya existe, ¿deseas asignarle el siguiente valor disponible?");
                    if (respuesta) {
                        this.selectedSerie.number = ++this.serie
                        alert("Se ha asignado un número disponible: "+ this.selectedSerie.number);
                        this.serie = '';
                        this.saveDocument();
                    }*/

                    let respuesta = prompt("El número de documento ya existe. ¿Qué deseas hacer?\n1. Conservar el número ingresado\n2. Asignar el siguiente valor disponible\n3. Cancelar");

                    if (respuesta === '1') {
                        // Conservar el número ingresado por el cliente
                        this.$toast(this.$t('The number entered will be retained: ') + this.selectedSerie.number, 'success');
                        this.serie = '';
                        this.saveDocument();
                    } else if (respuesta === '2') {
                        // Asignar el siguiente valor disponible
                        this.selectedSerie.number = ++this.serie;
                        this.$toast(this.$t('The following available number has been assigned: ') + this.selectedSerie.number, 'success');
                        this.serie = '';
                        this.saveDocument();
                    } else {
                        // Cancelar la operación
                        this.$toast(this.$t('Invoice cancelled.'), 'error');
                    }


                } else if (this.date > this.fecha) {
                    let respuesta = confirm("La fecha seleccionada es anterior a la de la última factura, ¿deseas asignarle la fecha actual?");
                    if (respuesta) {
                        
                        const today = new Date();
                        const year = today.getFullYear();
                        const month = (today.getMonth() + 1).toString().padStart(2, '0');
                        const day = today.getDate().toString().padStart(2, '0');
                        this.fecha = `${year}-${month}-${day}`;
                        
                        this.$toast(this.$t('The current date has been assigned.'), 'success');

                        this.saveDocument();
                    }
                
                
                }else{
                    this.saveDocument();
                }
            })
            .catch(error => {
                this.$toast(this.$t('Error saving document data.'), 'error');
            });    
        },

        saveDocument(){
            console.log("aqui1")
            this.myDocument.number = this.selectedSerie.serie + this.selectedSerie.number
            console.log("aqui2")
            this.myDocument.document_counter = this.selectedSerie.number
        
            this.myDocument.expiration = this.expiration
            console.log("aqui3")
            this.myDocument.payment_methods_id = this.selectedPaymentMethod.id
            console.log("aqui4")
            this.myDocument.company_id_company = this.selectedCompany.id 
            this.myDocument.company_id_customer = this.selectedCustomer.id
            this.myDocument.documents_type_id = this.selectedType.id
            this.myDocument.documents_series_id = this.selectedSerie.id
            this.myDocument.date = this.fecha
            console.log("aqui3")
            this.myDocument.bank_account_id = this.selectedCompany.bank_account_id
            
            
            this.myDocument.subTotal = this.subtotal.toFixed(2)
            this.myDocument.totalTax = this.totalIVA.toFixed(2)
            this.myDocument.amount = this.totalConIVA.toFixed(2)
            
            if(this.selectedType.id == 1 ) {
                this.myDocument.invoiced = true
            }

            
            this.products.forEach(product => {
                // Creamos un nuevo objeto con los valores del producto
                let newProduct = {
                    reference: product.reference,
                    description: product.description,
                    quantity: product.quantity,
                    price: product.price,
                    taxes: product.taxes,
                    total: this.calculateTotal(product).toFixed(2)
                };

                this.myDocument.concept.push(newProduct);

            });
            console.log("numero factura: " + this.myDocument.number)
            axios.post('/documents', {documentData: this.myDocument})
            .then(response => {
        
                this.$toast(this.$t('Invoice saved correctly.'), 'success');
                
                if (this.saveRestart) {
                    this.resetData();
                }
            })
            .catch(error => {
                this.$toast(this.$t('Error saving invoice.'), 'error');
                this.myDocument.concept = []
            });
        },


        resetData() {
            
            setTimeout(function() {
                // Recargar la página
                window.location.reload();
            }, 3000);
            
        },

        
        calculateTotal(product) {
            return product.quantity * product.price;
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

        exportToPDF(){
            this.showTable = !this.showTable;
            window.print()    
        },

        exportToXML() {
            const data = {
                company: this.selectedCompany,
                customer: this.selectedCustomer,
                document: this.myDocument,
                payment: this.selectedPaymentMethod,
                bank: this.selectedBankAccount,
                phone: this.selectedPhone,
                email: this.selectedEmail
            };
            
            const xmlContent = this.convertToFacturaeXML(data);
            this.$toast(this.$t('XML document generated correctly.'), 'success');
            this.downloadXML(xmlContent, 'facturae.xml');
            
        },
    
        convertToFacturaeXML(data) {
            
            //const { company, customer, document } = data;
            // console.log(company)
            // console.log(customer)
            // console.log(document)
            // console.log(payment)
            // console.log(bank)
            // console.log(phone)
            // console.log(email)
            const xml = 
            `<?xml version="1.0" encoding="UTF-8"?>
            <fe:Facturae xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:fe="http://www.facturae.es/Facturae/2014/v3.2.1/Facturae">
            <FileHeader>
                <SchemaVersion>3.2.1</SchemaVersion>
                <Modality>I</Modality>
                <InvoiceIssuerType>EM</InvoiceIssuerType>
                <Batch>
                    <BatchIdentifier>B989898731Emit-</BatchIdentifier>
                    <InvoicesCount>1</InvoicesCount>
                    <TotalInvoicesAmount>
                        <TotalAmount>363.0</TotalAmount>
                    </TotalInvoicesAmount>
                    <TotalOutstandingAmount>
                        <TotalAmount>363.0</TotalAmount>
                    </TotalOutstandingAmount>
                    <TotalExecutableAmount>
                        <TotalAmount>363.0</TotalAmount>
                    </TotalExecutableAmount>
                    <InvoiceCurrencyCode>EUR</InvoiceCurrencyCode>
                </Batch>
            </FileHeader>
            <Parties>
                <SellerParty>
                    <TaxIdentification>
                        <PersonTypeCode>J</PersonTypeCode>
                        <ResidenceTypeCode>R</ResidenceTypeCode>
                        <TaxIdentificationNumber>B53988497</TaxIdentificationNumber>
                    </TaxIdentification>
                    <LegalEntity>
                        <CorporateName>Manolo S.L</CorporateName>
                        <AddressInSpain>
                            <Address>Calle prueba</Address>
                            <PostCode>03315</PostCode>
                            <Town>La murada</Town>
                            <Province>Alicante</Province>
                            <CountryCode>ESP</CountryCode>
                        </AddressInSpain>
                        <ContactDetails>
                            <Telephone>682924866</Telephone>
                            <ElectronicMail>prueba@gmail.com</ElectronicMail>
                        </ContactDetails>
                    </LegalEntity>
                </SellerParty>
                <BuyerParty>
                    <TaxIdentification>
                        <PersonTypeCode>J</PersonTypeCode>
                        <ResidenceTypeCode>R</ResidenceTypeCode>
                        <TaxIdentificationNumber>B98989873</TaxIdentificationNumber>
                    </TaxIdentification>
                    <LegalEntity>
                        <CorporateName>Pepito S.L</CorporateName>
                        <AddressInSpain>
                            <Address>Calle manolo 72</Address>
                            <PostCode>03300</PostCode>
                            <Town>Orihuela</Town>
                            <Province>Alicante</Province>
                            <CountryCode>ESP</CountryCode>
                        </AddressInSpain>
                        <ContactDetails>
                            <Telephone>689596321</Telephone>
                            <ElectronicMail>pepito@gmail.com</ElectronicMail>
                        </ContactDetails>
                    </LegalEntity>
                </BuyerParty>
            </Parties>
            <Invoices>
                <Invoice>
                    <InvoiceHeader>
                        <InvoiceNumber>F4</InvoiceNumber>
                        <InvoiceSeriesCode>F</InvoiceSeriesCode>
                        <InvoiceDocumentType>FC</InvoiceDocumentType>
                        <InvoiceClass>OO</InvoiceClass>
                    </InvoiceHeader>
                    <InvoiceIssueData>
                        <IssueDate>2024-06-21</IssueDate>
                        <InvoiceCurrencyCode>EUR</InvoiceCurrencyCode>
                        <TaxCurrencyCode>EUR</TaxCurrencyCode>
                        <LanguageName>es</LanguageName>
                    </InvoiceIssueData>
                    <TaxesOutputs>
                        <Tax>
                            <TaxTypeCode>01</TaxTypeCode>
                            <TaxRate>21.0</TaxRate>
                            <TaxableBase>
                                <TotalAmount>300.0</TotalAmount>
                            </TaxableBase>
                            <TaxAmount>
                                <TotalAmount>63.0</TotalAmount>
                            </TaxAmount>
                        </Tax>
                    </TaxesOutputs>
                    <InvoiceTotals>
                        <TotalGrossAmount>300.0</TotalGrossAmount>
                        <TotalGeneralDiscounts>0.0</TotalGeneralDiscounts>
                        <TotalGeneralSurcharges>0.0</TotalGeneralSurcharges>
                        <TotalGrossAmountBeforeTaxes>300.0</TotalGrossAmountBeforeTaxes>
                        <TotalTaxOutputs>63.0</TotalTaxOutputs>
                        <TotalTaxesWithheld>0.0</TotalTaxesWithheld>
                        <InvoiceTotal>363.0</InvoiceTotal>
                        <TotalOutstandingAmount>363.0</TotalOutstandingAmount>
                        <TotalExecutableAmount>363.0</TotalExecutableAmount>
                    </InvoiceTotals>
                    <Items>
                        <InvoiceLine>
                            <IssuerContractDate>2024-06-21</IssuerContractDate>
                            <IssuerTransactionDate>2024-06-21</IssuerTransactionDate>
                            <ItemDescription>Colchon</ItemDescription>
                            <Quantity>3</Quantity>
                            <UnitOfMeasure>01</UnitOfMeasure>
                            <UnitPriceWithoutTax>100</UnitPriceWithoutTax>
                            <TotalCost>300</TotalCost>
                            <GrossAmount>300</GrossAmount>
                            <TaxesOutputs>
                                <Tax>
                                    <TaxTypeCode>01</TaxTypeCode>
                                    <TaxRate>21</TaxRate>
                                    <TaxableBase>
                                        <TotalAmount>300</TotalAmount>
                                    </TaxableBase>
                                    <TaxAmount>
                                        <TotalAmount>63</TotalAmount>
                                    </TaxAmount>
                                </Tax>
                            </TaxesOutputs>
                        </InvoiceLine>
                    </Items>
                </Invoice>
            </Invoices>
            </fe:Facturae>`;
            return xml;
        },
        
        downloadXML(content, filename) {
            const blob = new Blob([content], { type: 'application/xml' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
            URL.revokeObjectURL(link.href);
        },

        cancelInvoice() {
            let respuesta = confirm("¿Está seguro? Los datos de esta factura serán descartados");
            if (respuesta) {
                this.resetData()
            }
        },
    },
}
</script>

<style>

.dateTable {
    border-right: 1px solid #ddd;
}

.dateTable:last-child {
    border-right: none;
}

.p-datatable-thead > tr > th,
.p-datatable-tbody > tr > td {
    border-right: 1px solid #ddd;
}

.p-datatable-thead > tr > th:last-child,
.p-datatable-tbody > tr > td:last-child {
    border-right: none;
}

.checkbox {
    background-color: rgba(246, 246, 246, 0.609);
    border-top: #E2E8F0 1px solid;
    border-bottom: #E2E8F0 1px solid;
}

.input {
    border: none;
    border-radius: 10px;
    margin-top: 10px;
}

.input-short {
    width: 100px; 
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

.imprimir {
    display: none;
}


.linea-grosor {
    border: none;
    border-top: #E2E8F0 1px solid; /* Grosor aumentado y color ajustado */
}

@media (max-width: 768px) { 
    .showCompany,
    .showCustomer {
        margin-bottom: 1.5rem;
    }
}

@media print {

    .no-imprimir {
        display: none;
    }


    ::-webkit-scrollbar {
        display: none;
    }

    .p-paginator {
        display: none;
    }

    .imprimir{
        display: block;
    }

    
}


</style>


<style scoped>

.invoice {
    max-width: 1280px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 5px;
    font-family: Arial, sans-serif;

}

.invoice-header {
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo img {
    max-width: 150px;
}

.invoice_details {
    text-align: right;
}

.invoice-info {
    margin: 0;
    display: flex;
    justify-content: space-between;
}

.company-details {
    text-align: left;
}

.customer-details {
    text-align: left;
}

.invoice-table {
    margin: 50px 0 40px 0;
    width: 100%;
    border-collapse: collapse;
}

.invoice-table th,
.invoice-table td {
    border: 1px solid #d3d3d3;
    padding: 8px;
    text-align: left;
}


.invoice-table th {
    background-color: #f2f2f2;
}

.invoice-table tfoot td {
    font-weight: bold;
    background-color: #f2f2f2;
}

.invoice-table tfoot tr:last-child td {
    background-color: #e6e6e6;
    color: #333;
}

.invoice-table tr:nth-child(even) td {
    background-color: #f0f0f0;
}

.invoice-table tr:nth-child(odd) td {
    background-color: #ffffff;
}

.header th {
    border: 1px solid black;
    background-color:black;
    color:white;
}

.table-container {
    padding:10px;
    text-align: right;
    float:right;
    display:block;

}

.table-container .totals {
    margin-left: auto;
    margin-right: 0;
}

.table-container .totals .title {
    padding-right: 20px;
}
.table-break {
    page-break-inside: avoid;
}
.name {
    font-size: 18px;
    font-weight: 700;
}
</style>
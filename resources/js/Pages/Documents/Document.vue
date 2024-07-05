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
                <div class="max-w-10xl mx-auto sm:px-6 lg:px-24">
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
                                        {{ selectedCompany.name }}
                                    </span>
                                </button>
                            </div>
                            
                            
                            <!-- Botones normales para pantallas grandes -->
                            <div class="md:flex justify-between items-center">
                                <div class="flex flex-col md:flex-row justify-start items-center">
                                    <div class="flex flex-wrap justify-start items-center">
                                        <div class="relative inline-block w-50">
                                            <Button :label="$t('Customer')" icon="pi pi-plus" class="success-button text-white p-2" @click="selectACustomer()" />
                                        </div>

                                        <div class="flex items-center ml-2">
                                            <label for="link-checkbox" class="ms-2 mr-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ $t('Mark as paid') }}</label>
                                            <input id="link-checkbox" type="checkbox" v-model="myDocument.paid" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        </div>
                                    </div>
                                </div>

                                <!-- Mantén estos divs a la derecha -->
                                <div class="flex items-center">
                                    <div id="app" class="relative inline-block w-50 ml-2">
                                        <div class="flex">
                                            <button
                                                type="button"
                                                class="px-4 py-2 mr-2 danger-button text-white rounded flex items-center justify-between"
                                                @click="handleListDocument()"
                                                :class="{ 'opacity-50': !selectedCompany.id }"
                                                :disabled="!selectedCompany.id">
                                                <span>
                                                    <i class="pi pi-plus mr-2"></i>
                                                    {{ $t('Document list') }}
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                class="px-4 py-2 mr-2 success-button text-white rounded flex items-center justify-between"
                                                @click="selectDocument()"
                                                :class="{ 'opacity-50': !selectedCompany.id }"
                                                :disabled="!selectedCompany.id">
                                                <span>
                                                    <i class="pi pi-plus mr-2"></i>
                                                    {{ $t('Serie') }}
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                class="px-4 py-2 bg-purple-600 text-white rounded-md flex items-center justify-between"
                                                @click="toggleDropdownExport"
                                                :disabled="totalConIVA <= 0 || isSaving"
                                                :class="{ 'opacity-50': totalConIVA <= 0 || isSaving || !selectedCustomer.id}">
                                                <i class="pi pi-upload mr-2"></i>
                                                {{ $t('Export') }}
                                            </button>
                                        </div>

                                        <!-- Desplegable Export -->
                                        <div v-show="isDropdownOpenExport" class="absolute right-0 w-48 bg-white border border-gray-300 rounded shadow-lg">
                                            <button type="button" class="px-4 py-2 rounded-l flex items-center justify-between" @click="exportToPDF()">
                                                <span>
                                                    <i class="pi pi-file-pdf mr-2"></i>
                                                    {{ $t('PDF') }}
                                                </span>
                                            </button>
                                            <button type="button" class="px-4 py-2 rounded-r flex items-center" @click="exportToXML()">
                                                <span>
                                                    <i class="pi pi-file-export mr-2"></i>
                                                    {{ $t('XML') }}
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    <div class="split-button-container ml-2">
                                        <SplitButton
                                            class="blue-button"
                                            :label="$t('Save')"
                                            @click="checkDocument"
                                            :model="items"
                                            :disabled="totalConIVA <= 0 || isSaving"
                                            :class="{ 'opacity-50': totalConIVA <= 0 || isSaving || !selectedCustomer.id}">
                                            <template v-slot:icon>
                                                <i class="pi pi-save mr-2" :class="{ 'opacity-50': totalConIVA <= 0 }"></i>
                                            </template>
                                        </SplitButton>
                                    </div>
                                </div>
                            </div>


                            <hr class="linea-grosor mt-5">
                        
                            <div class="selector flex flex-col md:flex-row justify-between mt-5 ml-12">
                                
                                <div class="showCustomer"> 
                                    <div class="grid md:grid-cols-1 text-m gap-y-1">
                                        <div class="flex items-center justify-between w-full">
                                            <div class="font-semibold mr-3 flex-shrink-0 w-32">{{ $t('Customer') }}:</div>
                                            <div class="text-gray-700 w-full font-bold text-lg">{{ selectedCustomer.name }}</div>
                                        </div>
                                        <div class="flex items-center justify-between w-full">
                                            <div class="font-semibold mr-3 flex-shrink-0 w-32">{{ $t('Tax number') }}:</div>
                                            <div class="text-gray-700 w-full uppercase">{{ selectedCustomer.tax_number }}</div>
                                        </div>
                                        <div class="flex items-center justify-between w-full">
                                            <div class="font-semibold mr-3 flex-shrink-0 w-32">{{ $t('Phone') }}:</div>
                                            <div class="text-gray-700 w-full">{{ selectedCustomer.phone }}</div>
                                        </div>
                                        <div class="flex items-center justify-between w-full">
                                            <div class="font-semibold mr-3 flex-shrink-0 w-32">{{ $t('Email') }}:</div>
                                            <div class="text-gray-700 w-full">{{ selectedCustomer.email }}</div>
                                        </div>
                                        <div class="flex items-center justify-between w-full">
                                            <div class="font-semibold mr-3 flex-shrink-0 w-32">{{ $t('Address') }}:</div>
                                            <div class="text-gray-700 w-full">
                                                {{ selectedCustomer.address }}, {{ selectedCustomer.post_code }}, {{ selectedCustomer.town }}, {{ selectedCustomer.province }} ( {{ selectedCustomer.country }} )
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
                            <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id" class="w-full lg:w-4/4 mx-auto">
                
                                <Column selectionMode="multiple" :exportable="false" class="datetable checkbox"></Column>
                                <Column field="reference" :header="$t('Reference')" sortable class="dateTable w-1/4">
                                    <template #body="slotProps">
                                        <InputText class="input w-full" :placeholder="$t('Reference')" v-model="slotProps.data.reference" />
                                    </template>
                                </Column>
                                <Column field="product" :header="$t('Description')" sortable class="dateTable w-full">
                                    <template #body="slotProps">
                                        <InputText class="input w-full" :placeholder="$t('Description')" v-model="slotProps.data.description" />
                                    </template>
                                </Column>
                                <Column field="quantity" :header="$t('Quantity')" sortable class="dateTable w-1/8">
                                    <template #body="slotProps">
                                        <InputText class="input input-short w-full" v-model="slotProps.data.quantity" />
                                    </template>
                                </Column>
                                <Column field="price" :header="$t('Price')" sortable class="dateTable w-1/4">
                                    <template #body="slotProps">
                                        <InputText class="input input-short w-full" v-model="slotProps.data.price" />
                                    </template>
                                </Column>
                                <Column field="discount" :header="$t('Discount (%)')" sortable class="dateTable w-1/4">
                                    <template #body="slotProps">
                                        <InputText class="input input-short w-full" v-model="slotProps.data.discount" />
                                    </template>
                                </Column>
                                <Column field="subTotal" :header="$t('Subtotal')" sortable class="dateTable w-1/12">
                                    <template #body="slotProps">
                                        <InputText class="input input-short w-1/12" :value="calculateSubtotal(slotProps.data)" readonly />
                                    </template>
                                </Column>
                                <Column field="taxes" :header="$t('Tax (%)')" sortable class="dateTable w-1/4">
                                    <template #body="slotProps">
                                        <Dropdown class="input-short w-full" v-model="slotProps.data.taxes" :options="taxOptions" optionLabel="label" optionValue="value" />
                                    </template>
                                </Column>
                                <Column field="total" :header="$t('Total')" sortable class="dateTable w-1/12">
                                    <template #body="slotProps">
                                        <InputText class="input input-short w-1/12" :value="calculateTotal(slotProps.data)" readonly />
                                    </template>
                                </Column>
                                <Column :exportable="false" :header="$t('Utility')" class="dateTable w-1/12">
                                    <template #body="slotProps">
                                        <Button icon="pi pi-trash" outlined rounded class="simpleDelete-button" severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                                    </template>
                                </Column>
                            </DataTable>

                            <div class="flex justify-end mt-4 pr-4" v-if="showButton">
                                <Button :label="$t('Concept')" icon="pi pi-plus" severity="success" class="success-button" @click="addRow()" />
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
                                                    <td class="pl-4">{{ selectedPaymentMethod.name }}</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">
                                                        <hr class="my-2 border-gray-300">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-gray-600 pr-4">
                                                        <span v-if="selectedPaymentMethod.id === 1 || selectedPaymentMethod.id === 7">{{ $t('Bank account') }}:</span>
                                                        <span v-else-if="selectedPaymentMethod.id === 3">{{ $t('Phone') }}:</span>
                                                        <span v-else-if="selectedPaymentMethod.id === 4">{{ $t('Email') }}:</span>
                                                        <span v-else>{{ '' }}</span>
                                                    </td>
                                                    <td class="pl-4">
                                                        <span v-if="selectedPaymentMethod.id === 1||  selectedPaymentMethod.id === 7">{{ selectedBankAccount.complete_bank_account }}</span>
                                                        <span v-else-if="selectedPaymentMethod.id === 3">{{ selectedPhone.phone }}</span>
                                                        <span v-else-if="selectedPaymentMethod.id === 4">{{ selectedEmail.email }}</span>
                                                        <span v-else>{{ '' }}</span>
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
                                    <button class="ml-4 mb-5 rounded-md" @click="selectAPaymentMethod()"></button>
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
                                            <td class="pl-4">{{ selectedPaymentMethod.name }}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <hr class="my-2 border-gray-300">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-gray-600 pr-4">
                                                <span v-if="selectedPaymentMethod.id === 1 || selectedPaymentMethod.id === 7">{{ $t('Bank account') }}:</span>
                                                <span v-else-if="selectedPaymentMethod.id === 3">{{ $t('Phone') }}:</span>
                                                <span v-else-if="selectedPaymentMethod.id === 4">{{ $t('Email') }}:</span>
                                                <span v-else>{{ '' }}</span>
                                            </td>
                                            <td class="pl-4">
                                                <span v-if="selectedPaymentMethod.id === 1||  selectedPaymentMethod.id === 7">{{ selectedBankAccount.complete_bank_account }}</span>
                                                <span v-else-if="selectedPaymentMethod.id === 3">{{ selectedPhone.phone }}</span>
                                                <span v-else-if="selectedPaymentMethod.id === 4">{{ selectedEmail.email }}</span>
                                                <span v-else>{{ '' }}</span>
                                            </td>
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
                <Dropdown v-model="selectedSerie" :options="series" filter optionLabel="serie" class="w-full h-11 md:w-64rem mb-4 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500">
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

            <!-- MODAL DOCUMENT LIST -->
            <Dialog v-model:visible="documentListDialog" class="w-3/4" :header="$t('Select document')" :modal="true">
                <TableDocumentSelector :companyId="selectedCompany.id" @document-selected="handleDocumentSelected" />
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
        

            <!-- SELECT A CUSTOMER -->
            <Dialog v-model:visible="selectACustomerDialog" :header="$t('Select a customer')" id="titleCompany" :modal="true" class="p-fluid w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-4xl">
                <Dropdown v-model="selectedCustomer" :options="customers" filter optionLabel="name" class="w-full h-11 md:w-64rem mb-4 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500">
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
                <Dropdown v-model="selectedPaymentMethod" :options="payment_methods" filter optionLabel="name" class="w-full h-11 md:w-64rem mb-4 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500">
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
                <Dropdown v-if="!isDropdownHidden" v-model="selectedOption" :options="options" filter :optionLabel="dynamicOptionLabel" class="w-full h-11 md:w-64rem mb-4 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex items-center">
                            <div>{{ slotProps.value[dynamicOptionLabel] }}</div>
                        </div>
                    </template>
                    <template #option="slotProps">
                        <div class="flex items-center">
                            <div>{{ slotProps.option[dynamicOptionLabel] }}</div>
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
                        <th>{{ $t('Discount (%)') }}</th>
                        <th>{{ $t('Subtotal') }}</th>
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
                        <td>{{ product.discount }}</td>
                        <td>{{ product.subTotal }}</td>
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
                        
                        <tr v-for="(entry, index) in taxMap" :key="index">
                            <td class="title">{{ $t('Total IVA') }} {{ Object.values(entry)[0] }} %</td>
                            <td> {{ Object.values(entry)[1].toFixed(2) }}€</td>
                        </tr> --
                        

                        <tr>
                            <td class="title"><strong>{{ $t('Total (with IVA)') }}</strong></td>
                            <td><strong>{{ totalConIVA.toFixed(2) }}€</strong></td>
                        </tr>
                    </table>
                </div>
                
                <table class="bank">  
                    <tr>
                        <td>{{ $t('Payment method') }}:</td>
                        <td>{{ selectedPaymentMethod.name }}</td>    
                    </tr>
                    <tr>
                        <td class="text-gray-600 pr-4">
                            <span v-if="selectedPaymentMethod.id === 2">{{ '' }}</span>
                            <span v-else-if="selectedPaymentMethod.id === 3">{{ $t('Phone') }}:</span>
                            <span v-else-if="selectedPaymentMethod.id === 4">{{ $t('Email') }}:</span>
                            <span v-else>{{ $t('Bank account') }}:</span>
                        </td>
                        
                        <td class="pl-4">
                            <span v-if="selectedPaymentMethod.id === 1">{{ selectedBankAccount.complete_bank_account }}</span>
                            <span v-else-if="selectedPaymentMethod.id === 3">{{ selectedPhone.phone }}</span>
                            <span v-else-if="selectedPaymentMethod.id === 4">{{ selectedEmail.email }}</span>
                            <span v-else>{{ '' }}</span>
                        </td>
                    </tr>

                </table>
            </div>
        </div>   
    </div>
</template>



<script>
import { FilterMatchMode } from 'primevue/api';
import '../../../css/document.css';
import { AutoScript } from '@/Libcustom/autoscript.js';
import TableDocumentSelector from '@/Pages/Companies/Partials/TableDocumentSelector.vue';

export default {
    components: {
        TableDocumentSelector
    },
    data() {
        return {
            items: [
                {
                    label: this.$t('Guardar y crear nueva'),
                    icon: 'pi pi-refresh',
                    command: () => this.saveAndReset()
                },
                {
                    label: this.$t('Cancelar'),
                    command: () => this.cancelInvoice()
                },
            ],
            taxMap: new Map(),
            fecha: '',
            expiration: '',
            fechaFormateada: '',
            loading: true,
            isSaving: false,
            isMobileMenuOpen: false,
            showTable: false,
            isDropdownOpen: false,
            isDropdownOpenExport: false,
            saveRestart: false,
            taxTypes: [],
            taxValues: [],
            documents1: [],
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
            documentListDialog: false,
            selectedOption: [],
            options: [],
            concepts: [],
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
            selectedPaymentSystemId: '',
            filters: {},
            submitted: false,
            myDocument: { 
                document_counter: '',
                number: '', 
                company_id_company: '',
                company_id_customer: '',
                documents_type_id: '',
                documents_series_id: '',
                payment_system_id: '',
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
            company: {
                id:'',
                name: '',
                tax_number: '',
                email: '',
                phone: '',
                address: '',
                post_code: '',
                town: '',
                province: '',
                country: '',
                documentId: ''
            },
        };
    },

    computed: {

        dynamicOptionLabel() {
            switch (this.selectedPaymentMethod.id) {
                case 1:
                case 7:
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
            return this.products.reduce((acc, product) => acc + product.subTotal, 0);
        },
        totalIVA() {
            return this.products.reduce((acc, product) => acc + product.priceTax, 0);
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

    async mounted() {
        await this.fetchCompanies();
        await this.fetchDocuments();
        await this.fetchPayments();

    },

    watch: {
        selectedPaymentMethod(newMethod) {
            console.log("PaymentId " + newMethod.id)
            this.handlePaymentMethodChange(newMethod);
        },

        selectedOption(newValue) {
            if (newValue) {
                switch (this.selectedPaymentMethod.id) {
                case 1:
                case 7:
                    this.selectedBankAccount = newValue;
                    this.selectedPaymentSystemId = newValue.id
                    break;
                case 3:
                    this.selectedPhone = newValue;
                    this.selectedPaymentSystemId = newValue.id
                    break;
                case 4:
                    this.selectedEmail = newValue;
                    this.selectedPaymentSystemId = newValue.id
                    break;
                default:
                    this.selectedPaymentSystemId = '';
                    break;
                }
            }
        }
    
    },
    
    methods: {

        async handlePaymentMethodChange(paymentMethod) {
            switch (paymentMethod.id) {
                case 1:
                    // Pago bancario
                    console.log("handlePaymentMethodChange 1")
                    this.selectedPaymentMethod.name = "Transferencia"
                    await this.fetchBanks();
                    console.log("handlePayment " + this.selectedBankAccount.id)
                    break;
                case 2:
                    //Efectivo
                    console.log("handlePaymentMethodChange 2")
                    this.selectedPaymentMethod.name = "Efectivo"
                    break;
                case 3:
                    // Bizum
                    console.log("handlePaymentMethodChange 3")
                    this.selectedPaymentMethod.name = "Bizum"
                    await this.fetchPhones();
                    break;
                case 4:
                    /// Paypal
                    console.log("handlePaymentMethodChange 4")
                    this.selectedPaymentMethod.name = "Paypal"
                    await this.fetchEmails();
                    break;
                case 5:
                    /// Credit Card
                    console.log("handlePaymentMethodChange 5")
                    this.selectedPaymentMethod.name = "Tarjeta"
                    break;
                case 6:
                    /// Cheque
                    console.log("handlePaymentMethodChange 6")
                    this.selectedPaymentMethod.name = "Cheque"
                    break;
                case 7:
                    /// Domiciliación
                    console.log("handlePaymentMethodChange 7")
                    this.selectedPaymentMethod.name = "Domiciliación"
                    await this.fetchBanks();
                    break;    
                default:
                    break; 
            }
        },

        handleDocumentSelected(documentId) {
            if (documentId) {
                this.documentListDialog = false
            }
            this.company = this.selectedCompany;
            this.company.documentId = documentId

            axios.get('/documents-show/' + this.company.id + '/' + this.company.documentId)
                .then(response => {

                    // Document
                    this.myDocument = response.data.documents;
                    this.fecha = this.myDocument.date;
                    this.expiration = this.myDocument.expiration;
                    this.selectedType.name = this.myDocument.document_type_name;
                    this.selectedType.id = this.myDocument.documents_type_id;
                    this.selectedSerie.id = this.myDocument.documents_series_id;
                    this.selectedSerie.serie = this.myDocument.document_series_serie;
                    console.log("carga")
                    this.selectedPaymentSystemId = this.myDocument.payment_system_id
                    this.selectedPaymentMethod.id = this.myDocument.payment_methods_id
                    

                    let number = this.myDocument.number;
                    let numberWithoutSerie = number.replace(this.selectedSerie.serie, '');
                    this.selectedSerie.number = numberWithoutSerie;

                    if (this.myDocument.paid === 0 ) {
                        this.myDocument.paid = false
                    } else {
                        this.myDocument.paid = true
                    }

                    // Company
                    this.selectedCompany = response.data.company;

                    // Customer
                    this.selectedCustomer = response.data.customer;

                    // Concepts
                    this.concepts = response.data.concepts;
                    this.products = response.data.concepts;

                    for (let i = 0; i < this.concepts.length; i++) {
                        this.products[i].taxes = parseFloat(this.concepts[i].tax);
                    }

                    // Payment
                    this.selectedPaymentMethod = [];
                    this.selectedPaymentMethod.id = this.myDocument.payment_methods_id;
                    //this.handlePaymentMethodChange(this.selectedPaymentMethod)

                })
                .catch(error => {
                    this.$toast(this.$t('Error connecting to the server'), 'error');
                });   
        },


        async fetchBanks() {
            try {
                const response = await axios.get('/banks/' + this.selectedCompany.id);
                this.banks = response.data.accounts;
                this.selectedBankAccount = await this.changePaymentMethodSystemId(this.banks, this.selectedBankAccount);
                this.options = this.banks;
            } catch (error) {
                this.$toast(this.$t('Error connecting to the server'), 'error');
                console.log("banks error");
                console.log(error);
            }
        },

        async fetchEmails() {
            try {
                const response = await axios.get('/emails/' + this.selectedCompany.id);
                this.emails = response.data.emails;
                this.selectedEmail = await this.changePaymentMethodSystemId(this.emails, this.selectedEmail);
                this.options = this.emails;
            } catch (error) {
                this.$toast(this.$t('Error connecting to the server'), 'error');
            }
        },

        async fetchPhones() {
            try {
                const response = await axios.get('/phones/' + this.selectedCompany.id);
                this.phones = response.data.phones;
                this.selectedPhone = await this.changePaymentMethodSystemId(this.phones, this.selectedPhone);
                this.options = this.phones;
            } catch (error) {
                this.$toast(this.$t('Error connecting to the server'), 'error');
            }
        },

        async changePaymentMethodSystemId(systemValues, selectedMethod) {
            console.log("Entra al methodSystem");
            if (this.selectedPaymentSystemId != null) {
                console.log("Entra al methodSystem");
                const value = systemValues.find(value => value.id === this.selectedPaymentSystemId);
                if (value) {
                    selectedMethod = value;
                    console.log(selectedMethod);
                } else {
                    selectedMethod = systemValues.length > 0 ? systemValues[0] : null;
                    console.log(selectedMethod);
                }
            } else {
                selectedMethod = systemValues.length > 0 ? systemValues[0] : null;
                console.log(selectedMethod);
            }

            return selectedMethod;
        },


        async fetchPayments () {
            await axios.get('/payment/' + this.selectedCompany.id)
            .then(response => {
                this.payment_methods = response.data.methods;
                this.selectedPaymentMethod = this.payment_methods[0]
            })
        },

        handleScroll() {
            let scrollPosition = window.scrollY;
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

        toggleMobileMenu() {
            this.isMobileMenuOpen = !this.isMobileMenuOpen;
        },

        async fetchCompanies() {
            try {
                const response = await axios.get('/companies-invoice');
                this.companies = response.data.companies;

                if (this.companies.length === 1) {
                    this.selectedCompany = this.companies[0];
                    this.companyId = this.selectedCompany.id;
                } else {
                    this.selectedCompany = this.companies[0];
                }

                const customersResponse = await axios.get('/customers/' + this.selectedCompany.id);
                this.customers = customersResponse.data.customers;

                if (this.customers.length === 1) {
                    this.selectedCustomer = this.customers[0];
                }

                this.loading = false;
            } catch (error) {
                console.error('Error fetching data:', error);
                this.loading = false;
            }
        },

        hideDialog() {
            this.selectACustomerDialog = false
            this.selectAPaymentMethodDialog = false
            this.customerDialog = false
            this.submitted = false;
        },
        
        openNew() {
            this.selectACustomerDialog = false;
            this.customer = {
                companyID: this.selectedCompany.id,
            };
            this.submitted = false;
            this.customerDialog = true;
        },

        selectACustomer() {
            this.selectACustomerDialog = true;
        },

        selectAPaymentMethod() {
            this.selectAPaymentMethodDialog = true;
        },

        saveCustomer() {

            axios.post('/customer', this.customer)
            .then(response => {
                this.customer.id = response.data.companyId;
                this.selectedCustomer = this.customer;
                this.customerDialog = false;      
            })
            .catch(error => {
                this.$toast(this.$t('Error connecting to the server'), 'error');
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

        async fetchDocuments() {
            await axios.get('/documents-type')
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

        handleListDocument() {
            this.documentListDialog = true
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
                reference: '5.01.02.003',
                description: 'Collar',
                price: 8,
                quantity: 1,
                discount: 15,
                discount_reason: 'Descuento profesional',
                subtotal: 0,
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
                this.serie = response.data.serie.number;

                if (this.selectedSerie.number <= this.serie) {
                
                    let respuesta = prompt(`El número de documento ya existe. ¿Qué deseas hacer?\n1. Conservar el número ingresado: ${(this.selectedSerie.serie)}${this.selectedSerie.number} \n2. Asignar el siguiente valor disponible: ${(this.selectedSerie.serie)}${++this.serie}`);

                    switch (respuesta) {
                        case null:
                            // Cancelar la operación en el prompt
                            this.$toast(this.$t('Operation cancelled.'), 'error');
                            break;
                        case '1':
                            // Conservar el número ingresado por el cliente
                            this.$toast(this.$t('The number entered will be retained: ') + this.selectedSerie.serie +this.selectedSerie.number, 'success');
                            this.serie = '';
                            this.saveDocument();
                            break;
                        case '2':
                            // Asignar el siguiente valor disponible
                            this.selectedSerie.number = this.serie;
                            this.$toast(this.$t('The following available number has been assigned: ') + this.selectedSerie.serie + this.selectedSerie.number, 'success');
                            this.serie = '';
                            this.saveDocument();
                            break;
                        default:
                            // Entrada no válida
                            this.$toast(this.$t('Invalid input.'), 'error');
                    }


                } else if (this.date > this.fecha) {

                    let dateFormateado = this.dateFormat(this.date)
                    let fechaFormateada = this.dateFormat(this.fecha)

                    let respuesta = prompt(`La fecha seleccionada es anterior a la de la última factura, ¿deseas asignarle la fecha actual?\n1. Conservar la fecha seleccionada: ${fechaFormateada} \n2. Asignar la fecha actual: ${dateFormateado}`);

                    switch (respuesta) {
                        case null:
                            // Cancelar la operación en el prompt
                            this.$toast(this.$t('Operation cancelled.'), 'error');
                            break;
                        case '1':
                            // Conservar la fecha ingresada por el cliente
                            this.$toast(this.$t('The date will be retained: ') + this.fecha, 'success');
                            this.saveDocument();
                            break;
                        case '2':
                            // Asignar la fecha actual
                            const today = new Date();
                            const year = today.getFullYear();
                            const month = (today.getMonth() + 1).toString().padStart(2, '0');
                            const day = today.getDate().toString().padStart(2, '0');
                            this.fecha = `${year}-${month}-${day}`;
                            
                            this.$toast(this.$t('The current date has been assigned.'), 'success');

                            this.saveDocument();
                            break;

                        default:
                            // Entrada no válida
                            this.$toast(this.$t('Invalid input.'), 'error');
                    }
                    
                
                
                }else{
                    this.saveDocument();
                }
            })
            .catch(error => {
                this.$toast(this.$t('Error saving document data.'), 'error');
                console.log(error)
            });    
        },

        myDocumentSave() {
            
            
            this.myDocument.number = this.selectedSerie.serie + this.selectedSerie.number
            this.myDocument.document_counter = this.selectedSerie.number
            this.myDocument.expiration = this.expiration
            this.myDocument.payment_methods_id = this.selectedPaymentMethod.id
            this.myDocument.payment_system_id = this.selectedPaymentSystemId
            this.myDocument.company_id_company = this.selectedCompany.id 
            this.myDocument.company_id_customer = this.selectedCustomer.id
            this.myDocument.documents_type_id = this.selectedType.id
            this.myDocument.documents_series_id = this.selectedSerie.id
            this.myDocument.date = this.fecha
            
            this.myDocument.document_counter = 1
            
            
            
            this.myDocument.subTotal = this.subtotal.toFixed(2)
            this.myDocument.totalTax = this.totalIVA.toFixed(2)
            this.myDocument.amount = this.totalConIVA.toFixed(2)
            
        },

        saveDocument(){
            
            this.myDocumentSave()

            if(this.selectedType.id == 1 ) {
                this.myDocument.invoiced = true
            }

            this.myDocument.concept = []
            this.products.forEach(product => {
                
                try {
                    let newProduct = {
                        reference: product.reference,
                        description: product.description,
                        quantity: product.quantity,
                        price: product.price,
                        taxes: product.taxes,
                        discount: product.discount,
                        discount_reason: product.discount_reason,
                        total: this.calculateTotal(product),
                        
                    };
                
                    this.myDocument.concept.push(newProduct);
                } catch (error) {
                    console.error("Error al crear el objeto newProduct:", error);
                }
                
                
                
            });
            axios.post('/documents', {documentData: this.myDocument})
            .then(response => {
        
                this.$toast(this.$t('Invoice saved correctly.'), 'success');
                this.myDocument.concept = []
                if (this.saveRestart) {
                    this.resetData();
                }
            })
            .catch(error => {
                this.$toast(this.$t('Error saving invoice.'), 'error');
                console.log(error)
                this.myDocument.concept = []
                

            });
        },


        resetData() {
            this.isSaving = true;
            setTimeout(function() {
                // Recargar la página
                window.location.reload();
            }, 1000);
            
        },

        calculateGross(product) {
            return product.quantity * product.price;
        },

        calculateTax(product) {
            product.priceTax = parseFloat((product.taxes / 100) * parseFloat(product.subTotal));
            return product.priceTax;
        },


        calculateTotal(product) {
            let taxAmount = this.calculateTax(product)
            product.total = taxAmount + parseFloat(product.subTotal)
            return product.total.toFixed(2)
        },

        calculateSubtotal(product) {
            let subtotalWithoutDiscount =  (parseFloat(product.quantity) * parseFloat(product.price))
            product.subTotal = subtotalWithoutDiscount - ((product.discount/100) * subtotalWithoutDiscount);
            return product.subTotal
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


        dateFormat(fecha) {
            // Convierte la fecha seleccionada a un objeto Date
            let date = new Date(fecha);

            // Obtén el día, mes y año de la fecha
            let dia = date.getDate();
            let mes = date.getMonth() + 1; // Los meses en JavaScript son de 0 a 11, por lo que se suma 1
            let año = date.getFullYear();

            // Añade un cero inicial si el día o mes son menores de 10
            if (dia < 10) {
            dia = '0' + dia;
            }
            if (mes < 10) {
            mes = '0' + mes;
            }

            // Construye la cadena con el formato español
            let fechaFormateada = `${dia}/${mes}/${año}`;

            return fechaFormateada;
        },

        // Método para manejar el prompt
        manejarFecha() {
            let fechaFormateada = this.dateFormat(this.fecha);

            let respuesta = prompt(
            `La fecha seleccionada (${fechaFormateada}) es anterior a la de la última factura, ¿deseas asignarle la fecha actual?\n1. Conservar la fecha seleccionada. \n2. Asignar la fecha actual.`
            );

            // Ahora puedes manejar la respuesta del usuario
            if (respuesta === '1') {
            console.log('Se conservará la fecha seleccionada:', fechaFormateada);
            // Aquí puedes poner el código para conservar la fecha seleccionada
            } else if (respuesta === '2') {
            let fechaActual = new Date().toISOString().split('T')[0]; // Obtén la fecha actual en formato YYYY-MM-DD
            let fechaActualFormateada = this.dateFormat(fechaActual); // Formatea la fecha actual a DD/MM/YYYY
            console.log('Se asignará la fecha actual:', fechaActualFormateada);
            // Aquí puedes poner el código para asignar la fecha actual
            } else {
            console.log('Opción no válida.');
            // Aquí puedes manejar opciones no válidas si es necesario
            }
        },

        calcularImporteBase(porcentajeIva, totalIvaRepercutido) {
            if (porcentajeIva <= 0) {
                return 0
            }
            return totalIvaRepercutido / (porcentajeIva / 100);
        },
        
        exportToPDF() {
            this.myDocumentSave()
            this.calculateTaxes().then(() => {
                this.showTable = !this.showTable;
                window.print();
            }).catch(error => {
                this.$toast(this.$t('Could not generate the PDF.'), 'error');
            });

        },
/*
        exportToXML() {
            try {
                this.myDocumentSave();
                this.calculateTaxes()
                    .then(() => {
                        this.myDocument.document_counter = 1;
                        const xmlContent = this.convertToFacturaeXML();
                        this.$toast(this.$t('XML document generated correctly.'), 'success');
                        this.addsign(xmlContent);
                        this.downloadXML(xmlContent, 'facturae.xml');
                    })
                    .catch(error => {
                        this.$toast(this.$t('Could not generate the XML.'), 'error');
                    });
            } catch (error) {
                this.$toast(this.$t('An unexpected error occurred.'), 'error');
            }
        },*/

        addsign(data){
            AutoScript.setForceWSMode(true);
            AutoScript.cargarAppAfirma();
            AutoScript.setServlets(window.location.origin + "/afirma-signature-storage/StorageService",
            window.location.origin + "/afirma-signature-retriever/RetrieveService");
            function successCallback() { console.log("OK"); }
            function errorCallback() { console.log("ERR"); }
            var dataB64 = AutoScript.getBase64FromText(data);
            AutoScript.signAndSaveToFile('sign', (dataB64 != undefined && dataB64 != null && dataB64 != "") ? dataB64 : null, "SHA512withRSA", "AUTO", "", null, successCallback, errorCallback);
        }, 


        exportToXML() {
            this.myDocumentSave()
            this.calculateTaxes().then(() => {  
            this.myDocument.document_counter = 1
            console.log("contador: " + this.myDocument.document_counter)
            const xmlContent = this.convertToFacturaeXML();
            this.$toast(this.$t('XML document generated correctly.'), 'success');
            this.addsign(xmlContent);
            //this.downloadXML(xmlContent, 'facturae.xml');
            });
            /* }).catch(error => {
                this.$toast(this.$t('Could not generate the XML.'), 'error');
            }); */
        },
    
        convertToFacturaeXML() {
            
            let xml = `<?xml version="1.0" encoding="UTF-8"?>
            <fe:Facturae xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:fe="http://www.facturae.es/Facturae/2014/v3.2.1/Facturae">
                <FileHeader>
                    <SchemaVersion>3.2.1</SchemaVersion>
                    <Modality>I</Modality>
                    <InvoiceIssuerType>EM</InvoiceIssuerType>
                    <Batch>
                        <BatchIdentifier>${this.selectedCompany.tax_number}${this.selectedSerie.number}${this.selectedSerie.serie}</BatchIdentifier>
                        <InvoicesCount>${this.myDocument.document_counter}</InvoicesCount>
                        <TotalInvoicesAmount>
                            <TotalAmount>${this.myDocument.amount}</TotalAmount>
                        </TotalInvoicesAmount>
                        <TotalOutstandingAmount>
                            <TotalAmount>${this.myDocument.amount}</TotalAmount>
                        </TotalOutstandingAmount>
                        <TotalExecutableAmount>
                            <TotalAmount>${this.myDocument.amount}</TotalAmount>
                        </TotalExecutableAmount>
                        <InvoiceCurrencyCode>EUR</InvoiceCurrencyCode>
                    </Batch>
                </FileHeader> 
                
                <Parties>
                    <SellerParty>
                        <TaxIdentification>
                            <PersonTypeCode>J</PersonTypeCode>
                            <ResidenceTypeCode>R</ResidenceTypeCode>
                            <TaxIdentificationNumber>${this.selectedCompany.tax_number}</TaxIdentificationNumber>
                        </TaxIdentification>
                        <LegalEntity>
                            <CorporateName>${this.selectedCompany.name}</CorporateName>
                            <AddressInSpain>
                                <Address>${this.selectedCompany.address}</Address>
                                <PostCode>${this.selectedCompany.post_code}</PostCode>
                                <Town>${this.selectedCompany.town}</Town>
                                <Province>${this.selectedCompany.province}</Province>
                                <CountryCode>ESP</CountryCode>
                            </AddressInSpain>
                            <ContactDetails>
                                <Telephone>${this.selectedCompany.phone}</Telephone>
                                <ElectronicMail>${this.selectedCompany.email}</ElectronicMail>
                            </ContactDetails>
                        </LegalEntity>
                    </SellerParty>
                    
                    <BuyerParty>
                        <TaxIdentification>
                            <PersonTypeCode>J</PersonTypeCode>
                            <ResidenceTypeCode>R</ResidenceTypeCode>
                            <TaxIdentificationNumber>${this.selectedCustomer.tax_number}</TaxIdentificationNumber>
                        </TaxIdentification>
                        <LegalEntity>
                            <CorporateName>${this.selectedCustomer.name}</CorporateName>
                            <AddressInSpain>
                                <Address>${this.selectedCustomer.address}</Address>
                                <PostCode>${this.selectedCustomer.post_code}</PostCode>
                                <Town>${this.selectedCustomer.town}</Town>
                                <Province>${this.selectedCustomer.province}</Province>
                                <CountryCode>ESP</CountryCode>
                            </AddressInSpain>
                            <ContactDetails>
                                <Telephone>${this.selectedCustomer.phone}</Telephone>
                                <ElectronicMail>${this.selectedCustomer.email}</ElectronicMail>
                            </ContactDetails>
                        </LegalEntity>
                    </BuyerParty> 
                </Parties>
                <Invoices>
                    <Invoice>
                        <InvoiceHeader>
                            <InvoiceNumber>${this.selectedSerie.number}</InvoiceNumber>
                            <InvoiceSeriesCode>${this.selectedSerie.serie}</InvoiceSeriesCode>
                            <InvoiceDocumentType>FC</InvoiceDocumentType>
                            <InvoiceClass>OO</InvoiceClass>
                        </InvoiceHeader>
                        <InvoiceIssueData>
                            <IssueDate>${this.myDocument.date}</IssueDate>
                            <InvoiceCurrencyCode>EUR</InvoiceCurrencyCode>
                            <TaxCurrencyCode>EUR</TaxCurrencyCode>
                            <LanguageName>es</LanguageName>
                        </InvoiceIssueData>
                        <TaxesOutputs>\n`;
                        // No Tocar
                        this.taxMap.forEach((value, tax) => {
                            
                            xml += '  <Tax>\n';
                            xml += `    <TaxTypeCode>01</TaxTypeCode>\n`;  
                            xml += `    <TaxRate>${parseFloat(tax).toFixed(2)}</TaxRate>\n`;
                            xml += '    <TaxableBase>\n';
                            xml += `      <TotalAmount>${ this.calcularImporteBase(tax,value).toFixed(2) }</TotalAmount>\n`;
                            xml += '    </TaxableBase>\n';   
                            xml += '    <TaxAmount>\n';
                            xml += `      <TotalAmount>${value.toFixed(2)}</TotalAmount>\n`;
                            xml += '    </TaxAmount>\n';
                            xml += '  </Tax>\n';
                        
                        });
                        
                        xml += `</TaxesOutputs>
                        <InvoiceTotals>
                            <TotalGrossAmount>${ this.subtotal.toFixed(2) }</TotalGrossAmount>
                            <TotalGeneralDiscounts>0.0</TotalGeneralDiscounts>
                            <TotalGeneralSurcharges>0.0</TotalGeneralSurcharges>
                            <TotalGrossAmountBeforeTaxes>${ this.subtotal.toFixed(2) }</TotalGrossAmountBeforeTaxes>
                            <TotalTaxOutputs>${this.totalIVA.toFixed(2)}</TotalTaxOutputs>
                            <TotalTaxesWithheld>0.0</TotalTaxesWithheld>
                            <InvoiceTotal>${ this.myDocument.amount }</InvoiceTotal>
                            <TotalOutstandingAmount>${ this.myDocument.amount }</TotalOutstandingAmount>
                            <TotalExecutableAmount>${ this.myDocument.amount }</TotalExecutableAmount>
                        </InvoiceTotals>
                        <Items>`;
                        
            
            this.products.forEach(product => {

                xml += `
                    <InvoiceLine>
                        <ItemDescription>${product.description}</ItemDescription>
                        <Quantity>${product.quantity}</Quantity>
                        <UnitOfMeasure>01</UnitOfMeasure>
                        <UnitPriceWithoutTax>${product.price}</UnitPriceWithoutTax>
                        <TotalCost>${product.quantity * product.price}</TotalCost>
                        <DiscountsAndRebates>
                            <Discount>
                                <DiscountReason>${product.discount_reason}</DiscountReason>
                                <DiscountRate>${parseFloat(product.discount).toFixed(1)}</DiscountRate>
                                <DiscountAmount>${((product.quantity * product.price) * (product.discount/ 100)).toFixed(1) }</DiscountAmount>
                            </Discount>
                        </DiscountsAndRebates>
                        <GrossAmount>${ product.subTotal }</GrossAmount>
                        <TaxesOutputs>
                            <Tax>
                                <TaxTypeCode>01</TaxTypeCode>
                                <TaxRate>${product.taxes}</TaxRate>
                                <TaxableBase>
                                    <TotalAmount>${product.subTotal}</TotalAmount>
                                </TaxableBase>
                                <TaxAmount>
                                    <TotalAmount>${product.priceTax.toFixed(2)}</TotalAmount>
                                </TaxAmount>
                            </Tax>
                        </TaxesOutputs>
                    </InvoiceLine>`;
                    
            });
            xml += `
                        </Items>
                    </Invoice>
                </Invoices>
            </fe:Facturae>`;
            return xml;
        },

        /*
        downloadXML(content, filename) {

            const blob = new Blob([content], { type: 'application/xml' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
            URL.revokeObjectURL(link.href);
        
        },*/

        cancelInvoice() {
            let respuesta = confirm("¿Está seguro? Los datos de esta factura serán descartados");
            if (respuesta) {
                this.resetData()
            }
        },
        
        calculateTaxes() {
            
            return new Promise((resolve, reject) => {
                try {
                    this.taxMap.clear();
                    this.products.forEach(product => {
                        let taxes = product.taxes;
                        let priceTax = parseFloat(product.priceTax);

                            if (this.taxMap.has(taxes)) {
                                let precioActual = this.taxMap.get(taxes);
                                this.taxMap.set(taxes, precioActual + priceTax);
                            } else {
                                this.taxMap.set(taxes, priceTax);
                            }
                    });

                    // Resolver la promesa una vez completado el cálculo y la preparación de datos
                    resolve();
                } catch (error) {
                    // En caso de error, rechazar la promesa
                    reject(error);
                }
            });
                }
            },
}
</script>

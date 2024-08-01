<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref } from 'vue';
const showingNavigationDropdown = ref(false);
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
                    <div :class="{'border-blue-500 border-2': isExpense, 'bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg': true}">
                        <div class="card"> 
                            <!-- Hamburger -->
                            <div class="-me-2 flex items-center sm:hidden">
                                <button class="inline-flex items-center justify-center p-2 bg-gray-100 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out" @click="showingNavigationDropdown = ! showingNavigationDropdown">
                                    <svg
                                        class="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            :class="{'hidden': showingNavigationDropdown, 'inline-flex': ! showingNavigationDropdown }"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            :class="{'hidden': ! showingNavigationDropdown, 'inline-flex': showingNavigationDropdown }"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <!-- Responsive Navigation Menu -->
                            <div :class="{'block': showingNavigationDropdown, 'hidden': ! showingNavigationDropdown}" class="sm:hidden bg-white">
                                <div class="text-center pt-2 pb-3 space-y-1">
                                    <ResponsiveNavLink @click="selectCompany()" >
                                        {{ myDocument.company.name }}
                                    </ResponsiveNavLink>
                                </div>
                                <div class="text-center pt-2 pb-3 space-y-1">
                                    <ResponsiveNavLink @click="handleListDocument()">
                                        {{ $t('Document check') }}
                                    </ResponsiveNavLink>
                                </div>
                                <div class="text-center pt-2 pb-3 space-y-1">
                                    <ResponsiveNavLink @click="resetData()">
                                        {{ $t('New invoice') }}
                                    </ResponsiveNavLink>
                                </div>
                                <div class="text-center pt-2 pb-3 space-y-1">
                                    <hr>
                                    <h3>{{ $t('Download') }}</h3>
                                    <hr>
                                    <div class="flex flex-col items-center space-y-2">
                                        <Button @click="exportToPDF">
                                            {{ $t('PDF') }}
                                        </Button>
                                        <Button @click="exportToXML">
                                            {{ $t('XML') }}
                                        </Button>
                                        <Button @click="exportToXML">
                                            {{ $t('XML Firmado') }}
                                        </Button>
                                    </div>
                                </div>

                                <div class="text-center pt-2 pb-3 space-y-1">
                                    <hr>
                                    <h3>{{ $t('Save') }}</h3>
                                    <hr>
                                    <div class="flex flex-col items-center space-y-2">
                                        <Button @click="saveAndReset">
                                            {{ $t('Guardar y crear nueva') }}
                                        </Button>
                                        <Button @click="saveAndSign">
                                            {{ $t('Firmar factura') }}
                                        </Button>
                                        <Button @click="cancelInvoice">
                                            {{ $t('Cancel') }}
                                        </Button>
                                    </div>
                                </div>

                            </div>
                            <div class="md:flex justify-between items-center hidden sm:block ">
                                
                                <div class="flex flex-col md:flex-row justify-start items-center">
                                    <div class="flex flex-wrap justify-start items-center">
                                        <div class="relative inline-block w-50 flex justify-between">
                                            <button
                                                v-if="!loading && (companies.length > 0)"
                                                type="button"
                                                class="px-4 py-2 bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-white flex items-center"
                                                @click="companies.length > 1 ? selectCompany() : null"
                                                :disabled="companies.length === 1">
                                                <span class="font-bold text-lg">
                                                    <i v-if="companies.length > 1" class="pi pi-plus mr-2"></i>
                                                    {{ myDocument.company.name }}
                                                </span>
                                            </button>
                
                                            <button
                                                type="button"
                                                class="ml-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-white rounded flex items-center justify-between"
                                                @click="handleListDocument()"
                                                :class="{ 'opacity-50': !myDocument.company.id }"
                                                :disabled="!myDocument.company.id">
                                                <span>
                                                    <i class="pi pi-eye mr-2"></i>
                                                    {{ $t('Document check') }}
                                                </span>
                                            </button>

                                        </div>
                                    </div>
                                </div>

                                <div class="flex items-center">
                                    <div id="app" class="relative inline-block w-50 ml-2">
                                        <div class="flex">
                                            <Button
                                                type="button"
                                                class="px-4 ml-2 py-2 bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-white text-white rounded flex items-center justify-between"
                                                @click="resetData()"
                                                :class="{ 'opacity-50': !myDocument.company.id }"
                                                :disabled="!myDocument.company.id">
                                                <span>
                                                    <i class="pi pi-plus mr-2"></i>
                                                    {{ $t('New invoice') }}
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    <div v-if="!isExpense" class="split-button-container ml-2">
                                        <SplitButton
                                            ref="splitButton"
                                            class="bg-purple-400 hover:bg-purple-500 focus:ring-4 focus:ring-pur-300 font-medium rounded-lg text-white text-white p-2"
                                            :label="$t('Download')"
                                            @click="handleClick"
                                            :model="itemsExport"
                                            :disabled="totalConIVA === 0 || isSaving || !myDocument.customer.id || !myDocument.serie.number"
                                            :class="{ 'opacity-50': totalConIVA === 0 || isSaving || !myDocument.customer.id || !myDocument.serie.number}">
                                            <template v-slot:icon>
                                                <i class="pi pi-download mr-2" :class="{ 'opacity-50': totalConIVA === 0 }"></i>
                                            </template>
                                        </SplitButton>
                                    </div>
                                    
                                    <div class="split-button-container ml-2">
                                        <SplitButton
                                            class="blue-button"
                                            :label="$t('Save')"
                                            @click="tryToSaveDocument"
                                            :model="itemsSave"
                                            :disabled="totalConIVA === 0 || isSaving || !myDocument.customer.id || !myDocument.serie.number"
                                            :class="{ 'opacity-50': totalConIVA === 0 || isSaving || !myDocument.customer.id || !myDocument.serie.number}">
                                            <template v-slot:icon>
                                                <i class="pi pi-save mr-2" :class="{ 'opacity-50': totalConIVA === 0 }"></i>
                                            </template>
                                        </SplitButton>
                                    </div>

                                </div>
                            </div>


                            <hr class="linea-grosor mt-5">
                        
                            <div class="selector flex flex-col md:flex-row justify-between mt-5 ml-12">
                                
                                <div class="showCustomer mt-12"> 
                                    <div class="grid md:grid-cols-1 text-m gap-y-1">
                                        <div class="flex items-center justify-between w-full">
                                            <div>
                                                <div v-if="!myDocument.customer.name" class="font-semibold whitespace-nowrap mr-3">
                                                    {{ isExpense ? $t('Select a provider') : $t('Select a customer') }}
                                                </div>
                                                <div v-else class="font-semibold mr-3 flex-shrink-0 w-32">
                                                    {{ isExpense ? $t('Provider') : $t('Customer') }}:
                                                </div>
                                            </div>
                                            <div class="text-gray-700 w-full font-bold text-lg">{{ myDocument.customer.name }}</div>
                                            <div class="relative w-full mr-20">
                                                <Button type="button" icon="pi pi-search" id="voice-search" @click="selectACustomer" class="bg-gray-100 p-2 rounded-md text-gray-900 text-sm hover:bg-gray-300"/>
                                            </div>
                                        </div>
                                        <div> 
                                            <div class="flex items-center justify-between w-full">
                                                <div class="font-semibold mr-3 flex-shrink-0 w-32">{{ $t('Tax number') }}:</div>
                                                <div class="text-gray-700 w-full uppercase">{{ myDocument.customer.tax_number }}</div>
                                            </div>
                                            <div class="flex items-center justify-between w-full">
                                                <div class="font-semibold mr-3 flex-shrink-0 w-32">{{ $t('Phone') }}:</div>
                                                <div class="text-gray-700 w-full">{{ myDocument.customer.phone }}</div>
                                            </div>
                                            <div class="flex items-center justify-between w-full">
                                                <div class="font-semibold mr-3 flex-shrink-0 w-32">{{ $t('Email') }}:</div>
                                                <div class="text-gray-700 w-full">{{ myDocument.customer.email }}</div>
                                            </div>
                                            <div class="flex items-center justify-between w-full">
                                                <div class="font-semibold mr-3 flex-shrink-0 w-32">{{ $t('Address') }}:</div>
                                                <div class="text-gray-700 w-full" v-if="myDocument.customer.name">
                                                    {{ myDocument.customer.address }}, {{ myDocument.customer.post_code }}, {{ myDocument.customer.town }}, {{ myDocument.customer.province }} ( {{ myDocument.customer.country }} )
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            
                                <div class="grid md:grid-cols-1 text-sm gap-y-1 mr-28">

                                    <label class="flex items-center cursor-pointer justify-end max-w-xs ml-auto">
                                        <span class="text-m font-medium text-gray-900 dark:text-gray-300 flex-shrink-0">{{ $t('Mark as paid') }}</span>

                                        <input type="checkbox" class="sr-only peer" v-model="myDocument.paid">
                                        <div class="relative w-11 h-6 ml-3 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    </label>
                                    
                                    <div class="flex items-center justify-end w-full mt-4">
                                        <div class="font-semibold mr-4 flex-shrink-0">{{ $t('Payment date') }}:</div>

                                        <div class="input-wrapper">
                                        <input type="date" :min="myDocument.date"  v-model="myDocument.datePaid" @change="cambiarFormatoFecha" 
                                            :disabled="false"
                                            :class="{
                                                'bg-gray-100 text-gray-300 cursor-not-allowed': !myDocument.paid, 
                                                'bg-white text-black': myDocument.paid,
                                                'pointer-events-none': !myDocument.paid
                                            }" 
                                            class="styled-input bg-gray-50 border border-gray-300 rounded-md w-48 px-3 py-2 focus:outline-none focus:border-blue-400">
                                        </div>
                                    </div>
                                    
        
                                    <form class="flex items-center">   
                                        <div class="font-semibold mr-8 min-w-20 flex-shrink-0">Nº {{ myDocument.type.name }}:</div>
                                        <div class="relative w-full">
                                            
                                            <div v-if="!isExpense" class="input-wrapper">
                                                <div class=" font-bold flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                                    {{ myDocument.serie.serie }} /
                                                </div>    
                                                <input type="text" id="voice-search" class="border-gray-300 rounded-md text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="myDocument.serie.number" required="">
                                                <Button type="button" icon="pi pi-search" @click="selectDocument()" class=" button-search font-bold flex absolute inset-y-0 right-0 items-center border-gray-300 pr-1"/>
                                            </div>
                                            <input v-else type="text" id="voice-search" class="border-gray-300 rounded-md text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-[161px] pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="myDocument.serie.number" required="">
                                        </div>
                                    </form>
                                    
                                    <div class="flex items-center justify-between w-full">
                                        <div class="font-semibold mr-3 flex-shrink-0">{{ $t('Date') }}:</div>
                                        <div class="input-wrapper">
                                            <input type="date" v-model="myDocument.date" @change="cambiarFormatoFecha" class="styled-input bg-gray-50 border border-gray-300 rounded-md w-48 px-3 py-2 focus:outline-none focus:border-blue-400">
                                        </div>
                                    </div>
                                    
                                    <div class="flex items-center justify-between w-full">
                                        <div class="font-semibold mr-3 flex-shrink-0">{{ $t('Expiration') }}:</div>
                                        <div class="input-wrapper">
                                            <input type="date" v-model="myDocument.expirationDate" :min="myDocument.date" @change="cambiarFormatoFecha" class="styled-input bg-gray-50 border border-gray-300 rounded-md w-48 px-3 py-2 focus:outline-none focus:border-blue-400">
                                        </div>
                                    </div>
                                    
                                </div>       
                            </div>  


                            <Toolbar class="mb-4 mt-8 border border-slate-200 ...">
                                <template #start>
                                    <div class="flex items-center justify-between ">
                                        <div class="flex items-center">
                                            <Button :label="$t('Concept')" icon="pi pi-plus" severity="success" class="mr-2 bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-white rounded-md p-2" @click="addRow" />
                                            <Button :label="$t('Delete')" icon="pi pi-trash" severity="danger" class="bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-white rounded-md p-2" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
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
                            <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id" class="w-full lg:w-4/4 mx-auto" :filters="filters">
                
                                <Column selectionMode="multiple" :exportable="false" class="datetable checkbox"></Column>
                                <Column field="reference" :header="$t('Reference')" sortable class="dateTable w-1/4">
                                    <template #body="slotProps">
                                        <InputText class="input w-full" :placeholder="$t('Reference')" v-model="slotProps.data.reference" />
                                    </template>
                                </Column>
                                <Column field="description" :header="$t('Concept')" sortable class="dateTable w-full">
                                    <template #body="slotProps">
                                        <div class="relative text-gray-600">
                                            <InputText v-model="slotProps.data.description" :placeholder="$t('Concept')"  class="input bg-white mt-3 rounded-md border border-gray-100 text-m"/>
                                            <Button type="submit" icon="pi pi-search-plus" @click="openDescriptionDialog(slotProps.data)" class="bg-gray-100 hover:bg-gray-200 p-2 absolute right-0 top-0 mt-3 mr-0.5 rounded rounded-r-lg rounded-l-none"/>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="quantity" :header="$t('Quantity')" sortable class="dateTable w-1/8">
                                    <template #body="slotProps">
                                        <InputText class="input input-short w-full" v-model="slotProps.data.quantity" />
                                    </template>
                                </Column>
                                <Column field="price" :header="$t('Price')" sortable class="dateTable w-1/8">
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
                                        <InputText class="input input-short w-1/12" :value="Calculator.calculateSubtotal(slotProps.data)" readonly />
                                    </template>
                                </Column>
                                <Column field="taxes" :header="$t('Tax (%)')" sortable class="dateTable w-1/4">
                                    <template #body="slotProps">
                                        <Dropdown class="input-short w-full" v-model="slotProps.data.taxes" :options="taxOptions" optionLabel="label" optionValue="value" />
                                    </template>
                                </Column>
                                <Column field="total" :header="$t('Total')" sortable class="dateTable w-1/12">
                                    <template #body="slotProps">
                                        <InputText class="input input-short w-1/12" :value="Calculator.calculateTotal(slotProps.data)" readonly />
                                    </template>
                                </Column>
                                <Column :exportable="false" :header="$t('Utility')" class="dateTable w-1/12">
                                    <template #body="slotProps">
                                        <Button icon="pi pi-trash" outlined rounded class="simpleDelete-button" severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                                    </template>
                                </Column>
                            </DataTable>

                            <div class="flex justify-end mt-4 pr-4" v-if="showButton">
                                <Button :label="$t('Concept')" icon="pi pi-plus" severity="success" class="bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-white" @click="addRow()" />
                            </div>
                            <!-- Totals section for large screens -->
                            <div class="hidden md:flex justify-between mt-4 pr-4 mb-4">
                                <!-- Columna izquierda -->
                                <div class="totals-container w-1/3"> <div class="ml-4 totals p-4 rounded-md">
                                        <table class="w-full">
                                            <tbody>
                                                <tr>
                                                    <td class="text-gray-600 pr-4">{{ $t('Payment method') }}:</td>
                                                    <td class="text-gray-600 pr-4">
                                                        <div class="relative w-full ml-4">
                                                            <div class="flex items-center pointer-events-none">
                                                                {{ selectedPaymentMethod.name }}
                                                            </div>
                                                            <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                                                                <Button type="button" icon="pi pi-search" id="voice-search" @click="selectAPaymentMethod()" class="bg-gray-100 p-2 rounded-md text-gray-900 text-sm hover:bg-gray-300"/>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    
                                                    
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
                                            <td class="text-gray-600 pr-4">
                                                {{ $t('Payment method') }}:
                                            </td>
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

            

            <!-- MODAL DESCRIPTION -->
            <Dialog v-model:visible="descriptionDialog" :style="{ width: '450px' }" :header="$t('Concept')" modal>
                <template v-slot:footer>
                    <Button :label="$t('Save')" icon="pi pi-check" @click="saveDescription"/>
                </template>
            
                <div style="display: flex; flex-direction: column;">
                    <textarea v-model="selectedDescription" rows="7"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        :placeholder="$t('Insert the description here')"></textarea>
                        <div style="display: flex; justify-content: flex-end; margin-top: 8px;">
                            <div :class="{'char-counter': true, 'text-red-500': charCount > 255}">
                                {{ charCount }}/255
                            </div>
                        </div>
                </div>
            </Dialog>

            

            <!-- MODAL COMPANY -->
            <Dialog v-model:visible="productDialog" :header="$t('Select companies')" :modal="true" @change="handleCompanySelection" class="p-fluid w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-4xl">
                <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">{{ $t('Select your company') }}:</label>
                <Dropdown v-model="myDocument.company" :options="companies" filter optionLabel="name" class="w-full h-11 md:w-64rem mb-4 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500" @change="handleCompanySelection">
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
                <Dropdown v-model="myDocument.type" :options="types" filter optionLabel="name" class="w-full h-11 md:w-64rem mb-4 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500" @change="fetchDocumentsSerie">
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
                <Dropdown v-model="myDocument.serie" :options="series" filter optionLabel="serie" class="w-full h-11 md:w-64rem mb-4 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500">
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
            <Dialog v-model:visible="documentListDialog" class="w-3/4" :header="isExpense ? $t('Received invoices') : $t('Emitted invoices')" :modal="true">
                <TableDocumentSelector :companyId="myDocument.company.id" :isExpense="isExpense" @document-selected="handleDocumentSelected"  />
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
                    <span v-if="companies">{{ $t('Are you sure you want to delete the selected conceptsTax?') }}</span>
                </div>
                <template #footer>
                    <Button :label="$t('No')" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                    <Button :label="$t('Yes')" icon="pi pi-check" text @click="deleteSelectedProducts" />
                </template>
            </Dialog>
        
            <!-- SELECT A CUSTOMER -->
            <Dialog v-model:visible="selectACustomerDialog" :header="isExpense ? $t('Select a provider') : $t('Select a customer')" id="titleCompany" :modal="true" class="p-fluid w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-4xl">
                <Dropdown v-model="myDocument.customer" :options="customers" filter optionLabel="name" class="w-full h-11 md:w-64rem mb-4 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500">
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
                        <button class="bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-white text-white p-2 mr-1 mr-1 rounded-md" @click="openNew">
                            <i class="pi pi-plus"></i> {{ isExpense ? $t('Create provider') : $t('Create customer') }}
                        </button>
                        <button class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="hideDialog()">{{ $t('Close') }}</button>
                    </div>   
                </div>
            </Dialog> 

            <!-- MODAL PAYMENT METHOD -->
            <Dialog v-model:visible="selectAPaymentMethodDialog" :header="$t('Select a payment method')" id="titleCompany" :modal="true" class="p-fluid w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-4xl">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Payment method') }}</label>
                <Dropdown v-model="selectedPaymentMethod" :options="paymentMethods" filter optionLabel="name" class="w-full h-11 md:w-64rem mb-4 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500">
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
                        <input type="text" id="name" v-model="customer.name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Company name')" required />
                        </div>
                        <div>
                        <label for="tax_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Tax number') }}</label>
                        <input type="text" id="tax_number" v-model="customer.tax_number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Tax number')" required />
                        </div>
                    </div>
                
                    <div class="mb-6">
                        <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Address') }}</label>
                        <input type="text" id="address1" v-model="customer.address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Address')" required/>
                    </div>
                
                    <div class="grid gap-3 mb-6 md:grid-cols-2"> 
                        <div>
                            <label for="town" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Town') }}</label>
                            <input type="text" id="town" v-model="customer.town" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Town')" required />
                        </div>  
                        <div>
                            <label for="province" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Province') }}</label>
                            <input type="text" id="province" v-model="customer.province" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Province')" required />
                        </div>  
                        <div>
                            <label for="post_code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Post code') }}</label>
                            <input type="text" id="post_code" v-model="customer.post_code" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Post code')" pattern="^\d+$" required />
                        </div>
                        <div>
                            <label for="country" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Country') }}</label>
                            <input type="text" id="country" v-model="customer.country" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Country')" required />
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Email') }}</label>
                            <input type="email" id="email" v-model="customer.email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('info@mycompany.com')" required/>
                        </div>    
                        <div>
                            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('Phone') }}</label>
                            <input type="tel" id="phone" v-model="customer.phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Phone')" pattern="(?:\+?(\d{1,3}))?\s?(?:\(?\d{1,4}\)?)?\s?\d{6,10}$" required />
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
                    <h3>{{ myDocument.type.name }}</h3>
                    <p><strong>{{ $t('Date') }}: </strong>{{ myDocument.date }}</p>
                    <p><strong>{{ $t('Expiration') }}: </strong>{{ myDocument.expirationDate }}</p>
                    <p><strong>{{ $t('Number of') }} {{ myDocument.type.name }}:</strong> {{ myDocument.serie.serie }} {{ myDocument.serie.number }}</p>
                </div>
            </div>
            
            <div class="invoice-info">
                <div class="company-details">
                    <h3><strong>{{ $t('Company') }}</strong></h3>
                    <p class="name">{{ myDocument.company.name }}</p>
                    <p>{{ myDocument.company.tax_number }}</p>
                    <p> {{ myDocument.company.address }}<br> {{ myDocument.company.post_code }}, {{ myDocument.company.town}}, {{ myDocument.company.province }}, {{'(' }} {{ myDocument.company.country }} {{ ')' }}</p>
                    <p> {{ myDocument.company.email }}</p>   
                    <p> {{ myDocument.company.phone }}</p>
                </div>
                <div class="customer-details">
                    <h3><strong>{{ $t('Customer') }}</strong></h3>
                    <p class="name">{{ myDocument.customer.name }}</p>
                    <p>{{ myDocument.customer.tax_number }}</p>
                    <p> {{ myDocument.customer.address }}<br> {{ myDocument.customer.post_code }}, {{ myDocument.customer.town}}, {{ myDocument.customer.province }}, {{'(' }} {{ myDocument.customer.country }} {{ ')' }}</p>
                    <p> {{ myDocument.customer.email }}</p>   
                    <p> {{ myDocument.customer.phone }}</p>
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
                        <td>{{ Calculator.calculateTotal(product) }}</td>
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
                        </tr>
                        
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
import { GenerateXML } from '@/Pages/Documents/js/GenerateXML.js';
import { Calculator } from '@/Pages/Documents/js/Calculator.js';
import TableDocumentSelector from '@/Pages/Companies/Partials/TableDocumentSelector.vue';
import { DataAccess } from '@/Pages/Utils/DataAccess/DataAccess.js';
import { Datejs } from '@/Pages/Utils/Date/Date.js';

export default {
    components: {
        TableDocumentSelector
    },
    data() {
        return {
            itemsSave: [
                {
                    label: this.$t('Guardar y crear nueva'),
                    icon: 'pi pi-refresh',
                    command: () => this.saveAndReset()
                },
                {
                    label: this.$t('Firmar factura'),
                    icon: 'pi pi-file-check',
                    command: () => this.saveAndSign(),
                    
                },
                {
                    label: this.$t('Cancelar'),
                    command: () => this.cancelInvoice()
                },
            ],
            itemsExport: [
                {
                    label: this.$t('PDF'),
                    icon: 'pi pi-file-pdf',
                    command: () => this.exportToPDF()
                },
                {
                    label: this.$t('XML'),
                    icon: 'pi pi-file',
                    command: () => this.exportToXML()
                },
                {
                    label: this.$t('XML Firmado'),
                    icon: 'pi pi-file-check',
                    command: () => GenerateXML.downloadSignedXml(),
                },
            ],
            taxMap: new Map(),
            formattedDate: '',
            loading: true,
            isSaving: false,
            isExpense: false,
            showTable: false,
            selectedOption: null,
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
            imageUrl: 'https://placehold.co/300x300/e2e8f0/e2e8f0',

            // Load arrays from DB
            companies: null,
            customers: null,
            paymentMethods: null,
            types: null,
            series: null,
            emails: null,
            phones: null,
            banks: null,
            products: [],

            //Modals
            
            deleteProductDialog: false,
            deleteProductsDialog: false,
            selectACustomerDialog: false,
            selectAPaymentMethodDialog: false,
            documentListDialog: false,
            descriptionDialog: false,
            productDialog: false,
            documentDialog: false,
            customerDialog: false,

            //PaymentMethods
            selectedPaymentMethod: '',
            selectedBankAccount: '',
            selectedEmail: '',
            selectedPhone: '',
            

            counter: '',

            //Buttons

            
            showButton: false, //Boton que tenemos que arreglar y es para que aparezca cuando haya mas de x productos
            
            
            
            

            selectedDescription: '',
            productDescription: '',
            options: [],
            conceptsTax: [],

            
            selectedProducts: [],
            selectedPaymentSystem: '',
            
            filters: {},
            customer: {},
            submitted: false,
            myDocument: { 
                documentCounter: '',
                number: '', 
                expirationDate: '',
                date: '',
                datePaid: '',
                amount: '',
                totalTax: '',
                subTotal: '',
                paid: false, 
                invoiced: false,  
                isReceived: false,             
                concept: {},
                customer: {},
                company: {},
                type: {},
                serie: {},
                paymentMethod: {},
                paymentSystem: {}

            },
        };
    },

    computed: {

        charCount() {
            if (this.selectedDescription === null) {
                return "";
            } else {
                return this.selectedDescription.length;
            }
        },

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

        this.isExpense = this.$page.props.isExpense;

        this.myDocument.isReceived = this.$page.props.isExpense

        this.myDocument.date = Datejs.getDate()
        this.myDocument.datePaid = Datejs.getDate()
        this.myDocument.expirationDate = Datejs.getExpirationDate()
    },

    async mounted() {

        await this.fetchCompanies();
        await this.fetchCustomers();
        await this.fetchPayments();

        if (!this.isExpense) {
                await this.fetchDocumentsType()
                await this.fetchDocumentsSerie () 
    
            } else {
                this.myDocument.type.id = 1
                this.myDocument.type.name = "Factura"
                this.myDocument.serie = []
        }

    },

    watch: {
        selectedPaymentMethod (newMethod) {
            this.handlePaymentMethodChange(newMethod);
        },

        selectedOption(newValue) {
            
            if (newValue) {
                switch (this.selectedPaymentMethod.id) {
                    
                case 1:
                case 7:
                    this.selectedBankAccount = newValue;
                    this.selectedPaymentSystem = newValue
                    break;
                case 3:
                    this.selectedPhone = newValue;
                    this.selectedPaymentSystem = newValue
                    break;
                case 4:
                    this.selectedEmail = newValue;
                    this.selectedPaymentSystem = newValue
                    break;
                default:
                    this.selectedPaymentSystem = '';
                    break;
                }
            }
        }
    
    },
    
    methods: {

        //Trae un array de valores para la seleccion dependiendo de la url que se mande 
        async fetchData (url) {
            
            const response = await DataAccess.fetchData(url)
            if (response.type === 'success') {
                return response.result
            }else{
                this.$toast(this.$t('Error connecting to the server'), 'error');
            }
        },

        //Guarda un objeto en DB según la url que se mande 
        async saveData (url, object) {  
            const response = await DataAccess.saveData(url, object)
            if (response.type === 'success') {
                this.$toast(this.$t(response.message), 'success');
                return response.result
            }else{
                this.$toast(this.$t('Error connecting to the server'), 'error');
            }
        },

        // Prepara la llamada para traer metodos de pago
        async fetchPayments () {
            
            this.paymentMethods = await this.fetchData(this.mountUrl('payment'));
            this.selectedPaymentMethod =  this.paymentMethods[0]

        },

        // Prepara la llamada para traer las compañias
        async fetchCompanies() {
            try {
                this.companies = await this.fetchData('/companies-invoice');

                if (this.companies.length === 1) {
                    this.myDocument.company = this.companies[0];
                    
                    this.companyId = this.myDocument.company.id;
                } else {
                    this.myDocument.company = this.companies[0];
                }
                this.loading = false;
            } catch (error) {
                console.error('Error fetching data:', error);
                this.loading = false;
            }
        },

        //Trae todos las empresas de la base de datos dependiendo si estas en facturas ingresos / gastos pasa a provider o a cliente       
        async fetchCustomers() {

            const url = this.isExpense 
                    ? `/providers/${this.myDocument.company.id}` 
                    : `/customers/${this.myDocument.company.id}`;

            this.customers = await this.fetchData(url);

            if (this.customers.length === 1) {
                this.myDocument.customer = this.customers[0];
            }

            this.loading = false;     
        },

        //Trae de la base de datos el tipo de documento
        async fetchDocumentsType() {
            this.types = await this.fetchData('/documents-type')   
            this.myDocument.type = this.types[0];
            this.fetchDocumentsSerie()
        },

        //Trae de la base de datos el numero de serie de documento
        async fetchDocumentsSerie () {
            this.series = await this.fetchData('/documents-serie/'+this.myDocument.type.id+'/'+this.myDocument.company.id)  
            this.myDocument.serie = this.series[0]; 
            this.loading = false;     
        },

        changePaymentMethodSystemId(systemValues) {
            let selectedMethod;
            if (this.selectedPaymentSystem != null) {
                let value = systemValues.find(value => value.id === this.selectedPaymentSystem);
                if (value) {
                    selectedMethod = value;
                } else {
                    selectedMethod = systemValues.length > 0 ? systemValues[0] : null;
                }
            } else {
                selectedMethod = systemValues.length > 0 ? systemValues[0] : null;
            }

            return selectedMethod;
        },
        

        async handlePaymentMethodChange(paymentMethod) {
            switch (paymentMethod.id) {
                case 1:
                    this.selectedPaymentMethod.name = "Transferencia"
                    this.banks = await this.fetchData(this.mountUrl('banks'));
                    this.selectedBankAccount = await this.changePaymentMethodSystemId(this.banks);
                    this.options = this.banks
                    break;
                case 2:
                    this.selectedPaymentMethod.name = "Efectivo"
                    break;
                case 3:
                    this.selectedPaymentMethod.name = "Bizum"
                    this.phones = await this.fetchData(this.mountUrl('phones'));
                    this.selectedPhone = await this.changePaymentMethodSystemId(this.phones);
                    this.options = this.phones       
                    break;
                case 4:
                    this.selectedPaymentMethod.name = "Paypal" 
                    this.emails = await this.fetchData(this.mountUrl('emails'));
                    this.selectedEmail = await this.changePaymentMethodSystemId(this.emails);
                    this.options = this.emails
                    break;
                case 5:
                    this.selectedPaymentMethod.name = "Tarjeta"
                    break;
                case 6:
                    this.selectedPaymentMethod.name = "Cheque"
                    break;
                case 7:
                    this.selectedPaymentMethod.name = "Domiciliación"
                    this.banks = await this.fetchData(this.mountUrl('banks'));
                    this.selectedBankAccount = await this.changePaymentMethodSystemId(this.banks);
                    this.options = this.banks
                    break;    
                default:
                    break; 
            }
        },

        //Construye una url para diferenciar si estamos en la parte de facturas ingresos / gastos 
        mountUrl (url) {
            url = this.isExpense 
                ? `/${url}/${this.myDocument.customer.id}` 
                : `/${url}/${this.myDocument.company.id}`;

            return url;
        },

        addsign(data){
            if (this.myDocument.id == null) {
                alert("Guarda el documento");
            } else {
                
                AutoScript.setForceWSMode(true);
                AutoScript.cargarAppAfirma();
                AutoScript.setServlets(window.location.origin + "/afirma-signature-storage/StorageService",
                window.location.origin + "/afirma-signature-retriever/RetrieveService");

                const mycompany_id = this.company.id;
                const mydocument_id = this.myDocument.id;

                function successCallback(dataB64, cert) {
                    axios.post('/documents-sign', {
                        datasing: {
                            'company_id': mycompany_id,
                            'document_id': mydocument_id,
                            'document_data': dataB64,
                        }
                    })
                    .then(response => {
                        console.log("OK in the signed"); 
                    })
                    .catch(error => {
                        console.log(error)
                    });
                }

                //successCallback(AutoScript.getBase64FromText(data), null)

                function errorCallback(type,message) { console.log("ERR"); }

                let dataB64 = AutoScript.getBase64FromText(data);
                AutoScript.sign('sign', (dataB64 != undefined && dataB64 != null && dataB64 != "") ? dataB64 : null, "SHA512withRSA", "XAdES", "", null, successCallback, errorCallback);
            }
        },


        openDescriptionDialog(data) {
            this.productDescription = data
            this.selectedDescription = data.description;
            this.descriptionDialog = true;
        },
        
        saveDescription() {
            if ((this.selectedDescription === null) || (this.selectedDescription.length <= 255)) {
                this.products.forEach(product => {
                    if (this.productDescription.id === product.id) {
                        product.description = this.selectedDescription;
                    }
                });
                this.descriptionDialog = false;
                this.selectedDescription = '';
                
            } else {
                this.$toast(this.$t('Too many characters, need to be 255 at maximum'), 'error');
            }
        },

        exportToXML() {
            this.addValuesToDocument()
            this.calculateTaxes().then(() => {  
            this.myDocument.document_counter = 1
            const xmlContent = GenerateXML.convertToFacturaeXML(this.myDocument.company, this.myDocument.serie, this.myDocument, 
            this.myDocument.customer, this.taxMap, this.products, this.subtotal, this.totalIVA);
            
            console.log("contador: " + this.myDocument.document_counter)
            this.$toast(this.$t('XML document generated correctly.'), 'success');
            GenerateXML.downloadXML(xmlContent, 'factura.xml')
            }).catch(error => {
                console.log(error);
                this.$toast(this.$t('Could not generate the XML.'), 'error');
            });
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
                companyID: this.myDocument.company.id,
            };
            this.submitted = false;
            this.customerDialog = true;
        },

        selectACustomer() {
            this.selectACustomerDialog = true;
        },

        selectAProvider() {
            this.selectACustomerDialog = true;
        },

        selectAPaymentMethod() {
            this.selectAPaymentMethodDialog = true;
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
        
        async saveCustomer() {

            const url = this.isExpense 
                    ? `/provider/` 
                    : `/customer/`;

            let customersResponse = await this.saveData(url, this.customer);

            this.customer.id = customersResponse
            this.myDocument.customer = this.customer;

            this.customerDialog = false;
        },

        

        async handleCompanySelection() {
            this.myDocument.customer = [];
            try {
                await this.fetchCustomers();
                await this.fetchDocumentsType();
                await this.fetchDocumentsSerie();
                await this.fetchPayments();
                this.customers = response.data.customers;   
                
                if (this.customers.length === 1) {
                    this.myDocument.customer = this.customers[0];
                }
            } catch (error) {
                console.error('Error fetching phone data:', error);
            }
        },

        handleListDocument() {
            this.documentListDialog = true
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
                reference: '1.1.1.1',
                description: 'pruebaDesc',
                price: 1,
                quantity: 10,
                discount: 1,
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

        handleClick() {
            // Simula un clic en el ícono del desplegable para abrirlo
            this.$nextTick(() => {
                const splitButton = this.$refs.splitButton.$el;
                const dropdownIcon = splitButton.querySelector('.p-splitbutton-menubutton');
                if (dropdownIcon) {
                    dropdownIcon.classList.add('no-print');
                    dropdownIcon.click();

                }
            });
        },

        async tryToSaveDocument(){

            await this.checkDocument()
            await this.addValuesToDocument()
            await this.addProducts()
            await this.saveDocument()
            
        },

        async checkDocument() {

            //Factura Gastos
            if (this.isExpense) {
                this.saveDocument();
                return;
            }

            //Factura Ingresos

            if(this.myDocument.type.id == 1 ) {
                this.myDocument.invoiced = true
            }
            
            let response = await this.fetchData(`/documents-serie/${this.myDocument.type.id}/${this.myDocument.company.id}/${this.myDocument.serie.serie}`);
            let oldDate = response.date.date;
            let serie = response.number.number;

            if (this.myDocument.serie.number <= serie) {
                await this.handleExistingSerie(serie);
            } else if (oldDate > this.myDocument.date) {
                await this.handleOldDate(oldDate);
            } 
        },

        async handleExistingSerie(serie) {
            let userInput = prompt(
                `El número de documento ya existe. ¿Qué deseas hacer?\n1. Conservar el número ingresado: ${this.myDocument.serie.serie}${this.myDocument.serie.number} \n2. Asignar el siguiente valor disponible: ${this.myDocument.serie.serie}${++serie}`
            );

            switch (userInput) {
                case null:
                    this.$toast(this.$t('Operation cancelled.'), 'error');
                    break;
                case '1':
                    this.$toast(this.$t('The number entered will be retained: ') + this.myDocument.serie.serie + this.myDocument.serie.number, 'success');
                    break;
                case '2':
                    this.updateDate = true;
                    this.myDocument.serie.number = serie;
                    this.$toast(this.$t('The following available number has been assigned: ') + this.myDocument.serie.serie + this.myDocument.serie.number, 'success');
                    break;
                default:
                    this.$toast(this.$t('Invalid input.'), 'error');
            }
        },

        async handleOldDate(oldDate) {
            let formattedOldDate = Datejs.dateFormat(oldDate);
            let formattedDate = Datejs.dateFormat(this.myDocument.date);

            let userInput = prompt(
                `La fecha seleccionada es anterior a la de la última factura, ¿deseas asignarle la fecha actual?\n1. Conservar la fecha seleccionada: ${formattedDate} \n2. Asignar la fecha actual: ${formattedOldDate}`
            );

            switch (userInput) {
                case null:
                    this.$toast(this.$t('Operation cancelled.'), 'error');
                    break;
                case '1':
                    this.$toast(this.$t('The date will be retained: ') + this.myDocument.date, 'success');
                    this.addValuesToDocument();
                    break;
                case '2':
                    this.myDocument.date = Datejs.getDate();
                    this.$toast(this.$t('The current date has been assigned.'), 'success');
                    this.addValuesToDocument();
                    break;
                default:
                    this.$toast(this.$t('Invalid input.'), 'error');
            }
        },

        async addValuesToDocument() {
            this.assignDocumentNumber();
            this.assignDatePaid();
            this.updateDocumentDates();

            this.myDocument.paymentMethod = this.selectedPaymentMethod;
            this.myDocument.paymentSystem = this.selectedPaymentSystem;
            this.myDocument.documentCounter = 1;
            this.myDocument.subTotal = this.subtotal.toFixed(2);
            this.myDocument.totalTax = this.totalIVA.toFixed(2);
            this.myDocument.amount = this.totalConIVA.toFixed(2);
        },

        assignDocumentNumber() {
            if (!this.isExpense) {
                this.myDocument.number = this.myDocument.serie.serie + this.myDocument.serie.number;
                this.myDocument.document_counter = this.myDocument.serie.number;
            } else {
                this.myDocument.number = this.myDocument.serie.number;
                this.myDocument.documents_series_id = '';
            }
        },

        assignDatePaid() {
            this.myDocument.datePaid = this.myDocument.paid ? this.myDocument.datePaid : '';
        },

        updateDocumentDates() {
            if (this.updateDate) {
                this.myDocument.date = Datejs.getDate();
                this.myDocument.expirationDate = Datejs.getExpirationDate();
                this.updateDate = false;
            } else {
                this.myDocument.expirationDate = this.myDocument.expirationDate;
                this.myDocument.date = this.myDocument.date;
            }
        },

        async addProducts () {
            this.myDocument.concept = {}
            this.myDocument.concept = this.products;         
        },
        
        async saveDocument() {
            console.log(this.myDocument)
            let response = await this.saveData('/documents', this.myDocument)      
            this.myDocument.id = response
            this.myDocument.concept = []
            if (this.saveRestart) {
                this.resetData();
            }
        },
                
        resetData() {
            this.isSaving = true;
            setTimeout(function() {
                // Recargar la página
                window.location.reload();
            }, 1000);
            
        },
        
        exportToPDF() {
            this.addValuesToDocument()
            this.calculateTaxes().then(() => {
                this.showTable = !this.showTable;
                window.print();
            }).catch(error => {
                this.$toast(this.$t('Could not generate the PDF.'), 'error');
            });

        },

        cancelInvoice() {
            let respuesta = confirm("Los cambios no serán guardados");
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

<style scoped>
@media print {
    .no-print {
        display: none !important;
    }
}
</style>
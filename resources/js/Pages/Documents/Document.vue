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
                    <div :class="{'border-blue-500 border-2': isChecked, 'bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg': true}">
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
                                        {{ selectedCompany.name }}
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
                                                    {{ selectedCompany.name }}
                                                </span>
                                            </button>
                
                                            <button
                                                type="button"
                                                class="ml-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-white rounded flex items-center justify-between"
                                                @click="handleListDocument()"
                                                :class="{ 'opacity-50': !selectedCompany.id }"
                                                :disabled="!selectedCompany.id">
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
                                                :class="{ 'opacity-50': !selectedCompany.id }"
                                                :disabled="!selectedCompany.id">
                                                <span>
                                                    <i class="pi pi-plus mr-2"></i>
                                                    {{ $t('New invoice') }}
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    <div v-if="!isChecked" class="split-button-container ml-2">
                                        <SplitButton
                                            ref="splitButton"
                                            class="bg-purple-400 hover:bg-purple-500 focus:ring-4 focus:ring-pur-300 font-medium rounded-lg text-white text-white p-2"
                                            :label="$t('Download')"
                                            @click="handleClick"
                                            :model="itemsExport"
                                            :disabled="totalConIVA === 0 || isSaving || !selectedCustomer.id || !selectedSerie.number"
                                            :class="{ 'opacity-50': totalConIVA === 0 || isSaving || !selectedCustomer.id || !selectedSerie.number}">
                                            <template v-slot:icon>
                                                <i class="pi pi-download mr-2" :class="{ 'opacity-50': totalConIVA === 0 }"></i>
                                            </template>
                                        </SplitButton>
                                    </div>
                                    
                                    <div class="split-button-container ml-2">
                                        <SplitButton
                                            class="blue-button"
                                            :label="$t('Save')"
                                            @click="checkDocument"
                                            :model="itemsSave"
                                            :disabled="totalConIVA === 0 || isSaving || !selectedCustomer.id || !selectedSerie.number"
                                            :class="{ 'opacity-50': totalConIVA === 0 || isSaving || !selectedCustomer.id || !selectedSerie.number}">
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
                                                <div v-if="!selectedCustomer.name" class="font-semibold whitespace-nowrap mr-3">
                                                    {{ isChecked ? $t('Select a provider') : $t('Select a customer') }}
                                                </div>
                                                <div v-else class="font-semibold mr-3 flex-shrink-0 w-32">
                                                    {{ isChecked ? $t('Provider') : $t('Customer') }}:
                                                </div>
                                            </div>
                                            <div class="text-gray-700 w-full font-bold text-lg">{{ selectedCustomer.name }}</div>
                                            <div class="relative w-full mr-20">
                                                <Button type="button" icon="pi pi-search" id="voice-search" @click="selectACustomer" class="bg-gray-100 p-2 rounded-md text-gray-900 text-sm hover:bg-gray-300"/>
                                            </div>
                                        </div>
                                        <div> 
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
                                                <div class="text-gray-700 w-full" v-if="selectedCustomer.name">
                                                    {{ selectedCustomer.address }}, {{ selectedCustomer.post_code }}, {{ selectedCustomer.town }}, {{ selectedCustomer.province }} ( {{ selectedCustomer.country }} )
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
                                        <input type="date" :min="fecha"  v-model="fechaPaid" @change="cambiarFormatoFecha" 
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
                                        <div class="font-semibold mr-8 min-w-20 flex-shrink-0">Nº {{ selectedType.name }}:</div>
                                        <div class="relative w-full">
                                            
                                            <div v-if="!isChecked" class="input-wrapper">
                                                <div class=" font-bold flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                                    {{ selectedSerie.serie }} /
                                                </div>    
                                                <input type="text" id="voice-search" class="border-gray-300 rounded-md text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="selectedSerie.number" required="">
                                                <Button type="button" icon="pi pi-search" @click="selectDocument()" class=" button-search font-bold flex absolute inset-y-0 right-0 items-center border-gray-300 pr-1"/>
                                            </div>
                                            <input v-else type="text" id="voice-search" class="border-gray-300 rounded-md text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-[161px] pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="selectedSerie.number" required="">
                                        </div>
                                    </form>
                                    
                                    <div class="flex items-center justify-between w-full">
                                        <div class="font-semibold mr-3 flex-shrink-0">{{ $t('Date') }}:</div>
                                        <div class="input-wrapper">
                                            <input type="date" v-model="fecha" @change="cambiarFormatoFecha" class="styled-input bg-gray-50 border border-gray-300 rounded-md w-48 px-3 py-2 focus:outline-none focus:border-blue-400">
                                        </div>
                                    </div>
                                    
                                    <div class="flex items-center justify-between w-full">
                                        <div class="font-semibold mr-3 flex-shrink-0">{{ $t('Expiration') }}:</div>
                                        <div class="input-wrapper">
                                            <input type="date" v-model="expiration" :min="fecha" @change="cambiarFormatoFecha" class="styled-input bg-gray-50 border border-gray-300 rounded-md w-48 px-3 py-2 focus:outline-none focus:border-blue-400">
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
            <Dialog v-model:visible="documentListDialog" class="w-3/4" :header="isChecked ? $t('Received invoices') : $t('Emitted invoices')" :modal="true">
                <TableDocumentSelector :companyId="selectedCompany.id" :isChecked="isChecked" @document-selected="handleDocumentSelected"  />
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
            <Dialog v-model:visible="selectACustomerDialog" :header="isChecked ? $t('Select a provider') : $t('Select a customer')" id="titleCompany" :modal="true" class="p-fluid w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-4xl">
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
                        <button class="bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-white text-white p-2 mr-1 mr-1 rounded-md" @click="openNew">
                            <i class="pi pi-plus"></i> {{ isChecked ? $t('Create provider') : $t('Create customer') }}
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
import TableDocumentSelector from '@/Pages/Companies/Partials/TableDocumentSelector.vue';

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
                    command: () => this.downloadSignedXml(),
                },
            ],
            taxMap: new Map(),
            today: new Date(),
            fecha: '',
            fechaPaid: '',
            expiration: '',
            fechaFormateada: '',
            loading: true,
            isSaving: false,
            isChecked: false,
            isMobileMenuOpen: false,
            showTable: false,
            isDropdownOpen: false,
            selectedOption: null,
            saveRestart: false,
            taxTypes: [],
            taxValues: [],
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
            updateDate: false,
            showButton: false,
            productDialog: false,
            documentDialog: false,
            customerDialog: false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
            selectACustomerDialog: false,
            selectAPaymentMethodDialog: false,
            documentListDialog: false,
            descriptionDialog: false,
            selectedDescription: '',
            productDescription: '',
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
            payment_methods: null,
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
                date_paid: '',
                amount: '',
                payment_methods_id: '',
                totalTax: '',
                subTotal: '',
                paid: false, 
                invoiced: false,  
                isReceived: false,             
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

    async created() {
        this.filters = {
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        };

        this.isChecked = this.$page.props.isChecked;

        this.myDocument.isReceived = this.$page.props.isChecked

        console.log("isChecked Create " + this.isChecked)

        this.fecha = await this.getDate()
        this.fechaPaid = await this.getDate()
        this.expiration = await this.getExpirationDate()
    },

    async mounted() {

        await this.fetchCompanies();
        await this.fetchCustomers();

        await this.fetchPayments();



        if (!this.isChecked) {
                await this.fetchDocuments()
            } else {
                this.selectedType.id = 1
                this.selectedType.name = "Factura"
                this.selectedSerie = []
        }

    },

    watch: {

        fecha(date) {
            this.validateDate()
        },

        selectedPaymentMethod(newMethod) {
            console.log("PaymentId " + newMethod.id)
            this.handlePaymentMethodChange(newMethod);
        },

        selectedOption(newValue) {
            console.log("NewValue")
            console.log(newValue)
            
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

        saveAndSign() {

            this.myDocumentSave()
            this.calculateTaxes().then(() => {
                this.myDocument.document_counter = 1
                console.log("contador: " + this.myDocument.document_counter)
                const xmlContent = this.convertToFacturaeXML();
                this.addsign(xmlContent);
            });
            
        },

        addsign(data){

            if (this.myDocument.id == null) {
                alert("Guarda el documeno");
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
                AutoScript.sign((dataB64 != undefined && dataB64 != null && dataB64 != "") ? dataB64 : null, "SHA512withRSA", "AUTO", "", successCallback, errorCallback);

            }
        },

      /*  addsign(data){
            console.log("aqui")
            if (this.myDocument.id == null) {
                alert("Guarda el documeno");
            } else {
                
            
            AutoScript.setForceWSMode(true);
            AutoScript.cargarAppAfirma();
            AutoScript.setServlets(window.location.origin + "/afirma-signature-storage/StorageService",
            window.location.origin + "/afirma-signature-retriever/RetrieveService");
            
            const myDocumentData = {
                'company_id': this.selectedCompany.id,
                'document_id': this.myDocument.id,
                'document_data': data,
            }
      
            const successCallback = (dataB64, cert) => {
                axios.post('/documents-sign', {datasing: myDocumentData})
                .then(response => {
                    this.$toast(this.$t('Document signed successfully.'), 'success');
                })
                .catch(error => {
                    this.$toast(this.$t('Error signing document: ') + error.message, 'error');
                });
            }

            successCallback(AutoScript.getBase64FromText(data), null)
           /* const errorCallback = (type, message) => { 
                this.$toast(message, 'error');
            }

            
            let dataB64 = AutoScript.getBase64FromText(data);
            AutoScript.signAndSaveToFile('sign', (dataB64 != undefined && dataB64 != null && dataB64 != "") ? dataB64 : null, "SHA512withRSA", "XAdES", "", null, successCallback, errorCallback);
            }

        }

        },*/



        validateDate() {
            if (new Date(this.fecha) > new Date(this.expiration)) {
                alert('La fecha seleccionada no puede ser mayor que la fecha de vencimiento.');
                this.fecha = this.getDate();
                this.expiration = this.getExpirationDate();
                this.fechaPaid = this.fecha;            }
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

        async handleDocumentSelected(documentId) {
            if (documentId) {
                this.documentListDialog = false
            }
            this.company = this.selectedCompany;
            this.company.documentId = documentId

            const response = await axios.get('/documents-show/' + this.company.id + '/' + this.company.documentId)
                if(response) {

                    // Document
                    this.myDocument = response.data.documents;
                    this.fecha = this.myDocument.date;
                    
                    this.expiration = this.myDocument.expiration;
                    this.selectedType.name = this.myDocument.document_type_name;
                    this.selectedType.id = this.myDocument.documents_type_id;
                    this.selectedSerie.id = this.myDocument.documents_series_id;
                    this.selectedSerie.serie = this.myDocument.document_series_serie;
                    this.selectedPaymentSystemId = this.myDocument.payment_system_id
                    this.selectedPaymentMethod.id = this.myDocument.payment_methods_id

                    let number = this.myDocument.number;
                    let numberWithoutSerie = number.replace(this.selectedSerie.serie, '');

                    this.selectedSerie.number = numberWithoutSerie;

                    if (this.myDocument.paid === 0 ) {
                        this.fechaPaid = await this.getDate();
                        this.myDocument.paid = false
                    } else {
                        this.fechaPaid = this.myDocument.date_paid;
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

                } else { 
                    this.$toast(this.$t('Error connecting to the server'), 'error');
                };   
        },


        async fetchBanks() {
            try {
                const response = await axios.get('/banks/' + this.selectedCompany.id);
                this.banks = response.data.accounts;
                console.log("this.banks")
                console.log(this.banks)
                this.selectedBankAccount = await this.changePaymentMethodSystemId(this.banks);
                this.selectedPaymentSystemId = this.selectedBankAccount.id
                console.log("selectedBankaccount")
                console.log(this.selectedBankAccount)
                this.options = this.banks;
            } catch (error) {
                this.$toast(this.$t('Error connecting to the server'), 'error');
                console.log("banks error");
                console.log(error);
            }
        },

        async fetchEmails() {
            try {
                const url = this.isChecked 
                        ? `/emails/${this.selectedCustomer.id}` 
                        : `/emails/${this.selectedCompany.id}`;
                    
                const emailResponse = await axios.get(url);

                this.emails = emailResponse.data.emails;
                this.selectedEmail = await this.changePaymentMethodSystemId(this.emails);
                this.options = this.emails;
            } catch (error) {
                this.$toast(this.$t('Error connecting to the server'), 'error');
            }
        },

        async fetchPhones() {
            
            try {
                const url = this.isChecked 
                        ? `/phones/${this.selectedCustomer.id}` 
                        : `/phones/${this.selectedCompany.id}`;
                    
                const phonesResponse = await axios.get(url);

                this.phones = phonesResponse.data.phones;

                this.selectedPhone = await this.changePaymentMethodSystemId(this.phones);
                this.options = this.phones;
            } catch (error) {
                this.$toast(this.$t('Error connecting to the server'), 'error');
            }
        },

        async changePaymentMethodSystemId(systemValues) {
            let selectedMethod;
            console.log("Entra al methodSystem1");
            if (this.selectedPaymentSystemId != null) {
                console.log("Entra al methodSystem2");
                let value = systemValues.find(value => value.id === this.selectedPaymentSystemId);
                console.log(this.selectedPaymentSystemId)
                console.log(systemValues)
                console.log("Value ")
                console.log(value)
                if (value) {
                    console.log("if value")
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

            const url = this.isChecked 
                    ? `/payment/${this.selectedCustomer.id}` 
                    : `/payment/${this.selectedCompany.id}`;
                
            const paymentResponse = await axios.get(url);

            this.payment_methods = paymentResponse.data.methods;

            this.selectedPaymentMethod = this.payment_methods[0]
            console.log(this.selectedPaymentMethod)
        
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

                this.loading = false;
            } catch (error) {
                console.error('Error fetching data:', error);
                this.loading = false;
            }
        },

        async fetchCustomers() {

            try {
                
                const url = this.isChecked 
                    ? `/providers/${this.selectedCompany.id}` 
                    : `/customers/${this.selectedCompany.id}`;
                
                
                const customersResponse = await axios.get(url);

                if (this.isChecked) {
                    this.customers = customersResponse.data.providers;
                } else {
                    this.customers = customersResponse.data.customers;
                }

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

        selectAProvider() {
            this.selectACustomerDialog = true;
        },

        selectAPaymentMethod() {
            this.selectAPaymentMethodDialog = true;
        },

        saveCustomer() {

            let customersResponse
            if (this.isChecked) {
                customersResponse = axios.post('/provider', this.customer)
            } else {
                customersResponse = axios.post('/customer', this.customer)
            }
    
            customersResponse.then(result => {
                this.customer.id = result.data.companyId;
                this.selectedCustomer = this.customer;
            }).catch(error => {
                console.error("Error:", error);
                this.customerDialog = false;
            });

            this.customerDialog = false;
        },

        async downloadSignedXml() {
            window.open('/documents-signed/'+ this.myDocument.id)
            /*if (!this.isChecked) {
                const documentId = this.myDocument.id;
                const url = `/documents-signed/${documentId}`;

                // Hacer la solicitud al servidor
                fetch(url)
                    .then(response => {
                        if (!response.ok) {
                            // La respuesta no es exitosa
                            return response.json().then(error => {
                                throw new Error(error.message || 'Error al cargar la factura');
                            });
                        }
                        // La respuesta es exitosa
                        return response.blob(); // O el tipo de respuesta que esperes del servidor
                    })
                    .then(data => {
                        // Crear una URL de objeto para el blob y abrir una nueva ventana
                        const objectUrl = URL.createObjectURL(data);
                        window.open(objectUrl);
                    })
                    .catch(error => {
                        this.$toast(this.$t('To download you must save and sign it'), 'error');
                    });

            }*/
        },

        async handleCompanySelection() {
            this.selectedCustomer = [];
            try {
                const response = await axios.get('/customers/' + this.selectedCompany.id);
                await this.fetchDocuments();
                await this.fetchPayments();
                this.customers = response.data.customers;   
                
                if (this.customers.length === 1) {
                    this.selectedCustomer = this.customers[0];
                }
            } catch (error) {
                console.error('Error fetching phone data:', error);
            }
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
                reference: '',
                description: '',
                price: 0,
                quantity: 0,
                discount: 0,
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


        checkDocument() {
            if (!this.isChecked) {
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
                                this.updateDate = true;
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
                                this.fecha = getDate();
                                
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
            }else{
                this.saveDocument();
            } 
        },

        myDocumentSave() {

            if (!this.isChecked) {
                this.myDocument.number = this.selectedSerie.serie + this.selectedSerie.number
                this.myDocument.document_counter = this.selectedSerie.number
                this.myDocument.company_id_company = this.selectedCompany.id 
                this.myDocument.company_id_customer = this.selectedCustomer.id
                this.myDocument.documents_series_id = this.selectedSerie.id
            } else {
                this.myDocument.number = this.selectedSerie.number
                this.myDocument.company_id_company = this.selectedCustomer.id 
                this.myDocument.company_id_customer = this.selectedCompany.id
                this.myDocument.documents_series_id = ''
                
            }

            if (this.myDocument.paid) {
                this.myDocument.date_paid = this.fechaPaid
            } else {
                this.myDocument.date_paid = '';
            }

            this.myDocument.documents_type_id = this.selectedType.id
            
            if (this.updateDate) {
                this.fecha =  this.getDate();
                this.expiration =  this.getExpirationDate();
            } 

            this.myDocument.expiration = this.expiration
            this.myDocument.date = this.fecha

            this.updateDate = false;
            this.myDocument.payment_methods_id = this.selectedPaymentMethod.id
            console.log("selectedPaymentSystemId")
            console.log(this.selectedPaymentSystemId)
            this.myDocument.payment_system_id = this.selectedPaymentSystemId

            this.myDocument.document_counter = 1
            
            this.myDocument.subTotal =  this.subtotal.toFixed(2)
            this.myDocument.totalTax =  this.totalIVA.toFixed(2)
            this.myDocument.amount =  this.totalConIVA.toFixed(2)
            
        },

        saveDocument(){
            
            this.myDocumentSave()

            if(this.selectedType.id == 1 ) {
                this.myDocument.invoiced = true
            }
            console.log(this.fecha);
            console.log(this.expiration);
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
                this.myDocument.id = response.data.documentId; 
                console.log("saveDocument id" + this.myDocument.id)
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

        getDate() {    
            const year = this.today.getFullYear();
            const month = (this.today.getMonth() + 1).toString().padStart(2, '0');
            const day = this.today.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        },

        getExpirationDate() {
            const expirationDate = new Date();
            expirationDate.setDate(this.today.getDate() + 15);
            const expYear = expirationDate.getFullYear();
            const expMonth = (expirationDate.getMonth() + 1).toString().padStart(2, '0');
            const expDay = expirationDate.getDate().toString().padStart(2, '0');
            return `${expYear}-${expMonth}-${expDay}`;
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
            // Aquí puedes poner el código para conservar la fecha seleccionada
            } else if (respuesta === '2') {
            let fechaActual = new Date().toISOString().split('T')[0]; // Obtén la fecha actual en formato YYYY-MM-DD
            let fechaActualFormateada = this.dateFormat(fechaActual); // Formatea la fecha actual a DD/MM/YYYY
            // Aquí puedes poner el código para asignar la fecha actual
            } else {
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

        /* addsign(data){
            AutoScript.setForceWSMode(true);
            AutoScript.cargarAppAfirma();
            AutoScript.setServlets(window.location.origin + "/afirma-signature-storage/StorageService",
            window.location.origin + "/afirma-signature-retriever/RetrieveService");
            function successCallback() { console.log("OK"); }
            function errorCallback() { console.log("ERR"); }
            var dataB64 = AutoScript.getBase64FromText(data);
            AutoScript.signAndSaveToFile('sign', (dataB64 != undefined && dataB64 != null && dataB64 != "") ? dataB64 : null, "SHA512withRSA", "AUTO", "", null, successCallback, errorCallback);
        },  */


        exportToXML() {
            this.myDocumentSave()
            this.calculateTaxes().then(() => {  
            this.myDocument.document_counter = 1
            const xmlContent = this.convertToFacturaeXML();
            console.log("contador: " + this.myDocument.document_counter)
            this.$toast(this.$t('XML document generated correctly.'), 'success');
            this.downloadXML(xmlContent, 'factura.xml')
            }).catch(error => {
                this.$toast(this.$t('Could not generate the XML.'), 'error');
            });
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

        downloadXML(content, filename) {

            const blob = new Blob([content], { type: 'application/xml' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
            URL.revokeObjectURL(link.href);
        
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
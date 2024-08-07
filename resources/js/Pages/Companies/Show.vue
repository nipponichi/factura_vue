<template>
    <AppLayout title="Dashboard">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                {{ company.name }}
            </h2>
        </template>
        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">                    
                    <div class="company">

                        <div class="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
                            <div class="px-6">
                                
                                <div class="flex flex-wrap justify-center">
                                    <div class="w-full text-center">
                                        <div class="text-center mt-2">
                                            <h3 class="text-2xl text-slate-700 font-bold leading-normal mb-1">{{ company.name }}</h3>
                                            <div class="text-xs text-slate-400 font-bold uppercase">
                                                <i class="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i> {{ company.post_code }}, {{ company.town }}, {{ company.province }}
                                                <strong><p class=" text-slate-400 font-bold mt-2">{{ company.country }}</p></strong>
                                            </div>
                                        </div>
                                        <div class="flex justify-center lg:pt-0 pt-8">
                                            <div class="p-3 text-center">
                                                <span class="text-xl font-bold block uppercase tracking-wide text-slate-700">{{ totalCustomer }}</span>
                                                <span class="text-sm text-slate-400"> {{ $t('Customers') }}</span>
                                            </div>
                                            <div class="p-3 text-center">
                                                <span class="text-xl font-bold block uppercase tracking-wide text-slate-700">{{ totalInvoices}}</span>
                                                <span class="text-sm text-slate-400"> {{ $t('Invoices') }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="py-5 border-t border-slate-200 text-center">
                                    <h1 class="text-lg text-slate-700 leading-normal mb-1"> {{ $t('Company details') }}:</h1>
                                    <div class="flex flex-wrap justify-center">
                                        <div>
                                            <div class="text-gray-700">
                                                <div class="grid md:grid-cols-2 text-sm">
                                                    <div class="grid grid-cols-2">
                                                        <div class=" py-2 font-semibold"> {{ $t('Tax number') }}:</div>
                                                        <div class=" py-2">{{ company.tax_number }}</div>
                                                    </div>
                                                    <div class="grid grid-cols-2">
                                                        <div class=" py-2 font-semibold"> {{ $t('Email') }}:</div>
                                                        <div class=" py-2">
                                                            <a class="text-blue-800" :href="emailLink">{{ company.email }}</a>
                                                        </div>
                                                    </div>
                                                    <div class="grid grid-cols-2">
                                                        <div class=" py-2 font-semibold"> {{ $t('Phone') }}:</div>
                                                        <div class=" py-2">{{ company.phone }}</div>
                                                    </div>
                                                    <div class="grid grid-cols-2">
                                                        <div class=" py-2 font-semibold"> {{ $t('Address') }}:</div>
                                                        <div class=" py-2">{{ company.address}} </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col justify-center items-center h-full">

                        <div class="border-b border-gray-200 dark:border-gray-700">
                            <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                                <li class="me-2">
                                    <button  v-if="$page.props.user.permissions.includes('read document income')" @click="changeTab('documents')" :class="{'border-b-2 border-blue-500': activeTab === 'documents'}" class="inline-flex items-center justify-center p-4 rounded-t-lg hover:text-gray-800 dark:hover:text-gray-300 group">
                                        <i class="pi pi-file w-4 h-4 me-2 text-gray-500 group-hover:text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-300"></i>
                                        {{ $t('Invoices') }}
                                    </button >
                                </li>
                                <li class="me-2">
                                    <button v-if="$page.props.user.permissions.includes('read customer')" @click="changeTab('customers')" :class="{'border-b-2 border-blue-500': activeTab === 'customers'}" class="inline-flex items-center justify-center p-4 rounded-t-lg hover:text-gray-800 dark:hover:text-gray-300 group">
                                        <i class="pi pi-users w-4 h-4 me-2 text-gray-500 group-hover:text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-300"></i>
                                        {{ $t('Customers') }}
                                    </button>
                                </li>
                                <li class="me-2">
                                    <button v-if="$page.props.user.permissions.includes('read provider')" @click="changeTab('provider')" :class="{'border-b-2 border-blue-500': activeTab === 'provider'}" class="inline-flex items-center justify-center p-4 rounded-t-lg hover:text-gray-800 dark:hover:text-gray-300 group">
                                        <i class="pi pi-users w-4 h-4 me-2 text-gray-500 group-hover:text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-300"></i>
                                        {{ $t('Providers') }}
                                    </button>
                                </li>
                                <li class="me-2">
                                    <button @click="changeTab('phone')" :class="{'border-b-2 border-blue-500': activeTab === 'phone'}" class="inline-flex items-center justify-center p-4 rounded-t-lg hover:text-gray-800 dark:hover:text-gray-300 group">
                                        <i class="pi pi-phone w-4 h-4 me-2 text-gray-500 group-hover:text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-300"></i>
                                        {{ $t('Phone') }}
                                    </button>
                                </li>
                                <li class="me-2">
                                    <button v-if="$page.props.user.permissions.includes('read email')" @click="changeTab('email')" :class="{'border-b-2 border-blue-500': activeTab === 'email'}" class="inline-flex items-center justify-center p-4 rounded-t-lg hover:text-gray-800 dark:hover:text-gray-300 group">
                                        <i class="pi pi-envelope w-4 h-4 me-2 text-gray-500 group-hover:text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-300"></i>
                                        {{ $t('Email') }}
                                    </button>
                                </li>
                                <li class="me-2">
                                    <button v-if="$page.props.user.permissions.includes('read address')" @click="changeTab('address')" :class="{'border-b-2 border-blue-500': activeTab === 'address'}" class="inline-flex items-center justify-center p-4 rounded-t-lg hover:text-gray-800 dark:hover:text-gray-300 group">
                                        <i class="pi pi-home w-4 h-4 me-2 text-gray-500 group-hover:text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-300"></i>
                                        {{ $t('Address') }}
                                    </button>
                                </li>
                                <li class="me-2">
                                    <button v-if="$page.props.user.permissions.includes('read bank account')" @click="changeTab('bank')" :class="{'border-b-2 border-blue-500': activeTab === 'bank'}" class="inline-flex items-center justify-center p-4 rounded-t-lg hover:text-gray-800 dark:hover:text-gray-300 group">
                                        <i class="pi pi-wallet w-4 h-4 me-2 text-gray-500 group-hover:text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-300"></i>     
                                        {{ $t('Bank account') }}
                                    </button>
                                </li>
                            </ul>
                        </div>
            
                        <div class="flex flex-col items-center justify-center w-full overflow-x-auto">
                            <div v-if="activeTab === 'documents'" class="w-full">
                                <TableDocument @updateDocument="handleDocumentUpdate"/>
                            </div>
                            <div v-else-if="activeTab === 'customers'" class="w-full">
                                <TableCustomer @updateCustomer="handleCustomerUpdate"/>
                            </div>
                            <div v-else-if="activeTab === 'provider'" class="w-full">
                                <TableProvider />
                            </div>
                            <div v-else-if="activeTab === 'phone'" class="w-full">
                                <TablePhone @updatePhone="handlePhoneUpdate" />
                            </div>
                            <div v-else-if="activeTab === 'email'" class="w-full">
                                <TableEmail @updateEmail="handleEmailUpdate" />
                            </div>
                            <div v-else-if="activeTab === 'address'" class="w-full">
                                <TableAddress @updateAddress="handleAddressUpdate"/>
                            </div>
                            <div v-else-if="activeTab === 'bank'" class="w-full">
                                <TableBank />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import TableCustomer from '@/Pages/Companies/Partials/TableCustomer.vue';
import TableDocument from '@/Pages/Companies/Partials/TableDocument.vue';
import TablePhone from '@/Pages/Companies/Partials/TablePhone.vue';
import TableBank from '@/Pages/Companies/Partials/TableBank.vue';
import TableEmail from '@/Pages/Companies/Partials/TableEmail.vue';
import TableAddress from '@/Pages/Companies/Partials/TableAddress.vue';
import TableProvider from '@/Pages/Companies/Partials/TableProvider.vue';
import { ref } from 'vue';

const activeTab = ref('documents');

const changeTab = (tabName) => {
    activeTab.value = tabName;
};
</script>

<script>
export default {
    props: ["company", "invoices","customers"],

    data() {
        
        return {
            totalInvoices: null, 
            totalCustomer: null, 
        };
    },
    
    computed: {
        emailLink() {
            return "mailto:" + this.company.email;
        }
    },

    mounted() {

        //Lo que viene de prop lo paso a una variable para poder editarlar y restarla
        this.totalInvoices = this.invoices;
        this.totalCustomer = this.customers
        

    },

    
    methods: {
        handlePhoneUpdate(phone) {
            this.company.phone = phone;
        },

        handleEmailUpdate(email) {
            this.company.email = email;
        },

        handleAddressUpdate(address) {
            this.company.address = address.address;
            this.company.town = address.town;
            this.company.post_code = address.post_code;
            this.company.province = address.province;
            this.company.country = address.country;
        },

        handleDocumentUpdate(document) {
            
            this.totalInvoices -=document;

        },

        handleCustomerUpdate(customer) {
            
            this.totalCustomer -=customer;

        },





        
    }
    
};
</script>

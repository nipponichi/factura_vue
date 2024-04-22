<template>
    <AppLayout title="Dashboard">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                My company
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
                                                <i class="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i> {{ company.postCode }}, {{ company.town }}, {{ company.province }}
                                                <strong><p class=" text-slate-400 font-bold mt-2">{{ company.country }}</p></strong>
                                            </div>
                                        </div>
                                        <div class="flex justify-center lg:pt-0 pt-8">
                                            <div class="p-3 text-center">
                                                <span class="text-xl font-bold block uppercase tracking-wide text-slate-700">33</span>
                                                <span class="text-sm text-slate-400">Customers</span>
                                            </div>
                                            <div class="p-3 text-center">
                                                <span class="text-xl font-bold block uppercase tracking-wide text-slate-700">24</span>
                                                <span class="text-sm text-slate-400">Products</span>
                                            </div>

                                            <div class="p-3 text-center">
                                                <span class="text-xl font-bold block uppercase tracking-wide text-slate-700">564</span>
                                                <span class="text-sm text-slate-400">Invoices</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="py-5 border-t border-slate-200 text-center">
                                    <h1 class="text-lg text-slate-700 leading-normal mb-1">Company details:</h1>
                                    <div class="flex flex-wrap justify-center">
                                        <div>

                                            <div class="text-gray-700">
                                                <div class="grid md:grid-cols-2 text-sm">
                                                    <div class="grid grid-cols-2">
                                                        <div class=" py-2 font-semibold">Tax Number:</div>
                                                        <div class=" py-2">{{ company.taxNumber }}</div>
                                                    </div>
                                                    <div class="grid grid-cols-2">
                                                        <div class=" py-2 font-semibold">Email:</div>
                                                        <div class=" py-2">
                                                            <a class="text-blue-800" :href="emailLink">{{ company.email }}</a>
                                                        </div>
                                                    </div>
                                                    <div class="grid grid-cols-2">
                                                        <div class=" py-2 font-semibold">Phone 1:</div>
                                                        <div class=" py-2">{{ company.phone1 }}</div>
                                                    </div>
                                                    <div class="grid grid-cols-2">
                                                        <div class=" py-2 font-semibold">Phone 2:</div>
                                                        <div class="py-2">{{ company.phone2 }}</div>
                                                    </div>

                                                    <div class="grid grid-cols-2">
                                                        <div class=" py-2 font-semibold">Address 1:</div>
                                                        <div class=" py-2">{{ company.address1}} </div>
                                                    </div>
                                                    <div class="grid grid-cols-2">
                                                        <div class=" py-2 font-semibold">Address 2:</div>
                                                        <div class=" py-2">{{ company.address2 }} </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div class="flex justify-center items-center h-full">

    <div class="border-b border-gray-200 dark:border-gray-700">
    
        <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <li class="me-2">
                    
            <NavLink :href="route('companies.index')" :active="route().current('companies.*')">
                <i class="pi pi-users w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"></i>
                Customers
            </NavLink>
                            
                <button class="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group" :class="{ 'border-indigo-500 text-indigo-600': $page.url.startsWith('/customers') }" @click="navigateTo('customers')">
                    <i class="pi pi-users w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"></i>
                    Customers
                </button>
            </li>
            <li class="me-2">
                <button class="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group" :class="{ 'border-indigo-500 text-indigo-600': $page.url.startsWith('/products') }" @click="navigateTo('products')">
                    <i class="pi pi-shopping-cart w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"></i>
                    Products
                </button>
            </li>
            <li class="me-2">
                <button class="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group" :class="{ 'border-indigo-500 text-indigo-600': $page.url.startsWith('/invoices') }" @click="navigateTo('invoices')">
                    <i class="pi pi-file w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"></i>
                    Invoices
                </button>
            </li>
        </ul>
    </div>

                        <div>
                            <table v-if="activeTab === 'customers'">
                                <h1>Customers Table</h1>
                                <!-- Aquí iría el contenido de la tabla de clientes -->
                            </table>
                            <table v-else-if="activeTab === 'products'">
                                <h1>Products Table</h1>
                                <!-- Aquí iría el contenido de la tabla de productos -->
                            </table>
                            <table v-else-if="activeTab === 'invoices'">
                                <h1>Invoices Table</h1>
                                <!-- Aquí iría el contenido de la tabla de facturas -->
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
    import AppLayout from '@/Layouts/AppLayout.vue';
    import Tables from '@/Components/Table.vue';
</script>


<script>
    export default {
        props: ["company"],

        data() {
            return {
                email: ""
            };
        },

        computed: {
            emailLink() {
                return "mailto:" + this.company.email;
            }
        },

        methods: {

            showCustomers() {
                // Agrega aquí la lógica para mostrar la tabla de clientes
                this.activeTab = 'customers';
                
            },
            showProducts() {
                // Agrega aquí la lógica para mostrar la tabla de productos
                this.activeTab = 'products';
                console.log('products')
            },
            showInvoices() {
                // Agrega aquí la lógica para mostrar la tabla de facturas
                this.activeTab = 'invoices';
                console.log('invoices')
            }
            
        }
    };
</script>


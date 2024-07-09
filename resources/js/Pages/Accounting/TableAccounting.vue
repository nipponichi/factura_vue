<script setup>
    import AppLayout from '@/Layouts/AppLayout.vue';
</script>
<template>
    <AppLayout title="Accounting">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                {{ $t('Accounting') }}
            </h2>
        </template>
        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
                    <div>
                        <div class="card">
                            <div class="relative inline-block flex mb-5">
                                <button
                                    v-if="!loading && (companies.length > 0)"
                                    type="button"
                                    class="px-4 py-2 bg-black text-white border border-gray-200 rounded-md flex items-center justify-between"
                                    @click="openNew">
                                    <span class="font-bold text-lg">
                                        <i class="pi pi-plus mr-2"></i>
                                        {{ selectedCompany.name }}
                                    </span>
                                </button>
                            </div>
                            <DataTable ref="dt" :value="documents" v-model:selection="selectedDocuments" dataKey="id"
                                :paginator="true" :rows="10" :filters="filters"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                :rowsPerPageOptions="[5,10,25]" :currentPageReportTemplate="`${$t('Showing')} {first} ${$t('of')} {last} ${$t('of')} {totalRecords} ${$t('documents')}`"
                                selectionMode="single" @rowClick="handleRowClick">
                                <template #header>
                                    
                                    <div class="flex flex-col sm:flex-row justify-between items-center mt-2 space-y-2 sm:space-y-0">
                                        <!-- Campo de Fecha Inicial -->
                                        <div class="flex items-center space-x-2 sm:space-x-0">
                                            <div class="font-semibold mr-3">{{ $t('Initial date') }}: </div>
                                            <input type="date" v-model="initialDate" @change="itemsFiltrados" class="border border-gray-300 rounded-md w-48 px-3 py-2 focus:outline-none focus:border-blue-400">
                                        </div>
                                        
                                        <!-- Campo de Fecha de Expiración -->
                                        <div class="flex items-center space-x-2 sm:space-x-0">
                                            <div class="font-semibold ml-3">{{ $t('End date') }}: 
                                            </div>
                                            <input type="date" v-model="endDate" @change="itemsFiltrados" class="border border-gray-300 rounded-md w-48 px-3 py-2 focus:outline-none focus:border-blue-400">
                                        </div>
                                        
                                        <!-- Campo de Búsqueda -->
                                        <div class="relative rounded-md shadow-sm ml-auto">
                                            <input type="search" class="block w-full h-11 rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                                v-model="filters['global'].value" :placeholder="$t('Search...')">
                                            <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                                    fill="currentColor">
                                                    <path fill-rule="evenodd"
                                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    

                                </template>
                                <Column field="dateFormatted" :header="$t('Date')" sortable class="dateTable"></Column>
                                <Column field="number" :header="$t('Concept')" sortable class="dateTable"></Column>
                                <Column class="dateTable">
                                    <template #header>
                                        <div class="text-center">
                                            <div>{{ $t('Duty') }}</div>
                                            <div class="flex justify-center gap-2 text-sm text-gray-500">
                                                <div class="w-1/3 text-center px-3">{{ $t('Subtotal') }}</div>
                                                <div class="w-1/3 text-center px-12">{{ $t('Tax') }}</div>
                                                <div class="w-1/3 text-center pl-16">{{ $t('Total') }}</div>
                                            </div>
                                        </div>
                                    </template>
                                    <template #body="slotProps">
                                        <div class="flex gap-2 justify-center">
                                            <div class="w-1/3 border-r border-gray-400 px-2 text-center">
                                                {{ !slotProps.data.isReceived ? slotProps.data.subtotal : '-' }}
                                            </div>
                                            <div class="w-1/3 border-r border-gray-400 px-2 text-center">
                                                {{ !slotProps.data.isReceived ? slotProps.data.tax : '-' }}
                                            </div>
                                            <div class="w-1/3 px-2 text-center">
                                                {{ !slotProps.data.isReceived ? slotProps.data.amount : '-' }}
                                            </div>
                                        </div>
                                    </template>
                                </Column>
                                
                                
                                <Column class="dateTable">
                                    <template #header>
                                        <div class="text-center">
                                            <div>{{ $t('Have') }}</div>
                                            <div class="flex gap-2 justify-center text-sm text-gray-500">
                                                <div class="w-1/3 text-center px-3">{{ $t('Subtotal') }}</div>
                                                <div class="w-1/3 text-center px-12">{{ $t('Tax') }}</div>
                                                <div class="w-1/3 text-center pl-16">{{ $t('Total') }}</div>
                                            </div>
                                        </div>
                                    </template>
                                    <template #body="slotProps">
                                        <div class="flex gap-2 justify-center">
                                            <div class="w-1/3 border-r border-gray-400 px-2 text-center">
                                                {{ slotProps.data.isReceived ? slotProps.data.subtotal : '-' }}
                                            </div>
                                            <div class="w-1/3 border-r border-gray-400 px-2 text-center">
                                                {{ slotProps.data.isReceived ? slotProps.data.tax : '-' }}
                                            </div>
                                            <div class="w-1/3 px-2 text-center">
                                                {{ slotProps.data.isReceived ? slotProps.data.amount : '-' }}
                                            </div>
                                        </div>
                                    </template>
                                </Column>

                        
                                
                            </DataTable>

                            
                            
                            <!-- Columna central (Totales) -->
                            <div class="flex flex-col items-center justify-center sm:flex-row sm:justify-end">
                                <div class="totals-container w-full sm:w-1/3 mb-4 sm:mb-0 sm:ml-4">
                                    <div class="totals p-4 rounded-md">
                                        <table class="w-full">
                                            <tbody>
                                                <tr>
                                                    <td class="text-gray-600 pr-4">{{ $t('Subtotal (excluding Tax)') }}:</td>
                                                    <td class="pl-4">{{ balance.subtotal }}€</td>
                                                </tr>
                                                <hr class="my-2 border-gray-300">
                                                <tr>
                                                    <td class="text-gray-600 pr-4">{{ $t('Total Tax') }}:</td>
                                                    <td class="pl-4">{{ balance.tax }}€</td>
                                                </tr>
                                                <hr class="my-2 border-gray-300">
                                                <tr>
                                                    <td class="text-gray-600 pr-4">{{ $t('Total (with IVA)') }}:</td>
                                                    <td class="pl-4">{{ balance.amount }}€</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- MODAL COMPANY -->
        <Dialog v-model:visible="accountingDialog" :header="$t('Select companies')" :modal="true" @change="handleCompanySelection" class="p-fluid w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-4xl">
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
    </AppLayout>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import axios from 'axios';

export default {
    data() {
        return {
            documents: [],
            companies: [],
            totalDocuments: [],
            balance: {
                subtotal: 0,
                amount: 0,
                tax: 0
            },
            initialDate: '',
            endDate: '',
            startDate: '',
            selectedCompany: '',
            accountingDialog: false,

            selectedDocuments: [],
            filters: {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
        };

    },
    
    created() {
        this.filters = {
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        }

        // Inicializa la fecha con la fecha de hoy
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        this.initialDate = `${year}-01-01`;
        this.endDate = `${year}-${month}-${day}`;

        
        console.log(this.initialDate)
        console.log(this.endDate)

    },
    async mounted() {
        this.companies = this.$page.props.companies;
        this.selectedCompany = this.companies[0]
        await this.fetchDocuments()
        await this.calculateBalance()
        await this.itemsFiltrados()
    },

    watch: {
        async selectedCompany(newCompany, oldCompany) {
            if (newCompany !== oldCompany) {
                await this.fetchDocuments();
                await this.calculateBalance()
                await this.itemsFiltrados()
            }
        },

        async hadleCalculateBalance() {
            await this.calculateBalance()
        }
    },

    methods: {
        
        async fetchDocuments() {
        
            await axios.get(`/accountings/${this.selectedCompany.id}`)
                .then(response => {   

                    let date
                    let dateFormatted
                    
                    for(let i = 0; i < response.data.documents.length; i++ ) {
                        date = response.data.documents[i].date
                        dateFormatted = this.dateFormat(date)
                        response.data.documents[i].dateFormatted = dateFormatted
                        console.log("fetch: " + dateFormatted)
                    }
                    this.totalDocuments = response.data.documents;
                    
                    
                })
                .catch(error => {
                    console.error('Error fetching documents data:', error);
                });
        },

        async itemsFiltrados() {
            this.documents = []

    
            // Si no se han seleccionado ambas fechas, retornar todos los items
            if (!this.initialDate || !this.endDate) {
                return this.totalDocuments;
            }

            // Convertir las fechas de los input a objetos Date
            const inicio = new Date(this.initialDate);
            const fin = new Date(this.endDate);
            
            // Filtrar los items basado en el rango de fechas
            this.documents = this.totalDocuments.filter(document => {
                const fechaItem = new Date(document.date);
                return fechaItem >= inicio && fechaItem <= fin;
            });
            await this.calculateBalance()
        },

        async calculateBalance() {
            console.log("calculateTotal1")
            console.log(this.balance)
            this.balance = {
                subtotal: 0,
                amount: 0,
                tax: 0
            }
            let total = 0;
            let subtotal = 0;
            let tax = 0;     
            for (let i = 0; i < this.documents.length; i++) {   
                if (!this.documents[i].isReceived) {
                    total += parseFloat(this.documents[i].amount);
                    subtotal += parseFloat(this.documents[i].subtotal);
                    tax += parseFloat(this.documents[i].tax);
                } else {
                    total -= parseFloat(this.documents[i].amount);
                    subtotal -= parseFloat(this.documents[i].subtotal);
                    tax -= parseFloat(this.documents[i].tax);
                }

            }

            this.balance = {
                subtotal: subtotal.toFixed(2),
                amount: total.toFixed(2),
                tax: tax.toFixed(2)
            };

            console.log("calculateTotal2")
            console.log(this.balance)
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

        hideDialog() {
            this.accountingDialog = false
        },
        
        openNew() {
            this.accountingDialog = true
        },
        

    },

}
</script>

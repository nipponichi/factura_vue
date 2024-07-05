<script setup>
    import AppLayout from '@/Layouts/AppLayout.vue';
</script>
<template>
    <AppLayout title="Company">
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
                                    <div class="flex justify-between items-center mt-2">
                                        <h4>{{ $t('') }}</h4>
                                        <div class="relative rounded-md shadow-sm w-1/4">
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
                                <Column field="date" :header="$t('Date')" sortable class="dateTable"></Column>
                                <Column field="number" :header="$t('Concept')" sortable class="dateTable"></Column>
                                <Column sortable class="dateTable">
                                    <template #header>
                                        <div class="text-center">
                                            <div>{{ $t('Duty') }}</div>
                                            <div class="flex gap-2 justify-center text-sm text-gray-500">
                                                <div class="w-1/3 text-center px-2">{{ $t('Subtotal') }}</div>
                                                <div class="w-1/3 text-center px-2">{{ $t('Tax') }}</div>
                                                <div class="w-1/3 text-center px-2">{{ $t('Total') }}</div>
                                            </div>
                                        </div>
                                    </template>
                                    <template #body="slotProps">
                                        <div v-if="!slotProps.data.isReceived" class="flex gap-2 justify-center">
                                            <div class="w-1/3 border-r border-gray-400 px-2 text-center">{{ slotProps.data.subtotal }}</div>
                                            <div class="w-1/3 border-r border-gray-400 px-2 text-center">{{ slotProps.data.tax }}</div>
                                            <div class="w-1/3 px-2 text-center">{{ slotProps.data.amount }}</div>
                                        </div>
                                    </template>
                                </Column>
                                
                                <Column field="have" :header="$t('Have')" sortable class="dateTable">
                                    <template #body="slotProps">
                                        <div v-if="slotProps.data.isReceived" class="flex gap-2">
                                            <div class="flex-1 border-r border-gray-400 pr-2">{{ slotProps.data.subtotal }}</div>
                                            <div class="flex-1 border-r border-gray-400 pr-2">{{ slotProps.data.tax }}</div>
                                            <div class="flex-1">{{ slotProps.data.amount }}</div>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="balance" :header="$t('Balance')" sortable class="dateTable"></Column>
                            </DataTable>
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
    },
    mounted() {
        this.companies = this.$page.props.companies;
        this.selectedCompany = this.companies[0]
        this.fetchDocuments()
    },

    watch: {
        selectedCompany(newCompany, oldCompany) {
            if (newCompany !== oldCompany) {
                this.fetchDocuments();
            }
        }
    },

    methods: {
        
        fetchDocuments() {
            axios.get(`/accountings/${this.selectedCompany.id}`)
                .then(response => {
                    this.documents = response.data.documents;
                })
                .catch(error => {
                    console.error('Error fetching documents data:', error);
                });
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

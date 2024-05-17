<template>
    <div>
        <div class="card">

            <DataTable ref="dt" :value="companies" v-model:selection="selectedCompanies" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} companies">
                <template #header>
                    <div class="flex justify-between items-center mt-2">
                        <h4>Manage Companies</h4>
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

                <Column field="name" header="Name" sortable class="dateTable"></Column>
                <Column field="taxNumber" header="Tax Number" sortable class="dateTable"></Column>
                <Column field="phone" header="Phone" sortable class="dateTable"></Column>
                <Column field="email" header="Email" sortable class="dateTable"></Column>
                <Column field="town" header="Town" sortable class="dateTable"></Column>
                <Column field="province" header="Province" sortable class="dateTable"></Column>
                <Column :exportable="false" class="dateTable">
                    <template #body="slotProps">
                        <Button icon="pi pi-eye" outlined rounded class="mr-2 info-button" @click="handleInfoButtonClick(slotProps.data.id)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <!--
            Toast alertas
        <div id="toast-success" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                </svg>
                <span class="sr-only">Check icon</span>
            </div>

            <div class="ms-3 text-sm font-normal">Item moved successfully.</div>
        </div>
        <div id="toast-danger" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                </svg>
                <span class="sr-only">Error icon</span>
            </div>
            <div class="ms-3 text-sm font-normal">Item has been deleted.</div>
        </div>
        <div id="toast-warning" class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
                </svg>
                <span class="sr-only">Warning icon</span>
            </div>
        </div>-->


	</div>
</template>


<script>
import { FilterMatchMode } from 'primevue/api';

export default {
    data() {
        console.log("PRIMER PASO");
        return {
            companies: null, 
            filters: {}, 
            submitted: false,
        };
    },
    created() {
        console.log("Created");
        this.filters = {
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        }
    },
    mounted() {
        
        this.companies = this.$page.props.companies;
    },

    
    methods: {
        handleInfoButtonClick(companyId) {
            this.$inertia.get('/companies/' + companyId);
        }
    }
}

</script>

<style>

    .info-button {
        color:#007BFF;
        border: 1px solid;
    }

    .info-button:hover {
        background-color:rgba(0, 4, 252,0.1);
        transition-duration: 0.5s;
        padding:7px;
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
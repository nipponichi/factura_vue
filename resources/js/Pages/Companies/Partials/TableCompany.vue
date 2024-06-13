<template>
    <div>
        <div class="card">

            <DataTable ref="dt" :value="companies" v-model:selection="selectedCompanies" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                :currentPageReportTemplate="`${$t('Showing')} {first} ${$t('of')} {last} ${$t('of')} {totalRecords} ${$t('companies')}`">
                <template #header>
                    <div class="flex justify-between items-center mt-2">
                        <h4>{{ $t('Manage companies') }}</h4>
                        <div class="relative rounded-md shadow-sm w-1/4">
                            <input type="search" class="block w-full h-11 rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" v-model="filters['global'].value" :placeholder="$t('Search...')">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                </template>

                <Column field="name" :header="$t('Name')" sortable class="dateTable"></Column>
                <Column field="tax_number" :header="$t('Tax Number')" sortable class="dateTable"></Column>
                <Column field="phone" :header="$t('Phone')" sortable class="dateTable"></Column>
                <Column field="email" :header="$t('Email')" sortable class="dateTable"></Column>
                <Column field="town" :header="$t('Town')" sortable class="dateTable"></Column>
                <Column field="province" :header="$t('Province')" sortable class="dateTable"></Column>
                <Column :exportable="false" class="dateTable">
                    <template #body="slotProps">
                        <Button icon="pi pi-eye" outlined rounded class="mr-2 info-button" @click="handleInfoButtonClick(slotProps.data.id)" />
                    </template>
                </Column>
            </DataTable>
        </div>
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
        
        if (this.companies && this.companies.length === 1) {
            this.handleInfoButtonClick(this.companies[0].id);
        }
        
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
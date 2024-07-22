<template>
    <div>
        <div class="card">
            <DataTable ref="dt" :value="logs" v-model:selection="selectedPhones" dataKey="id" @row-select="onRowSelect"
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                :currentPageReportTemplate="`${$t('Showing')} {first} ${$t('of')} {last} ${$t('of')} {totalRecords} ${$t('logs')}`">
                <template #header>
                    <div class="flex justify-between items-center mt-2">
                        <h4>{{ $t('Manage Logs') }}</h4>
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


                <Column field="user_id" :header="$t('User id')" sortable class="dateTable"></Column>
                <Column field="user_name" :header="$t('User')" sortable class="dateTable"></Column>
                <Column field="email" :header="$t('Email')" sortable class="dateTable"></Column>
                <Column field="ip_address" :header="$t('IP Address')" sortable class="dateTable"></Column>
                <Column field="time" :header="$t('Time')" sortable class="dateTable"></Column>
            
            </DataTable>
        </div>
	</div>
</template>


<script>
import { FilterMatchMode } from 'primevue/api';
import axios from 'axios';

export default {
    data() {
        return {
            logs: null, 
            filters: {}, 
            submitted: false,
        };
    },
    created() {
        this.filters = {
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        }
    },
    mounted() {
        
        this.fetchLogs();
            
    },
    methods: {


        fetchLogs() {
            axios.get('/logs')
            .then(response => {
                this.logs = response.data; // Asigna los datos de los logs a la propiedad 'logs'
                console.log(this.logs)
            })
            .catch(error => {
                this.$toast(this.$t('Error connecting to the server'), 'error');
                console.error(error); // Opcional: Propaga el error si es necesario
            });
        },

    }
}
</script>
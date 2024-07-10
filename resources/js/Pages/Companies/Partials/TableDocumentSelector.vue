<template>
    <div>
        <div class="card">
            <DataTable ref="dt" :value="valueToUse" v-model:selection="selectedDocuments" dataKey="id"
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5,10,25]" :currentPageReportTemplate="`${$t('Showing')} {first} ${$t('of')} {last} ${$t('of')} {totalRecords} ${$t('documents')}`"
                selectionMode="single" @rowClick="handleRowClick">
                <template #header>
                    <div class="flex justify-between items-center mt-2">
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
                <Column field="number" :header="$t('Number')" sortable class="dateTable"></Column>
                <Column field="document_type_name" :header="$t('Type')" sortable class="dateTable"></Column>
                <Column field="customer_name" :header="isChecked ? $t('Emitter') : $t('Receiver')" sortable class="dateTable"></Column>
                <Column field="date" :header="$t('Date')" sortable class="dateTable"></Column>
                <Column field="amount" :header="$t('Amount')" sortable class="dateTable"></Column>
            </DataTable>
        </div>
    </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import axios from 'axios';

export default {
    props: {
        companyId: {
            type: String,
            required: true
        },
        isChecked: {
            type: Boolean,
            required: true
        },
    },
    data() {
        return {
            documents: null,
            selectedDocuments: [],
            receivedDocuments: [],
            emitedDocuments: [],
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
        console.log('companyId recibido:', this.companyId);
        this.fetchDocuments();
    },

    computed: {
        valueToUse() {
            return this.isChecked ? this.receivedDocuments : this.emitedDocuments;
        },
    },

    methods: {
        fetchDocuments() {
            axios.get(`/documents-serie/${this.companyId}`)
                .then(response => {
                    this.documents = response.data.documents;
                    this.documents.forEach(document => {
                        if (document.isReceived === 0) {
                            this.emitedDocuments.push(document);
                        } else if (document.isReceived === 1) {
                            this.receivedDocuments.push(document);
                        }
                    });

                })
                .catch(error => {
                    console.error('Error fetching documents data:', error);
                });
        },
        handleRowClick(event) {
            const selectedDocumentId = event.data.id;
            console.log('Documento seleccionado:', selectedDocumentId);
            this.sendDocumentId(selectedDocumentId);
        },
        sendDocumentId(documentId) {
            this.$emit('document-selected', documentId);
        }
    },

}
</script>

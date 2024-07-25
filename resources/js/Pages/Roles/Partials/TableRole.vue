<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
</script>

<template>
    <AppLayout title="Profile">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                {{ $t('Roles') }}
            </h2>
        </template>
        <div class="card">
            <Toolbar class="mb-4 border border-slate-200 ...">
                <template #start>
                    
                    <Dropdown v-model="selectedRole" :options="roles" filter optionLabel="email" :placeholder="$t('Select a role')" class="mr-2 w-full md:w-64rem bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                        
                        <template #value="slotProps">
                            <div v-if="slotProps.name" class=" flex align-items-center ">
                                <div>{{ slotProps.value.name }}</div>
                            </div>
                            <span v-else>
                                {{ slotProps.placeholder }}
                            </span>
                        </template>
                        <template #option="slotProps">
                            <div class="flex align-items-center">
                                <div>{{ slotProps.option.name }}</div>
                            </div>
                        </template>
                    </Dropdown>
                    <div class="flex justify-between">
                        <Button :label="$t('New')" icon="pi pi-plus" severity="success" class="mr-2 success-button" @click="openNew" />
                        <Button :label="$t('Delete')" icon="pi pi-trash" severity="danger" class=" danger-button" @click="confirmDeleteSelected" :disabled="!selectedUsers || !selectedUsers.length" />
                    </div>
                </template>
            </Toolbar>
            <DataTable v-model:expandedRowGroups="expandedRowGroups" :value="roles" tableStyle="min-width: 50rem"
                        expandableRowGroups rowGroupMode="subheader" groupRowsBy="group_name" 
                        @rowgroup-expand="onRowGroupExpand" @rowgroup-collapse="onRowGroupCollapse"
                        sortMode="single" sortField="group_name" :sortOrder="1">
                <template #groupheader="slotProps">
                    <span class="align-middle ml-2 font-bold leading-normal">{{ $t(slotProps.data.group_name) }}</span>
                </template>
                <Column field="group_name" header="Role Type"></Column>
                <Column field="name" header="Name" style="width: 20%"></Column>
                <Column field="isActive" header="Status" style="width: 20%">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.isActive ? 'Active' : 'Inactive'" :severity="getSeverity(slotProps.data.isActive)" />
                    </template>
                </Column>
            </DataTable>
            <Toast />
        </div>
    </AppLayout>
</template>

<script>
export default {
    data() {
        return {
            roles: [],
            selectedRole: [],

            expandedRowGroups: [] // Inicialización del estado de las filas expandidas
        }

        
    },

    async mounted() {
        // Asigna los datos de la compañía pasados desde Laravel a una variable local
        this.roles = await this.$page.props.result.permission_group_names;
        console.log(this.$page.props.result)

        
    },
    methods: {
        getSeverity(status) {
            return status ? 'success' : 'danger';
        },


    }
};
</script>

<style>
/* Estilos opcionales si es necesario */
</style>

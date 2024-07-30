<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
</script>

<template>
    <AppLayout title="Profile">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                {{ $t('Manage roles') }}
            </h2>
        </template>
        <div class="card">
            <Toolbar class="mb-4 border flex justify-start border-slate-200 ...">
                <template #start>
                    
                    
                    <Dropdown v-model="selectedRole" :options="roles" filter optionLabel="name" @change="onRoleChange" :placeholder="$t('Select a role')" class="mr-2 w-full md:w-64 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                        <template #value="slotProps">
                            <div class="flex items-center min-w-[150px] max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                                <div v-if="slotProps.value && slotProps.value.name" class="truncate">
                                    {{ slotProps.value.name }}
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </div>
                        </template>
                    
                        <template #option="slotProps">
                            <div class="flex items-center">
                                <div>{{ slotProps.option.name }}</div>
                            </div>
                        </template>
                    </Dropdown>
                    
                    <div class="flex justify-between">
                        <Button :label="$t('New')" icon="pi pi-plus" severity="success" class="mr-2 success-button" @click="openNew" />
                        <Button :label="$t('Edit')" icon="pi pi-pencil" severity="success" class="mr-2 success-button" @click="editMyRol" :disabled="selectedRole.length === 0" />
                        <Button :label="$t('Delete')" icon="pi pi-trash" severity="danger" class=" danger-button" @click="confirmDeleteRol" :disabled="selectedRole.length === 0"/>
                    </div>

                </template>
            </Toolbar>
            <DataTable v-model:expandedRowGroups="expandedRowGroups" :value="group_names" tableStyle="min-width: 50rem"
                        expandableRowGroups rowGroupMode="subheader" groupRowsBy="group_name" 
                        sortMode="single" sortField="group_name" :sortOrder="1">
                <template #groupheader="slotProps">
                    <span class="align-middle ml-2 font-bold leading-normal">{{ $t(slotProps.data.group_name) }}</span>
                </template>
                <Column field="group_name" header="Role Type"></Column>
                
                <Column field="name" :header="$t('Group')" style="width: 20%" class="pl-24">
                    <template #body="slotProps">
                        <span>{{ $t(slotProps.data.name) }}</span>
                    </template>
                </Column>
                <Column field="description" :header="$t('Description')" style="width: 50%" class="pl-24">
                    <template #body="slotProps">
                        <span>{{ $t(slotProps.data.description) }}</span>
                    </template></Column>
                <Column field="id" :header="$t('Status')" style="width: 10%" >
                    <template #body="slotProps">
                        <template v-if="selectedPermissions.some(permission => permission.id === slotProps.data.id)">
                            <Button icon="pi pi-check" outlined rounded class="mr-2 info-active" severity="danger" @click="changePermissionState(slotProps.data)"/>
                        </template>
                        <template v-else>
                            <Button :disabled="selectedRole.length === 0" icon="pi pi-times" outlined rounded class="mr-2 info-disable" severity="danger" @click="changePermissionState(slotProps.data)"  />
                        </template>
                    </template>
                </Column>
            </DataTable>
        </div>

        <!-- MODAL CREATE -->
        <template>
            <Dialog v-model:visible="createRoleDialog" :header="$t('Create role')" id="titleRol" :modal="true" class="p-fluid">
                <form style="width:600px" @submit.prevent="saveMyRol">
                    <div class="grid gap-3 mb-6 md:grid-cols-1">
                        <div>
                            <input type="text" id="name" v-model="myRol.name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Rol name')" required />
                        </div>
                    </div>
                    <div class="grid gap-3 md:grid-cols-1 justify-items-end">
                        <div>
                            <button type="button" class="mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="hideDialog">{{ $t('Close') }}</button>
                            <button type="submit" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{{ $t('Save') }}</button>
                        </div>
                    </div>
                </form>
            </Dialog>
        </template>
        

        <!-- MODAL UPDATE -->
        <template>
            <Dialog v-model:visible="updateRoleDialog" :header="$t('Update role')" id="titleRol" :modal="true" class="p-fluid">
                <form style="width: 600px;" @submit.prevent="updateMyRol">
                    <div class="grid gap-3 mb-6 md:grid-cols-1">
                        <div>
                            <input type="text" id="name" v-model="editedRoleName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="$t('Rol name')" required />
                        </div>
                    </div>
                    <div class="grid gap-3 md:grid-cols-1 justify-items-end">
                        <div>
                            <button type="button" class="mr-3 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="hideDialog">{{ $t('Close') }}</button>
                            <button type="submit" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{{ $t('Save') }}</button>
                        </div>
                    </div>
                </form>
            </Dialog>
        </template>
        
        

        <!-- MODAL DELETE SIMPLE -->
        <Dialog v-model:visible="deleteRoleDialog" :style="{width: '450px'}" :header="$t('Confirm')" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="myRol">{{ $t('Are you sure you want to delete') }}<b>{{myRol.name}}</b>?</span>
            </div>
            <template #footer>
                <Button :label="$t('No')" icon="pi pi-times" text @click="deleteRoleDialog = false"/>
                <Button :label="$t('Yes')" icon="pi pi-check" text @click="deleteMyRol" />
            </template>
        </Dialog>
    </AppLayout>
</template>

<script>
export default {
    data() {
        return {
            createRoleDialog: false,
            updateRoleDialog: false,
            deleteRoleDialog: false,
            submitted: false,
            group_names: [],
            selectedPermissions: [],
            myRol: {},
            editedRoleName: '',
            roles: [],
            selectedRole: [],
            expandedRowGroups: [] // Inicialización del estado de las filas expandidas
        }        
    },

    async mounted() {
        // Asigna los datos de la compañía pasados desde Laravel a una variable local
        this.group_names = await this.$page.props.result.permission_group_names;
        this.roles = await this.$page.props.result.roles;   
    },

    methods: {
/*
        changePermissionState(data) {
        console.log('Data ID:', data.id);
        console.log('Selected Permissions ID:', this.selectedPermissions.id);
        // Lógica para cambiar el estado
    },*/
        
        async onRoleChange(role) {
            const response = await axios.get('/roles/' + role.value.id + '/')
            if(response) {
                this.selectedPermissions = response.data.permissions
            }
        },
        
        async changePermissionState (permission) {
            console.log(this.selectedRole)
            console.log(permission.id)
            const response = await axios.put('/add-permission/' + this.selectedRole.id+ '/' + permission.id)
                if (response) {
                        let permissionFound = this.selectedPermissions.find(permissionFind =>
                            permissionFind.id === permission.id);
                        if (!permissionFound) {
                            this.selectedPermissions.push(permission) 
                        } else {
                            this.selectedPermissions = this.selectedPermissions.filter(p => p !== permissionFound);
                        }
                        
                        this.$toast(this.$t(response.data.message), response.data.type);
                    } else {
                        this.$toast(this.$t('Error connecting to the server'), 'error');
                    }
                    
                
        },
        
        getSeverity(status) {
            return status ? 'success' : 'danger';
        },

        openNew() {
            this.submitted = false;
            this.createRoleDialog = true;
        },

        hideDialog() {
            this.updateRoleDialog = false;
            this.createRoleDialog = false;
            this.submitted = false;
        },


        async saveMyRol() {

            try {
                
                const response = await axios.post('/roles', this.myRol);

                if (response) {
                    let newRole = response.data.role
                    this.roles.push(newRole)
                    this.selectedRole = response.data.role;
                }


                this.$toast(this.$t(response.data.message), response.data.type);
            

                this.createRoleDialog = false;
            } catch (error) {
                this.$toast(this.$t('Error connecting to the server'), 'error');
            }
        },

        editMyRol() {
            this.myRol = this.selectedRole;
            this.editedRoleName = this.selectedRole.name;
            this.updateRoleDialog = true;

        },

        updateMyRol() {
            
            // Actualiza el nombre en `selectedRole` solo si `editedRoleName` ha cambiado
            if (this.selectedRole.name !== this.editedRoleName) {
                this.selectedRole.name = this.editedRoleName;
            }else{
                this.$toast(this.$t('Successfully updated.'), 'success');
                this.updateRoleDialog = false;
                return;
            }
            
            axios.put('/roles/' + this.myRol.id, this.myRol)
                .then(async response => {

                    this.$toast(this.$t(response.data.message), response.data.type);
                    this.updateRoleDialog = false;

                })
                .catch(error => {
                    this.$toast(this.$t('Error connecting to the server'), 'error');
                });
        },
        confirmDeleteRol() {
            this.deleteRoleDialog = true;       
        },
        
        deleteMyRol() {

            this.myRol = this.selectedRole;
            // Realizar la solicitud de eliminación al servidor
            axios.delete('/roles/' + this.myRol.id)
                .then(response => {
                    if(response.data.type === 'success'){
                        // Filtrar los teléfonos que no coincidan con el ID del teléfono a eliminar
                        this.roles = this.roles.filter(val => val.id !== this.myRol.id);
                        this.selectedRole = [];
                        this.selectedPermissions = [];
                    }
                    this.$toast(this.$t(response.data.message), response.data.type);
                    
                    
                })
                .catch(error => {
                    this.$toast(this.$t(error.response.message), error.response.type);
                    
                });
                this.deleteRoleDialog = false;
        },


    }
};
</script>

<style>
/* Estilos opcionales si es necesario */
</style>

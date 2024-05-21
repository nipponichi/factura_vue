<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import TableCompaniesAdmin from '@/Pages/Admin/Partials/TableCompaniesAdmin.vue';


</script>

<template>
    <AppLayout title="Companies Admin">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Companies Admin
            </h2>
        </template>
        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
                    <TableCompaniesAdmin />
                </div>
            </div>
        </div>
    </AppLayout>
</template>

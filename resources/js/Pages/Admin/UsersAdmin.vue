<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import TableUsersAdmin from '@/Pages/Admin/Partials/TableUsersAdmin.vue';


</script>
<template>
    <AppLayout title="Users Admin">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                {{ $t('Users') }}
            </h2>
        </template>
        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
                    <TableUsersAdmin />
                </div>
            </div>
        </div>
    </AppLayout>
</template>

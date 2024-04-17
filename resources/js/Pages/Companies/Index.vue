
<template>
    <div class="card">
        <DataTable :value="products" removableSort tableStyle="min-width: 50rem">
            <Column field="code" header="Code" sortable style="width: 25%"></Column>
            <Column field="name" header="Name" sortable style="width: 25%"></Column>
            <Column field="category" header="Category" sortable style="width: 25%"></Column>
            <Column field="quantity" header="Quantity" sortable style="width: 25%"></Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';


onMounted(() => {
    ProductService.getProductsMini().then((data) => (products.value = data));
});

const products = ref();

</script>



<!--<script>
    export default {
        name: 'CompaniesIndex'
    }
</script>

<script setup>
    import AppLayout from '@/Layouts/AppLayout.vue';      
</script>
    
<template>
    <AppLayout>
        <template #header>
            <h1 class="font-semibold text-xl text-gray-800 leading-tight">My company</h1>
        </template>

        <div class="py-12">
            <div class="max-w-7xl max-auto sm:px-6">

            </div>
        </div>
    </AppLayout>       
</template>-->

<template>
    <div class="text-gray-700">
        <div class="grid md:grid-cols-2 text-sm">
            <div class="grid grid-cols-2">
                <div class=" py-2 font-semibold">Tax Number:</div>
                <div class=" py-2">{{ company.tax_number }}</div>
            </div>
            <div class="grid grid-cols-2">
                <div class=" py-2 font-semibold">Email:</div>
                <div class=" py-2">
                    <a class="text-blue-800" :href="emailLink">{{ company.email }}</a>
                </div>
            </div>
            <div class="grid grid-cols-2">
                <div class=" py-2 font-semibold">Phone :</div>
                <div class=" py-2">{{ company.phone }}</div>
            </div>
            <div class="grid grid-cols-2">
                <div class=" py-2 font-semibold">Address :</div>
                <div class=" py-2">{{ company.address}} </div>
            </div>
            
        </div>
    </div>
</template>

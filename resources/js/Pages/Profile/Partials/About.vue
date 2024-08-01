<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import ActionSection from '@/Components/ActionSection.vue';
import DangerButton from '@/Components/DangerButton.vue';
import LogModal from '@/Components/LogModal.vue';
import InputError from '@/Components/InputError.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import TableLog from '@/Pages/Profile/Partials/TableLog.vue';

const openingLogList = ref(false);


const openLogList = () => {
    openingLogList.value = true;

    setTimeout(() => passwordInput.value.focus(), 250);
};

const closeModal = () => {
    openingLogList.value = false;

    form.reset();
};
</script>

<template>
    <ActionSection>
        <template #title>
            {{ $t('About of') }}
        </template>

        <template #description>
            {{ $t ('Version info') }}.
        </template>

        <template #content>
            <div class="max-w-xl text-sm text-gray-600 dark:text-gray-400">
                {{ $t ('Version') }}: 1.0.18
            </div>
            <div class="max-w-xl text-sm text-gray-600 dark:text-gray-400">
                {{ $t ('Date') }}: 30/07/2024.
            </div>
        </template>
    </ActionSection>
</template>

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
            {{ $t('Log Registry') }}
        </template>

        <template #description>
            {{ $t ('A list of profile logged in to the platform') }}.
        </template>

        <template #content>
            <div class="max-w-xl text-sm text-gray-600 dark:text-gray-400">
                {{ $t ('View the basic log listing with information on user activity, IP addresses, and connection times. This straightforward log provides essential details for monitoring site access and usage') }}.
            </div>

            <div class="mt-5">
                <PrimaryButton @click="openLogList">
                    {{ $t ('Logs list') }}
                </PrimaryButton>
            </div>

            <!-- Log Modal -->
            <LogModal :show="openingLogList" @close="closeModal" class="max-w-lg mx-auto">
                <template #title>
                    {{ $t ('Logs list') }}
                </template>

                <template #content>
                    <TableLog/>
                </template>

                <template #footer>
                    <SecondaryButton @click="closeModal">
                        {{ $t('Close') }}
                    </SecondaryButton>
                </template>
            </LogModal>
        </template>
    </ActionSection>
</template>

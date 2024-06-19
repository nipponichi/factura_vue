import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers';
import i18n from 'laravel-vue-i18n/vite'; 

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.js',
                'resources/css/global.css',
            ],
            refresh: true,
        }),
        vue(),
        Components({
            resolvers: [
                PrimeVueResolver()
            ]
        }),
        i18n()
    ],
});

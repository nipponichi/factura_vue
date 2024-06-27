import './bootstrap';
import '../css/app.css';
import '../css/global.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import PrimeVue from "primevue/config";
import 'primevue/resources/themes/aura-light-green/theme.css';
import 'primeicons/primeicons.css';
import 'flowbite';
import { i18nVue } from 'laravel-vue-i18n';
import { toast } from '../js/notifications.js';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(PrimeVue)
            .use(ZiggyVue)
            .use(i18nVue, { 
                resolve: async lang => {
                    const langs = import.meta.glob('../../lang/*.json');
                    return await langs[`../../lang/${lang}.json`]();
                }
            });

        // Agrega la función de notificación al contexto global
        app.config.globalProperties.$toast = toast;

        app.mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});

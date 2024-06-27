//type: info, warning, success, error
import { toast as vueToast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export function toast(message, type) {
    vueToast(message, {
        type: type,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

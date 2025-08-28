import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import 'vue3-toastify/dist/index.css';

createApp(App).use(router).mount('#app')
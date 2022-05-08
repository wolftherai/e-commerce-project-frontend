import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api/manager/'
axios.defaults.withCredentials = true // gets the cookie from the backend
//Vue.prototype.$http = axios;
// set a prototype for http


createApp(App).use(store).use(router).mount('#app')

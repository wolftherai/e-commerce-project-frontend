import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from "axios"


axios.defaults.baseURL = 'http://localhost:8000/api/admin/'
axios.defaults.withCredentials = true // gets the cookie from the backend

// set a prototype for http
Vue.prototype.$http = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

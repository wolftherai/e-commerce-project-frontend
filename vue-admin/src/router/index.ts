import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/views/Layout.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Users from '@/views/Users.vue'
import Links from '@/views/Links.vue'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {path: '/register', component: Register},
  {path: '/login', component: Login},
  {
    path: '',
    component: Layout,
    children: [
        {path: '', redirect: '/users'},
        {path: '/users', component: Users},
        {path: '/users/:id/links', component: Links}
    ]
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

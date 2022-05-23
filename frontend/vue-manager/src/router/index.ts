import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/views/Layout.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'
import ProductsFrontend from '@/views/ProductsFrontend.vue'
import ProductsBackend from '@/views/ProductsBackend.vue'

import Stats from '@/views/Stats.vue'
import Orders from '@/views/Orders.vue'
import Rankings from '@/views/Rankings.vue'

const routes: Array<RouteRecordRaw> = [
  {path: '/register', component: Register},
  {path: '/login', component: Login},
  {
    path: '',
    component: Layout,
    children: [
     // {path: '', component: ProductsFrontend},
      {path: '', component: ProductsBackend},
      {path: '/profile', component: Profile},
      {path: '/stats', component: Stats},
      {path: '/orders', component: Orders},
      {path: '/rankings', component: Rankings},
  ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

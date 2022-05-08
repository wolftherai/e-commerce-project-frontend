import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/views/Layout.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'
import ProductsFrontend from '@/views/ProductsFrontend.vue'

const routes: Array<RouteRecordRaw> = [
  {path: '/register', component: Register},
  {path: '/login', component: Login},
  {
    path: '',
    component: Layout,
    children: [
      {path: '', component: ProductsFrontend},
      {path: '/profile', component: Profile},
  ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

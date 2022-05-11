import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/views/Layout.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Users from '@/views/Users.vue'
import Links from '@/views/Links.vue'
import Orders from '@/views/Orders.vue'
import Products from '@/views/products/Products.vue'
import ProductForm from '@/views/products/ProductForm.vue'

import Categories from '@/views/categories/Categories.vue'
import CategoryForm from '@/views/categories/CategoryForm.vue'

import Brands from '@/views/brands/Brands.vue'
import BrandForm from '@/views/brands/BrandForm.vue'

import Manufacturers from '@/views/manufacturers/Manufacturers.vue'
import ManufacturerForm from '@/views/manufacturers/ManufacturerForm.vue'


import Profile from '@/views/Profile.vue'
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
        {path: '/users/:id/links', component: Links},

        {path: '/products', component: Products},
        {path: '/products/create', component: ProductForm},
        {path: '/products/:id/edit', component: ProductForm},

        {path: '/categories', component: Categories},
        {path: '/categories/create', component: CategoryForm},
        {path: '/categories/:id/edit', component: CategoryForm},

        {path: '/manufacturers', component: Manufacturers},
        {path: '/manufacturers/create', component: ManufacturerForm},
        {path: '/manufacturers/:id/edit', component: ManufacturerForm},

        {path: '/brands', component: Brands},
        {path: '/brands/create', component: BrandForm},
        {path: '/brands/:id/edit', component: BrandForm},

        {path: '/orders', component: Orders},
        {path: '/profile', component: Profile},
    ]
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

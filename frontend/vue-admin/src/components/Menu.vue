<template>     
    <div class="position-sticky pt-3">
        <ul class="nav flex-column">
            <li class="nav-item">

            <router-link to="/products" class="nav-link"  active-class="active">
                Products
            </router-link>

            <router-link to="/categories" class="nav-link"  active-class="active">
                Categories
            </router-link>

            <router-link to="/brands" class="nav-link"  active-class="active">
                Brands
            </router-link>
            
            <router-link to="/manufacturers" class="nav-link"  active-class="active">
                Manufacturers
            </router-link>

            <router-link to="/orders" class="nav-link"  active-class="active">
                Orders
            </router-link>
            <router-link to="/managers" class="nav-link"  active-class="active">
                Managers
            </router-link>
             <router-link to="/customers" class="nav-link"  active-class="active">
                Customers
            </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "Menu"
    
}
</script>
<template>     
    <div class="position-sticky pt-3">
        <ul class="nav flex-column">
            <li class="nav-item">
            <router-link to="/users" class="nav-link"  active-class="active">
                Managers
            </router-link>
            <router-link to="/products" class="nav-link"  active-class="active">
                Products
            </router-link>
            <router-link to="/orders" class="nav-link"  active-class="active">
                Orders
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
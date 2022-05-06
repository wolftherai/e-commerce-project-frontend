<template>     
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Automotive Parts E-commerce</a>
        
        <nav class="my-2 my-md-0 mr-md-3">
            <router-link to="/profile" class="p-2 text-white text-decoration-none">
              <a style="color:white" v-if="this.user.first_name !== '' ">{{this.user.first_name}} {{this.user.last_name}}</a>
              <a v-else style="color:red" >Update profile name!</a>
              
            </router-link>
            <a href="#" style="color:red"  class="p-2 text-decoration-none" @click="logout">Sign out</a>
        </nav>
    </header>
</template>
<script>
export default {
    name: "Nav",
    props: ['user'],
    methods: {
        async logout() {
            
            await this.$http.post('logout');
            await this.$router.push('/login');
        }
    }
}


</script>
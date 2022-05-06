<template>   
    <v-app>  
        <Nav :user="user"/>
        <div class="container-fluid">
        <div class="row">
            <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <Menu/>
            </nav>

            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="table-responsive">
            <router-view />
            </div>
            </main>
        </div>
        </div>
    </v-app>
</template>

<script>
import Nav from "@/components/Nav.vue"
import Menu from "@/components/Menu.vue"
import {User} from "@/models/user.ts"

export default {
    name: "Layout",
    components: {Menu, Nav},
    data(){
        return {
            user: new User()
        }
    },
    async mounted() {
        try{
            const {data} = await this.$http.get('user');
            this.user = data;

           // console.log(response.data);
        }
        catch (e) {
            await this.$router.push('/login');
        }
        
    }
    
}
</script>
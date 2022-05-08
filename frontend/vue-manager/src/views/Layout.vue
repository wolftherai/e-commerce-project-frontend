<template>
   <Nav/> 

<main>
<Header v-if="!hideHeader" />   

    <div class="album py-5 bg-light">
        <div class="container">

        <router-view/>


        </div>
    </div>

</main>

</template>

<script>
import Header from "../components/Header.vue"
import Nav from "../components/Nav.vue"
import {onMounted, computed} from "vue"
import axios from "axios"
import {useStore} from "vuex";
import {useRoute} from "vue-router";

export default {
    name: "Layout",
    components: {Header, Nav},
    //composition api (everything put in setup)
    setup() {
        const store = useStore();

        //don't show header when in detail forms
        const route = useRoute();
        const hideHeader = computed(
            () =>  route.path === '/profile' //|| route.path === '/backend'
            
        );
        
        onMounted(async () => {
        try {
            
            const {data} = await axios.get('user');
            
            await store.dispatch('setUser', data);
            } catch(e)
            {
                 await store.dispatch('setUser', null);
            }
        });
        return {
            hideHeader
        }

    }
}
</script>

<style scoped>
</style>
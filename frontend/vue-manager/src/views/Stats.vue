<template>
<nav aria-label="breadcrumb">
  <ol class="breadcrumb " style="font-size: 35px">
    <li  class="breadcrumb-item active " aria-current="page">Stats</li>
  </ol>
</nav>
<h3 class="text-center" style="background-color: #b9c6c8" >Total revenue: {{user.revenue}}</h3>
    <div class="table-responsive">

        <table class="table">
            <thead>
                <tr>
                <th >#</th>
                <th >Link</th>
                <th >Users</th>
                <th >Revenue</th>
                </tr>
            </thead>
            <tbody>
                <tr :style="link.count > 0 ? 'background-color: #b1f0a4' : 'background-color: #e3a0a0'"
                v-for="link in links"
                :key="link.id"
                >
                    <td>{{ link.id }}</td>
                    <td>{{ checkoutUrl(link.code) }}</td>
                    <td>{{ link.count }}</td>
                    <td>{{ link.revenue }}</td>
                </tr>
            </tbody>
            
        </table> 
    
    </div>
</template>
<script lang="ts">
import {useStore} from "vuex";
import {ref, onMounted, computed} from "vue"
import axios from 'axios'
import {Link} from "@/models/link"

export default {
name: "Stats",

setup() {
    const links = ref<Link[]>([]); // array value [] as Link
    
    const store = useStore();

    const user = computed(
    () => store.state.user);

    onMounted(
        async () => {
            const {data} = await axios.get('stats');

            links.value = data;
        }
    );

    const checkoutUrl = (code: string) => `${process.env.VUE_APP_CHECKOUT_URL}/${code}`;  // get env checkout link
 

    return {
        user,
        links,
        checkoutUrl
    }
}

}

</script>
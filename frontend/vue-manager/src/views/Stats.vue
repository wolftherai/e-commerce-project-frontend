<template>
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
                <tr
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
import {ref, onMounted} from "vue"
import axios from 'axios'
import {Link} from "@/models/link"

export default {
name: "Stats",

setup() {
    const links = ref<Link[]>([]); // array value [] as Link

    onMounted(
        async () => {
            const {data} = await axios.get('stats');

            links.value = data;
        }
    );

    const checkoutUrl = (code: string) => `${process.env.VUE_APP_CHECKOUT_URL}/${code}`;  // get env checkout link
 

    return {
        links,
        checkoutUrl
    }
}

}

</script>
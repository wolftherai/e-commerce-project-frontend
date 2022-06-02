<template>
<nav aria-label="breadcrumb">
  <ol class="breadcrumb " style="font-size: 35px">
    <li  class="breadcrumb-item active " aria-current="page">Rankings</li>
  </ol>
</nav>
    <div class="table-responsive">

        <table class="table">
            <thead>
                <tr>
                <th >#</th>
                <th >Name</th>
                <th >Revenue </th>
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="ranking,i in rankings"
                :key="i"
                >
                    <td>{{ i+1 }}</td>
                    <td>{{ ranking.name }}</td>
                    <td>{{ ranking.revenue }} €</td>
                </tr>
            </tbody>
            
        </table> 
    
    </div>
</template>
<script lang="ts">
import {ref, onMounted} from "vue"
import axios from 'axios'
import {Ranking} from "@/models/ranking"

export default {
name: "Rankings",

setup() {
    const rankings = ref<Ranking[]>([]);; // array value [] as ranking

    onMounted(
        async () => {
            const {data} = await axios.get('rankings');
            
            rankings.value = data;
        }
    );
    return {
        rankings
    }
}

}

</script>
<style scoped>
.breadcrumb {
 font-size: 35px;
 }
</style>
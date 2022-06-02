<template>
<nav aria-label="breadcrumb">
  <ol class="breadcrumb " style="font-size: 35px">
    <li  class="breadcrumb-item active " aria-current="page">Orders</li>
  </ol>
</nav>

    <div class="table-responsive">

        <table class="table">
            <thead>
                <tr>
                <th >#</th>
                <th >Order code</th>
                <th >Date</th>
                <th >Total</th>
                <th >Status</th>
                
                </tr>
            </thead>
            <tbody>
                <tr :style="order.complete? 'background-color: #b1f0a4' : 'background-color: #e3a0a0'"
                v-for="order in orders"
                :key="order.id"
                >
                    <td>{{ order.id }}</td>
                    <td>{{ order.code }}</td>
                    <td>{{ order.updated_at.substring(0,10) }}</td>
                   
                    <td>{{ order.total }} € </td>
                     <td>{{ order.complete? 'COMPLETED':'NOT COMPLETED' }}</td>
                </tr>
            </tbody>
            
        </table> 
    
    </div>
</template>
<script lang="ts">
import {ref, onMounted} from "vue"
import axios from 'axios'
import {Order} from "@/models/order"


export default {
name: "Orders",

setup() {
    const orders = ref<Order[]>([]); // array value [] as order

    onMounted(
        async () => {
            const {data} = await axios.get('orders');

            orders.value = data;
            console.log(orders.value)
        }
    );

    //const checkoutUrl = (code: string) => `${process.env.VUE_APP_CHECKOUT_URL}/${code}`;  // get env checkout order
 

    return {
        orders,
     //   checkoutUrl
    }
}

}

</script>
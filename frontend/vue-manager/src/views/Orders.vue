<template>
    <div class="table-responsive">

        <table class="table">
            <thead>
                <tr>
                <th >#</th>
                <th >Order code</th>
                <th >Status</th>
                <th >Total</th>
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="order in orders"
                :key="order.id"
                >
                    <td>{{ order.id }}</td>
                    <td>{{ order.code }}</td>
                    <td>{{ order.complete? 'COMPLETED':'NOT COMPLETED' }}</td>
                    <td>{{ order.total }} € </td>
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
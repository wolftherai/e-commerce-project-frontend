<template>
<div>
  <v-expansion-panels>
    <v-expansion-panel
      v-for="order in orders"
      :key="order.id"
    >
      <v-expansion-panel-header>
     #{{ order.id}} <br><br> {{order.customer_name}} <br> <br> Completed: {{order.complete}} <br> <br>Total: {{order.total}} €  
      </v-expansion-panel-header>
      <v-expansion-panel-content>
       
            <v-simple-table>
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left">#</th>
                <th class="text-left">Product title</th>
                <th class="text-left">Price</th>
                <th class="text-left">Quantity</th>
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="item in order.order_items"
                :key="item.id"
                >
                    <td>{{ item.id }}</td>
                    <td>{{ item.product_title }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.quantity }}</td>
                </tr>
            </tbody>
            </template>
        </v-simple-table> 
       
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</div>
</template>

<script>
export default {
    name: "Orders",
    data() {
        return {
            orders: []
        }
    },
    async mounted() {
        const {data} = await this.$http.get('orders');
        this.orders = data;
    }
}
</script>

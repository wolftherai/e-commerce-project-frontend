<template>
 <div>
     <div class="pt-3 pb-2 mb-3 border-bottom">
        <v-btn href="/products/create" variant="contained" color="primary">Add</v-btn>
    </div>
    <v-simple-table>
        <template v-slot:default>
        <thead>
            <tr>
            <th class="text-left">#</th>
            <th class="text-left">Image</th>
            <th class="text-left">Title</th>
            <th class="text-left">OEM part number</th>
            <th class="text-left">Brand</th>
            <th class="text-left">Manufacturer</th>
            <th class="text-left">Category</th>
            <th class="text-left">Description</th>
            <th class="text-left">Price</th>
            <th class="text-left">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr
            v-for="product in products.slice((page - 1) * perPage, page * perPage)"
            :key="product.id"
            >
                <td>{{ product.id }}</td>
                <td> <v-img :src="product.image" max-height="80" max-width="120"/></td>
                <td>{{ product.title }}</td>
                <td>{{ product.oem_part_number }}</td>
                <td>{{ product.brand }}</td>
                <td>{{ product.manufacturer }}</td>
                <td>  </td>
                <td>{{ product.description }}</td>
                <td>{{ product.price }} €</td>
                <td>
                    <v-btn-toggle>
                    <v-btn :href="`/products/${product.id}/edit`" @click="editProducts(product.id)" color="primary">Edit</v-btn>
                    <v-btn color="error" @click="deleteProducts(product.id)">Delete</v-btn>
                    </v-btn-toggle>
                </td>
            </tr>
        </tbody>
        </template>
    </v-simple-table> 

    <div class="text-center">
    <v-pagination 
        v-model="page"
        total-visible="7"
        :length="lastPage"
    ></v-pagination>
    </div>

 </div>
</template>

<script>

import Vue from "vue"
export default Vue.extend({
name: "Products",
  data() {
      return {
        products: [],
        page: 1,
        perPage: 15,
        lastPage: 0

      }
  },
  async mounted() {
      const {data} = await this.$http.get('products');

      this.products = data;
      this.lastPage = Math.ceil(data.length / this.perPage)

  },
  methods: {
      async deleteProducts(id= number) {
          if (confirm('Are you sure?'))
          {
            await this.$http.delete(`products/${id}`);// this.products =
            
            this.products = this.products.filter( p => p.id !== id);
          }
        
      }
  }    
})
</script>

<style scoped>

</style>
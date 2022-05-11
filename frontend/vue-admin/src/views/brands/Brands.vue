<template>
 <div>
     <div class="pt-3 pb-2 mb-3 border-bottom">
        <v-btn href="/brands/create" variant="contained" color="primary">Add</v-btn>
    </div>
    <v-simple-table>
        <template v-slot:default>
        <thead>
            <tr>
            <th class="text-left">#</th>
            <th class="text-left">Name</th>
            <th class="text-left">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr
            v-for="brand in brands.slice((page - 1) * perPage, page * perPage)"
            :key="brand.id"
            >
                <td>{{ brand.id }}</td>
                <td>{{ brand.name }}</td>

                <td>
                    <v-btn-toggle>
                    <v-btn :href="`/brands/${brand.id}/edit`" @click="editbrands(brand.id)" color="primary">Edit</v-btn>
                    <v-btn color="error" @click="deletebrands(brand.id)">Delete</v-btn>
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
name: "Brands",
  data() {
      return {
        brands: [],
        page: 1,
        perPage: 15,
        lastPage: 0

      }
  },
  async mounted() {
      const {data} = await this.$http.get('brands');

      this.brands = data;
      this.lastPage = Math.ceil(data.length / this.perPage)

  },
  methods: {
      async deletebrands(id= number) {
          if (confirm('Are you sure?'))
          {
            await this.$http.delete(`brands/${id}`);// this.brands =
            
            this.brands = this.brands.filter( p => p.id !== id);
          }
        
      }
  }    
})
</script>

<style scoped>

</style>
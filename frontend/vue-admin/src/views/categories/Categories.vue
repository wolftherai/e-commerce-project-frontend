<template>
  <div  style="min-width: 1050px; padding: 10px; ">
     <div class="pt-3 pb-2 mb-3 border-bottom">
        <v-btn href="/categories/create" variant="contained" color="primary">Add</v-btn>
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
            v-for="category in categories.slice((page - 1) * perPage, page * perPage)"
            :key="category.id"
            >
                <td>{{ category.id }}</td>
                <td>{{ category.name }}</td>

                <td>
                    <v-btn-toggle>
                    <v-btn :href="`/categories/${category.id}/edit`" @click="editcategories(category.id)" color="primary">Edit</v-btn>
                    <v-btn color="error" @click="deletecategories(category.id)">Delete</v-btn>
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
name: "Categories",
  data() {
      return {
        categories: [],
        page: 1,
        perPage: 15,
        lastPage: 0

      }
  },
  async mounted() {
      const {data} = await this.$http.get('categories');

      this.categories = data;
      this.lastPage = Math.ceil(data.length / this.perPage)

  },
  methods: {
      async deletecategories(id= number) {
          if (confirm('Are you sure?'))
          {
            await this.$http.delete(`categories/${id}`);// this.categories =
            
            this.categories = this.categories.filter( p => p.id !== id);
          }
        
      }
  }    
})
</script>

<style scoped>

</style>
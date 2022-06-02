<template>
 <div  style="!min-width: 1050px; padding: 10px; ">
     <div class="pt-3 pb-2 mb-3 border-bottom">
        <v-btn href="/manufacturers/create" variant="contained" color="primary">Add</v-btn>
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
            v-for="manufacturer in manufacturers.slice((page - 1) * perPage, page * perPage)"
            :key="manufacturer.id"
            >
                <td>{{ manufacturer.id }}</td>
                <td>{{ manufacturer.name }}</td>

                <td>
                    <v-btn-toggle>
                    <v-btn :href="`/manufacturers/${manufacturer.id}/edit`" @click="editmanufacturers(manufacturer.id)" color="primary">Edit</v-btn>
                    <v-btn color="error" @click="deletemanufacturers(manufacturer.id)">Delete</v-btn>
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
name: "Manufacturers",
  data() {
      return {
        manufacturers: [],
        page: 1,
        perPage: 15,
        lastPage: 0

      }
  },
  async mounted() {
      const {data} = await this.$http.get('manufacturers');

      this.manufacturers = data;
      this.lastPage = Math.ceil(data.length / this.perPage)

  },
  methods: {
      async deletemanufacturers(id= number) {
          if (confirm('Are you sure?'))
          {
            await this.$http.delete(`manufacturers/${id}`);// this.manufacturers =
            
            this.manufacturers = this.manufacturers.filter( p => p.id !== id);
          }
        
      }
  }    
})
</script>

<style scoped>

</style>
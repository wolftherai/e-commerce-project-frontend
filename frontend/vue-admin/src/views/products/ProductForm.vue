
<template>
<div style="margin-top:2%">
<form @submit.prevent="submit" style="margin-right: 10px">
        <div class="mb-3">
            <v-text-field label="Title" v-model="title"/>
        </div>
        <div class="mb-3">
            <v-text-field label="OEM part number" v-model="oem_part_number" />
        </div> 



                <div  style="width:300px">
    <template>
        <v-select @change="onChange()"
            v-model="selectedBrand"
            :items="brands"
          
            item-text="name"
            item-value="id"
            label="Brand"
            :value="selectedBrand"
        
            return-object/>
    </template>

        </div>



        <div  style="width:300px">
    <template>
        <v-select @change="onChange()"
            v-model="selectedCategory"
            :items="categories"
          
            item-text="name"
            item-value="id"
            label="Category"
            :value="selectedCategory"
        
            return-object/>
    </template>

        </div>


                <div  style="width:300px">
    <template>
        <v-select @change="onChange()"
            v-model="selectedManufacturer"
            :items="manufacturers"
          
            item-text="name"
            item-value="id"
            label="Manufacturer"
            :value="selectedManufacturer"
        
            return-object/>
    </template>

        </div>                  

        <div class="mb-3">
            <v-text-field label="Description" v-model="description"/>
        </div>
        <div class="mb-3">
            <v-text-field label="Image" v-model="image"/>
        </div>

        <div class="mb-3" style="width:200px">
            <v-text-field label="Price"  type="number" min="0" v-model="price"/>
        </div>
        <v-btn type="submit" color="primary" >Save</v-btn>
        <v-btn  color="red"  style="margin-left:25px" @click="cancel" >Cancel</v-btn>
    </form>
  
</div>
</template>
<script>

export default {
name: "ProductForm",
    data() {
        return {
            title: '',
            oem_part_number: '',
            brand: '',
            manufacturer: '',
            description: '',
            image: '',
            price: '',
            category: '',
            categories: [],
            brands: [],
            manufacturers: [],
            selectedCategory: { id: '1', name: ''},
            selectedBrand: { id: '1', name: ''},
            selectedManufacturer: { id: '1', name: ''},

        }
    },
    async mounted() {


        if(this.$route.params.id) // if id exists
        {
          
            const {data} = await this.$http.get(`products/${this.$route.params.id}`);
            console.log(data)
            this.title = data.title;
            this.oem_part_number = data.oem_part_number;
            this.description = data.description;
            this.image = data.image;
            this.price = data.price;
            this.description = data.description;
            this.selectedCategory.id = data.category;
            this.selectedBrand.id = data.brand;
            this.selectedManufacturer.id = data.manufacturer;

        }
            const catData = await this.$http.get(`categories`);
            this.categories = catData.data ;
            console.log(this.categories)

            const brandData = await this.$http.get(`brands`);
            this.brands = brandData.data
            console.log(this.brands)

            const manufacturerData = await this.$http.get(`manufacturers`);
            this.manufacturers = manufacturerData.data
            console.log(this.manufacturers)



    }  ,        async  created () {
                   // sleep


                },
    methods: {

            async onChange() {
//alert(this.selectedCategory.name)
          },

          async cancel() {
            if (confirm('Are you sure? Your changes will be discarded.')){
                await this.$router.push('/products');
            }
          },
        async submit() {
            const data = {
                title: this.title,
                oem_part_number: this.oem_part_number,
                description: this.description,
                image: this.image,
                price: this.price,
                category: this.selectedCategory.id,
                brand: this.selectedBrand.id,
                manufacturer: this.selectedManufacturer.id 
            };
            
            if (this.$route.params.id) { // if id exists
                await this.$http.put(`products/${this.$route.params.id}`,data) // update product
            }
            else {
                await this.$http.post('products',data) // create product
            }

            await this.$router.push('/products');

        }
    }
}
</script>

<style scoped>

</style>
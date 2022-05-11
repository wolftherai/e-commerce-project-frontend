
<template>
<div style="margin-top:2%">
<form @submit.prevent="submit" style="margin-right: 10px">
        <div class="mb-3">
            <v-text-field label="Title" v-model="title"/>
        </div>
        <div class="mb-3">
            <v-text-field label="OEM part number" v-model="oem_part_number" />
        </div>             
        <div class="mb-3">
            <v-text-field label="Brand" v-model="brand"/>
        </div>

        <div class="mb-3">
            <v-text-field label="Manufacturer" v-model="manufacturer"/>
        </div>                        

        <div class="mb-3">
            <v-text-field label="Description" v-model="description"/>
        </div>
        <div class="mb-3">
            <v-text-field label="Image" v-model="image"/>
        </div>

            <select class="form-select" >
             <option>Select category</option>
                <option v-for="category in categories" v-bind:value="category.name">
                {{ category.name }}
             </option>
            </select>

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
            title : '',
            oem_part_number : '',
            brand : '',
            manufacturer : '',
            description : '',
            image : '',
            price : '',
        }
    },
    async mounted() {
        const categories = await this.$http.get(`categories/`);
        if(this.$route.params.id) // if id exists
        {
            const {data} = await this.$http.get(`products/${this.$route.params.id}`);
            this.title = data.title;
            this.oem_part_number = data.oem_part_number;
            this.brand = data.brand;
            this.manufacturer = data.manufacturer;
            this.description = data.description;
            this.image = data.image;
            this.price = data.price;
            this.description = data.description;
        }
    },
    methods: {
          async cancel() {
            if (confirm('Are you sure? Your changes will be discarded.')){
                await this.$router.push('/products');
            }
          },
        async submit() {
            const data = {
                title: this.title,
                oem_part_number: this.oem_part_number,
                brand: this.brand,
                manufacturer: this.manufacturer,
                description: this.description,
                image: this.image,
                price: this.price,
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
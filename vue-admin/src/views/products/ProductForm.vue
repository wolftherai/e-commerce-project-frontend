<template>
    <div>
        <form @submit.prevent="submit">
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

            <div class="mb-3">
                <v-text-field label="Price" type="number" min="0" v-model="price"/>
            </div>
            <v-btn type="submit" color="primary" >Save</v-btn>
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
    methods: {
        async submit() {
            await this.$http.post('products',
            {
                title: this.title,
                oem_part_number: this.oem_part_number,
                brand: this.brand,
                manufacturer: this.manufacturer,
                description: this.description,
                image: this.image,
                price: this.price,
            })

            await this.$router.push('/products');

        }
    }
}
</script>

<style scoped>

</style>
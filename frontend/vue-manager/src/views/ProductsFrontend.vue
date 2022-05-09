<template>
<div>
<Products :products="products" :filters="filters"/>
</div>
</template>
<script lang="ts">
import Products from "../views/Products.vue"//"@/views/Products"
import {Product} from "@/models/product"
import axios from 'axios'
import {ref,reactive, onMounted} from "vue"
export default {
name: "ProductsFrontend",
components: {Products},
setup() {
    const products = ref<Product[]>([]);
    const filters = reactive({
        s: ''
    });

    onMounted( async () => {
        const {data} = await axios.get('products/frontend');

        products.value = data;
    });

    return {
        products,
        filters
    }
}
}

</script>
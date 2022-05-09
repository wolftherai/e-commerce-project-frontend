<template>

<Products :products="products" :filters="filters" @set-filters="load" />

</template>
<script lang="ts">

import Products from   "../views/Products.vue" //"@/views/Products"
import {Product} from "@/models/product"
import {Filter} from "@/models/filter"
import axios from 'axios'
import {ref, onMounted, reactive} from "vue"

export default {
name: "ProductsBackend",
components: {Products},
setup() {
    const products = ref<Product[]>([]);
    const filters = reactive({
        s: ''
    });

const load = async (f: Filter) => {

        
        filters.s = f.s;
        const arr = [];
        
        if(filters.s)
        {
            arr.push(`s=${filters.s}`);
        }
        const {data} = await axios.get(`products/backend?${arr.join('&')}`);// ?${arr.join('&')}

        products.value= data.data;
    }

    onMounted(() => {load(filters)});

    return {
        products,
        filters,
        load

    }
}
}
</script>
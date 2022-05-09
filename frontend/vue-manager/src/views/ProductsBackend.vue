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
    const filters = reactive<Filter>({
        s: '',
        sort: '',
        page: 1
    });

const load = async (f: Filter) => {

        
        filters.s = f.s;
        filters.sort = f.sort;
        filters.page = f.page;
        const arr = [];
        
        if(filters.s)
        {
            arr.push(`s=${filters.s}`);
        }
        if(filters.sort)
        {
            arr.push(`sort=${filters.sort}`);
        }
        if(filters.page)
        {
            arr.push(`page=${filters.page}`);
        }


        const {data} = await axios.get(`products/backend?${arr.join('&')}`);// ?${arr.join('&')}
        // loading more only after load more function
        products.value= filters.page === 1 ? data.data:  [...products.value, ...data.data]; // mergedata
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
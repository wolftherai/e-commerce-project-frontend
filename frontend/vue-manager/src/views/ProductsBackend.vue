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
        restoreFilters: false,
        s: '',
        sort: '',
        category: '',
        manufacturer: '',
        brand: '',

        car_make: '',
        car_model: '',
        car_model_year: '',


        page: 1
    });

const load = async (f: Filter) => {

        
        filters.s = f.s;
        filters.sort = f.sort;
        filters.category = f.category;
        filters.manufacturer = f.manufacturer;
        filters.brand = f.brand;

        filters.car_make = f.car_make;
        filters.car_model = f.car_model;
        filters.car_model_year = f.car_model_year;

        filters.page = f.page;
        filters.restoreFilters = f.restoreFilters;
        const arr = [];
        
          if(!filters.restoreFilters)
        {
            if(filters.s)
            {
                arr.push(`s=${filters.s}`);
            }
            if(filters.sort)
            {
                arr.push(`sort=${filters.sort}`);
            }
            if(filters.category)
            {
                arr.push(`category=${filters.category}`);
            }
            if(filters.manufacturer)
            {
                arr.push(`manufacturer=${filters.manufacturer}`);
            }
            if(filters.brand)
            {
                arr.push(`brand=${filters.brand}`);
            }

            // car data filters
            if(filters.car_make)
            {
                arr.push(`car_make=${filters.car_make}`);
            }
            if(filters.car_model)
            {
                arr.push(`car_model=${filters.car_model}`);
            }
            if(filters.car_model_year)
            {
                arr.push(`car_model_year=${filters.car_model_year}`);
            }


            if(filters.page)
            {
                arr.push(`page=${filters.page}`);
            }

        
                //filters.brand
            
        }
        else
        {
            arr.push(`restoreFilters=${filters.restoreFilters}`);
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
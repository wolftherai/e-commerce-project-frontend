<template>

<div class="col-md-12 mb-4 input-group">
    <input class="form-control" placeholder="Search" @keyup="search($event.target.value)"/>


    <div class="input-group-append">
        <select class="form-select" @change="sort($event.target.value)">
        
            <option>Select</option>
            <option value="asc">Price Ascending</option>
            <option value="desc">Price Descending</option>
        </select>



    </div>
                <select class="form-select" @change="sort($event.target.value)">
            <option>Select manufacturer</option>
                <option v-for="product in [...new Set(products.map(x => x.manufacturer))]" v-bind:value="product">
                {{ product }}
                </option>
             </select>

            <select class="form-select" @change="sort($event.target.value)">
             <option>Select brand</option>
                <option v-for="product in [...new Set(products.map(x => x.brand))]" v-bind:value="product">
                {{ product }}
             </option>
            </select>
</div>

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
    <div class="col"
        v-for="product in products" 
        :key="product.id"
        >
        <div class="card shadow-sm">
        <img :src="product.image" height="200"/>

            <div class="card-body">
            <p class="card-text">{{product.title}}</p>

            <p  class="text-muted"> OEM: {{product.oem_part_number}}</p>
        
            <small class="text-muted">{{product.description}} </small>
            <br>
            <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                <button type="button" class="btn btn-sm btn-outline-secondary">Add to cart</button>
                </div>
                <small class="text-muted">{{product.price}} €</small>
            </div>
            </div>
        </div>
    </div>

</div>
<div  class="d-flex justify-content-between mt-4">
<button class="btn btn-primary" @click="loadMore" >Load More</button>
</div>
</template>
<script lang="ts">
import {SetupContext} from "vue"
import axios from 'axios'
import {Product} from "@/models/product"
//import uniq from 'lodash/uniq'

export default {
name: "Products",
props: ['products', 'filters'],
emits: ['set-filters'],

setup(props: any, context: SetupContext) {

   /* const manufacturer => {
        pr : this.products
    }*/
    //const manufacturer = [...new Set(...props.products.map(x => x.id))]; // your code from above
    const search = (s: string) => {
        context.emit('set-filters', {
          ...props.filters,
          s,
          page: 1
        });
    }

        const sort = (sort: string) => {
        context.emit('set-filters', {
            ...props.filters,
            sort,
            page: 1
        });
    }
    const loadMore = () => {
        context.emit('set-filters', {
            ...props.filters,
            page: props.filters.page + 1
        });
    }

    return {
        search,
        sort,
        loadMore
    }
}
}

</script>

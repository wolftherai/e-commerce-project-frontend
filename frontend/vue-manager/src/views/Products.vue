<template>

<div class="col-md-12 mb-4 input-group">
<input class="form-control" placeholder="Search" @keyup="search($event.target.value)"/>
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
</template>
<script lang="ts">
import {SetupContext} from "vue"
import axios from 'axios'

export default {
name: "Products",
props: ['products', 'filters'],
emits: ['set-filters'],

setup(props: any, context: SetupContext) {

    const search = (s: string) => {
        context.emit('set-filters', {
            s
        });
    }

    return {
        search
    }
}
}

</script>

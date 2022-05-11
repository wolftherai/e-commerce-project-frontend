<template>
<div  class="py-5 text-center container">
<div v-if="link" class="alert alert-info"  role="alert" > {{link}}</div>
<div v-if="error" class="alert alert-danger"  role="alert" > {{error}}</div>

</div>

<div  class="py-5 text-center container"  >
<button v-if="selected.length>0" class="btn btn-info" @click="generateLink" > Generate checkout link</button>
<button v-if="addedToCart.length>0" class="btn btn-info" @click="generateCart"   > Go to checkout </button>
</div>

<div class="col-md-12 mb-4 input-group">
    <input class="form-control" placeholder="Search" @keyup="search($event.target.value)"/>



    <div class="input-group-append">
        <select class="form-select" @change="sort($event.target.value)">
        
            <option>Sort by:</option>
            <option value="asc">Price Ascending</option>
            <option value="desc">Price Descending</option>
        </select>



    </div>
                <select class="form-select" @change="sort($event.target.value)">
            <option>Select manufacturer</option>
                <option v-for="product in [...new Set(products.map(x => x.manufacturer_name))]" v-bind:value="product">
                {{ product }}
                </option>
             </select>

            <select class="form-select" @change="sort($event.target.value)">
             <option>Select brand</option>
                <option v-for="product in [...new Set(products.map(x => x.brand_name))]" v-bind:value="product">
                {{ product }}
             </option>
            </select>
</div>

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
    <div class="col"
        v-for="product in products" 
        :key="product.id"
        >
        <div :class="selected.some(s => s === product.id) ? 'card shadow-sm selected' : 'card shadow-sm '" >
        <img :src="product.image" height="200"/>

            <div class="card-body">
            <p class="card-text">{{product.title}}</p>

             <p  class="text-muted">  {{product.manufacturer_name}} |  {{product.category_name}} | {{product.brand_name}} </p>

            <p  class="text-muted"> OEM: {{product.oem_part_number}}</p>

           
            <p  class="text-muted"> </p>
        
            <small class="text-muted">{{product.description}} </small>
            <br>
            <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group" v-if="user != null">
                   
                    <button v-if="addedToCart.some(s => s === product.id)?true:false" type="button" class="btn btn-sm btn-outline-secondary selected" @click="addToCart(product.id)" >Remove from cart</button>
                    <button v-if="addedToCart.some(s => s === product.id)?false:true" type="button" class="btn btn-sm btn-outline-secondary" @click="addToCart(product.id)" >Add to cart</button>
                </div>

                 <div class="btn-group" v-if="user == null">
                    <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                    <button v-if="selected.some(s => s === product.id)?true:false" type="button" class="btn btn-sm btn-outline-secondary selected" @click="select(product.id)" >Remove from selected</button>
                    <button v-if="selected.some(s => s === product.id)?false:true" type="button" class="btn btn-sm btn-outline-secondary" @click="select(product.id)" >Add to selected</button>

        
                </div>
                <small class="text-muted">{{product.price}} €</small>
            </div>
            </div>
        </div>
    </div>

</div>
<div  class="py-5 text-center container">
<button class="btn btn-primary" @click="loadMore" >Load More</button>
</div>
</template>
<script lang="ts">
import {SetupContext, ref} from "vue"
import axios from 'axios'
import {Product} from "@/models/product"
//import uniq from 'lodash/uniq'

export default {
name: "Products",
props: ['products', 'filters'],
emits: ['set-filters'],

setup(props: any, context: SetupContext) {

    const link =  ref('')
    const selected = ref<number[]>([]); // selected products

    const addedToCart = ref<number[]>([]); // added to cart

    const error = ref('')

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

    const select = (id:number) => {
         //addedToCart.value = [...addedToCart.value, id]
        //remove id
        if(selected.value.some(s => s === id))
        {
            selected.value = selected.value.filter(s => s!== id);
            return;
        }

        selected.value = [...selected.value, id]

    }
    
    const addToCart = (id:number) => {
        //remove id
        // addedToCart.value = [...addedToCart.value, id]
        if(addedToCart.value.some(s => s === id))
        {
            addedToCart.value = addedToCart.value.filter(s => s!== id);
            return;
        }
        addedToCart.value = [...addedToCart.value, id]
    }

    const generateLink = async () => {

    try {
        const {data} = await axios.post('links', {
            products: selected.value
        })

        link.value = `Link generated: ${process.env.VUE_APP_CHECKOUT_URL}/${data.code}`;
        
        }
        catch (e) {
            error.value = 'You should be logged in to generate a link! '
            alert(error.value)
        }
        finally {
            setTimeout( () => {
               // link.value = '';
                error.value = '';

            }, 5000); // after 5 seconds reset msg

           /*             setTimeout( () => {
                link.value = '';
               

            }, 60000); // after 60 seconds reset msg
            */
        }


    }

    const generateCart = async () => {
    //replace with cart
        // const {data} = await axios.post('links', {
        //     products: selected.value
        // })
 try {
        const {data} = await axios.post('cart', {
            products: addedToCart.value
        })

        link.value = `Link generated: ${process.env.VUE_APP_CHECKOUT_URL}/${data.code}`;

        //await this.$router.push(cart)
        }
        catch (e) {
            error.value = 'You should be logged in to generate a link! '
            alert(error.value)
        }
        finally {
            setTimeout( () => {
               // link.value = '';
                error.value = '';

            }, 5000); 
    }
    }

    return {
        selected,
        addedToCart,
        select,
        addToCart,
        search,
        sort,
        loadMore,
        link,
        generateLink,
        generateCart,
        error
    }
}
}

</script>

<style scoped>
.card {
    cursor: pointer;
}

.card.selected {
    border: 4px solid darkcyan;
}
button.selected {
    color: red
}
</style>
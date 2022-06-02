<template>
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li  class="breadcrumb-item active" aria-current="page">Products</li>
  </ol>
</nav>
<div >
    <div  v-if="link" class="alert alert-info text-center"  role="alert" > {{link}}</div>
    <div v-if="error" class="alert alert-danger text-center"  role="alert" > {{error}}</div>

</div>

<div class="text-center">
<button v-if="selected.length>0" class="btn btn-info " @click="generateLink" > Generate checkout link </button>
<button v-if="addedToCart.length>0" class="btn btn-info  "  @click="generateCart"   > Go to checkout </button>
</div>

    
            
            <div class=" row row-cols-1 card shadow-sm text-center"  style="max-width: 350px; padding: 20px">
            <h3>Filter by car model </h3>
                    <select :value="filters.car_make"  class="form-select  form-select-lg mb-3" @change="car_make($event.target.value)" >
                    <option value="">Select Car Make</option>
                    <option v-for="model in products"
                    v-bind:value="model.car_makes[0]">
                    {{ model.car_makes[0]}}

                    </option>
                    </select>

                    <select v-if="filters.car_make != '' " :value="filters.car_model"  class="form-select  form-select-lg mb-3" @change="car_model($event.target.value)" >
                    <option value="">Select Car Model</option>
                    <option v-for="model in products"
                    v-bind:value="model.car_model_names[0]">
                    {{ model.car_model_names[0]}}

                    </option>
                    </select>            


                    <select v-if="filters.car_model != '' " :value="filters.car_model_year"  class="form-select  form-select-lg mb-3" @change="car_model_year($event.target.value)" >
                    <option value="">Select Car Model Year</option>
                    
                    <option v-for="model in products"
                    v-bind:value=" model.car_model_years[0]">
                    {{ model.car_model_years[0]}}

                    </option>
                    </select>
            </div>      <div class="input-group-append">
        </div>  
    <div>

    <br></div>
 
 <h3>Filters </h3>
<div class="col-md-12 mb-5 input-group">
    <div class="input-group-append">
          <select :value="filters.category" class="form-select" @change="category($event.target.value)">
            <option  value="">Select category</option>
                <option v-for="category in [...new Set(products.map(x => x.category_name))]" v-bind:value="category">
                {{ category }}
                </option>
             </select>
    </div>
    <div class="input-group-append">
             <select :value="filters.manufacturer"  class="form-select" @change="manufacturer($event.target.value)">
            <option  value="">Select manufacturer</option>
                <option v-for="manufacturer in [...new Set(products.map(x => x.manufacturer_name))]" v-bind:value="manufacturer">
                {{ manufacturer }}
                </option>
             </select>
    </div>
    <div class="input-group-append">
            <select :value="filters.brand"  class="form-select" @change="brand($event.target.value)">
             <option value="">Select brand</option>
                <option v-for="brand in [...new Set(products.map(x => x.brand_name))]" v-bind:value="brand">
                {{ brand }}
             </option>
            </select>

    </div>
    <br><button  class="btn btn-info" @click="restoreFilters"   > Reset filters </button>


</div>
<h3>Search </h3>
<div class="col-md-12 mb-5 input-group">


    <input value="" id="searchInput" class="form-control" placeholder="Search" @keyup="search($event.target.value)"/>

    <div class="input-group-append">
        <select :value="filters.sort" class="form-select" @change="sort($event.target.value)">
        
            <option value="">Sort by:</option>
            <option value="asc">Price Ascending</option>
            <option value="desc">Price Descending</option>
        </select>

    </div>

</div>

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
    <div class="col"
        v-for="product in products" 
        :key="product.id"
        >
        <div :class="selected.some(s => s === product.id) ? 'card shadow-sm selected' : 'card shadow-sm '" >
          <div class="embed-responsive ">
            <img alt="Card image cap" class="card-img-top embed-responsive-item" :src="product.image" />
        </div>

            <div class="card-body">
            <p class="card-text">{{product.title}}</p>

             <p  class="text-muted">  {{product.manufacturer_name}} |  {{product.category_name}} | {{product.brand_name}} </p>

            <p  class="text-muted"> OEM: {{product.oem_part_code}}</p>

           
            <p  class="text-muted"> </p>
        
            <small class="text-muted">{{product.description}} </small>
            <br>
            <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group" v-if="user == null">
                    <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                </div>
                <div class="btn-group" v-if="user != null && user.is_customer">
                    <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                    <button v-if="addedToCart.some(s => s === product.id)?true:false" type="button" class="btn btn-sm btn-outline-secondary selected" @click="addToCart(product.id)" >Remove from cart</button>
                    <button v-if="addedToCart.some(s => s === product.id)?false:true" type="button" class="btn btn-sm btn-outline-secondary" @click="addToCart(product.id)" >Add to cart</button>
                </div>

                 <div class="btn-group" v-if="user != null && !user.is_customer">
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
<script lang="ts"   >
import {useStore} from "vuex";
import {SetupContext, ref, computed} from "vue"
import axios from 'axios'
import {Product} from "@/models/product"
//import recombeeIntegration from "https://web-integration.recombee.com/v1/recombee.js"
//import uniq from 'lodash/uniq'

export default {
name: "Products",
props: ['products', 'filters'],
emits: ['set-filters'],
setup(props: any, context: SetupContext) {

      //GET USER OBJECT
    const store = useStore();

    const user = computed(
    () => store.state.user);

    const link =  ref('')
    const selected = ref<number[]>([]); // selected products

    const addedToCart = ref<number[]>([]); // added to cart

    const error = ref('');


    const restoreFilters = () => {
        context.emit('set-filters', {
            ...props.filters,
            restoreFilters: true,
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
        
    }
    const search = (s: string) => {
        if(s.length > 2){
        context.emit('set-filters', {
          ...props.filters,
          s,
          restoreFilters: false,
          page: 1
        });
        }
    }

        const sort = (sort: string) => {
        context.emit('set-filters', {
            ...props.filters,
            sort,
            restoreFilters: false,
            page: 1
        });
    }

        const category = (category: string) => {
        context.emit('set-filters', {
            ...props.filters,
            category,
            restoreFilters: false,
            page: 1
        });
        selectedCategory: category;
    }

        const manufacturer = (manufacturer: string) => {
        context.emit('set-filters', {
            ...props.filters,
            manufacturer,
            restoreFilters: false,
            page: 1
        });
    }

        const brand = (brand: string) => {
        context.emit('set-filters', {
            ...props.filters,
            brand,
            restoreFilters: false,
            page: 1
        });
    }

        const car_make = (car_make: string) => {
        context.emit('set-filters', {
            ...props.filters,
            car_make,
            restoreFilters: false,
            page: 1
        });
    }


        const car_model = (car_model: string) => {
        context.emit('set-filters', {
            ...props.filters,
            car_model,
            restoreFilters: false,
            page: 1
        });
    }


        const car_model_year = (car_model_year: string) => {
        context.emit('set-filters', {
            ...props.filters,
            car_model_year,
            restoreFilters: false,
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
        const {data} = await axios.post('links', {
            products: addedToCart.value
        })

        link.value = `${process.env.VUE_APP_CHECKOUT_URL}/${data.code}`;
        
        window.open(link.value)

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
        user,
        selected,
        addedToCart,
        select,
        addToCart,
        search,
        sort,
        category,
        brand,
        manufacturer,

        car_make,
        car_model,
        car_model_year,        

        loadMore,
        link,
        generateLink,
        generateCart,
        error,
        restoreFilters,

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
.embed-responsive .card-img-top {
    
    height: 200px;
    object-fit: cover;
}
.breadcrumb {
 font-size: 35px;
 }
</style>
  


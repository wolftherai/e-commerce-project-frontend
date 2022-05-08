<template>
<div>
<a>Products</a>
<Products/>
</div>
</template>
<script>
import Products from "@/views/Products"
import axios from 'axios'
export default {
name: "ProductsBackend",
components: {Products}
}

</script>

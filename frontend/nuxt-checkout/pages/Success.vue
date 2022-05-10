<template>

<div class="container">
<main>
<div class="py-5 text-center">
<h2 class="load">Success</h2>
<p class>Your purchase has been completed!</p>
<a href="http://localhost:4000/ ">Main page</a>
</div>
</main>
</div>
</template>
<script>
export default{
    name: 'Success',
    async mounted() {
       try {
          const {data} = await this.$axios.post('orders/confirm',{
           source: this.$route.query.source
       });
        console.log('success');
        console.log(data);
        } 
        catch(e){
             this.$router.push('/Error');
               console.log('error');
      //      alert('error occured!');
        
        }
    }
}
</script>
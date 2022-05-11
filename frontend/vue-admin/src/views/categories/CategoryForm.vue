
<template>
<div style="margin-top:2%">
<form @submit.prevent="submit" style="margin-right: 10px">
        <div class="mb-3">
            <v-text-field label="Name" v-model="title"/>
        </div>
       
        <v-btn type="submit" color="primary" >Save</v-btn>
        <v-btn  color="red"  style="margin-left:25px" @click="cancel" >Cancel</v-btn>
    </form>
</div>
</template>
<script>

export default {
name: "CategoryForm",
    data() {
        return {
            title : '',
        }
    },
    async mounted() {

        if(this.$route.params.id) // if id exists
        {
            const {data} = await this.$http.get(`categories/${this.$route.params.id}`);
            this.title = data.name;

        }
    },
    methods: {
          async cancel() {
            if (confirm('Are you sure? Your changes will be discarded.')){
                await this.$router.push('/categories');
            }
          },
        async submit() {
            const data = {
                name: this.title,
            };
            
            if (this.$route.params.id) { // if id exists
                await this.$http.put(`categories/${this.$route.params.id}`,data) // update product
            }
            else {
                await this.$http.post('categories',data) // create product
            }

            await this.$router.push('/categories');

        }
    }
}
</script>

<style scoped>

</style>
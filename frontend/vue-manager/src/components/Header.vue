<template>

  <section class="py-5 text-center container">
    <div class="row py-lg-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="fw-light">{{title}}</h1>
        <p v-if="user != null" class="lead text-muted">{{description}}</p>
        <p v-if="user == null">
          <router-link to="/login" class="btn btn-primary my-2">Login</router-link>
          <router-link to="/register" class="btn btn-secondary my-2">Register</router-link>
        </p>
      </div>
    </div>
  </section>

</template>
<script>
import {useStore} from "vuex";
import {computed, ref, watch} from "vue";
export default{
    name: "Header",
    setup() {
      const title = ref('');
      const description = ref('');

      //GET USER OBJECT
      const store = useStore();

      const user = computed(
        () => store.state.user);

      title.value = user.value ? user.value.revenue  +  ' €' : 'Welcome'

      description.value = user.value ? ' You have earned this far ' : 'Share links to earn money!'

    /*  setTimeout(
        () => {
          title.value = 'Value change' // to change value use .value
        }, 3000
      );*/

      // watcher on value change
      watch(user, () => {

      title.value = user.value ? user.value.revenue +  ' €' : 'Welcome'
      description.value = user.value ? ' You have earned this far ' : 'Share links to earn money!'
      });

      return {
        title,
        description,
        user
      }
    }
}

</script>

<style scoped>
</style>
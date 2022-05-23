<template>

<div class="container">
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-4 mb-4 border-bottom">


      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li>
        <router-link to="/" class="nav-link px-2 link-secondary" exact-active-class="link-dark">Products</router-link>
        </li>
    
      </ul>

      <div  class="col-md-5 " v-if="user != null && !user.is_customer">
 
      <router-link to="/orders" class="btn me-2" >Orders</router-link>
      <router-link to="/stats" class="btn me-2" >Stats</router-link>
      <router-link to="/rankings" class="btn me-2" >Rankings</router-link>
        <a href="#" type="button" class="btn btn-outline-primary me-2" @click="logout">Logout</a>
        <router-link to="/profile" class="btn btn-primary  me-2">{{user.first_name}} {{user.last_name}}</router-link>
      </div>
      <div  class="col-md-4 " v-if="user != null && user.is_customer">
 
      <router-link to="/orders" class="btn me-2" >Orders</router-link>

        <a href="#" type="button" class="btn btn-outline-primary me-2" @click="logout">Logout</a>
        <router-link to="/profile" class="btn btn-primary  me-2">{{user.first_name}} {{user.last_name}}</router-link>
      </div>

      <div class="col-md-3 " v-if="user == null">
        <router-link to="/login" class="btn btn-outline-primary me-2">Login</router-link>
        <router-link to="/register"  class="btn btn-primary">Sign-up</router-link>
      </div>

    </header>
  </div>  

</template>
<script>
import {useStore} from "vuex";
import {computed} from "vue";
import axios from "axios";
export default {
    name: "Nav",
    setup() {
      //GET USER OBJECT
      const store = useStore();

      const user = computed(
        () => store.state.user);

      const logout = async () => {
        await axios.post('logout');
        await store.dispatch('setUser', null);
      //  await this.router.push('/');
        

      }
      
// all the variables and functions should be returned
      return {
        user,
        logout
      }
    }
}
</script>

<style scoped>
</style>
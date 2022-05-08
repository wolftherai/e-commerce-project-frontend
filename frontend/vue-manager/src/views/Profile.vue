
<template>
<div style="margin-top:2%">


<h3>Account Information</h3>
    <form @submit.prevent="infoSubmit" style="margin-right: 10px">
        <div class="mb-3">
        <label>First Name</label>
            <input v-model="infoData.first_name" class="form-control"/>
        </div>
        <div class="mb-3">
        <label>Last Name</label>
            <input v-model="infoData.last_name" class="form-control"  />
        </div>             
        <div class="mb-3">
        <label>Email</label>
            <input  v-model="infoData.email" class="form-control"  />
        </div>

        <button class="btn btn-outline-secondary"  type="submit" >Save</button>
        <button class="btn btn-outline-secondary" type="button"   @click="cancel"   style="margin-left:25px" >Cancel</button>
    </form>
    <br><br>
<h3 class="mb-4">Change Password</h3>
    <form @submit.prevent="passwordSubmit" style="margin-right: 10px">
        <div class="mb-3">
         <label>Password</label>
            <input  v-model="passwordData.password" class="form-control" type="password"  />
        </div>
        <div class="mb-3">
        <label>Password Confirm</label>
            <input v-model="passwordData.password_confirm"  class="form-control" type="password"  />
        </div>

        <button class="btn btn-outline-secondary" type="submit" >Save</button>
        <button class="btn btn-outline-secondary"  type="button"  @click="cancel"   style="margin-left:25px" >Cancel</button>
    </form>

</div>
</template>
<script>

import {reactive, computed, watch, onMounted} from "vue"
import {useStore} from "vuex";
import axios from "axios";
import {useRoute} from "vue-router";
export default {
name: "Profile",
setup() {
    const data = null;// = ''
    const route = useRoute();
    const store = useStore();
    const user = computed(
        () => store.state.user
    )

    // with reactive you dont need .value atributes
    const infoData = reactive({
        first_name: user.value.first_name,
        last_name: user.value.last_name,
        email: user.value.email

    });

    const passwordData = reactive({
    password: '',
    password_confirm: ''

    });

    const cancel =  async () => {
            if (confirm('Are you sure? Your changes will be discarded.')){
                // this.$router.push('/');
                
            }
    }
          

//generate values before page load            
    // onMounted(async () => {
    //     infoData.first_name = user.value.first_name;
    //     infoData.last_name = user.value.last_name;
    //     infoData.email = user.value.email;
    // });


//watch for changes
    watch(user, () => {
        infoData.first_name = user.value.first_name;
        infoData.last_name = user.value.last_name;
        infoData.email = user.value.email;
    });

const infoSubmit= async () => {
    const {data} = await axios.put('users/info', infoData)
    .then((response) => {
        alert('Profile Info Updated!' + response.data);
       // await store.dispatch('setUser', data);
      //  this.route.go();
    })
    .catch((error) => {
        // handle this error here
        alert('Error ocurred!');
    })
    .finally(() => {
    })
    await store.dispatch('setUser', data);
    
}

const passwordSubmit= async () => {
    await axios.put('users/password', passwordData).then((response) => {
        alert('Password changed!' + response.data);
        //await store.dispatch('setUser', data);
        // this.route.go();
    }).catch((error) => {
        // handle this error here
      //  alert('Error ocurred! Try again');
    })
    .finally(() => {
    passwordData.password =''
    passwordData.password_confirm ='' 
    })

}

//await store.dispatch('setUser', data);
    return {
        //user,
        data,
        infoData,
        passwordData,
        infoSubmit,
        passwordSubmit,
        cancel
       
    }
}

}
</script>

<style scoped>

</style>
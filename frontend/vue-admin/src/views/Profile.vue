
<template>
<div style="margin-top:2%">
 <div>    
  <v-alert :value="success_alert" border="top" type="success" transition="slide-y-transition">Profile updated!
  </v-alert>
  
<v-alert :value="error_alert" border="top" type="error" transition="slide-y-transition"
  >Error occured during profile update!
  </v-alert>
 </div> 

<h3>Account Information</h3>
    <form @submit.prevent="infoSubmit" style="margin-right: 10px">
        <div class="mb-3">
            <v-text-field label="First Name" v-model="user.first_name"/>
        </div>
        <div class="mb-3">
            <v-text-field label="Last Name" v-model="user.last_name" />
        </div>             
        <div class="mb-3">
            <v-text-field label="Email" v-model="user.email"/>
        </div>

        <v-btn type="submit" color="primary" >Save</v-btn>
        <v-btn  color="red"  style="margin-left:25px" @click="cancel" >Cancel</v-btn>
    </form>
    <br><br>
<h3 class="mb-4">Change Password</h3>
    <form @submit.prevent="passwordSubmit" style="margin-right: 10px">
        <div class="mb-3">
            <v-text-field type="password" label="Password" v-model="password"/>
        </div>
        <div class="mb-3">
            <v-text-field type="password" label="Password Confirm" v-model="password_confirm" />
        </div>

        <v-btn type="submit" color="primary" >Save</v-btn>
        <v-btn  color="red"  style="margin-left:25px" @click="cancel" >Cancel</v-btn>
    </form>

</div>
</template>
<script>

export default {
name: "Profile",
    data() {
        return {
            success_alert: false,
            error_alert: false,
             first_name: '',
             last_name: '',
             email: '',
            password: '',
            password_confirm: '',
        }
    },
    async mounted() {
        
            //  this.first_name = this.user.first_name;
            //  this.last_name = this.user.last_name;
            //  this.email = this.user.email;
            if(this.success_alert || this.error_alert)
            {
                 this.hide_alert();     
            }     
    },
    methods: {
          async cancel() {
            if (confirm('Are you sure? Your changes will be discarded.')){
                await this.$router.go();
            }
          },
        async infoSubmit() {
            try{
               await this.$http.put('users/info',{
                    first_name: this.user.first_name,//this.user.first_name
                    last_name: this.user.last_name,
                    email: this.user.email,
                }); // update info
                // this.$store.dispatch('setUser', data);
                 // use const data to later dispatch the event again
                this.success_alert = true;
                this.hide_alert();
            }
            catch(e)
            {
                this.error_alert = true;
                this.success_alert = false;
                
            }
            
         //   await this.$router.push('/profile');

        },
        async passwordSubmit() {
                        try{
                await this.$http.put('users/password',{
                password: this.password,
                password_confirm: this.password_confirm,
                }) // update info
                this.success_alert = true;
                this.hide_alert();
            }
            catch(e)
            {
                this.error_alert = true;
            }


          //  await this.$router.push('/profile');

        },
            hide_alert: function (event) {
      console.log('Hide')
      // `event` is the native DOM event
      window.setInterval(() => {
        this.success_alert = false;
        this.error_alert = false;
        console.log("hide alert after 3 seconds");
      }, 2000)    
    }
  },
    computed: {
      user() {
          return this.$store.state.user; // get user from vuex
      }  
    }
}
</script>

<style scoped>

</style>
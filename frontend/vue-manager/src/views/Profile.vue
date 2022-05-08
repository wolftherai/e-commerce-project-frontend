
<template>
<div style="margin-top:2%">


<h3>Account Information</h3>
    <form @submit.prevent="infoSubmit" style="margin-right: 10px">
        <div class="mb-3">
            <v-text-field label="First Name" />
        </div>
        <div class="mb-3">
            <v-text-field label="Last Name" />
        </div>             
        <div class="mb-3">
            <v-text-field label="Email" />
        </div>

        <v-btn type="submit" color="primary" >Save</v-btn>
        <v-btn  color="red"  style="margin-left:25px" @click="cancel" >Cancel</v-btn>
    </form>
    <br><br>
<h3 class="mb-4">Change Password</h3>
    <form @submit.prevent="passwordSubmit" style="margin-right: 10px">
        <div class="mb-3">
            <v-text-field type="password" label="Password" />
        </div>
        <div class="mb-3">
            <v-text-field type="password" label="Password Confirm"  />
        </div>

        <v-btn type="submit" color="primary" >Save</v-btn>
        <v-btn  color="red"  style="margin-left:25px" @click="cancel" >Cancel</v-btn>
    </form>

</div>
</template>
<script>

export default {
name: "Profile",

}
</script>

<style scoped>

</style>
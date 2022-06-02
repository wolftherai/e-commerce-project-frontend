<template>



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

      title.value = user.value ? (!user.value.is_customer?user.value.revenue+' €':'Welcome'  ) : 'Welcome'

      description.value = user.value ? (!user.value.is_customer?' You have earned this far ':'') : ''

    /*  setTimeout(
        () => {
          title.value = 'Value change' // to change value use .value
        }, 3000
      );*/

      // watcher on value change
      watch(user, () => {
     title.value = user.value ? (!user.value.is_customer?user.value.revenue+' €':'Welcome'  ) : 'Welcome'

      description.value = user.value ? (!user.value.is_customer?' You have earned this far ':'') : ''
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
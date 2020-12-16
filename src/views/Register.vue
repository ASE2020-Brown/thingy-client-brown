<template>
  <div>
    <RegisterForm v-if="!loggedIn"></RegisterForm>
  </div>
</template>

<script>
// @ is an alias to /src
import RegisterForm from "@/components/RegisterForm.vue";
import store from "@/store";

export default {
  name: 'Register',

  components: {
    RegisterForm,
  },

  computed: {
    loggedIn () {
      return store.state.user.loggedIn;
    }
  },
};
</script>
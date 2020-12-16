<template>
  <div>
    <AlreadyLoggedIn v-if="loggedIn"></AlreadyLoggedIn>
    <LoginForm v-else></LoginForm>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from "@/components/LoginForm.vue";
import AlreadyLoggedIn from "@/components/AlreadyLoggedIn";
import store from "@/store";

export default {
  name: 'Login',

  components: {
    LoginForm,
    AlreadyLoggedIn,
  },

  computed: {
    loggedIn () {
      return store.state.user.loggedIn;
    },
  },
};
</script>
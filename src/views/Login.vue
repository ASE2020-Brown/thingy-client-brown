<template>
  <div>
    <LoginForm v-if="!loggedIn"></LoginForm>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from "@/components/LoginForm.vue";
import store from "@/store";

export default {
  name: 'Login',

  components: {
    LoginForm,
  },

  computed: {
    loggedIn () {
      return store.state.user.loggedIn;
    },
  },
};
</script>
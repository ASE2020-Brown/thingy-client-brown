<template>
  <div>
    <AlreadyLoggedIn v-if="loggedIn"></AlreadyLoggedIn>
    <RegisterForm v-else></RegisterForm>
  </div>
</template>

<script>
// @ is an alias to /src
import RegisterForm from "@/components/RegisterForm.vue";
import AlreadyLoggedIn from "@/components/AlreadyLoggedIn.vue";
import store from "@/store";

export default {
  name: 'Register',

  components: {
    RegisterForm,
    AlreadyLoggedIn,
  },

  computed: {
    loggedIn() {
      return store.state.user.loggedIn;
    },
  },
};
</script>
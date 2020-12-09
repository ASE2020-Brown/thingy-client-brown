<template>
  <div>
    <div v-if="loggedIn">
      <v-alert color="info">Logging out...</v-alert>
      <v-btn @click="logout">Try again</v-btn>
    </div>
    <div v-else>
      <v-alert color="success">You are logged out.</v-alert>
      <v-btn href="/login">Login</v-btn>
    </div>
  </div>
</template>

<script>
import store from '../store';

export default {
  name: 'Logout',

  components: {
  },

  computed: {
    loggedIn: () => {
      return store.state.user.loggedIn;
    },
  },

  methods: {
    logout: () => {
      store.dispatch('user/logout');
    },
  },

  mounted() {
    this.logout();
  },
}
</script>
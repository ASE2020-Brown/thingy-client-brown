<template>
  <v-footer
      height="100px"
      color="green lighten-1"
      dark
  >
    <v-spacer></v-spacer>
    <p>&copy; 2020 brown</p>
  </v-footer>
</template>

<script>
import store from '../store';

export default {
  name: 'Footer',

  computed: {
    loggedIn: () => {
      return store.state.user.loggedIn;
    },

    username: () => {
      return store.state.user.username;
    },
  },
};
</script>
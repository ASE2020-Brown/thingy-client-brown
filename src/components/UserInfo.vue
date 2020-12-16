<template>
  <v-card class="mx-auto my-3" max-width="800">
    <v-card-title>
      <h1>Logged in as {{ username }}</h1>
    </v-card-title>
    <v-card-text>
      <p>Thingy ID: {{ thingyId }}</p>
      <p>Subscribe in Telegram: {{ chatId }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn color="error" @click="logout">Logout</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import store from "@/store";

export default {
  name: "UserInfo",

  computed: {
    loggedIn () {
      return store.state.user.loggedIn;
    },

    username () {
      return store.state.user.username;
    },

    thingyId () {
      return store.state.user.thingyId;
    },

    chatId () {
      return store.state.user.chatId;
    },
  },

  methods: {
    logout() {
      store.dispatch('user/logout');
      this.$router.push('/login');
    },
  }
};
</script>
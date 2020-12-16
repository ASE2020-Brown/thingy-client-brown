<template>
  <v-card class="mx-auto my-3" max-width="800">
    <v-card-title>
      <h1>Logged in as {{ username }}</h1>
    </v-card-title>
    <v-card-text>
      <p>Thingy ID: {{ thingyId }}</p>
      <v-row>
        <p>Subscribe in Telegram: {{ chatId }}</p>
        <v-spacer></v-spacer>
        <v-btn @click="invite">Invite</v-btn>
      </v-row>
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
      return localStorage.username;
    },

    thingyId () {
      return localStorage.thingyId;
    },

    chatId () {
      return localStorage.chatId;
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
<template>
  <v-card max-width="500px" class="mt-5 mx-auto">
    <v-alert type="success">You are logged in as {{ username }}.</v-alert>
    <v-row>
      <v-spacer></v-spacer>
      <v-btn href="/">Home</v-btn>
      <v-spacer></v-spacer>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "AlreadyLoggedIn",

  computed: {
    username () {
      return localStorage.username;
    },
  },
};
</script>
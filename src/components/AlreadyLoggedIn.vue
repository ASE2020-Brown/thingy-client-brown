<template>
  <div>
    <v-alert type="info">You are logged in as {{ username }}.</v-alert>
    <v-btn href="/">Home</v-btn>
    <v-btn color="error" href="/logout">Logout</v-btn>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "AlreadyLoggedIn",

  computed: {
    username () {
      return localStorage.username;
    }
  }
}
</script>
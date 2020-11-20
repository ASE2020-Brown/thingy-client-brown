<template>
  <v-app-bar
      app
      color="blue lighten-1"
      dark
  >
    <a href="/" class="d-flex align-center text-decoration-none">
      <v-img
          alt="Grandpa Care Logo"
          class="shrink mr-2"
          contain
          src="@/assets/care.png"
          transition="scale-transition"
          width="40"
      />

      <h2 style="color: white;">Grandpa Care</h2>
    </a>

    <v-spacer></v-spacer>

    <v-btn
        href="/login"
        text
    >
      <span class="mr-2">Login</span>
      <v-icon>account_circle</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Navbar',
  props: {

  },
  data: function () {
    return {

    }
  },
  methods: {

  },
  mounted() {

  },
}
</script>
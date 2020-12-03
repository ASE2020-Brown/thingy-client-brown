<template>
  <v-app>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <Navbar loggedIn="loggedIn"></Navbar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',

  icons: {
    iconfont: 'mdi',
  },

  components: {
    Navbar,
  },

  data: () => ({
    loggedIn: false,
  }),
};
</script>

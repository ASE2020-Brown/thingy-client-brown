<template>
  <v-app>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <Navbar></Navbar>

    <v-main>
      <router-view/>
    </v-main>

    <Footer></Footer>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import store from './store';

export default {
  name: 'App',

  icons: {
    iconfont: 'mdi',
  },

  components: {
    Navbar,
    Footer,
  },

  data: () => ({
  }),

  mounted() {
    if (localStorage.username !== null) {
      store.dispatch('user/login', {
        username: localStorage.username,
        password: localStorage.password,
        saveLogin: true,
      });
    }
  },
};
</script>

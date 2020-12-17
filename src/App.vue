<template>
  <v-app>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <Navbar></Navbar>

    <AlarmPanicButton></AlarmPanicButton>
    <v-main>
      <router-view/>
    </v-main>

    <Footer></Footer>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import AlarmPanicButton from "@/components/AlarmPanicButton";
import store from './store';

export default {
  name: 'App',

  icons: {
    iconfont: 'mdi',
  },

  components: {
    Navbar,
    Footer,
    AlarmPanicButton,
  },

  data: () => ({
  }),

  mounted() {
    if (localStorage.token && localStorage.token !== 'null') {
      store.dispatch("user/updateUserData", localStorage.username);
    }
    else if (localStorage.password) {
      store.dispatch('user/login', {
        username: localStorage.username,
        password: localStorage.password,
        saveLogin: true,
      });
    }
  },
};
</script>
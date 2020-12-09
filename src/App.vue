<template>
  <v-app @login="printLogin()">
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <Navbar loggedIn="loggedIn"></Navbar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
import axios from "axios";

export default {
  name: 'App',

  icons: {
    iconfont: 'mdi',
  },

  components: {
    Navbar,
  },

  data: () => ({
    loggedIn: user.state.username,
  }),

  methods: {
    login() {
      axios.post('http://localhost:3000/login', {
            "username": this.username,
            "password": this.password
          }
      ).then(response => {
        this.fail = false;
        this.token = response;
        console.log(response);
      }).catch(error => {
        this.fail = true;
        this.token = null;
        console.log(error);
      });
    },

    printLogin() {
      this.$emit('ok');
    }
  }
};
</script>

<template>
  <v-card max-width="500px" class="mt-5 mx-auto">
    <v-card-title>
      <h1>Login</h1>
    </v-card-title>
    <v-card-text>

      <v-form>
        <v-alert v-if="fail" type="error">
          Login failed: Wrong username or password!
        </v-alert>
        <v-text-field
            type="text"
            label="Email"
            prepend-inner-icon="mdi-account-circle">
        </v-text-field>
        <v-text-field
            :type="visiblePassword ? 'text' : 'password'"
            label="Password"
            prepend-inner-icon="mdi-lock"
            :append-icon="visiblePassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="visiblePassword = !visiblePassword"
        ></v-text-field>
      </v-form>

    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <p class="my-auto mx-3">No account yet? <a href="/register">Register now</a></p>
      <v-spacer></v-spacer>
      <v-btn color="info" @click="submit">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios';
export default {
  name: 'LoginForm',
  props: {

  },
  data: function () {
    return {
      visiblePassword: false,

      token: null,

      fail: false,
    }
  },
  methods: {
    submit() {
      this.login();
      if (!fail) {
        localStorage.token = this.token;
        this.$router.push('/');
      }
    },

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
  },
  mounted() {

  },
}
</script>

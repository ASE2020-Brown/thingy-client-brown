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
            v-model="username"
            prepend-inner-icon="mdi-account-circle">
        </v-text-field>
        <v-text-field
            :type="visiblePassword ? 'text' : 'password'"
            label="Password"
            v-model="password"
            prepend-inner-icon="mdi-lock"
            :append-icon="visiblePassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="visiblePassword = !visiblePassword"
        ></v-text-field>
        <v-checkbox v-model="saveLogin" :label="`Save Login Information`"></v-checkbox>
      </v-form>

    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>

      <p class="my-auto mx-3">No account yet? <a href="/register">Register now</a></p>
      <v-spacer></v-spacer>
      <v-btn color="success" @click="login">Login</v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
import store from '../store';

export default {
  name: 'LoginForm',

  props: {
  },

  data: function () {
    return {
      username: '',
      password: '',
      saveLogin: false,

      visiblePassword: false,
    }
  },

  methods: {
    login() {
      let username = this.username;
      let password = this.password;
      let saveLogin = this.saveLogin;
      store.dispatch('user/login', { username, password, saveLogin });
    },
  },

  computed: {
    fail: () => {
      return store.state.user.failedLogin;
    }
  },

  mounted() {
    store.commit('user/startLogin');

    // import login data if saved
    if (localStorage.username !== null) {
      this.username = localStorage.username;
      this.password = localStorage.password;
    }
  },
};
</script>

<template>
  <v-card max-width="500px" class="mt-5 mx-auto">
    <v-card-title>
      <h1>Login</h1>
    </v-card-title>
    <v-card-text>

      <!-- Form -->
      <v-form>
        <v-alert v-if="tried && failed" type="error">
          Login failed: Wrong username or password!
        </v-alert>
        <v-text-field
            type="text"
            label="Email"
            v-model="username"
            prepend-inner-icon="mdi-account-circle"
        ></v-text-field>
        <v-text-field
            :type="visiblePassword ? 'text' : 'password'"
            label="Password"
            v-model="password"
            prepend-inner-icon="mdi-lock"
            :append-icon="visiblePassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="visiblePassword = !visiblePassword"
        ></v-text-field>
        <v-checkbox
            v-model="saveLogin"
            :label="`Save Login Information`"
        ></v-checkbox>
      </v-form>

    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>

      <!-- Buttons -->
      <p class="my-auto mx-3">No account yet? <a href="/register">Register now</a></p>
      <v-spacer></v-spacer>
      <v-btn color="success" @click="login">Login</v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
// @ is an alias to /src
import store from '@/store';

export default {
  name: 'LoginForm',

  data() {
    return {
      username: '',
      password: '',
      saveLogin: false,
      visiblePassword: false,

      tried: false,
    };
  },

  computed: {
    failed() {
      return store.state.user.failedLogin;
    },
  },

  methods: {
    login() {
      let username = this.username;
      let password = this.password;
      let saveLogin = this.saveLogin;
      store.dispatch('user/login', { username, password, saveLogin });
      this.tried = true;
    },
  },

  mounted() {
    store.commit('user/startLogin');

    // import login data if available
    if (localStorage.username !== null) {
      this.username = localStorage.username;
      this.password = localStorage.password;
    }
  },
};
</script>

<template>
  <v-app-bar class="mb-3"
      app
      color="green lighten-1"
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

    <div v-if="loggedIn" class="text-center">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              v-bind="attrs"
              v-on="on"
          >
            <span class="mr-2">{{ username }}</span>
            <v-icon>account_circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item href="/user" color="info">
            <v-list-item-title>
              <v-icon>mdi-information-variant</v-icon>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <v-btn
        v-else
        href="/login"
        text
    >
      <span class="mr-2">Login</span>
      <v-icon>account_circle</v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script>
import store from '../store';

export default {
  name: 'Navbar',

  computed: {
    loggedIn: () => {
      return store.state.user.loggedIn;
    },

    username: () => {
      return localStorage.username;
    },
  },
};
</script>
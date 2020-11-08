<template>
  <v-app>
    <v-app-bar
      app
      color="blue lighten-1"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Grandpa Care Logo"
          class="shrink mr-2"
          contain
          src="@/assets/care.png"
          transition="scale-transition"
          width="40"
        />

        <h2>Grandpa Care</h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="/login"
        text
      >
        <span class="mr-2">Login</span>
        <v-icon>account_circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Home/>
    </v-main>
  </v-app>
</template>

<script>
import Home from './views/Home';

export default {
  name: 'App',

  components: {
    Home,
  },

  data: () => ({
    //
  }),
};
</script>

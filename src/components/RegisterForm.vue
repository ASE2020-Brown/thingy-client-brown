<template>
  <v-card max-width="500px" class="mt-5 mx-auto">
    <v-card-title>
      <h1>Register</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
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
        <v-text-field
            :type="visiblePassword ? 'text' : 'password'"
            label="Repeat Password"
            prepend-inner-icon="mdi-lock"
            :append-icon="visiblePassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="visiblePassword = !visiblePassword"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <p class="my-auto mx-3">Already have an account? <a href="/login">Login</a></p>
      <v-spacer></v-spacer>
      <v-btn color="info">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios';
export default {
  name: 'RegisterForm',
  props: {

  },
  data: function () {
    return {
      visiblePassword: false,
    }
  },
  methods: {

  },
  mounted() {

  },
}
</script>

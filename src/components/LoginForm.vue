<template>
  <v-card max-width="500px" class="mt-5 mx-auto">
    <v-card-title>
      <h1>Login</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
            type="text"
            label="Username"
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
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="info">Login</v-btn>
    </v-card-actions>
    <v-divider class="mb-5"></v-divider>
    <v-card-actions>
      <v-btn color="success">Register</v-btn>
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
    }
  },
  methods: {

  },
  mounted() {

  },
}
</script>

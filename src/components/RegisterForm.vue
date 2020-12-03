<template>
  <v-card max-width="500px" class="mt-5 mx-auto" v-if="!registered">
    <v-card-title>
      <h1>Register</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
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
      <v-btn color="info" @click="register">Register</v-btn>
    </v-card-actions>
  </v-card>
  <v-card max-width="500px" class="mt-5 mx-auto" v-else>
    <v-card-title>
      <h1>Register</h1>
    </v-card-title>
    <v-card-text>
      <v-alert type="success">Registration successful</v-alert>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn href="/login" color="primary"><v-icon>mdi-account-arrow-right</v-icon>Login now</v-btn>
      <v-spacer></v-spacer>
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
      username: null,
      password: null,
      registered: false,
    }
  },
  methods: {
    register(){
      axios.post('http://localhost:3000/register', {
            "username": this.username,
            "password": this.password
          }
      ).then(response => {
        console.log(response);
        this.registered = true;
      }).catch(error => {
        console.log(error);
      });

      this.$router.push('/login');
    }
  },
  mounted() {

  },
}
</script>
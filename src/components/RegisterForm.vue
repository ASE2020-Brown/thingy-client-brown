<template>
  <v-card max-width="500px" class="mt-5 mx-auto">
    <v-card-title>
      <h1>Register</h1>
    </v-card-title>
    <v-card-text>

      <!-- Connection error -->
      <v-alert v-if="!connection" type="error">
        Error: Not connected to API! Please try again!
      </v-alert>

      <!-- Form -->
      <v-form>
        <v-text-field
            type="text"
            label="Username"
            v-model="username"
            prepend-inner-icon="mdi-account-circle">
        </v-text-field>
        <v-alert v-if="submittedEmpty" type="error">
          Username required!
        </v-alert>
        <v-text-field
            type="text"
            label="Thingy"
            v-model="thingyId"
            prepend-inner-icon="mdi-star-box">
        </v-text-field>
        <v-text-field
            :type="visiblePassword ? 'text' : 'password'"
            label="Password"
            v-model="password"
            prepend-inner-icon="mdi-lock"
            :append-icon="visiblePassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click="switchPasswordVisibility"
        ></v-text-field>
        <v-text-field
            :type="visiblePassword ? 'text' : 'password'"
            label="Repeat Password"
            v-model="passwordRepeat"
            prepend-inner-icon="mdi-lock"
            :append-icon="visiblePassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click="switchPasswordVisibility"
        ></v-text-field>
        <v-alert v-if="(!submittedEmpty) && (!passwordsAreEqual)" type="error">
          Passwords don't match!
        </v-alert>
      </v-form>

    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>

      <p class="my-auto mx-3">Already have an account? <a href="/login">Login</a></p>

      <v-spacer></v-spacer>

      <v-btn color="success" @click="submit">Register</v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterForm',

  data() {
    return {
      connection: true,
      visiblePassword: false,

      username: '',
      thingyId: '',
      password: '',
      passwordRepeat: '',

      submittedEmpty: false,
      passwordsAreEqual: true,
    };
  },

  methods: {
    switchPasswordVisibility() {
      this.visiblePassword = !(this.visiblePassword);
    },

    submit() {
      if (this.check()) {
        this.register();
      }
    },

    check() {
      return (this.checkName() && this.comparePasswords());
    },

    checkName() {
      this.submittedEmpty = (this.username === '' || this.username === '');
      return (!this.submittedEmpty);
    },

    comparePasswords() {
      this.passwordsAreEqual = (this.password === this.passwordRepeat);
      return this.passwordsAreEqual;
    },

    register() {
      axios.post('http://localhost:3000/register', {
        "username": this.username,
        "password": this.password,
        "sensor": this.thingyId,
      }).then((response) => {
        this.connection = true;
        console.log('Registered ' + this.username);
        this.$router.push('/login');
      }).catch((error) => {
        this.connection = false;
        console.log('Failed to register');
        console.log(error);
      });
    },
  },
};
</script>
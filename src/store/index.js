import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: {
      namespaced: true,

      state: () => ({
        loggedIn: false,
        username: '',
        failedLogin: false,
      }),

      getters: {
        token: () => {
          return localStorage.token;
        }
      },

      actions: {
        login: (context, loginData) => {
          axios.post('http://localhost:3000/login', {
                "username": loginData.username,
                "password": loginData.password,
              }
          ).then(response => {
            localStorage.token = response;
            context.commit('successfulLogin', loginData.username);
            console.log('Login successful');
            console.log(response);
            if (loginData.saveLogin) {
              localStorage.username = loginData.username;
              localStorage.password = loginData.password;
              console.log('Login information saved');
            }
            this.router.push('/');
          }).catch(error => {
            context.commit('failedLogin');
            console.log('Login failed');
            console.log(error);
          });
        },

        logout: context => {
          // TODO: logout
          localStorage.token = null;
          context.state.loggedIn = false;
          context.state.username = '';
        },
      },

      mutations: {
        startLogin(state) {
          state.failedLogin = false;
        },

        successfulLogin(state, username) {
          state.loggedIn = true;
          state.username = username;
          state.failedLogin = false;
        },

        failedLogin(state) {
          state.failedLogin = true;
        },
      },
    }
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import router from "@/router";

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
        username: '',
        thingyId: '',
        chatId: '',

        loggedIn: false,
        failedLogin: false,
      }),

      getters: {
        // configuration object containing authentication
        authConfig: () => {
          return {
            headers: {
              'Authorization': localStorage.token,
            },
          };
        },
      },

      actions: {
        login: (context, loginData) => {
          axios.post('http://localhost:3000/login', {
                "username": loginData.username,
                "password": loginData.password,
              }
          )
              .then(response => {

            // save token
            localStorage.token = response.data.token;

            // update user data
            context.commit('updateUserData', loginData.username);

            // report success
            console.log('Logged in as ' + loginData.username);

            // save login data
            if (loginData.saveLogin) {
              localStorage.username = loginData.username;
              localStorage.password = loginData.password;
              console.log('Login information saved');
            }

            // go to home
            router.push('/');
          })
              .catch(error => {
            context.commit('failedLogin');
            console.log('Login failed');
            console.log(error);
          });
        },

        updateUserData: (context, username) => {
          axios.get('http://localhost:3000/profile/' + username, this.authConfig())
              .then((response) => {
                context.commit('updateUserData');
              })
              .catch((error) => {
                console.log('Failed to update user data');
                console.log(error);
              })
        },

        logout: (context) => {
          axios.post('http://localhost:3000/logout', this.authConfig())
              .then((response) => {

                // delete token
                localStorage.token = null;

                // reset user data
                context.state.loggedIn = false;
                context.state.username = '';
                context.state.thingyId = '';
                context.state.chatId = '';

                // report success
                console.log('Logged out');
              })
              .catch((error) => {
                console.log('Faild to logout');
                console.log(error);
              })
        },
      },

      mutations: {
        startLogin(state) {
          state.failedLogin = false;
        },

        failedLogin(state) {
          state.failedLogin = true;
        },

        updateUserData(state, username, thingyId, chatId) {
          state.loggedIn = true;
          state.failedLogin = false;
          state.username = username;
          state.thingyId = thingyId;
          state.chatId = chatId;
        },

        resetUserData(state, username, thingyId, chatId) {
          state.loggedIn = false;
          state.failedLogin = false;
          state.username = '';
          state.thingyId = '';
          state.chatId = '';
        },
      },
    }
  }
})

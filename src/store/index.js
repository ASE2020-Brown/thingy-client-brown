import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
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
              'Authorization': `Bearer ${localStorage.token}`,
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
            context.dispatch('updateUserData', loginData.username).then(r => {});

            // report success
            console.log('Logged in as ' + loginData.username);

            // save login data
            if (loginData.saveLogin) {
              localStorage.username = loginData.username;
              localStorage.password = loginData.password;
              console.log('Login information saved');
            }
          })
          .catch(error => {
            context.commit('failedLogin');
            console.log('Login failed');
            console.log(error);
          });
        },

        updateUserData: (context, username) => {
          axios.get('http://localhost:3000/profile/' + username, {
            headers: {
              'Authorization': `Bearer ${localStorage.token}`,
            },
          })
              .then((response) => {
                let username = response.data.username;
                let thingyId = response.data.sensor;
                let chatId = response.data.chat_id;
                context.commit('updateUserData', {
                  username,
                  thingyId,
                  chatId,
              });
                console.log('Received user information');
              })
              .catch((error) => {
                console.log('Failed to update user data');
                console.log(error);
              });
        },

        logout: (context) => {
          axios.post('http://localhost:3000/logout', {}, {
            headers: {
              'Authorization': `Bearer ${localStorage.token}`,
            },
          })
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
                console.log('Failed to logout');
                console.log(error);
              });
          localStorage.clear();
        },
      },

      mutations: {
        startLogin(state) {
          state.failedLogin = false;
        },

        failedLogin(state) {
          state.failedLogin = true;
        },

        updateUserData(state, userInfo) {
          state.loggedIn = true;
          state.failedLogin = false;
          state.username = userInfo.username;
          state.thingyId = userInfo.thingyId;
          state.chatId = userInfo.chatId;
        },

        resetUserData(state) {
          state.loggedIn = false;
          state.failedLogin = false;
          state.username = '';
          state.thingyId = '';
          state.chatId = '';
        },
      },
    },
  },
});

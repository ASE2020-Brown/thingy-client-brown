import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import io from "socket.io-client";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user: {
            namespaced: true,

            state() {
                return {
                    loggedIn: false,
                    failedLogin: false,
                    alarm: false,
                };
            },

            getters: {
                username() {
                    return localStorage.username;
                },

                thingyId() {
                    return localStorage.thingyId;
                },

                socket() {
                    return io('localhost:3000/' + localStorage.thingyId);
                },

                chatId() {
                    return localStorage.chatId;
                },

                // configuration object containing authentication
                authConfig() {
                    return {
                        headers: {
                            'Authorization': `Bearer ${localStorage.token}`,
                        },
                    };
                },
            },

            actions: {
                login(context, loginData) {
                    axios.post('http://localhost:3000/login', {
                        "username": loginData.username,
                        "password": loginData.password,
                    })
                    .then(response => {
                        // save token
                        localStorage.token = response.data.token;

                        // update user data
                        context.dispatch('updateUserData', loginData.username);

                        // report success
                        console.log('Logged in as ' + loginData.username);

                        // save password
                        if (loginData.saveLogin) {
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

                updateUserData(context, username) {
                    axios.get('http://localhost:3000/profile/' + username, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.token}`,
                        },
                    })
                    .then((response) => {
                        let username = response.data.username;
                        let thingyId = response.data.sensor;
                        let chatId = response.data.chat_id;

                        // Save user information
                        context.commit('updateUserData', { username, thingyId, chatId, });
                        console.log('Received user information');

                        // Listen for alarm
                        io('localhost:3000/' + context.thingyId).on('ALARM', (data) => {
                            context.commit('setAlarm');
                        });
                        console.log('Listening for alert...');
                    })
                    .catch((error) => {
                        console.log('Failed to update user data');
                        console.log(error);
                    });
                },

                logout(context) {
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
                        localStorage.thingyId = '';
                        localStorage.chatId = '';

                        // report success
                        console.log('Logged out');
                    })
                    .catch((error) => {
                        console.log('Failed to logout');
                        console.log(error);
                    });
                    localStorage.clear();
                },

                deleteAccount(context) {
                    let username = context.getters.username;
                    axios.post('http://localhost:3000/user/delete', {
                        username,
                    }, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.token}`,
                        },
                    })
                    .then((response) => {

                        // delete token
                        localStorage.token = null;

                        // reset user data
                        context.state.loggedIn = false;
                        localStorage.thingyId = '';
                        localStorage.chatId = '';

                        // report success
                        console.log('Logged out');
                    })
                    .catch((error) => {
                        console.log('Failed to delete account');
                        console.log(error);
                    });
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

                    localStorage.username = userInfo.username;
                    localStorage.thingyId = userInfo.thingyId;
                    localStorage.chatId = userInfo.chatId;
                },

                setAlarm(state) {
                    state.alarm = true;
                },

                unsetAlarm(state) {
                    state.alarm = false;
                },
            },
        },
    },
});

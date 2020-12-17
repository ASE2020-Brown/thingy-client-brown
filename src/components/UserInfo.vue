<template>
  <v-card class="mx-auto my-3" max-width="800">
    <v-card-title>
      <h1>Logged in as {{ username }}</h1>
    </v-card-title>
    <v-card-text>
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <td>Username:</td>
              <td>{{ username }}</td>
            </tr>
            <tr>
              <td>Thingy ID:</td>
              <td>{{ thingyId }}</td>
            </tr>
            <tr>
              <td>Telegram ID:</td>
              <td>
                {{ chatId }}

                <!-- invite button -->
                <span class="text-center ml-5">
                  <v-dialog
                      v-model="inviting"
                      width="500"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                          color="blue lighten-2"
                          dark
                          v-bind="attrs"
                          v-on="on"
                      >
                        <v-icon>mdi-telegram</v-icon>
                        <span class="mr-2">invite</span>
                      </v-btn>
                    </template>

                    <v-card>
                      <v-card-title class="headline grey lighten-2">
                        Send email invitation for telegram
                      </v-card-title>

                      <v-card-text>
                        <v-text-field
                            type="text"
                            label="Email"
                            v-model="email"
                            prepend-inner-icon="mdi-email"
                        >
                        </v-text-field>
                      </v-card-text>

                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-btn
                            color="primary"
                            text
                            @click="closeDialog"
                        >
                          Cancel
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue"
                            text
                            @click="invite"
                        >
                          Send
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </span>

              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
    <v-card-actions>
      <v-btn color="error" @click="deleteAccount">Delete account</v-btn>
      <v-btn color="error" @click="logout">Logout</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import store from "@/store";
import axios from "axios";

export default {
  name: "UserInfo",

  data: function () {
    return {
      email: '',
      inviting: false,
    };
  },

  computed: {
    loggedIn () {
      return store.state.user.loggedIn;
    },

    username () {
      return localStorage.username;
    },

    thingyId () {
      return localStorage.thingyId;
    },

    chatId () {
      return localStorage.chatId;
    },

    config () {
      return store.getters["user/authConfig"];
    }
  },

  methods: {
    logout() {
      store.dispatch('user/logout');
      this.$router.push('/login');
    },

    deleteAccount() {
      store.dispatch('user/deleteAccount');
      this.$router.push('/login');
    },

    invite() {
      axios.post('http://localhost:3000/invite', {
        to: this.email,
        subject: 'Grandpa Care on Telegram',
        text: 'Subscribe to your Grandpa\'s Thingy:91 now! Add @thingy_api_brown_bot and write /thingy/' + this.thingyId,
      }, this.config)
      .then((response) => {
        console.log('Sent invitation');
        console.log(response.data);
      })
      .catch((error) => {
        console.log('Failed to send invitation');
        console.log(error);
      });

      this.closeDialog();
    },

    closeDialog() {
      this.inviting = false;
    },
  },
};
</script>
<template>
  <v-row justify="center">
    <v-dialog
      v-model="alarm"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Panic button
        </v-card-title>
        <v-card-text>
          This is an alarm. The panic button on {{ thingyId }} has been pressed.
        </v-card-text>
        <v-card-actions>
          <v-btn
              color="red"
              text
              @click="sendMessageHelp"
          >
            I'm on the way!
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="closeDialog"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import io from 'socket.io-client';
import axios from 'axios';
import store from "@/store";

export default {
  data() {
    return {
      alarm: false,
      message: 'Alarm',
      socket: io('localhost:3000/' + this.thingyId)
    };
  },

  computed: {
    username () {
      return store.state.user.username;
    },

    thingyId () {
      return store.state.user.thingyId;
    },

    authConfig () {
      return store.computed.user.authConfig();
    },
  },

  methods: {
    sendMessage() {
      this.socket.emit('SEND_MESSAGE', {
        user: this.username,
        message: this.message
      });
      this.message = '';
    },

    // help is on the way
    sendMessageHelp() {
      axios.post('http://localhost:3000/helpyou', {
        "sensor": this.thingyId,
      }, this.authConfig)
      .then((response) => {
        console.log('Sent help message');
        console.log(response.data);
        this.closeDialog();
      })
      .catch((error) => {
        console.log('Failed to send help message');
        console.log(error);
      });
    },

    closeDialog() {
      this.alarm = false;
    },
  },

  mounted() {
    this.socket.on('ALARM', (data) => {
      this.alarm = true;
    });
  },
};
</script>

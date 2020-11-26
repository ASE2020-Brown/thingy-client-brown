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
        <v-card-text>This is an alarm. Panic button was pressed.</v-card-text>
        <v-card-actions>
          <v-btn
              color="red"
              text
              @click="sendMessageHelp(); alarm = false"
          >
            I'm on the way!
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="alarm = false"
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
export default {
  data() {
      return {
          user: 'jairo',
          message: 'Alarma',
          alarm: false,
          socket : io('localhost:3000'),
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlciIsInJvbGUiOiJhZG1pbiIsImp0aSI6IjQzMWI1ZjdjLTY4ZTktNDc4Ny1hYTlmLWRjZWVjOTFkNzhlNiIsImlhdCI6MTYwNjM4MjkyM30.ciguBMplJjaofixJNXB9pEy3XSBaUEHZM6yynZ0rM9s'
      }
  },
  methods: {
    sendMessage() {
        this.socket.emit('SEND_MESSAGE', {
            user: this.user,
            message: this.message
        });
        this.message = ''
    },
    sendMessageHelp() {
        axios.post('http://localhost:3000/helpyou', {
            "sensor": "brown-3"
          },
          {
            headers: {
              'Authorization': 'Bearer ' + this.token 
            }
          }
        )
    }
  },
  mounted() {
      this.socket.on('ALARM', (data) => {
          this.alarm = true;
      });
  }
}
</script>

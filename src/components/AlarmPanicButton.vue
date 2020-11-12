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
export default {
  data() {
      return {
          user: 'jairo',
          message: 'Alarma',
          alarm: false,
          socket : io('localhost:3000')
      }
  },
  methods: {
    sendMessage() {
        this.socket.emit('SEND_MESSAGE', {
            user: this.user,
            message: this.message
        });
        this.message = ''
    }
  },
  mounted() {
      this.socket.on('ALARM', (data) => {
          this.alarm = true;
      });
  }
}
</script>

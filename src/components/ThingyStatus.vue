<template>
  <v-card class="mx-auto my-3" max-width="800">
    <v-card-title>
      <v-row class="mx-1">
        <h3 v-text="sensorId"></h3>
        <p class="my-auto ml-3 px-2 rounded-pill text-caption"
           :class="connected ? 'success' : 'secondary'">
          <v-icon
              class="mr-1 white--text"
              v-text="connected ? 'mdi-check-bold' : 'power_off'"
          ></v-icon>
          <span class="white--text"><span v-if="!connected">not </span>connected</span>
        </p>
      </v-row>
    </v-card-title>
    <v-card-text>
      <CurrentTemperature v-if="connected" :sensor-id="sensorId"></CurrentTemperature>
      <p v-else>No information</p>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios';
import CurrentTemperature from "@/components/CurrentTemperature";
export default {
  name: 'ThingyStatus',
  components: {CurrentTemperature},
  props: {
    sensorId: String
  },
  data: function () {
    return {
      connected: false
    }
  },
  methods: {
    getSensorStatus(sensorId){
      axios.get('http://localhost:3000/connected/' + sensorId).then(
        response => {
          if(response.data)
            this.connected = true;
        }
      ).catch(
        error => {
          console.log(error);
        }
      );
    }
  },
  mounted() {
    this.getSensorStatus(this.sensorId);
  },
}
</script>

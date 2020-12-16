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
      <!-- ThingyInfo -->
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios';
import ThingyInfo from "@/components/ThingyInfo";
import store from "@/store";

export default {
  name: 'ThingyStatus',

  components: {
    ThingyInfo,
  },

  data: function () {
    return {
      connected: false,
      sensorName: '', // usually equal to sensorId

      // temperature
      value: 0,
      unit: '',
      time: '',
    };
  },

  computed: {
    sensorId () {
      return store.state.user.thingyId;
    },

    config () {
      return store.getters["user/authConfig"];
    },
  },

  methods: {
    readSensorData() {
      axios.get('http://localhost:3000/temperature/' + this.sensorId,
          this.config
      )
      .then((response) => {
        this.sensorName = response.data.sensor;
        this.value = response.data.value;
        this.units = response.data.units;
        this.time = response.data.time;

        this.connected = true;
        console.log('Updated data from ' + this.sensorId);
      })
      .catch((error) => {
        console.log('Failed to read data');
        console.log(error);
      });
    },
  },
  mounted() {
    this.readSensorData();
  },
}
</script>

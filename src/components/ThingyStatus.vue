<template>
  <div>
    <h3>Thingy {{ sensorId }} status:</h3> 
    <v-icon v-if="status" color="green">swap_vertical_circle</v-icon>
    <v-icon v-else>power_off</v-icon>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ThingyStatus',
  props: {
    sensorId: String
  },
  data: function () {
    return {
      status: false
    }
  },
  methods: {
    getSensorStatus(sensorId){
      axios.get('http://localhost:3000/connected/' + sensorId).then(
        response => {
          if(response.data)
            this.status = true;
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

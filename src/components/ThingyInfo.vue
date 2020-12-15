<template>
  <p>Current temperature: {{ temperature }}</p>
</template>

<script>
import axios from 'axios';


export default {
  name: 'CurrentTemperature',
  props: {
    sensor: String,
  },
  data: function () {
    return {
      temperature: null,
      token: null,
    };
  },
  methods: {
    getToken() {

    },

    getCurrentTemperature(sensorId){
      axios.get('http://localhost:3000/temperature/' + sensorId, {
        headers: {
          'Authorization': 'Bearer ' + this.token 
        }
      }).then(
        response => {
          console.log(response);
          this.temperature = response.data.value;
        }
      ).catch(
        error => {
          console.log(error);
        }
      );
    },
  },
  mounted() {
    this.getCurrentTemperature(this.sensor);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>

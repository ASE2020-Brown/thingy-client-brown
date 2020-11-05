<template>
  <div>
    <h3>Current temperature: {{ temperature }}</h3>
    
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'CurrentTemperature',
  props: {
    sensorId: String
  },
  data: function () {
    return {
      temperature: null
    }
  },
  methods: {
    getCurrentTemperature(sensorId){
      axios.get('http://localhost:3000/temperature/' + sensorId).then(
        response => {
          console.log(response);
          this.temperature = response.data.value;
        }
      ).catch(
        error => {
          console.log(error);
        }
      );
    }
  },
  mounted() {
    this.getCurrentTemperature(this.sensorId);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>

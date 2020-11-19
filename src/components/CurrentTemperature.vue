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
      temperature: null,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlciIsInJvbGUiOiJhZG1pbiIsImp0aSI6IjU1NTliNmY4LThlYzUtNDFhNy1iZDE5LTNkZmI1OTNmOWEwOCIsImlhdCI6MTYwNTc4ODQyOX0.d5larPasfcIs402mBbuuhUcSCFetBXMHaGRLrzu8yTA'
    }
  },
  methods: {
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

<template>
  <div>
    <h3>Thingy {{ sensorId }} status:</h3> 
    <span v-if="status"> ON</span>
    <span v-else> OFF</span>
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
          console.log(response);
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

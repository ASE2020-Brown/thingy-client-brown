<template>
  <div class="home">
    <h1>Grandpa Care</h1>
    <ThingyStatus sensorId="brown-3"/>
    <CurrentTemperature sensorId="brown-3"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CurrentTemperature from '@/components/CurrentTemperature.vue'
import ThingyStatus from '@/components/ThingyStatus.vue'

export default {
  name: 'Home',
  components: {
    CurrentTemperature,
    ThingyStatus
  }
}
</script>

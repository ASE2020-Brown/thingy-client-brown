<template>
  <div class="home">
    <h1>Grandpa Care</h1>
    <CurrentTemperature sensorId="brown-3"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CurrentTemperature from '@/components/CurrentTemperature.vue'

export default {
  name: 'Home',
  components: {
    CurrentTemperature
  }
}
</script>

<template>
  <div class="home">
    <ThingyStatus sensorId="brown-3"/>
    <CurrentTemperature sensorId="brown-3"/>
    <AlarmPanicButton />
  </div>
</template>

<script>
// @ is an alias to /src
import CurrentTemperature from '@/components/CurrentTemperature.vue'
import ThingyStatus from '@/components/ThingyStatus.vue'
import AlarmPanicButton from '@/components/AlarmPanicButton.vue'

export default {
  name: 'Home',
  components: {
    CurrentTemperature,
    ThingyStatus,
    AlarmPanicButton
  }
}
</script>

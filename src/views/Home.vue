<template>
  <div class="home">
    <ThingyStatus sensorId="brown-3"/>
    <AlarmPanicButton />
  </div>
</template>

<script>
// @ is an alias to /src
import CurrentTemperature from '@/components/ThingyInfo.vue'
import ThingyStatus from '@/components/Thingy.vue'
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

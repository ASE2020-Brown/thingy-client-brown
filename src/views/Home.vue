<template>
  <div class="home">
    <ThingyStatus v-for="thingy in thingyList" :key="thingy"/>
    <AlarmPanicButton />
  </div>
</template>

<script>
// @ is an alias to /src
import ThingyInfo from '@/components/ThingyInfo.vue'
import ThingyStatus from '@/components/Thingy.vue'
import AlarmPanicButton from '@/components/AlarmPanicButton.vue'

export default {
  name: 'Home',

  data: function () {
    return {
      thingyList: [
          'brown-1',
          'brown-3',
      ],
    };
  },

  components: {
    ThingyInfo,
    ThingyStatus,
    AlarmPanicButton
  },
};
</script>

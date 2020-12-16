<template>
  <div class="home">
    <Thingy></Thingy>
    <AlarmPanicButton></AlarmPanicButton>
  </div>
</template>

<script>
// @ is an alias to /src
import ThingyInfo from '@/components/ThingyInfo.vue';
import Thingy from '@/components/Thingy.vue';
import AlarmPanicButton from '@/components/AlarmPanicButton.vue';

export default {
  name: 'Home',

  data: function () {
    return {
    };
  },

  components: {
    ThingyInfo,
    Thingy,
    AlarmPanicButton,
  },
};
</script>

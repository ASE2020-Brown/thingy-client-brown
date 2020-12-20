<template>
  <div class="home">
    <Thingy></Thingy>
  </div>
</template>

<script>
// @ is an alias to /src
import Thingy from '@/components/Thingy.vue';

export default {
  name: 'Home',

  components: {
    Thingy,
  },
};
</script>

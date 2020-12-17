<template>
  <v-simple-table>
    <thead>
    <tr>
      <th class="text-left">
        Time
      </th>
      <th class="text-left">
        Temperature
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="point in log"
        :key="point._time"
    >
      <td>{{ point._time }}</td>
      <td>{{ point._value }} {{ point._field }}</td>
    </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
import axios from "axios";
import store from "@/store";

export default {
  name: "DataLog",

  data: function () {
    return {
      log: {},
    };
  },

  computed: {
    config: () => {
      return store.getters["user/authConfig"];
    },
  },

  methods: {
    update: () => {
      axios.get('http://localhost:3000/log', this.config)
      .then((response) => {
        this.log = response.data;
        console.log('Received data log');
      })
      .catch((error) => {
        console.log('Failed to read data log');
        console.log(error);
      });
    },
  },

  mounted() {
    this.update();
  }
};
</script>
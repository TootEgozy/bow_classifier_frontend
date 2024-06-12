<template>
  <div v-if="serverReady">App main page</div>
  <div v-else>Loading...</div>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      serverReady: false,
    };
  },
  mounted() {
    this.checkServerReady();
  },
  methods: {
    async checkServerReady() {
      try {
        const res = await axios.get('http://127.0.0.1:5000/server_ready');
        if(!res?.data?.server_ready) {
          await this.sleep(3);
          console.log('not ready yet...');
          this.checkServerReady();
        } else {
          console.log('server ready!');
          this.serverReady = true;
        }
      } catch (e) {
        if(e.message === "Network Error") console.log('Waiting for server');
        await this.sleep(3);
        this.checkServerReady();
      }
    },
    sleep(s) {
      return new Promise(resolve => setTimeout(resolve, s * 1000));
    }
  }
};
</script>
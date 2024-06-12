<template>
  <div v-if="serverReady"><HomePage /></div>
  <div v-else><LoadingPage /></div>
</template>

<script>

import axios from "axios";
import LoadingPage from "@/components/LoadingPage.vue";
import HomePage from "@/components/HomePage.vue";

export default {
  components: {HomePage, LoadingPage},
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

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden; /* Prevent scrolling */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
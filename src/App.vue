<template>
  <div v-if="serverReady">
    <NavBar />
    <router-view></router-view>
  </div>
  <div v-else><LoadingPage /></div>
</template>

<script>

import axios from "axios";
import LoadingPage from "@/components/pages/LoadingPage.vue";
import NavBar from "@/components/sub-components/NavBar.vue";

export default {
  components: {
    NavBar, LoadingPage
  },
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
        const serverAddress = process.env.VUE_APP_SERVER_ADDRESS;
        const res = await axios.get(`${serverAddress}/server_ready`);
        if(!res?.data?.server_ready) {
          await this.sleep(3);
          this.checkServerReady();
        } else {
          this.serverReady = true;
        }
      } catch (e) {
        if(e.message === "Network Error") console.error('Error connecting to server');
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

* {
  font-family: 'Segoe UI', 'Tahoma', 'Geneva', sans-serif;
  overflow: hidden;
  box-sizing: border-box;
}

</style>
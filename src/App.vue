<template>
  <div v-if="serverReady">
    <NavBar />
    <router-view></router-view>
  </div>
  <div v-else><LoadingPage /></div>
</template>

<script>

import axios from "axios";
import LoadingPage from "@/components/LoadingPage.vue";
import NavBar from "@/components/NavBar.vue";

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

<style scoped>

* {
  font-family: 'Segoe UI', 'Tahoma', 'Geneva', sans-serif;
  overflow: hidden;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow: hidden; /* Prevent scrolling */
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
.navbar {
  width: 100vw;
}
</style>
<template>
  <div v-if="serverReady">
    <NavBar />
    <router-view></router-view>
  </div>
  <div v-else><LoadingPage /></div>
</template>

<script>

import LoadingPage from "@/components/pages/LoadingPage.vue";
import NavBar from "@/components/sub-components/NavBar.vue";
import checkServerReady from "@/utils/checkServerReady";

export default {
  components: {
    NavBar, LoadingPage
  },
  data() {
    return {
      serverReady: false,
      serverAddress: process.env.VUE_APP_SERVER_ADDRESS,
    };
  },
  mounted() {
    checkServerReady("spam", this.serverAddress, this.updateServerReady);
  },
  methods: {
    updateServerReady() {
      this.serverReady = true;
    },
  }
};
</script>

<style>

* {
  font-family: 'Segoe UI', 'Tahoma', 'Geneva', sans-serif;
  overflow: hidden;
  box-sizing: border-box;
}

body {
  height: 100vh;
  background-image: url("./assets/images/background-img.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

</style>
<template>

  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Tourney:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&display=swap" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>

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

html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  height: 100vh;
  background-image: url("./assets/images/background-img.svg");
  background-repeat: no-repeat;
  background-size: cover;
}

</style>
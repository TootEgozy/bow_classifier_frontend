<template>
  <div v-if="error">Error: {{ error }}</div>
  <div v-else-if="isLoading">Loading...</div>
  <div v-else>finished!</div>
</template>

<script>

export default {
  data() {
    return {
      isLoading: true,
      error: null,
    };
  },
  mounted() {
    this.checkServerReadiness();
    // const eventSource = new EventSource('http://127.0.0.1:5000/server_ready');
    // eventSource.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   console.log(data);
    //   if (data.message === 'Server is ready!') {
    //     console.log('got server ready message')
    //     this.isLoading = false;
    //   // } else if (data.error) {
    //   //   this.error = data.error;
    //   } else {
    //     // Process other event data
    //   }
    // };
    // eventSource.onerror = (error) => {
    //   console.error(error)
    //   this.error = 'Connection error';
    // };
  },
  methods: {
    async checkServerReadiness() {
      while (this.isLoading) {
        try {
          const response = await fetch('http://127.0.0.1:5000/server_ready');
          if (response.status === 200) {
            this.isLoading = false;
            const parsed = JSON.parse(response.body);
            console.log(parsed);
          } else {
            await this.sleep(3);
          }
        } catch (error) {
          console.error('Error checking server readiness:', error);
          await this.sleep(3);
        }
      }
    },
    sleep(s) {
      return new Promise(resolve => setTimeout(resolve, s * 1000));
    }
  }
};
</script>
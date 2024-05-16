<template>
  <div v-if="error">Error: {{ error }}</div>
  <div v-else-if="isLoading">Loading...</div>
  <div v-else>finished!</div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      isLoading: true,
      error: null,
    };
  },
  mounted() {
    const eventSource = new EventSource('http://127.0.0.1:5000/events');
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.message === 'Server is ready!') {
        console.log('got server ready message')
        this.isLoading = false;
      } else if (data.error) {
        this.error = data.error;
      } else {
        // Process other event data
      }
    };
    eventSource.onerror = (error) => {
      console.error(error)
      this.error = 'Connection error';
    };
  },
  methods: {
    async getServerReadyMsg() {
      const res = await axios.get('http://localhost:5000/server_ready');
      if(!res.data.processing_done) console.log('not done') //finish this
    }
  }
};
</script>
<template>
  <div class="classifier-container">

    <div class="tabs-container">
      <button id="spam-tab" @click="clsType='spam'">detect spam</button>
      <button id="sentiment-tab" @click="clsType='sentiment'">detect sentiment</button>
    </div>

    <form @submit.prevent="handleSubmit">

      <div class="textarea-container">
        <textarea id="input_text" name="input_text" v-model="inputText" required></textarea>
        <button class="clear-text-btn" @click="clearInput">clear</button>
      </div>

    </form>


  </div>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      suggestedInputs: [],
      inputText: '',
      clsType: 'spam',
      classification: null,
    };
  },

  mounted() {
    this.getSuggestedInputs();
  },

  methods: {
    async getSuggestedInputs() {
      try {
        const res = await axios.post('http://127.0.0.1:5000/generate_inputs', {
          cls_type: this.clsType,
          count: 4
        });
        this.suggestedInputs = res.data.inputs;
      } catch (e) {
        console.error('error getting inputs from server: '+e)
      }
    },

    clearInput() {
      this.inputText = "";
    },

    setInputText(text) {
      this.inputText = text;
    },

    async handleSubmit() {
      const res = await axios.post('http://127.0.0.1:5000/classify', {
        input_text: this.inputText,
        cls_type: this.clsType,
      });
      this.classification = res.data.result;
    },
  },
};
</script>

<style scoped>

.textarea-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

#input_text {
  height: 5rem;
  width: 40rem;
  resize: none;
}

.clear-text-btn {
  align-self: flex-end;
}

</style>
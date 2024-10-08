<template>
  <div class="container">
    <h1>NLP Classifier</h1>
    <h3>An NLP model trained to classify text. You can use it to filter spam, or detect a sentiment.</h3>

    <form @submit.prevent="handleSubmit">
      <div class="text_input_container">
        <label for="input_text">Enter Text to classify, or try an input from the list below</label>
        <textarea id="input_text" name="input_text" v-model="inputText" required></textarea>
        <button @click="clearInput">clear</button>
        <div class="radio_container">
          <input type="radio" id="input_type_spam" name="input_type" value="spam" v-model="clsType" required checked/>
          <label for="input_type_spam">detect spam</label>
          <input type="radio" id="input_type_sentiment" name="input_type" value="sentiment" v-model="clsType" required/>
          <label for="input_type_sentiment">detect a sentiment</label>
          <button type="submit">classify</button>
        </div>
      </div>
    </form>

    <h2 v-if="classification">classification: {{ classification }}</h2>

    <div id="suggested-inputs-container">
      <span v-for="(si, i) in suggestedInputs"
            :key="i"
            :class="dynamicFontSize(si)"
            @click="setInputText(si)"
      >{{ si }}</span>
      <button @click="getSuggestedInputs">Get New Inputs</button>
    </div>
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

    dynamicFontSize(si) {
      return {
        verySmall: si.length > 70,
        small: si.length > 50 && si.length < 70,
        regular: si.length > 40 && si.length < 50 ,
        larger: si.length > 20 && si.length < 40,
        extraLarge: si.length < 20,

        ['suggested-input-span']: true,
        focus: si === this.inputText,
      }
    }
  },
};

</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
}

* {
  padding: 0.3vw;
  overflow: hidden;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 85vh;
  padding-top: 5vh;
  background-color: lightcyan;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.radio_container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}

.text_input_container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  background-color: lightblue;
}

#input_text {
  padding: 1vh;
}

#suggested-inputs-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(1, 1fr);
  gap: 10px;
  width: 30vw;
  height: 20vw;
}

.suggested-input-span {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5vw 1vw;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #9be1ff;
}

button {
  padding: 2px;
}
</style>
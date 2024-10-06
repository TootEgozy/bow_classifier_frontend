<template>
  <div class="page-container">
    <div class="header-container"> put the title and the explanation here </div>

    <div class="classifier-container">
      <div> classifier component placeholder</div>
    </div>

    <div> a placeholder for a footer of "all rights are reserved to..."</div>

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
  font-family: 'Segoe UI', 'Tahoma', 'Geneva', sans-serif;
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

.verySmall {
  font-size: 1rem;
}

.smaller {
  font-size: 1.2rem;
}


.regular {
  font-size: 1.4rem;
}

.larger{
  font-size: 1.6rem;
}

.extraLarge {
  font-size: 1.8rem;
}

button {
  padding: 2px;
}
</style>
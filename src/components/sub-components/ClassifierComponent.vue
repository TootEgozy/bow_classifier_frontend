<template>
  <div class="classifier-container">

    <div class="suggestion-list-container">
      <inputSuggestionList
          title="Suggestions"
          :items="suggestedInputs"
          @input-selected="updateInputText"
          @refresh-inputs="getSuggestedInputs"
      />
    </div>

    <div class="tabs-container">
      <span class="detect-label"> Detect:</span>
      <button
          id="spam-tab"
          @click="clsType='spam'"
          class="tab-btn"
          :class="clsType === 'spam' ? 'selected-tab' : 'unselected-tab'"
      >
        Spam
      </button>
      <button
          id="sentiment-tab"
          @click="clsType='sentiment'"
          class="tab-btn"
          :class="clsType === 'sentiment' ? 'selected-tab' : 'unselected-tab'"
      >
        Sentiment
      </button>
    </div>

    <form @submit.prevent="handleSubmit">

      <div class="textarea-container">
        <textarea id="input_text" name="input_text" v-model="inputText" required></textarea>
        <button class="clear-text-btn" @click="clearInput">clear</button>
      </div>

      <div v-if="serverReady">
        <button type="submit" class="submit-btn">Classify</button>
      </div>
      <div v-else><div class="loader"></div></div>


      <div class="result-container" v-if="classification">
        <span> Classification: </span>
        <span> {{classification}} </span>
      </div>

    </form>


  </div>
</template>

<script>

import axios from "axios";
import InputSuggestionList from "@/components/sub-components/InputSuggestionList.vue";
import checkServerReady from "@/utils/checkServerReady";

export default {
  components: {
    InputSuggestionList
  },
  data() {
    return {
      suggestedInputs: [],
      inputText: '',
      clsType: 'spam',
      serverReady: true,
      classification: null,
      serverAddress: process.env.VUE_APP_SERVER_ADDRESS,
    };
  },

  mounted() {
    this.getSuggestedInputs();
  },

  methods: {
    async getSuggestedInputs() {
      try {
        const res = await axios.post(`${this.serverAddress}/generate_inputs`,{count: 3}, {params: { cls_type: this.clsType }});
        this.suggestedInputs = res.data.inputs;
      } catch (e) {
        console.error('error getting inputs from server: '+e);
      }
    },

    waitForDataChange(component, key) {
      return new Promise((resolve) => {
        const unwatch = component.$watch(key, (newVal) => {
          unwatch(); // Stop watching after first change
          resolve(newVal);
        });
      });
    },

    updateServerReady() {
      this.serverReady = true;
    },

    clearInput() {
      this.inputText = "";
    },

    updateInputText(selectedInput) {
      this.inputText = selectedInput;
    },

    async handleSubmit() {
      this.classification = null;
      const res = await axios.post(`${this.serverAddress}/classify`, {input_text: this.inputText}, {params: {cls_type: this.clsType}});
      this.classification = res.data.result;
    },
  },
  watch: {
    async clsType() {
      this.serverReady = false;
      this.suggestedInputs = [];
      checkServerReady(this.clsType, this.serverAddress, this.updateServerReady);
      await this.waitForDataChange(this, "serverReady");
      await this.getSuggestedInputs();
    }
  },
};
</script>

<style scoped>

* {
  overflow: visible;
}

.detect-label {
  margin-right: 0.5rem;
}

.tab-btn {
  border: none;
  margin: 0.5rem;
  padding: 0.4rem;
  background-color: transparent;
  font-size: 1rem;
}

.tab-btn:hover {
  background-color: #eef4f3;
  transition: 0.2s ease-in-out;
}

@keyframes moveLeft {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: +100% 0;
  }
}

.selected-tab {
  background: url("../../assets/images/text-background.jpg") repeat;
  background-size: auto;
  color: #de466c;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: moveLeft 10s linear infinite;
  border: 1px solid lightgray;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
}


.unselected-tab {
  /*
  background-color: lightgray; */
}

.suggestion-list-container {
  margin-bottom: 2rem;
}

.textarea-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

#input_text {
  height: 5rem;
  width: 42rem;
  resize: none;
  border: 1px solid darkgray;
  border-radius: 0px 5px 5px 5px;
  padding: 10px;
}

.clear-text-btn {
  align-self: flex-end;
  margin-left: 5px ;
}

.submit-btn {
  margin-top: 2rem;
  padding: 5px 10px;
  margin-right: -1px;
  border-radius: 2px;
  border: 1px solid lightgray;
  background-color: inherit;
  font-size: 1.1rem;
  font-weight: bold;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
}

.submit-btn:hover {
  background-color: #f9fbfb;
  /*
  transition: 0.2s ease-in-out;
  box-shadow: rgba(255, 255, 255, 0.8) 0 0 2rem 1rem;
   */
  z-index: 2;
  position: absolute;
  background: url("../../assets/images/text-background.jpg") repeat;
  background-size: auto;
  color: #de466c;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: moveLeft 10s linear infinite;


}

.result-container {
  margin: 2rem 0rem 2rem 0rem;
  font-size: 1.2rem;
  width: 100%;
  padding: 5px 10px 5px 10px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid lightgray;
}

.loader {
  overflow: visible;
  width: 20px;
  aspect-ratio: 1;
  color: #000;
  border: 1px solid;
  display: grid;
  box-sizing: border-box;
  animation: l1 4s infinite linear;
}

.loader::before,
.loader::after {
  overflow: visible;
  content: "";
  grid-area: 1/1;
  margin: auto;
  width: 70.7%;
  aspect-ratio: 1;
  border: 1px solid;
  box-sizing: content-box;
  animation: inherit;
}
.loader::after {
  overflow: visible;
  width: 50%;
  aspect-ratio: 1;
  border: 1px solid;
  animation-duration: 2s;
}
@keyframes l1{
  100% {transform:rotate(1turn)}
}



</style>
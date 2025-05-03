<template>
  <head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  </head>

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
        <div class="textarea-wrapper">
          <textarea id="input_text" v-model="inputText" required></textarea>
          <div class="clear-text-btn" @click="clearInput">
            <i class="fa fa-trash-o"></i>
          </div>
        </div>
      </div>

      <div v-if="serverReady">
        <button type="submit" class="submit-btn">Classify</button>
      </div>
      <div v-else class="loader-wrapper">
        <SquareLoader/>
      </div>


      <div class="result-container" v-if="classification">
        <div class="cls-label-and-result">
          <span> Classification: </span>
          <span>{{classification}}</span>
        </div>
        <router-link class="wrong-result-link" to="/about#wrong">Wrong result?</router-link>
      </div>
      <div v-if="awaitingClassification" class="loader-wrapper">
        <SquareLoader/>
      </div>

    </form>


  </div>
</template>

<script>

import axios from "axios";
import InputSuggestionList from "@/components/sub-components/InputSuggestionList.vue";
import SquareLoader from "@/components/sub-components/SquareLoader.vue";
import checkServerReady from "@/utils/checkServerReady";

export default {
  components: {
    InputSuggestionList,
    SquareLoader,
  },
  data() {
    return {
      suggestedInputs: [],
      inputText: '',
      clsType: 'spam',
      serverReady: true,
      classification: null,
      awaitingClassification: false,
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
      try {
        this.classification = null;
        this.awaitingClassification = true;
        const res = await axios.post(`${this.serverAddress}/classify`, {input_text: this.inputText}, {params: {cls_type: this.clsType}});
        this.classification = res.data.result;
        this.awaitingClassification = false;
      } catch (e) {
        console.error("Error posting classification: ", e);
      }
    },
  },
  watch: {
    async clsType() {
      this.serverReady = false;
      this.suggestedInputs = [];
      this.classification = null;
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
  font-family: "Inconsolata", monospace;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: "wdth" 100;
}

.detect-label {
  margin-right: 0.5rem;
}

.tabs-container {
  margin-bottom: 0.4rem;
}

.tab-btn {
  border: none;
  margin: 0.3rem;
  padding: 3px 7px;
  background-color: transparent;
  font-size: 1rem;
}

.tab-btn:hover {
  background-color: #eef4f3;
  transition: 0.2s ease-in-out;
  cursor: pointer;
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
  box-shadow: rgba(0, 0, 0, 0.18) 0 2px 4px;
}

.suggestion-list-container {
  margin-bottom: 2rem;
}
.textarea-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}

.textarea-wrapper {
  position: relative;
  width: 100%;
  max-width: 42rem;
}

textarea:focus {
  outline: none;
}

#input_text {
  width: 100%;
  height: 7rem;
  resize: none;
  border: 1px solid darkgray;
  border-radius: 3px;
  padding: 10px 35px 10px 10px; /* Extra right padding to make space for icon */
  box-sizing: border-box;
  overflow: auto;
}

.clear-text-btn {
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 1.2rem;
  color: #999;
  cursor: pointer;
  z-index: 2;
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
  background: url("../../assets/images/text-background.jpg") repeat;
  background-size: auto;
  color: #de466c;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: moveLeft 10s linear infinite;
  background-color:  #eef4f3;
  transition: 0.2s ease-in-out;
  cursor: pointer;
}

.result-container {
  margin: 2rem 0 2rem 0;
  font-size: 1rem;
  font-weight: bold;
  width: 100%;
  padding: 5px 10px 5px 10px;
  border-radius: 3px;
  border: 1px solid lightgray;
  background-color: #eef4f3;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.loader-wrapper {
  margin: 1rem;
}

.wrong-result-link {
  font-size: 0.7rem;
  color: #333333;
  opacity: 0.3;
}

.wrong-result-link:hover {
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
}


</style>
<template>
  <head>
    <title></title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  </head>

  <div class="classifier-container">

    <div class="tabs-container">
      <button
          id="spam-tab"
          @click="clsType='spam'"
          class="tab-btn"
          :class="clsType === 'spam' ? 'selected-tab' : 'unselected-tab'"
      >
        Spam
      </button>
      <span class="buttons-separator"> </span>
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
          <img
              class="get-input-btn"
              src="../../assets/images/dice.svg"
              alt="dice"
              @click="getRandomInput"
              @mouseover="showTooltip"
              @mouseout="hideTooltip"
          >
          <div class="clear-text-btn" @click="clearInput">
            <i class="fa fa-trash-o"></i>
          </div>
        </div>
        <span class="tooltip" id="random-input-tooltip">random suggestion</span>
      </div>

      <div v-if="serverReady">
        <button type="submit" class="submit-btn">Classify</button>
      </div>
      <div v-else class="loader-wrapper">
        <SquareLoader/>
      </div>


      <div class="result-container" v-if="classification">
        <div class="cls-text-container">
          <span id="cls-text">{{classification}}</span>
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
import SquareLoader from "@/components/sub-components/SquareLoader.vue";

export default {
  components: {
    SquareLoader,
  },
  data() {
    return {
      inputText: '',
      clsType: 'spam',
      serverReady: true,
      classification: null,
      awaitingClassification: false,
      serverAddress: process.env.VUE_APP_SERVER_ADDRESS,
    };
  },

  methods: {

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

    async getRandomInput() {
      try {
        const res = await axios.post(`${this.serverAddress}/generate_inputs`,{count: 1}, {params: { cls_type: this.clsType }});
        this.inputText = res.data.inputs[0];
      } catch (e) {
        console.error('error getting inputs from server: '+e);
      }
    },

    decorate(classification) {
      switch (classification) {
        case "spam":
          return "🚩 spam 🚩";
        case "ham":
          return "🌿 not spam 🌿";
        case "positive":
          return "positive 😊";
        case "negative":
          return "negative 😞";
      }
    },

    async handleSubmit() {
      try {
        this.classification = null;
        this.awaitingClassification = true;
        const res = await axios.post(`${this.serverAddress}/classify`, {input_text: this.inputText}, {params: {cls_type: this.clsType}});
        this.classification = this.decorate(res.data.result);
        this.$nextTick(() => {
          const clsText = document.getElementById("cls-text");
          console.log(clsText);
          clsText.classList.remove("red");
          clsText.classList.remove("green");
          if(this.classification.includes("not spam") || this.classification.includes("positive")) {
            clsText.classList.add("green");
          } else {
            clsText.classList.add("red");
          }
        });
        this.awaitingClassification = false;
      } catch (e) {
        console.error("Error posting classification: ", e);
      }
    },
    showTooltip() {
      const tooltip = document.getElementById("random-input-tooltip");
      tooltip.classList.add("show-tooltip");
    },
    hideTooltip() {
      const tooltip = document.getElementById("random-input-tooltip");
      tooltip.classList.remove("show-tooltip");
    }
  }
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

.classifier-container{
  padding: 2rem;
  width: 100%;

}

.detect-label {
  margin-right: 0.5rem;
}

.tabs-container {
  padding: 0.4rem;
  background-color: rgb(255, 255, 255, 0.3);
  border-radius: 0.7rem;
  border: 1px solid darkgray;
  width: 12vw;
  min-width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.tab-btn {
  border: none;
  padding: 0.1rem 1.5rem 0.1rem 1.5rem;
  background-color: transparent;
  font-size: 1rem;
  border-radius: 0.6rem;
}

.buttons-separator {
  width: 0.5rem;
}

.tab-btn:hover {
  background-color: rgb(121, 121, 121, 0.2);
  transition: 0.2s ease-in-out;
  cursor: pointer;
}

.selected-tab {
  background-color: rgb(121, 121, 121, 0.2);
}

.textarea-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  position: relative;
}

.textarea-wrapper {
  position: relative;
  width: 100%;
  max-width: 42rem;
  margin-top: 0.8rem;
  margin-bottom: 0.5rem;
}

textarea:focus {
  outline: none;
}

#input_text {
  width: 100%;
  height: 8rem;
  resize: none;
  border: 1px solid darkgray;
  border-radius: 3px;
  padding: 10px 15px 10px 10px;
  box-sizing: border-box;
  overflow: auto;
  line-height: 1.3rem;
}

.clear-text-btn {
  position: absolute;
  right: 1rem;
  bottom: 10px;
  font-size: 1.2rem;
  color: #999;
  cursor: pointer;
  z-index: 2;
}

.get-input-btn {
  position: absolute;
  right: 2.7rem;
  bottom: 15px;
  width: 1.2rem;
  height: auto;
  cursor: pointer;
  z-index: 2;
}

.tooltip {
  opacity: 0;
  position: absolute;
  z-index: 5;
  padding: 0.1rem 0.5rem 0.1rem 0.5rem;
  border-radius: 5px;
  font-size: 0.7rem;
  color: #1b1b1b;
  bottom: -0.3rem;
  right: 0;
  background-color: rgb(255, 255, 255, 0.5);
}

.show-tooltip {
  opacity: 1;
}

.red {
  color: #730000;
  background-color: rgb(255, 0, 0, 0.01);
  padding: 0.1rem;
  border-radius: 0.6rem;
}

.green {
  color: #007500;
  background-color: rgb(0, 255, 0, 0.01);
  padding: 0.1rem;
  border-radius: 0.6rem;
}


@keyframes moveLeft {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 200% 100%;
  }
}

.submit-btn {
  margin-top: 1rem;
  padding: 0.8rem 1.2rem;
  margin-right: -1px;
  border-radius: 0.8rem;
  border: 1px solid lightgray;
  background-color: inherit;
  font-size: 1.1rem;
  font-weight: bold;
  box-shadow: rgba(0, 0, 0, 0.18) 0 2px 4px;

  background-image: url("../../assets/images/background.jpg");
  background-size: 1000%;
  background-repeat: repeat;
  background-position: 0 0;
  animation: moveLeft 80s linear infinite;
}

.submit-btn:hover {
  cursor: pointer;
  color: #515151;
  transition: 0.2s ease-in-out;
}

.result-container {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
}

.cls-text-container {
  margin: 2rem 0 0.5rem 0;
  width: fit-content;
  font-size: 1rem;
  font-weight: bold;
  padding: 5px 10px 5px 10px;
  border-radius: 10px;
  border: 1px solid lightgray;
}

.loader-wrapper {
  margin: 1rem;
}

.wrong-result-link {
  font-size: 0.8rem;
  color: #333333;
  opacity: 0.3;
  margin-left: 0.1rem;
}

.wrong-result-link:hover {
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
}

@media (max-width: 650px) {
  .classifier-container * {
    font-size: 1rem;
  }

  .get-input-btn {
    right: 2.5rem;
    bottom: 15px;
    width: 1.05rem;
    height: auto;
  }

  .tabs-container {
    padding: 0.2rem;
    width: 8vw;
    min-width: fit-content;
    height: fit-content;
  }

  .tab-btn {
    padding: 0.05rem 0.75rem 0.05rem 0.75rem;
    font-size: 0.8rem;
  }

  .tooltip {
    padding: 0.05rem 0.25rem 0.05rem 0.25rem;
    font-size: 0.6rem;
    color: #1b1b1b;
    bottom: -0.1rem;
    right: 0;
    background-color: rgb(255, 255, 255, 0.5);
  }

  #input_text {
    font-size: 0.9rem;
    line-height: 1rem;
  }

}


</style>
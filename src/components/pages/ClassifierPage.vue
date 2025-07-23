<template>

  <div class="page-container">
    <transition name="slide-fade" mode="out-in">
      <div v-if="introOpen" key="intro">
        <IntroPage @close-intro="toggleIntro" />
      </div>

      <div v-else key="main">
        <div class="content-container">
          <i class="fa-solid fa-question" @click="toggleIntro"></i>
          <div class="header-container">
            <h1 class="heading">Classifier</h1>
            <h3 class="second-heading">Paste your text into the box, or click the dice for a random sample. <br>
              Select a tab to analyze your text for spam or emotional tone.<br>
              Click "Classify" and get the result!</h3>
          </div>

          <div class="classifier-container">
            <ClassifierComponent />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

import ClassifierComponent from "@/components/sub-components/ClassifierComponent.vue";
import IntroPage from "@/components/pages/IntroPage.vue";

export default {
  data() {
    return {
      introOpen: true,
    }
  },
  components: {
    ClassifierComponent,
    IntroPage,
  },
   methods: {
    toggleIntro() {
      this.introOpen = !this.introOpen;
    }
   }
};

</script>

<style scoped>

* {
  padding: 0.3vw;
  overflow: hidden;
}

.page-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 2rem;
}

.content-container {
  background-color: rgba(210, 210, 210, 0.5);
  padding: 3rem;
  min-height: 85vh;
  box-shadow: rgba(0, 0, 0, 0.18) 0 2px 4px;
  min-width: 40vw;
  position: relative;
}

@keyframes moveLeft {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.heading {
  font-size: 3rem;
  margin: 0.5rem;
  line-height: 100%;
  font-family: "Tourney", sans-serif;
  font-optical-sizing: auto;
  font-weight: 900;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  color: #3c6763;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0;
  margin-top: 2rem;
  position: relative;
}

.fa-solid {
  color: #656565;
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  opacity: 0.8;
}

.fa-solid:hover {
  opacity: 1;
  transition: opacity 0.4s ease-in-out;
  cursor: pointer;
}

.second-heading {
  font-family: "Inconsolata", monospace;
  font-size: 1.1rem;
  margin: 0.5rem;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: "wdth" 100;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

button {
  padding: 2px;
}

:deep(.slide-fade-enter-active),
:deep(.slide-fade-leave-active) {
  transition: all 0.5s ease;
}

:deep(.slide-fade-enter-from),
:deep(.slide-fade-leave-to) {
  opacity: 0;
  transform: translateY(10vh);
}

strong {
  padding: 0;
  margin: 0;
  font-weight: 500;
}

@media (max-width: 800px) {
  .content-container {
    max-width: 90%;
    max-height: 100%;
    padding: 1rem;
    margin: 1rem;
  }

  .header-container * {
    text-wrap: wrap;
    width: fit-content;
  }
}

@media (max-width: 650px) {
  .content-container {
    padding: 1rem;
    margin: 1rem;
  }

  .header-container {
    width: fit-content;
  }
  .heading {
    font-size: 2.2rem;
  }

  .second-heading {
    font-size: 1rem;
  }

}

@media (max-width: 400px) {
  .content-container {
    padding: 0.5rem;
    width: fit-content;
    margin: 1rem;
  }

  .header-container * {
    text-wrap: wrap;
    width: fit-content;
  }

  .heading {
    font-size: 2.2rem;
  }

  .second-heading {
    font-size: 1rem;
  }
}

</style>
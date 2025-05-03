<template>

  <div class="page-container">

    <div class="content-container ">

      <div class="header-container">
        <h1 class="heading">Classifier</h1>
        <h3 class="second-heading">Input your text and press >> Classify</h3>
      </div>

      <div class="classifier-container">
        <ClassifierComponent />
      </div>


    </div>

  </div>
</template>

<script>

import ClassifierComponent from "@/components/sub-components/ClassifierComponent.vue";

export default {
  components: {
    ClassifierComponent,
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
  justify-content: left;
  flex-direction: column;
  margin-top: 5rem;
}

.content-container {
  background-color: rgba(210, 210, 210, 0.5);
  padding: 3rem;
  min-height: 85vh;
  box-shadow: rgba(0, 0, 0, 0.18) 0 2px 4px;
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

@media (max-width: 800px) {
  .content-container {
    max-width: 90%;
    max-height: 100%;
    padding: 1rem;
  }
}

@media (max-width: 400px) {
  .content-container {
    padding: 0.5rem;
  }

  .heading {
    font-size: 2.5rem;
  }

  .second-heading {
    font-size: 1rem;
  }
}

@media (max-height: 650px) {
  .content-container {
    padding: 1rem;
  }
}

</style>
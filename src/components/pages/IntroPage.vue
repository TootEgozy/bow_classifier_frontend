<template>

  <div class="page-container">

    <div class="content-container ">

      <div class="header-container">
        <span class="x-button" @click="closeIntro"><img src="../../assets/images/x.svg" alt="close"></span>
        <h1 class="heading">About this project</h1>
      </div>
      <p>This is an educational project I built to explore the basics of machine learning and practice natural language processing (NLP)</p>
      <p>I created this user interface to make it easy to interact with the API and test the model directly.</p>
      <p>The model supports two types of text classification:</p>
      <ul>
        <li> spam / not spam</li>
        <li> positive / negative sentiment</li>
      </ul>
      <p>Just type any text, choose a classification type, and click "Classify" to see the result.</p>
      <p>You can also try the sample inputs in the “Suggestions” box.</p>

    </div>

  </div>
</template>

<script>

export default {
  methods: {
    closeIntro() {
      this.$emit('close-intro');
    }
  }
};

</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.page-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.content-container {
  background-color: rgba(210, 210, 210, 0.5);
  padding: 3rem;
  min-height: 85vh;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.18) 0 2px 4px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

p {
  margin-bottom: 1rem;
  line-height: 0.5rem;
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
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 1rem 0;
  width: 100%;
}


.x-button {
  padding: 2px;
  align-self: flex-end;
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

}

@media (max-height: 650px) {
  .content-container {
    padding: 1rem;
  }
}

</style>
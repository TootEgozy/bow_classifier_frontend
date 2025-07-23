<template>

  <div class="page-container">

    <div class="content-container ">

      <div class="header-container">
        <h1 class="heading">Welcome to classifier GUI</h1>
        <p></p>
      </div>
      <div class="text-container">

        <p>This is an educational project I made to explore the basics of machine learning,
          and get hands-on practice with natural language processing (NLP).<br>
          Most of the magic happens in the backend, but I added this user interface to make it easier to interact with the API and test the model directly. <br>
        <br>The model can classify text in two ways:</p>
          <ul>
            <li> spam vs not spam</li>
            <li> positive or negative sentiment</li>
          </ul>
          <p>Test it out and enjoy :)</p>
        <br>
      </div>

      <button class="x-button" @click="closeIntro">Click To Start</button>


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
  padding: 5rem;
  min-height: 85vh;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.18) 0 2px 4px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
}

p {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  text-wrap: wrap;
}

ul {
  margin: 1rem 0;
  list-style-type: square;
  padding-left: 2rem;

}

ul li {
  color: #109b92;
  font-size: 1.2rem;
}

.heading {
  font-size: 2.8rem;
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

.text-container {
  min-width: 40vw;
  position: relative;
}


.x-button {
  margin-top: auto;
  align-self: center;
  padding: 0.8rem;
  font-size: 1.3rem;
  color: #3a3a3a;
  background-color: rgb(255, 255, 255, 0.2);
  border-radius: 0.2rem;
  border: 1px solid lightgray;
  box-shadow: rgba(0, 0, 0, 0.18) 0 2px 2px;
}

.x-button:hover {
  color: #109b92;
  background-color: rgb(255, 255, 255, 0.5);
  transition: color 0.4s ease-in-out, background-color 0.4s ease-in-out;
  cursor: pointer;
}

.x-button:active {
  color: #0c6862;
  background-color: rgb(255, 255, 255, 0.5);
  transition: color 0.4s ease-in-out, background-color 0.4s ease-in-out;
  cursor: pointer;
}


@media (max-width: 800px) {
  .content-container {
    max-width: 90%;
    max-height: 100%;
    padding: 2rem;
  }
}

@media (max-width: 400px) {
  .content-container {
    padding: 1rem;
  }

  .heading {
    font-size: 2rem;
  }

  .text-container p {
    font-size: 1rem;
  }

  ul li {
    font-size: 1rem;
  }

}

@media (max-height: 650px) {
  .content-container {
    padding: 1rem;
  }

  .text-container {
    font-size: 1rem;
  }

  ul li {
    font-size: 1rem;
  }
}

</style>
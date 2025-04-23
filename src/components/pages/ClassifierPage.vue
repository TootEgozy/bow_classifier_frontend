<template>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Tourney:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
  </head>

  <div class="page-container">

    <div class="content-container">

      <div class="header-container">
        <h1 class="heading">Classifier</h1>
        <h3>Input your text and press "classify"</h3>
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
  display: flex;
  align-items: center;
  justify-content: left;
  flex-direction: column;
  margin-top: 5rem;
}

.content-container {
  background-color: rgba(210, 210, 210, 0.5);
  padding: 3rem;
  height: 80vh;
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
  margin: 0;
  line-height: 100%;
  font-family: "Tourney", sans-serif;
  font-optical-sizing: auto;
  font-weight:400;
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

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

button {
  padding: 2px;
}
</style>
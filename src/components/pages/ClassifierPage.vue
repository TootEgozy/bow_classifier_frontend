<template>
  <div class="page-container">

    <div class="content-container">

      <div class="header-container">
        <h1 class="heading">Classifier</h1>
        <h3>Select a category (spam or sentiment), input your text and press "classify"</h3>
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
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
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
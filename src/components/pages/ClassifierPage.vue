<template>
  <div class="page-container">

    <div class="content-container">

      <div class="header-container">
        <h1>Classifier</h1>
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
  background-color: whitesmoke;
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
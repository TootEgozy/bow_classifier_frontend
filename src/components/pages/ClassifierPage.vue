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

      <div> a placeholder for a footer of "all rights are reserved to..."</div>

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

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 85vh;
  padding-top: 5vh;
  background-color: lightcyan;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.radio_container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}

.text_input_container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  background-color: lightblue;
}

#input_text {
  padding: 1vh;
}

#suggested-inputs-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(1, 1fr);
  gap: 10px;
  width: 30vw;
  height: 20vw;
}

.suggested-input-span {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5vw 1vw;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #9be1ff;
}

button {
  padding: 2px;
}
</style>
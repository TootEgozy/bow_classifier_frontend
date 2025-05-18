<template>
  <div class="loading-page-container">
    <div class="loading_container">
      <span class="loading_msg">Training model</span>
      <div class="loader"></div>
      <span class="loading_msg">This process takes up to one minute to complete</span>
    </div>
  </div>
</template>

<style scoped>

* {
  overflow: visible;
}

.loading-page-container {
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.loading_msg {
  margin: 1vh;
  font-size: 1.5rem;
  align-self: center;
  font-family: "Inconsolata", monospace;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: "wdth" 100;
}

.loading_container {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
/* HTML: <div class="loader"></div> */
.loader {
  margin: 2vh;
  width: 25px;
  height: 50px;
  display: grid;
  color: #000;
  background:
      linear-gradient(currentColor 0 0) top/100% 2px,
      radial-gradient(farthest-side at  top, #0000 calc(100% - 2px),currentColor calc(100% - 1px) ,#0000) top,
      linear-gradient(currentColor 0 0) bottom/100% 2px,
      radial-gradient(farthest-side at  bottom, #0000 calc(100% - 2px),currentColor calc(100% - 1px) ,#0000) bottom;
  background-size: 100% 1px,100% 50%;
  background-repeat: no-repeat;
  animation: l18 4s infinite linear;
}
.loader::before,
.loader::after {
  content: "";
  grid-area: 1/1;
  background: inherit;
  border: inherit;
  animation: inherit;
}
.loader::after {
  animation-duration: 2s;
}
@keyframes l18 {
  100% {transform: rotate(1turn)}
}


@media (max-width: 650px) {
  * {
    font-size: 1rem;
  }

  .loading_msg {
    font-size: 1rem;
  }

  .loading-page-container {
    padding: 2rem;
  }
}

</style>
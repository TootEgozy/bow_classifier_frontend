<template>
  <div class="loader"></div>
</template>

<style scoped>

.loader {
  overflow: visible;
  width: 20px;
  aspect-ratio: 1;
  color: gray;
  border: 1px solid;
  display: grid;
  box-sizing: border-box;
  animation: l1 4s infinite linear;
}

.loader::before,
.loader::after {
  overflow: visible;
  content: "";
  grid-area: 1/1;
  margin: auto;
  width: 70.7%;
  aspect-ratio: 1;
  border: 1px solid;
  box-sizing: content-box;
  animation: inherit;
}
.loader::after {
  overflow: visible;
  width: 50%;
  aspect-ratio: 1;
  border: 1px solid;
  animation-duration: 2s;
}
@keyframes l1{
  100% {transform:rotate(1turn)}
}

</style>

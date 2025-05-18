<template>
  <nav class="navbar">
    <div class="container">
      <ul class="nav-links">
        <li v-for="link in links" :key="link.text">
          <router-link :to="link.url">{{ link.text }}</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  setup() {
    const links = [
      { text: 'Classifier', url: '/' },
      { text: 'About', url: '/about' },
    ];

    return { links };
  },
};
</script>

<style scoped>

* {
  font-family: "Inconsolata", monospace;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: "wdth" 100;
}

.navbar {
  background-color: #333;
  color: white;
  padding: 0.2rem;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100vw;
  z-index: 1000;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1rem;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 6vw;
  font-size: 1.3rem;
}

.nav-links li {
  display: inline;
}

.nav-links a {
  color: white;
  text-decoration: none;
}

.nav-links a:hover {
  text-decoration: underline;
}

@media (max-width: 500px) {
  .nav-links li {
    font-size: 0.9rem;
  }
}
</style>
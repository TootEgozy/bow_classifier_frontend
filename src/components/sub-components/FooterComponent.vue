<template>
  <footer class="footer">
    Created by Toot Egozy ·
    <a :href="githubLink" target="_blank" rel="noopener noreferrer">GitHub</a> ·
    <a :href="linkedinLink" target="_blank" rel="noopener noreferrer">LinkedIn</a>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  data() {
    return {
      githubLink: 'https://github.com/TootEgozy',
      linkedinLink: 'https://www.linkedin.com/in/toot-egozy-b1971920b/'
    };
  }
}
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.page-container {
  flex-grow: 1;
}

.footer {
  text-align: center;
  font-size: 0.9em;
  color: #777;
  font-family: "Inconsolata", monospace;
  padding: 1rem 0;
}

.footer a {
  font-size: 0.9em;
  color: #555;
  text-decoration: none;
  font-family: "Inconsolata", monospace;
}

.footer a:hover {
  text-decoration: underline;
}

</style>

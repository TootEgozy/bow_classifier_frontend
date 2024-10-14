<template>
  <div class="collapsible-list">
    <div class="list-header" @click="toggleList">
      <span>{{ title }}</span>

      <span class="arrow">
        <img
            v-if="isOpen"
            src="../../assets/images/uparrow.svg"
            class="arrow-icon"
            key="up"
        />
        <img
            v-else
            src="../../assets/images/downarrow.svg"
            class="arrow-icon"
            key="down"
        />
      </span>

    </div>
    <transition name="fade">
      <ul v-if="isOpen" class="list">
        <li v-for="(item, index) in items" :key="index">{{ item }}</li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'InputSuggestionList',
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleList() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped>

.list-header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
  border: 1px solid darkgray;
  border-radius: 5px;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list li {
  padding: 8px 10px;
  border-top: 1px solid #eee;
}

.list li:first-child {
  border-top: none;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.arrow-icon {
  height: 0.8rem;
  width: 0.8rem;
  display: inline-block;
  vertical-align: middle;
}
</style>
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
      <div v-if="isOpen">
        <ul class="list">
          <li
              v-for="(item, index) in items"
              :key="index"
              @click="select"
          >
            {{ item }}
          </li>
        </ul>
        <button class="refresh-inputs-btn" @click="console.log('')">refresh</button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'InputSuggestionList',
  data() {
    return {
      isOpen: false,
      selectedInput: "",
    };
  },
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
  methods: {
    toggleList() {
      this.isOpen = !this.isOpen;
    },
    select(event) {
      this.selectedInput = event.target.innerHTML;
      this.$emit('input-selected', this.selectedInput);
    }
  },
};
</script>

<style scoped>

* {
  overflow: hidden;
  box-sizing: border-box;
}

.collapsible-list {
  margin-top: 10px;
  background-color: #dfdbe7;
  border-radius: 5px;
  border: 1px solid gray;
}

.list-header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
  border: 1px solid darkgray;
  border-radius: 5px;
}

.list-header:hover {
  background-color: #f1f0f5;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 40rem;
}

.list li {
  padding: 8px 10px;
  border-top: 1px solid #eee;
}

.list li:hover {
  background-color: #f1f0f5 ;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
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
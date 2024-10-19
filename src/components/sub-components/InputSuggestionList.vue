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
      <div v-if="isOpen" class="collapsable-list-content">

        <ul class="list">
          <li
              v-for="(item, index) in items"
              :key="index"
              @click="select"
          >
            {{ item }}
          </li>
        </ul>

        <div class="refresh-btn-container">
          <button
              class="refresh-inputs-btn"
              @click="refreshInputs"
          >
            refresh
          </button>
        </div>

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
    },
    refreshInputs() {
      this.$emit('refresh-inputs');
    },
  },
};
</script>

<style scoped>

* {
  overflow: hidden;
  box-sizing: border-box;
  font-size: 0.8rem;
}

.collapsible-list {
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
}

.collapsable-list-content {
  padding: 0.5rem;
}

.list-header {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
}

.list-header:hover {
  background-color: lightgray;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 40rem;
}

.list li {
  padding: 0.3rem;
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

.refresh-btn-container {
  display: flex;
  justify-content: flex-end;
}

.refresh-inputs-btn {
}
</style>
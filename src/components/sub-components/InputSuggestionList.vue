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

        <ul v-if="items.length > 0" class="list">
          <li
              v-for="(item, index) in items"
              :key="index"
              @click="select"
          >
            {{ item }}
          </li>
        </ul>
        <div v-else>
          <SmallLoading/>
        </div>

        <div class="refresh-btn-container">
          <img
              class="refresh-inputs-btn"
              @click="refreshInputs"
              src="../../assets/images/reload-icon.svg"
              alt="refresh"
          >
        </div>

      </div>


    </transition>
  </div>
</template>

<script>
import SmallLoading from "@/components/sub-components/SmallLoading.vue";

export default {
  name: 'InputSuggestionList',
  components: {SmallLoading},
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
  font-family: "Inconsolata", monospace;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: "wdth" 100;
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
  background-color: #eef4f3;
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
  background-color: #eef4f3;
  cursor: default;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.refresh-inputs-btn {
  height: 1rem;
  width: 1rem;
  opacity: 50%;
}

.refresh-inputs-btn:hover {
  cursor: pointer;
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


</style>
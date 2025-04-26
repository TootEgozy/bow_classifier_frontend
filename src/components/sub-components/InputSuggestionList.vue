<template>
  <div class="mt-2 w-[40rem] max-w-[42rem] rounded-md border border-gray-300 font-mono text-sm overflow-hidden inputs-container">
    <div
        class="flex justify-between items-center p-2 rounded-md cursor-pointer hover:bg-gray-100"
        @click="toggleList"
    >
      <span>{{ title }}</span>
      <span>
        <img
            v-if="isOpen"
            src="../../assets/images/uparrow.svg"
            class="h-3 w-3 inline-block"
            key="up"
        />
        <img
            v-else
            src="../../assets/images/downarrow.svg"
            class="h-3 w-3 inline-block"
            key="down"
        />
      </span>
    </div>

    <transition name="fade">
      <div v-if="isOpen" class="p-2">
        <ul v-if="items.length > 0" class="list-none p-0 m-0 max-w-2xl">
          <li
              v-for="(item, index) in items"
              :key="index"
              @click="select"
              class="p-1 border-t border-gray-200 hover:bg-gray-100 cursor-default"
          >
            {{ item }}
          </li>
        </ul>
        <div v-else>
          <SmallLoading />
        </div>

        <div class="flex justify-end mt-2">
          <img
              class="h-4 w-4 opacity-50 hover:cursor-pointer"
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
  components: { SmallLoading },
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 800px) {
  .inputs-container {
    max-width: 90%;
    padding: 0rem;
  }
}

@media (max-width: 400px) {
  .inputs-container {
    max-width: 90%;
    padding: 0rem;
  }
}

</style>

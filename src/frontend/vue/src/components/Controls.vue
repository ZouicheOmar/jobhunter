<script setup lang="ts">
import { useStore } from '@/store';
import { useAddCandidStore } from '@/addCandidStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const store = useStore();
const { total, cities, techs, cityFilter, techFilter } = storeToRefs(store)

const addCandidStore = useAddCandidStore();
const { toggleShow } = addCandidStore;

</script>

<template>
  <div class="controls">
    <div>
      <button @click="toggleShow()"> add new </button>
      <button> peding </button>
      <button> first call </button>
      <button> first interview </button>
      <select name="" v-model="cityFilter">
        <option value="">city (all)</option>
        <option v-for="c in cities" :value="c">{{ c }}</option>
      </select>
      <select name="" v-model="techFilter">
        <option value="">tech (all)</option>
        <option v-for="t in techs" :value="t">{{ t }}</option>
      </select>
    </div>
    <!-- <button @click="handleFile()"> parse file </button> -->
    <div>
      <span> total: {{ total }}</span>
    </div>
  </div>
</template>

<style scoped>
.controls,
.controls div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2px;

}

span {
  color: #9D9D9D;
  font-style: italic;
  font-size: 90%;
}

button {
  height: 1.5rem;
}

select {
  width: 5rem;
  height: 1.5rem;
}
</style>

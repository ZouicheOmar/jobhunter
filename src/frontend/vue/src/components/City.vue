<script setup lang="ts">

import { ref } from 'vue';

import { getNextFocusNode } from '@/utils';
import { useAddCandidStore } from '@/addCandidStore';
import { storeToRefs } from 'pinia';
const addCandidStore = useAddCandidStore();

const { city, cities } = storeToRefs(addCandidStore)

// const citiesList = ref([])
// const city = ref("")

function handleInput(e: InputEvent) {
  city.value = e.target.value.toLowerCase();
}

function handleKeydown(e: KeyboardEvent) {
  const k = e.key
  if (k == "Enter") {
    e.preventDefault()
    if (!cities.value.includes(city.value)) {
      cities.value.push(city.value)
    }
    getNextFocusNode(e.target).focus();
  }
}
</script>

<template>
  <div class="section">
    <label for="cities"> location : </label>
    <input list="cities" type="text" :value="city" @input="handleInput" @keydown="handleKeydown" />
    <datalist id="cities">
      <option value="">select city</option>
      <option v-for="city in cities" :value="city.name">{{ city.name }}</option>
    </datalist>
  </div>
</template>

<style scoped>
.city {
  padding-left: 4px;
}

option {
  color: red;
}
</style>

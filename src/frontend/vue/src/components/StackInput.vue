<script setup lang="ts">

import { ref } from 'vue';

import { useAddCandidStore } from '@/addCandidStore';
import { storeToRefs } from 'pinia';
const addCandidStore = useAddCandidStore();


const { tech, techs, stack } = storeToRefs(addCandidStore);

// const techList = ref([])
// const techCurrent = ref("")

function handleInput(e: InputEvent) {
  tech.value = e.target.value.toLowerCase();
}

function handleKeydown(e: KeyboardEvent) {
  const k = e.key
  if (k == "Enter") {
    e.preventDefault()
    stack.value.push(tech.value);
    // if (!stack.value.includes(tech.value)) {
    //   stack.value.push(tech.value)
    // }
    tech.value = ""
  }
}

</script>

<template>
  <div class="section">
    <label for="techlist"> stack : </label>
    <input list="techlist" type="text" name="" :value="tech" @input="handleInput" @keydown="handleKeydown" />
    <datalist id="techlist">
      <option value="">select tech</option>
      <option v-for="t in techs" :value="t.name">{{ t.name }}</option>
    </datalist>
    <div class="stack">
      <span v-for="s in stack"> {{ s + " " }} </span>
    </div>
  </div>
</template>

<style scoped>
.stack {
  padding-left: 4px;
}

option {
  color: red;
}
</style>

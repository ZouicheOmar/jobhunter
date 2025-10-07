<script setup lang="ts">

import { useAddCandidStore } from '@/addCandidStore';
import { storeToRefs } from 'pinia';
const addCandidStore = useAddCandidStore();

const { contractTypes, contract } = storeToRefs(addCandidStore);

</script>

<template>
  <div class="section">
    <label> contract type : </label>
    <select name="" v-model="contract">
      <option value="">contract type</option>
      <option v-for="c in contractTypes" :value="c">{{ c }}</option>
    </select>
  </div>
</template>

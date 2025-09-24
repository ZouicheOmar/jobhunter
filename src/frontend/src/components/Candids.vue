<script setup lang="ts">
import CandidUnit from './CandidUnit.vue';
import AddCandid from './AddCandid.vue';

import { storeToRefs } from 'pinia';

import { useStore } from '@/store';
import { useAddCandidStore } from '@/addCandidStore';

const store = useStore();
const { candids } = storeToRefs(store);

const addCandidStore = useAddCandidStore();
const { show } = storeToRefs(addCandidStore);

</script>

<template>
  <div class="container">
    <AddCandid v-show="show" />
    <CandidUnit v-for="(candid, index) in candids" :key="index" :candid="candid" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

}
</style>

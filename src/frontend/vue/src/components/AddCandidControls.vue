<script setup lang="ts">
import { useAddCandidStore } from '@/addCandidStore';
import { storeToRefs } from 'pinia';
const addCandidStore = useAddCandidStore();
const { postCandid, $reset } = addCandidStore;
</script>
<template>
  <div class="section">
    <button @click="postCandid"> submit </button>
    <button @click="$reset"> reset </button>
  </div>
</template>

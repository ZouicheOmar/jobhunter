<script setup lang="ts">
import { useStore } from '@/store';
import { useAddCandidStore } from '@/addCandidStore';
import { storeToRefs } from 'pinia';

const store = useStore();
const { total } = storeToRefs(store)
const { getAllCandids } = store;

const addCandidStore = useAddCandidStore();
const { toggleShow } = addCandidStore;


async function handleFile() {
  const url = "http://localhost:8080/candid/handleFile";
  const req = await fetch(url);
  if (!req.ok) return console.log("problem handling file");
  const text = await req.text();
  console.log(text);

  getAllCandids();
}

</script>

<template>
  <div class="controls">
    <div>
      <button @click="toggleShow()"> add new </button>
      <button> peding </button>
      <button> first call </button>
      <button> first interview </button>
    </div>
    <!-- <button @click="handleFile()"> parse file </button> -->
    <div>
      <span> total: {{ total }}</span>
    </div>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  justify-content: space-between;
  align-items: end;
}

span {
  color: #9D9D9D;
  font-style: italic;
  font-size: 90%;
}
</style>

<script setup lang="ts">
import Candids from './components/Candids.vue';
import Controls from './components/Controls.vue';
import UILogger from './components/UILogger.vue';
import { useStore } from './store';

const store = useStore();
const { getAllCandids } = store;

getAllCandids();
</script>

<template>
  <h1>The Job Hunter</h1>
  <Controls />
  <Candids />
  <UILogger />
</template>

<style>
:root {
  font-size: 93%;
  line-height: 1.2;
}

p {
  margin: 0;
  padding: 0;
}

button {
  width: fit-content;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  margin-left: 0.1rem;
  font-size: 80%;
}

body {
  /* position: relative; */
  max-width: 600px;
  margin: 0 auto;
}

#app {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

h1 {
  padding: 0 0.5rem;
  margin: 0.1rem 0;
  font-family: Junicode;
  text-decoration: underline;
  color: #274AB3;
}
</style>

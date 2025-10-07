<script setup lang="ts">
import Candids from './components/Candids.vue';
import Controls from './components/Controls.vue';
import UILogger from './components/UILogger.vue';
import { useStore } from './store';

const store = useStore();
const { getAllCandids, getFilters } = store;

getAllCandids();
getFilters();

</script>

<template>
  <h1>The JobHunter</h1>
  <Controls />
  <Candids />
  <!-- <UILogger /> -->
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

body {
  max-width: 600px;
  margin: 0 auto;
}

button {
  width: fit-content;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  margin-left: 0.1rem;
  font-size: 90%;
}

#app {
  margin: 1rem auto;
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

.head {
  display: flex;
  justify-content: space-between;

}

.head-date {
  color: #9D9D9D;
  font-style: italic;
  /* text-decoration: underline; */
  font-size: 80%;
}

.unit {
  border: 1px solid #9D9D9D;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
}
</style>

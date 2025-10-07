<script setup lang="ts">
import { useAddCandidStore } from '@/addCandidStore';
import { useUILoggerStore } from '@/uiloggerStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
// import { ref, useTemplateRef } from 'vue';

const addCandidStore = useAddCandidStore();
const { cities, techs, contractTypes } = storeToRefs(addCandidStore);

const uiLoggerStore = useUILoggerStore()
const { loggerRef, x, y } = storeToRefs(uiLoggerStore);
const { handleSummaryClick, handleMouseDown, handleMouseUp, handleMove } = uiLoggerStore;

</script>

<template>
  <div class="logger" ref="loggerRef" @mousedown="handleMouseDown" @mousemove="handleMove" @mouseup="handleMouseUp">
    <details>
      <summary @click="handleSummaryClick"> helper data </summary>
      <div class="loggerInside">
        <div class="section">
          <h3> CITIES </h3>
          <span v-for="(city, index) in cities" :key="index"> {{ city.name }}</span>
        </div>
        <div class="section">
          <h3> TECH </h3>
          <span v-for="(tech, index) in techs" :key="index"> {{ tech.name }}</span>
        </div>
        <div class="section">
          <h3> C. TYPES </h3>
          <span v-for="(contractType, index) in contractTypes" :key="index"> {{ contractType }}</span>
        </div>
      </div>
    </details>
  </div>
</template>

<style scoped>
.loggerInside {
  display: flex;
  width: 500px;
}

summary {
  width: 500px;
  padding: 2px;
  padding-left: 1rem;
}

.logger {
  user-select: none;
  position: fixed;

  background-color: white;
  border: 1px solid grey;
  top: 1rem;
  left: 1rem;
}

h3 {
  padding: 0;
  margin: 0;
}

.section {
  padding: 2px;
  margin: 2px;
  display: flex;
  flex-direction: column;
}

span {
  margin-right: 0.1rem;
}
</style>

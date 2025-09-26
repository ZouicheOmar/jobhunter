<script setup lang="ts">
import { useStore } from '@/store';
import { onMounted, defineProps } from 'vue';

const props = defineProps(['candid'])
const store = useStore();
const { handleDelete } = store;


</script>

<template>
  <div class="unit">
    <div class="left">
      <p> position : {{ props.candid.title }}</p>
      <p> company : {{ props.candid.company || 'not specified' }}</p>
      <p> city : {{ props.candid.cityDto.name }}</p>
      <p> applied on : {{ props.candid.websiteDto.name }}</p>
      <p> offer url : {{ props.candid.url || 'not specified' }}</p>
      <p> stack :
        <span v-for="(tech, index) in props.candid.stack" :key="index"> {{ tech.name + ' ' }} </span>
      </p>
    </div>
    <div class="right unit-controls">
      <p class="head-date"> id: {{ props.candid.id || 'non specified ' }} </p>
      <p class="head-date"> {{ props.candid.addDate || 'no date specified' }} </p>
      <button @click="handleDelete(props.candid.id)"> delete </button>
    </div>
  </div>
</template>

<style>
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

p {
  /* overflow-wrap: break-word; */
}

.left {
  max-width: 80%;
  text-wrap: wrap;
  /* overflow-wrap: break-word; */
  overflow: hidden;
}

.unit-controls {
  display: flex;
  flex-direction: column;
  align-items: end;
}

.head-details {
  display: flex;
  gap: 0.5rem;
}
</style>

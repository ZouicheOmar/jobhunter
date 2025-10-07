<script setup lang="ts">
import { useStore } from '@/store';
import { defineProps } from 'vue';

const props = defineProps(['candid'])
const store = useStore();
const { handleDelete } = store;


</script>

<template>
  <div class="unit">
    <div class="left">
      <p>
        <span>
          position :
        </span>
        {{ props.candid.title || 'not specified' }}
      </p>
      <p>
        <span>
          company :
        </span>
        {{ props.candid.company || 'not specified' }}
      </p>
      <p>
        <span>
          city :
        </span>
        {{ props.candid.cityDto.name }}
      </p>
      <p>
        <span>
          applied on :
        </span>
        {{ props.candid.websiteDto.name }}
      </p>
      <p>
        <span> offer url : </span> {{ props.candid.url || 'not specified' }}
      </p>
      <p>
        <span>
          stack :
        </span>
      <ul>
        <li v-for="(tech, index) in props.candid.stack" :key="index">
          {{ tech.name + ' ' }}
        </li>
      </ul>
      </p>
    </div>
    <div class="right unit-controls">
      <p class="head-date"> id: {{ props.candid.id || 'non specified ' }} </p>
      <p class="head-date"> {{ props.candid.addDate || 'no date specified' }} </p>
      <button @click="handleDelete(props.candid.id)"> delete </button>
    </div>
  </div>
</template>

<style scoped>
p>span {
  color: rgba(0, 0, 0, 0.5);
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

li {
  padding: 0;
}

ul {
  margin: 0;
  padding-left: 1.3rem;
  list-style-type: disc;
}
</style>

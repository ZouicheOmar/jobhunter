<script setup lang="ts">
import LookupUrl from './LookupUrl.vue';
import StackInput from './StackInput.vue';
import ContractType from './ContractType.vue';
import AddCandidControls from './AddCandidControls.vue';
import City from './City.vue';

import { useAddCandidStore } from '@/addCandidStore';
import { storeToRefs } from 'pinia';
const addCandidStore = useAddCandidStore();

const { position, title, company } = storeToRefs(addCandidStore);

</script>

<template>
  <div class="add-candid unit ">
    <div class="section">
      <label> company : </label>
      <input type="text" name="" v-model="company" />
    </div>
    <div class="section">
      <label> title : </label>
      <input type="text" v-model="title" />
    </div>
    <div class="section">
      <label> position : </label>
      <input type="text" v-model="position" />
    </div>
    <City />
    <StackInput />
    <ContractType />
    <LookupUrl />
    <AddCandidControls />
  </div>
</template>

<style>
.add-candid {
  font-size: 80%;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 0.4rem;
}

label {
  padding: 2px 1px;
}

input {
  padding: 2px;
  font-size: 100%;
}

.section {
  display: flex;
  align-items: baseline;

  input {
    margin-left: 4px;
    border: 1px dotted black;
  }

  select {
    margin-left: 4px;
    border: 1px dotted black;
  }
}
</style>

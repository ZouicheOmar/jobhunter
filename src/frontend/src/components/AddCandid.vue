<script setup lang="ts">
import LookupUrl from './LookupUrl.vue';

import { useAddCandidStore } from '@/addCandidStore';
import { storeToRefs } from 'pinia';
const addCandidStore = useAddCandidStore();

const { cities, techs, contractTypes, url, title, company, city, stack, contract } = storeToRefs(addCandidStore);

</script>

<template>
  <div class="add-candid unit ">
    <div class="section">
      <label> company : </label>
      <input placeholder="company" type="text" name="" v-model="company" />
    </div>
    <div class="section">
      <label> title / position : </label>
      <input type="text" placeholder="title of the offer" v-model="title" />
    </div>
    <div class="section">
      <label> city : </label>
      <input list="cities" placeholder="location" type="text" name="" v-model="city" />
      <datalist id="cities">
        <option v-for="city in cities" :value="city.name"></option>
      </datalist>
    </div>
    <div class="section">
      <label> stack : </label>
      <input list="techlist" placeholder="stack" type="text" name="" v-model="stack" />
      <datalist id="techlist">
        <option v-for="tech in techs" :value="tech.name"></option>
      </datalist>
    </div>
    <div class="section">
      <label> contract type : </label>
      <input list="contractsList" placeholder="contract type" type="text" name="" v-model="contract" />
      <datalist id="contractsList">
        <option v-for="c in contractTypes" :value="c"></option>
      </datalist>
    </div>

    <LookupUrl />

    <!-- <div class="section"> -->
    <!--   <label> url : </label> -->
    <!--   <input type="text" placeholder="url" name="url" v-model="url" /> -->
    <!--   <button> look up </button> -->
    <!-- </div> -->
    <div class="section">
      <button> submit </button>
      <button> reset </button>
    </div>
  </div>
</template>

<style scoped>
.add-candid {
  font-size: 80%;
  flex-wrap: wrap;
  /* display: flex; */
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

button {
  font-size: 95%;
}

.section {
  display: flex;
  align-items: baseline;

  input {
    margin-left: 4px;
  }
}
</style>

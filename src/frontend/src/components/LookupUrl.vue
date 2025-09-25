<script setup lang="ts">
import { useAddCandidStore } from '@/addCandidStore';
import { storeToRefs } from 'pinia';
const addCandidStore = useAddCandidStore();


/*
https://cgi.njoyn.com/corp/xweb/XWeb.asp?page=jobdetails&clid=21001&JobID=J0125-0411&BRID=1199099&sbdid=936&lang=2&xpse=SoDM6_I3t7QRTHgMB70LbzkdCdPP&xfps=99568702-dc4a-43f3-b8fc-763ac0bc0575
*/
const { url, loading } = storeToRefs(addCandidStore);
const { lookupUrl } = addCandidStore;
/**
 *
 {
    "city": "Paris",
    "company_desc": "CGI",
    "contract": "CDD",
    "main_tasks": [
        "Maîtrise des langages Java et JavaScript (Angular).",
        "Expérience avec les frameworks et outils associés (Spring, Hibernate, etc.).",
        "Bonne connaissance des bases de données (Oracle, SQL, PostgreSQL).",
        "Familiarité avec les outils de gestion de version (Git) et de CI/CD.",
        "Expérience avérée dans un environnement Agile (SCRUM) et capacité à s’adapter à un nouveau mode de fonctionnement."
    ],
    "position": "FULLSTACK",
    "startDate": "Sun, 01 Dec 2024 00:00:00 GMT",
    "tech_stack": [
        "Java",
        "Angular",
        "JavaScript",
        "CSS",
        "Full Stack Development"
    ],
    "title": "Développeur(euse) Full Stack Java/Angular F/H",
    "website": "https://www.cgi.com/fr-fr/careers/"
}
 */

</script>

<template>
  <div class="section">
    <label> url : </label>
    <input type="text" placeholder="url" name="url" v-model="url" />
    <button @click="lookupUrl"> look up </button>
    <p v-if="loading"> LOADING </p>
  </div>
</template>


<style scoped>
.section {
  display: flex;
  align-items: baseline;

  input {
    margin-left: 4px;
  }
}
</style>

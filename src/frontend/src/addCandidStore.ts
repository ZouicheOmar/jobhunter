import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useAddCandidStore = defineStore('addCandid', () => {
  const loading = ref(false)

  const show = ref(false)
  const cities = ref([]);
  const techs = ref([]);
  const contractTypes = ref([]);

  const url = ref("");
  const title = ref("");
  const company = ref("");
  const city = ref("");
  const stack = ref("");
  const contract = ref("");

  async function lookupUrl() {
    console.log("exec lookup url");
    loading.value = true;
    const scapperurl = "http://localhost:5000/handle_scrap_url/"

    const req = await fetch(scapperurl,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: url.value
        })
      });

    loading.value = false;
    if (!req.ok) return console.log("problem handlin request");
    const json = await req.json();
    console.log("JSON", json);
  }

  async function getCities() {
    const url = 'http://localhost:8080/city'
    const req = await fetch(url);
    if (!req.ok) console.log("N'A PAS PÛ DÉFINIR LES VILLES")
    const json = await req.json();
    // console.log("cities", json);
    cities.value = json;
  }

  async function getTechs() {
    const url = 'http://localhost:8080/tech'
    const req = await fetch(url);
    if (!req.ok) console.log("N'A PAS PÛ DÉFINIR LES TECHS")
    const json = await req.json();
    // console.log("techs", json);
    techs.value = json;
  }

  async function getContractTypes() {
    const url = 'http://localhost:8080/contract'
    const req = await fetch(url);
    if (!req.ok) console.log("N'A PAS PÛ DÉFINIR LES TYPES DE CONTRAT")
    const json = await req.json();
    // console.log("contract", json);
    contractTypes.value = json;
  }

  async function getAllExtraData() {
    await getCities();
    await getTechs();
    await getContractTypes();
  }

  watch(show, () => {
    if (show.value) getAllExtraData()
    else $reset();
  })

  function $reset() {
    url.value = "";
    title.value = "";
    company.value = "";
    city.value = "";
    stack.value = "";
    contract.value = "";
  }

  // watch([url, title, company, city, stack], () => {
  //   console.log([url.value, title.value, company.value, city.value, stack.value])
  // })

  function toggleShow() { show.value = !show.value; }

  return { cities, techs, contractTypes, show, url, title, contract, company, city, stack, loading, toggleShow, lookupUrl }
},
  { persist: true }
)

import { ref, computed, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useStore } from './store';

const defaultContractTypes = ["CDI", "CDD", "ALTERNANCE", "STAGE"];

export const useAddCandidStore = defineStore('addCandid', () => {
  const store = useStore();
  const { candids } = storeToRefs(store);

  const show = ref(false)

  const loading = ref(false)
  const error = ref(false)

  const cities = ref([]);
  const techs = ref([]);
  const contractTypes = ref(defaultContractTypes);

  const url = ref("");
  const title = ref("");
  const position = ref("");
  const company = ref("");
  const city = ref("");
  const tech = ref(""); // todo: tech goes to v-model
  const stack = ref([]);
  const contract = ref("");
  const website = ref("");


  async function lookupUrl() {
    loading.value = true;
    const scapperurl = "http://localhost:5000/handle_scrap_url/"

    const req = await fetch(scapperurl,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: url.value
        })
      }
    );

    loading.value = false;
    if (!req.ok) {
      error.value = false
      return;
    }

    const data = await req.json();

    const { city: dataCity,
      company_desc,
      company: dataCompany,
      contract: dataContract,
      position: dataPosition,
      startDate: dataStartDate,
      tech_stack,
      title: dataTitle,
      website: dataWebsite } = data;

    title.value = dataTitle;
    city.value = dataCity;
    website.value = dataWebsite;
    company.value = dataCompany;
    if (tech_stack.length) {
      tech_stack.forEach((item: String) => {
        stack.value.push(item.toLowerCase());
      })
    }
    contract.value = dataContract
    position.value = dataPosition;
  }

  async function postCandid() {
    const date = new Date();
    const candid = {
      title: title.value.toLowerCase(),
      cityDto: {
        name: city.value.toLowerCase(),
      },
      websiteDto: {
        name: website.value.toLocaleLowerCase()
      },
      url: url.value,
      company: company.value,
      stack: stack.value.map((item) => ({ name: item })),
      unsolicited: true,
      answer: false,
      addDate: date.toISOString(),
    }
    console.log(candid);

    const posturl = "http://localhost:8080/candid";
    const req = await fetch(posturl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(candid)

    })

    if (!req.ok) return console.log("probleme posting candid");
    const json = await req.json();
    candids.value.push(json);

    $reset()
  }

  async function getCities() {
    const url = 'http://localhost:8080/city'
    const req = await fetch(url);
    if (!req.ok) console.log("N'A PAS PÛ DÉFINIR LES VILLES")
    const json = await req.json();
    cities.value = json;
  }

  async function getTechs() {
    const url = 'http://localhost:8080/tech'
    const req = await fetch(url);
    if (!req.ok) console.log("N'A PAS PÛ DÉFINIR LES TECHS")
    const json = await req.json();
    techs.value = json;
  }

  async function getContractTypes() {
    const url = 'http://localhost:8080/contract'
    const req = await fetch(url);
    if (!req.ok) console.log("N'A PAS PÛ DÉFINIR LES TYPES DE CONTRAT")
    const json = await req.json();
    contractTypes.value = json;
  }

  async function getAllExtraData() {
    await getCities();
    await getTechs();
    // await getContractTypes();
  }

  watch(show, () => {
    if (show.value) getAllExtraData()
    else $reset();
  })

  function $reset() {
    url.value = "";
    title.value = "";
    company.value = "";
    position.value = "";
    city.value = "";
    stack.value = [];
    contract.value = "";
  }

  // watch([url, title, company, city, stack], () => {
  //   console.log([url.value, title.value, company.value, city.value, stack.value])
  // })

  // watch([contract], () => {
  //   console.log(contract.value)
  // })

  function toggleShow() { show.value = !show.value; }

  return { cities, techs, tech, contractTypes, show, url, title, position, contract, company, city, stack, loading, error, toggleShow, lookupUrl, postCandid, $reset }
},
  { persist: false }
)

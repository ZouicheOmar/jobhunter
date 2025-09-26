import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

const defaultContractTypes = ["CDI", "CDD", "ALTERNANCE", "STAGE"];

export const useAddCandidStore = defineStore('addCandid', () => {
  const show = ref(true)

  const loading = ref(false)
  const error = ref(false)

  const cities = ref([]);
  const techs = ref([]);
  // const contractTypes = ref([]);
  const contractTypes = ref(defaultContractTypes);

  const capgeminiurl = "https://www.capgemini.com/fr-fr/jobs/206178-fr_FR+sap_btp/";
  const url = ref("https://cgi.njoyn.com/corp/xweb/XWeb.asp?page=jobdetails&clid=21001&JobID=J0125-0411&BRID=1199099&sbdid=936&lang=2&xpse=SoDM6_I3t7QRTHgMB70LbzkdCdPP&xfps=99568702-dc4a-43f3-b8fc-763ac0bc0575");
  const title = ref("");
  const position = ref("");
  const company = ref("");
  const city = ref("");
  const tech = ref(""); // TODO: tech goes to v-model
  const stack = ref([]);
  const contract = ref("");
  const website = ref("");

  // const title = ref("développeur fullstack");
  // const position = ref("fullstack");
  // const company = ref("cgi");
  // const city = ref("berlin");
  // const stack = ref(["javascript", "vue", "python"]);
  // const contract = ref("CDI");
  // const website = ref("cgi");


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
      }
    );

    loading.value = false;
    if (!req.ok) {
      error.value = false
      return;
    }

    // const json = await req.json();
    // const data = JSON.parse(json);

    const data = await req.json();
    console.log(data);

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
    console.log("apparently posted successffully", json)
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
    console.log("techs", json);
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

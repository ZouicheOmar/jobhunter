import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
  const candids = ref([]);

  const cities = ref([]);
  const techs = ref([]);
  const contractTypes = ref([]);
  const candidsToDisplay = ref([]);

  const cityFilter = ref("");
  const techFilter = ref("");

  const loading = ref(true);
  const error = ref(false);

  async function getFilters() {
    const [reqCitis, reqContracts, reqTechs] = await Promise.all(
      [
        fetch('http://localhost:8080/city'),
        fetch('http://localhost:8080/contract'),
        fetch('http://localhost:8080/tech'),
      ]
    )
    const [jsonCities, jsonContracts, jsonTechs] = await Promise.all(
      [reqCitis.json(), reqContracts.json(), reqTechs.json()]);

    cities.value = jsonCities.map((item) => item.name);
    techs.value = jsonTechs.map((item) => item.name);
    contractTypes.value = jsonContracts;

    // console.log([jsonCities, jsonContracts, jsonTechs])
  }

  const total = computed(() => candids.value.length);

  async function getAllCandids() {
    const url = "http://localhost:8080/candid";
    const req = await fetch(url);
    loading.value = false;
    if (!req.ok) error.value = true;
    const json = await req.json();
    candids.value = json;
    candidsToDisplay.value = json;
    // console.log(json);
  }

  async function handleDelete(id) {
    const url = "http://localhost:8080/candid/" + id;
    const req = await fetch(url, {
      method: "DELETE"
    });
    if (!req.ok) return console.log("problem deleting candid");

    console.log("deleted successfully");
    let index = 0;
    candids.value.forEach((candid, i) => {
      if (candid.id == id) {
        index = i;
        return;
      }
    })
    candids.value.splice(index, 1);
  }

  async function handleFile() {
    const url = "http://localhost:8080/candid/handleFile";
    const req = await fetch(url);
    if (!req.ok) return console.log("problem handling file");
    const text = await req.text();
    console.log(text);

    getAllCandids();
  }


  watch([techFilter, cityFilter], () => {
    const r = candids.value;
    if (techFilter.value == "" && cityFilter.value == "")
      return candidsToDisplay.value = candids.value;
    if (techFilter.value != "" && cityFilter.value != "")
      return candidsToDisplay.value = r.filter((candid) => candid.cityDto.name == cityFilter.value && candid.stack.find((el) => el.name == techFilter.value))
    else
      return candidsToDisplay.value = r.filter((candid) => candid.cityDto.name == cityFilter.value || candid.stack.find((el) => el.name == techFilter.value))
  })

  return {
    candids, total, cities, techs, contractTypes,
    cityFilter, techFilter, candidsToDisplay,
    getAllCandids, handleDelete, getFilters, handleFile
  }
},
  { persist: false }
)

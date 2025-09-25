import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
  const candids = ref([]);

  const loading = ref(true);
  const error = ref(false);

  const total = computed(() => candids.value.length);

  async function getAllCandids() {
    const url = "http://localhost:8080/candid";
    const req = await fetch(url);
    loading.value = false;
    if (!req.ok) error.value = true;
    const json = await req.json();
    // console.log(json)
    candids.value = json;
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

  return { candids, total, getAllCandids, handleDelete }
},
  { persist: true }
)

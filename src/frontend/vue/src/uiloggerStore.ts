
import { ref, onMounted, computed, useTemplateRef } from 'vue'
import { defineStore } from 'pinia'

export const useUILoggerStore = defineStore('uilogger', () => {
  const dragging = ref(false)
  const loggerRef = useTemplateRef("loggerRef")
  const x = ref("");
  const y = ref("");

  const offsetLeft = ref("");
  const offsetTop = ref("");

  function handleSummaryClick(e) {
    e.stopPropagation()
  }

  function handleMouseDown(e) {
    dragging.value = true;
    offsetLeft.value = e.pageX - loggerRef.value.offsetLeft;
    offsetTop.value = e.pageY - loggerRef.value.offsetTop;
  }

  function handleMouseUp() {
    dragging.value = false;
  }

  function handleMove(e: MouseEvent) {
    if (!dragging.value) return;

    x.value = e.pageX - offsetLeft.value + "px";
    y.value = e.pageY - offsetTop.value + "px";

    loggerRef.value.style.left = x.value;
    loggerRef.value.style.top = y.value;
  }

  onMounted(() => {
    loggerRef.value.style.top = y.value;
    loggerRef.value.style.left = x.value;
  })

  return { dragging, loggerRef, x, y, handleMouseDown, handleMouseUp, handleMove, handleSummaryClick }
},
  { persist: true }
)

'use client'
import type { MainState, createMainStore, initMainStore } from "@/back/mainStore";
import { type ReactNode, useContext, useRef, createContext } from "react"
import { useStore } from "zustand"


export type MainStoreApi = ReturnType<typeof createMainStore>
export const MainStoreContext = createContext<MainStoreApi | undefined>(
  undefined,
);

export const MainStoreProvider = ({ children }: { children: ReactNode }) => {
  const mainStoreRef = useRef<MainStoreApi | null>(null);

  if (mainStoreRef.current === null)
    mainStoreRef.current = createMainStore(initMainStore())

  return (
    <MainStoreContext.Provider value={mainStoreRef.value}>
      {children}
    </MainStoreContext.Provider>
  )
}

export const useMainStore = <T,>(
  selector: (store: MainStore) => T,
): T => {
  const mainStoreContext = useContext(MainStoreContext);
  if (!mainStoreContext)
    throw new Error("useStore must be used withing StoreProvider");
  return useStore(mainStoreContext, selector)
}

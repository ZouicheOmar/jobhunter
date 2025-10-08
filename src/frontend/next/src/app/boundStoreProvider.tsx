'use client'


import { BoundStore, createBoundStore } from "@/stores/boundStore";
import { type ReactNode, useContext, useRef } from "react"
import { createContext } from "vm";
import { useStore } from "zustand"


export type BoundStoreApi = ReturnType<typeof createBoundStore>
export const BoundStoreContext = createContext<BoundStoreApi | undefined>(undefined);

export const BoundStoreProvider = ({ children }: { children: ReactNode }) => {
  const boundStoreRef = useRef<BoundStoreApi | null>(null);
  if (boundStoreRef.current === null)
    boundStoreRef.current = createBoundStore()

  return (
    <BoundStoreContext.Provider value={boundStoreRef.value}>
      {children}
    </BoundStoreContext.Provider>
  )
}

export const useBoundStore = <T,>(
  selector: (store: BoundStore) => T,
): T => {
  const boundStoreContext = useContext(BoundStoreContext);
  if (!boundStoreContext) {
    throw new Error("useStore must be used withing StoreProvider");
  }
  return useStore(boundStoreContext, selector)
}

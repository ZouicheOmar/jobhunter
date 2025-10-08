'use client'

import { Provider } from "react-redux"
import { makeStore, AppStore } from "@/lib/store"
import { useRef } from "react"
import { fetchAllCandids } from "@/lib/features/candids/candidsSlice"

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(fetchAllCandids())
  }

  return <Provider store={storeRef.current} > {children} </Provider>

}

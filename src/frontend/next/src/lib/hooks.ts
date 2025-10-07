import { useDispatch, useSelector, useStore } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppStore = useStore.withTypes<RootState>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

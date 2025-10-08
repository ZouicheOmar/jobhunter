import { Candid } from "@/types/CandidType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type CandidSliceType = {
  list: Candid[];
  loading: Boolean;
  error: Boolean
}

const initialState: CandidSliceType = {
  list: [],
  loading: true,
  error: false
}

const candidsSlice = createSlice({
  name: "candids",
  initialState,
  reducers: {
    add: state => {
      state.list.push({
        id: state.list.length + 1, position: "software developper", city: "paris"
      })
    },
    del: (state, action) => {
      state.list.splice(state.list.findIndex((candid: Candid) => candid.id === action.payload.id), 1)
    },
    toNewest: state => {
      state.list = state.list.reverse()
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllCandids.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAllCandids.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllCandids.rejected, state => {
        state.loading = false;
        state.error = true;
      })
  },
})


export const fetchAllCandids = createAsyncThunk(
  "candids/fetchAllCandids",
  async () => {

    console.count("fetch");
    const req = await fetch("http://localhost:8080/candid")
    if (!req.ok)
      return new Error("problem fetching candidatures");
    const json = await req.json();
    return json.reverse();
  },
)

export const { add, del, toNewest } = candidsSlice.actions;
export default candidsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import loadData from "../loadData";

const initialState = {
  supermarket_P: [],
  isLoading: false,
  error: null,
};

export const loadSupermarket_P = createAsyncThunk(
  "supermarket_P/loadSupermarket_P",
  (thunkAPI) => loadData(thunkAPI, "api/products/w/home/super-market")
);

export const supermarket_PSlice = createSlice({
  name: "supermarket_P",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadSupermarket_P.pending, (state, action) => {
        state.supermarket_P = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadSupermarket_P.fulfilled, (state, { payload }) => {
        if (payload) {
          if (payload.status === 0) {
            state.supermarket_P = null;
            state.isLoading = false;
            state.error = payload.message;
            return;
          }
          let data = payload.data.map((obj, i) => {
            return {
              id: obj.id,
              shopId: obj.shop?.id,

              color: obj.hex,
              name: obj.name,
              image: obj.photoUrl,
              price: obj.price,
              percent: obj.percent,
            };
          });
          state.supermarket_P = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadSupermarket_P.rejected, (state, action) => {
        state.isLoading = false;
        state.supermarket_P = null;
        state.error = action.payload;
      });
  },
});

export const getSupermarket_P = (state) => state.supermarket_P;

export default supermarket_PSlice.reducer;

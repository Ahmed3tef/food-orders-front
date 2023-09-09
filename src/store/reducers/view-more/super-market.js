import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDataWithParams } from "../loadData";

const initialState = {
  supermarket: [],
  isLoading: false,
  error: null,
};

// params:{page: number}, id from route.

export const loadSupermarket = createAsyncThunk(
  "supermarket/loadSupermarket",
  (params, thunkAPI) =>
    getDataWithParams(thunkAPI, `api/products/w/more/super-market`, params)
);

export const supermarketSlice = createSlice({
  name: "supermarket",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadSupermarket.pending, (state, action) => {
        state.supermarket = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadSupermarket.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.status === 0) {
            state.supermarket = [];
            state.isLoading = false;
            state.error = payload.message;
            return;
          }

          const { totalCount, perPageCount, products } = payload.data;
          const mappedProducts = products.map((obj) => {
            const {
              id,
              name,
              tags,
              photoUrl: image,
              price,
              percent,
              shop,
            } = obj;
            return {
              id,
              name,
              tags,
              image,
              price,
              percent,
              shop,
            };
          });
          const data = {
            totalCount,
            perPageCount,
            products: mappedProducts,
          };

          state.supermarket = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadSupermarket.rejected, (state, action) => {
        state.isLoading = false;
        state.supermarket = null;
        state.error = action.payload;
      });
  },
});

export const getSupermarket = (state) => state.supermarket;

export default supermarketSlice.reducer;

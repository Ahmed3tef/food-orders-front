import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getDataWithParams } from "./loadData";

const initialState = {
  flashSaleData: null,
  isLoading: false,
  error: null,
};

export const loadFlashSale = createAsyncThunk(
  "flashSale/loadFlashSale",
  (data, thunkAPI) =>
    getDataWithParams(thunkAPI, `api/flash-sale/w/more/${data.id}`, {
      page: data.page,
    })
);

export const flashSaleSlice = createSlice({
  name: "flashSale",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadFlashSale.pending, (state, action) => {
        state.flashSaleData = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadFlashSale.fulfilled, (state, { payload }) => {
        if (payload) {
          if (payload.status === 0) {
            state.flashSaleData = null;
            state.isLoading = false;

            state.error = payload.message;
            return;
          }
          let data = payload.data.map((obj, i) => {
            const { id, expiresAt, totalCount, perPageCount, products } = obj;
            const prods = products.map((p) => {
              const {
                shop,
                id,
                photoUrl: image,
                name,
                price,
                stock,
                remaining,
              } = p;
              return {
                id,
                shop,
                image,
                name,
                price,
                stock,
                remaining,
              };
            });
            return {
              id,
              expiresAt,
              totalCount,
              perPageCount,
              products: prods,
            };
          });

          state.flashSaleData = data[0];

          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadFlashSale.rejected, (state, action) => {
        state.isLoading = false;

        state.flashSaleData = null;
        state.error = action.payload;
      });
  },
});

export const getFlashSaleData = (state) => state.flashSaleData;

export default flashSaleSlice.reducer;

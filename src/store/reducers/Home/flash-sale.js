import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import loadData from "../loadData";

const initialState = {
  flashSale_P: [],
  isLoading: false,
  error: null,
  flashSaleExpiresAt: null,
  flashSaleId: null,
};

export const loadFlashSale_P = createAsyncThunk(
  "flashSaleHome/loadFlashSale_P",
  (thunkAPI) => loadData(thunkAPI, "api/flash-sale/w/home/limit")
);

export const flashSale_PSlice = createSlice({
  name: "flashSaleHome",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadFlashSale_P.pending, (state, action) => {
        state.flashSale_P = [];
        state.isLoading = true;
        state.error = null;
        state.flashSaleId = null;

        state.flashSaleExpiresAt = null;
      })
      .addCase(loadFlashSale_P.fulfilled, (state, { payload }) => {
        if (payload) {
          if (payload.status === 0) {
            state.flashSale_P = [];
            state.isLoading = false;
            state.flashSaleExpiresAt = null;
            state.flashSaleId = null;

            state.error = payload.message;
            return;
          }
          let data;
          if (payload.data && payload.data[0]) {
            data = payload.data[0].products.map((obj, i) => {
              return {
                id: obj.id,
                shop: obj.shop,
                color: obj.hex,
                name: obj.name,
                image: obj.photoUrl,
                price: obj.price,
                percent: obj.percent ? obj.percent : "",
                tags: obj.tags,
                stock: obj.stock,
                remaining: obj.remaining,
              };
            });
          }

          state.flashSale_P = data;

          state.flashSaleExpiresAt =
            payload.data && payload.data[0] && payload.data[0].expiresAt
              ? payload.data[0].expiresAt
              : null;

          state.flashSaleId =
            payload.data && payload.data[0] && payload.data[0].id
              ? payload.data[0].id
              : null;

          state.isLoading = false;

          state.error = null;
        }
      })
      .addCase(loadFlashSale_P.rejected, (state, action) => {
        state.isLoading = false;
        state.flashSaleExpiresAt = null;
        state.flashSaleId = null;
        state.flashSale_P = null;
        state.error = action.payload;
      });
  },
});

export const getFlashSale_P = (state) => state.flashSale_P;

export default flashSale_PSlice.reducer;

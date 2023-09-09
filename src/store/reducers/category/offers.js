import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loadData from "../loadData";

const initialState = {
  catShopsWithOffers: [],
  isLoading: false,
  error: null,
};

export const loadCatShopsWithOffers = createAsyncThunk(
  "catShopsWithOffers/loadCatShopsWithOffers",
  (id, thunkAPI) => loadData(thunkAPI, `api/shops/w/category/${id}/offers`)
);

export const catShopsWithOffersSlice = createSlice({
  name: "catShopsWithOffers",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadCatShopsWithOffers.pending, (state, action) => {
        state.catShopsWithOffers = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadCatShopsWithOffers.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.status === 0) {
            state.catShopsWithOffers = [];
            state.isLoading = false;
            state.error = payload.message;
            return;
          }
          let data = payload.data.map((obj, i) => {
            const {
              shop: { id, name, hex: color, photoUrl: image },
              maxPercent,
            } = obj;
            return {
              id,
              name,
              color,
              image,
              maxPercent,
            };
          });

          state.catShopsWithOffers = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadCatShopsWithOffers.rejected, (state, action) => {
        state.isLoading = false;
        state.catShopsWithOffers = null;
        state.error = action.payload;
      });
  },
});

export const getCatShopsWithOffers = (state) => state.catShopsWithOffers;

export default catShopsWithOffersSlice.reducer;

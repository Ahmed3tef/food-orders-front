import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDataWithParams } from "../loadData";

const initialState = {
  catPopularShops: [],
  isLoading: false,
  error: null,
};

export const loadCatPopularShops = createAsyncThunk(
  "catPopularShops/loadCatPopularShops",
  (data, thunkAPI) =>
    getDataWithParams(thunkAPI, `api/shops/w/category/${data.id}/popular`, {
      lat: data.lat,
      long: data.long,
    })
);

export const catPopularShopsSlice = createSlice({
  name: "catPopularShops",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadCatPopularShops.pending, (state, action) => {
        state.catPopularShops = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadCatPopularShops.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.status === 0) {
            state.catPopularShops = [];
            state.isLoading = false;
            state.error = payload.message;
            return;
          }
          let data = payload.data.map((obj, i) => {
            const {
              id,
              name,
              hex: color,
              photoUrl: image,
              stats,
              description,
            } = obj;
            return {
              id,
              name,
              description,
              color,
              image,
              stats,
              average: stats.average || 0.0,
              reviews: stats.reviews || 0,
            };
          });

          state.catPopularShops = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadCatPopularShops.rejected, (state, action) => {
        state.isLoading = false;
        state.catPopularShops = null;
        state.error = action.payload;
      });
  },
});

export const getCatPopularShops = (state) => state.catPopularShops;

export default catPopularShopsSlice.reducer;

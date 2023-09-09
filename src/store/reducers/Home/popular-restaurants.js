import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import loadData from "../loadData";

const initialState = {
  restaurantsPopular: [],
  isLoading: false,
  error: null,
};

export const loadRestaurantsPopular = createAsyncThunk(
  "restaurantsPopular/loadRestaurantsPopular",
  (thunkAPI) => loadData(thunkAPI, "api/shops/w/home/popular/restaurants")
);

export const restaurantsPopularSlice = createSlice({
  name: "restaurantsPopular",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadRestaurantsPopular.pending, (state, action) => {
        state.restaurantsPopular = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadRestaurantsPopular.fulfilled, (state, { payload }) => {
        if (payload) {
          if (payload.status === 0) {
            state.restaurantsPopular = null;
            state.isLoading = false;
            state.error = payload.message;
            return;
          }
          let data = payload.data.map((obj, i) => {
            return {
              id: obj.id,
              name: obj.name,
              color: obj.hex,
              image: obj.photoUrl,
              description: obj.description,
              stats: obj.stats,

              average: obj.stats?.average,
              reviews: obj.stats?.reviews,
            };
          });
          state.restaurantsPopular = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadRestaurantsPopular.rejected, (state, action) => {
        state.isLoading = false;
        state.restaurantsPopular = null;
        state.error = action.payload;
      });
  },
});

export const getRestaurantsPopular = (state) => state.restaurantsPopular;

export default restaurantsPopularSlice.reducer;

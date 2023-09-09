import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import loadData from "../loadData";

const initialState = {
  restaurants: [],
  isLoading: false,
  error: null,
};

export const loadRestaurants = createAsyncThunk(
  "restaurants/loadRestaurants",
  (thunkAPI) => loadData(thunkAPI, "api/products/w/home/restaurants")
);

export const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadRestaurants.pending, (state, action) => {
        state.restaurants = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadRestaurants.fulfilled, (state, { payload }) => {
        if (payload) {
          if (payload.status === 0) {
            state.restaurants = null;
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
          state.restaurants = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadRestaurants.rejected, (state, action) => {
        state.isLoading = false;
        state.restaurants = null;
        state.error = action.payload;
      });
  },
});

export const getRestaurants = (state) => state.restaurants;

export default restaurantsSlice.reducer;

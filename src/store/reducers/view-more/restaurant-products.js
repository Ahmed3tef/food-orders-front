import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDataWithParams } from "../loadData";

const initialState = {
  restaurant_P: [],
  isLoading: false,
  error: null,
};

// params:{page: number}, id from route.

export const loadRestaurant_P = createAsyncThunk(
  "restaurant_P/loadRestaurant_P",
  (params, thunkAPI) =>
    getDataWithParams(thunkAPI, `api/products/w/more/restaurants`, params)
);

export const restaurant_PSlice = createSlice({
  name: "restaurant_P",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadRestaurant_P.pending, (state, action) => {
        state.restaurant_P = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadRestaurant_P.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.status === 0) {
            state.restaurant_P = [];
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

          state.restaurant_P = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadRestaurant_P.rejected, (state, action) => {
        state.isLoading = false;
        state.restaurant_P = null;
        state.error = action.payload;
      });
  },
});

export const getRestaurant_P = (state) => state.restaurant_P;

export default restaurant_PSlice.reducer;

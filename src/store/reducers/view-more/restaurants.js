import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDataWithParams } from "../loadData";

const initialState = {
  restaurantsPopular: [],
  isLoading: false,
  error: null,
};

// params:{page: number}, id from route.

export const loadRestaurantsPopular = createAsyncThunk(
  "restaurantsMorePopular/loadRestaurantsOffers",
  (params, thunkAPI) =>
    getDataWithParams(thunkAPI, `api/shops/w/more/popular/restaurants`, params)
);

export const restaurantsMorePopularSlice = createSlice({
  name: "restaurantsMorePopular",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadRestaurantsPopular.pending, (state, action) => {
        state.restaurantsPopular = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadRestaurantsPopular.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.status === 0) {
            state.restaurantsPopular = [];
            state.isLoading = false;
            state.error = payload.message;
            return;
          }

          const { totalCount, perPageCount, shops } = payload.data;
          const mappedShops = shops?.map((obj) => {
            const {
              id,
              name,
              photoUrl: image,
              hex: color,
              description,
              stats,
            } = obj;
            const { average, reviews, orders } = stats;
            return {
              id,
              name,
              image,
              color,
              description,
              average,
              reviews,
              ordersCount: orders,
              stats,
            };
          });
          const data = {
            totalCount,
            perPageCount,
            shops: mappedShops,
          };

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

export default restaurantsMorePopularSlice.reducer;

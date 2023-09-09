import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loadData from "../loadData";

const initialState = {
  shopMostSelling: [],
  isLoading: false,
  error: null,
};

// params:{page: number}, id from route.

export const loadShopMostSelling = createAsyncThunk(
  "shopMostSelling/loadShopMostSelling",
  (id, thunkAPI) =>
    loadData(thunkAPI, `api/shops/w/${id}/sections/best-selling`)
);

export const shopMostSellingSlice = createSlice({
  name: "shopMostSelling",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadShopMostSelling.pending, (state, action) => {
        state.shopMostSelling = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadShopMostSelling.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.status === 0) {
            state.shopMostSelling = [];
            state.isLoading = false;
            state.error = payload.message;
            return;
          }
          let data = payload.data.map((obj) => {
            const {
              id,
              name,
              photoUrl: image,
              stats,
              value,
              description,
              variants,
              extras,
            } = obj;
            return {
              id,
              name,
              image,
              description,
              avgReview: (stats && stats.avgReview) || 0,
              ordersCount: (stats && stats.orders) || 0,
              reviewsCount: (stats && stats.reviews) || 0,
              price: (value && value.price) || 0,
              discountPrice: (value && value.discountPrice) || 0,
              variants,
              extras,
            };
          });

          state.shopMostSelling = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadShopMostSelling.rejected, (state, action) => {
        state.isLoading = false;
        state.shopMostSelling = null;
        state.error = action.payload;
      });
  },
});

export const getShopMostSelling = (state) => state.shopMostSelling;

export default shopMostSellingSlice.reducer;

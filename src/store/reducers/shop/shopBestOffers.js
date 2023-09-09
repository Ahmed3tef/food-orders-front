import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loadData from "../loadData";

const initialState = {
  shopBestOffers: [],
  isLoading: false,
  error: null,
};

// params:{page: number}, id from route.

export const loadShopBestOffers = createAsyncThunk(
  "shopBestOffers/loadShopBestOffers",
  (id, thunkAPI) => loadData(thunkAPI, `api/shops/w/${id}/sections/best-offers`)
);

export const shopBestOffersSlice = createSlice({
  name: "shopBestOffers",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadShopBestOffers.pending, (state, action) => {
        state.shopBestOffers = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadShopBestOffers.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.status === 0) {
            state.shopBestOffers = [];
            state.isLoading = false;
            state.error = payload.message;
            return;
          }
          // console.log(payload);
          let data = payload.data.map((obj) => {
            const {
              id,
              name,
              photoUrl: image,
              stats: { avgReview, orders: ordersCount, reviews: reviewsCount },
              value: { price, discountPrice },
              description,
              variants,
              extras,
            } = obj;
            return {
              id,
              name,
              image,
              description,
              avgReview,
              ordersCount,
              reviewsCount,
              price,
              discountPrice,
              variants,
              extras,
            };
          });

          state.shopBestOffers = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadShopBestOffers.rejected, (state, action) => {
        state.isLoading = false;
        state.shopBestOffers = null;
        state.error = action.payload;
      });
  },
});

export const getShopBestOffers = (state) => state.shopBestOffers;

export default shopBestOffersSlice.reducer;

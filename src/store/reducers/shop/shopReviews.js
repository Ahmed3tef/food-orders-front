import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loadData from "../loadData";

const initialState = {
  shopReviews: [],
  isLoading: false,
  error: null,
};

// params:{page: number}, id from route.

export const loadShopReviews = createAsyncThunk(
  "shopReviews/loadShopReviews",
  (id, thunkAPI) => loadData(thunkAPI, `api/shops/w/${id}/reviews`)
);

export const shopReviewsSlice = createSlice({
  name: "shopReviews",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadShopReviews.pending, (state, action) => {
        state.shopReviews = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadShopReviews.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.status === 0) {
            state.shopReviews = [];
            state.isLoading = false;
            state.error = payload.message;
            return;
          }

          const {
            id,
            name,
            logoUrl: logo,
            stats: { avgReview, orders, offers, reviews: reviewsCount },
            reviews,
            stats,
          } = payload.data;

          const data = {
            id,
            name,
            logo,
            reviews, //  {name,rating,text,date}
            reviewsCount,
            stats,
            avgReview,
            orders,
            offers,
          };

          state.shopReviews = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadShopReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.shopReviews = null;
        state.error = action.payload;
      });
  },
});

export const getShopReviews = (state) => state.shopReviews;

export default shopReviewsSlice.reducer;

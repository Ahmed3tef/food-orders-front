import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loadData from "../loadData";

const initialState = {
  shopSectionData: [],
  isLoading: false,
  error: null,
};

// params:{page: number}, id from route.

export const loadShopSectionData = createAsyncThunk(
  "shopSectionData/loadShopSectionData",
  (data, thunkAPI) =>
    loadData(thunkAPI, `api/shops/w/${data.shopId}/sections/${data.sectionId}`)
);

export const shopSectionDataSlice = createSlice({
  name: "shopSectionData",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadShopSectionData.pending, (state, action) => {
        state.shopSectionData = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadShopSectionData.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.status === 0) {
            state.shopSectionData = [];
            state.isLoading = false;
            state.error = payload.message;
            return;
          }
          let data = payload.data.map((obj, i) => {
            const {
              id,
              name,
              photoUrl: image,
              stats: { avgReview, orders: ordersCount, reviews: reviewsCount },
              value: { discountPrice, price },
              description,
              variants,
              extras,
            } = obj;
            return {
              id,
              name,
              description,
              image,
              price,
              discountPrice,
              avgReview,
              ordersCount,
              reviewsCount,
              variants, // {id, name, price, discPrice}
              extras, // {id, name, price}
            };
          });

          state.shopSectionData = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadShopSectionData.rejected, (state, action) => {
        state.isLoading = false;
        state.shopSectionData = null;
        state.error = action.payload;
      });
  },
});

export const getShopSectionData = (state) => state.shopSectionData;

export default shopSectionDataSlice.reducer;

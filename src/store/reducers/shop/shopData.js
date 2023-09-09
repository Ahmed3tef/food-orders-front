import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loadData from "../loadData";

const initialState = {
  shopData: [],
  isLoading: false,
  error: null,
};

// params:{page: number}, id from route.

export const loadShopData = createAsyncThunk(
  "shopData/loadShopData",
  (id, thunkAPI) => loadData(thunkAPI, `api/shops/w/${id}`)
);

export const shopDataSlice = createSlice({
  name: "shopData",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadShopData.pending, (state, action) => {
        state.shopData = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadShopData.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.status === 0) {
            state.shopData = [];
            state.isLoading = false;
            state.error = payload.message;
            return;
          }

          const { id, name, banners, stats, sections, description } =
            payload.data;
          let data = {
            id,
            name,
            sections, // section is an obj with name and id.
            banners, // banner is an img url
            stats,
            average: stats.average || 0.0,
            reviews: stats.reviews || 0,
            orders: stats.orders || 0,
            offers: stats.offers || 0,
            description,
          };

          state.shopData = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadShopData.rejected, (state, action) => {
        state.isLoading = false;
        state.shopData = null;
        state.error = action.payload;
      });
  },
});

export const getShopData = (state) => state.shopData;

export default shopDataSlice.reducer;

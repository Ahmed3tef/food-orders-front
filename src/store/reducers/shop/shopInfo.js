import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loadData from "../loadData";

const initialState = {
  shopInfo: [],
  isLoading: false,
  error: null,
};

// params:{page: number}, id from route.

export const loadShopInfo = createAsyncThunk(
  "shopInfo/loadShopInfo",
  (id, thunkAPI) => loadData(thunkAPI, `api/shops/w/${id}/info`)
);

export const shopInfoSlice = createSlice({
  name: "shopInfo",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadShopInfo.pending, (state) => {
        state.shopInfo = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadShopInfo.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.status === 0) {
            state.shopInfo = [];
            state.isLoading = false;
            state.error = payload.message;
            return;
          }

          const {
            id,
            name,
            minOrderValue,
            description,
            days,
            hours,
            deliveryTime,
            logoUrl: logo,
            haveCredit,
            category,
          } = payload.data;

          const data = {
            id,
            name,
            logo,
            minOrderValue,
            description,
            startDay: days && days.from ? days.from : "Friday",
            endDay: days && days.to ? days.to : "Thursday",
            hours,
            deliveryTime,
            haveCredit,
            days,
            category,
          };

          state.shopInfo = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadShopInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.shopInfo = null;
        state.error = action.payload;
      });
  },
});

export const getShopInfo = (state) => state.shopInfo;

export default shopInfoSlice.reducer;

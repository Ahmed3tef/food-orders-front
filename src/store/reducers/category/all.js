import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDataWithParams } from "../loadData";

const initialState = {
  catAllShops: [],
  perPageCount: null,
  isLoading: false,
  error: null,
};

// params:{page: number}, id from route.

export const loadAllShops = createAsyncThunk(
  "catAllShops/loadAllShops",
  (data, thunkAPI) =>
    getDataWithParams(thunkAPI, `api/shops/w/category/${data.id}`, {
      page: data.page || 1,
    })
);

export const catAllShopsSlice = createSlice({
  name: "catAllShops",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadAllShops.pending, (state, action) => {
        state.catAllShops = [];
        state.isLoading = true;
        state.error = null;
        state.perPageCount = null;
      })
      .addCase(loadAllShops.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.status === 0) {
            state.catAllShops = [];
            state.isLoading = false;
            state.perPageCount = null;

            state.error = payload.message;
            return;
          }
          const { shops, perPageCount, totalCount } = payload.data;
          let data = shops.map((obj) => {
            const { id, name, hex: color, photoUrl: image, stat } = obj;
            return {
              id,
              name,
              color,
              image,
              stat,
              average: stat.average || 0.0,
              reviews: stat.reviews || 0,
              totalCount,
              perPageCount,
            };
          });

          // total count = 50

          state.catAllShops = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadAllShops.rejected, (state, action) => {
        state.isLoading = false;
        state.catAllShops = null;
        state.perPageCount = null;

        state.error = action.payload;
      });
  },
});

export const getCatAllShops = (state) => state.catAllShops;

export default catAllShopsSlice.reducer;

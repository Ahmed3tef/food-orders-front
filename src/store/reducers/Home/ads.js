import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loadData from "../loadData";

const initialState = {
  ads: [],
  isLoading: false,
  error: null,
};

export const loadAds = createAsyncThunk("ads/loadAds", (thunkAPI) =>
  loadData(thunkAPI, "api/ads/w/home")
);

export const adsSlice = createSlice({
  name: "ads",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadAds.pending, (state, action) => {
        state.ads = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadAds.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.status === 0) {
            state.ads = [];
            state.isLoading = false;
            state.error = payload.message;
            return;
          }
          let data = payload.data.map((obj, i) => {
            return {
              id: obj.shop,
              color: obj.hex,
              description: obj.description,
              image: obj.photoUrl,
            };
          });

          state.ads = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadAds.rejected, (state, action) => {
        state.isLoading = false;
        state.ads = null;
        state.error = action.payload;
      });
  },
});

export const getAds = (state) => state.ads;

export default adsSlice.reducer;

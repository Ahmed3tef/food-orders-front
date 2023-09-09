import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDataWithParams } from "./loadData";

const initialState = {
  areas: null,
  isLoading: false,
  error: null,
};

export const loadAreas = createAsyncThunk(
  "areas/loadAreas",
  (location, thunkAPI) =>
    getDataWithParams(thunkAPI, "api/areas/w/list", location)
);

export const areasSlice = createSlice({
  name: "areas",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadAreas.pending, (state, action) => {
        state.areas = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadAreas.fulfilled, (state, { payload }) => {
        if (payload) {
          if (payload.status === 0) {
            state.areas = null;
            state.isLoading = false;
            state.error = payload.message;
            return;
          }

          state.areas = payload.data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadAreas.rejected, (state, action) => {
        state.isLoading = false;
        state.areas = null;
        state.error = action.payload;
      });
  },
});

export const getAreas = (state) => state.areas;

export default areasSlice.reducer;

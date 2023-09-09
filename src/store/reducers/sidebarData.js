import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loadData from "./loadData";

const initialState = {
  sidebarCategories: [],
  isLoading: false,
  error: null,
};

export const loadSidebarCategories = createAsyncThunk(
  "sidebarCategories/loadSidebarCategories",
  (thunkAPI) => loadData(thunkAPI, "api/categories/w/header")
);

export const sidebarCategoriesSlice = createSlice({
  name: "sidebarCategories",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadSidebarCategories.pending, (state, action) => {
        state.sidebarCategories = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadSidebarCategories.fulfilled, (state, { payload }) => {
        if (payload) {
          if (payload.status === 0) {
            state.sidebarCategories = [];
            state.isLoading = false;
            state.error = payload.message;
            return;
          }
          let data = payload.data.map((obj, i) => {
            return {
              id: obj.id,
              tags: obj.tags,
              name: obj.name,
              icon: obj.iconUrl,
            };
          });

          state.sidebarCategories = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadSidebarCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.sidebarCategories = null;
        state.error = action.payload;
      });
  },
});

export const getSidebarCategories = (state) => state.sidebarCategories;

export default sidebarCategoriesSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDataWithParams } from "./loadData";

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const loadCategories = createAsyncThunk(
  "categories/loadCategories",
  (location, thunkAPI) =>
    getDataWithParams(thunkAPI, "api/shops/w/categories", location)
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadCategories.pending, (state, action) => {
        state.categories = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadCategories.fulfilled, (state, { payload }) => {
        if (payload) {
          if (payload.status === 0) {
            state.categories = [];
            state.isLoading = false;
            state.error = payload.message;
            return;
          }
          let data = payload.data.map((obj, i) => {
            const shops = obj.shops.map((shop) => {
              const { name, id, photoUrl: image, branch, hex: color } = shop;
              return {
                id,
                name,
                image,
                branch,
                color,
              };
            });
            const { id, name, hex: color } = obj.category;

            return {
              category: {
                id,
                name,
                color,
              },
              shops,
            };
          });

          state.categories = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.categories = null;
        state.error = action.payload;
      });
  },
});

export const getCategories = (state) => state.categories;

export default categoriesSlice.reducer;

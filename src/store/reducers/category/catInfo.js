import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loadData from "../loadData";

const initialState = {
  catInfo: null,
  isLoading: false,
  error: null,
};

export const loadCatInfo = createAsyncThunk(
  "catInfo/loadCatInfo",
  (id, thunkAPI) => loadData(thunkAPI, `api/categories/w/${id}`)
);

export const catInfoSlice = createSlice({
  name: "catInfo",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadCatInfo.pending, (state, action) => {
        state.catInfo = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadCatInfo.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.status === 0) {
            state.catInfo = null;
            state.isLoading = false;
            state.error = payload.message;
            return;
          }

          const { id, name } = payload.data;
          const data = {
            id,
            name,
          };

          state.catInfo = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadCatInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.catInfo = null;
        state.error = action.payload;
      });
  },
});

export const getCatInfo = (state) => state.catInfo;

export default catInfoSlice.reducer;

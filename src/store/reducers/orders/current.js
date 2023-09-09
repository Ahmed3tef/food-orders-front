import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loadData from "../loadData";

const initialState = {
  currentOrders: null,
  isLoading: false,
  error: null,
};

// params:{page: number}, id from route.

export const loadCurrentOrders = createAsyncThunk(
  "currentOrders/loadCurrentOrders",
  (thunkAPI) => loadData(thunkAPI, `api/orders/customers/current`)
);

export const currentOrdersSlice = createSlice({
  name: "currentOrders",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadCurrentOrders.pending, (state, action) => {
        state.currentOrders = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadCurrentOrders.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.status === 0) {
            state.currentOrders = null;
            state.isLoading = false;
            state.error = payload.message;
            return;
          }

          state.currentOrders = payload.data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadCurrentOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.currentOrders = null;
        state.error = action.payload;
      });
  },
});

export const getCurrentOrders = (state) => state.currentOrders;

export default currentOrdersSlice.reducer;

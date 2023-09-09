import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loadData from "../loadData";

const initialState = {
  userInfo: null,
  isLoading: false,
  error: null,
};

// params:{page: number}, id from route.

export const loadUserInfo = createAsyncThunk(
  "userInfo/loadUserInfo",
  (thunkAPI) => loadData(thunkAPI, `api/customers/profile/info`)
);

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadUserInfo.pending, (state, action) => {
        state.userInfo = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadUserInfo.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.status === 0) {
            state.userInfo = null;
            state.isLoading = false;
            state.error = payload.message;
            return;
          }

          const {
            area,
            name,
            photoUrl: image,
            email,
            phoneNumber,
            addresses,
          } = payload.data;

          let data = {
            area,
            name,
            image,
            email,
            phoneNumber,
            addresses,
          };

          state.userInfo = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.userInfo = null;
        state.error = action.payload;
      });
  },
});

export const getUserInfo = (state) => state.userInfo;

export default userInfoSlice.reducer;

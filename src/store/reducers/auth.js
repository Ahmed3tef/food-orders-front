import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import i18next from "../../i18n";
import { APIBase } from "./api";

const initialState = {
  token: null,
  expiresAt: null,
  rememberMe: false,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, thunkAPI) => {
    return axios
      .post(`${APIBase}admin/login`, user, thunkAPI)
      .then((res) => {
        return {
          token: {
            accessToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBiYzBiNWI3MjIyNjk1ZTg5ZGVhMjQ0YzA2YTg1ZDY3MTFjOWMwOGY5ZjA4ODI1OGMxNjQ3MjUyNzNiNTYzMDQiLCJ0eXBlIjo2LCJpYXQiOjE2NzE4ODQ3OTAsImV4cCI6MTY3MjQ4OTU5MH0.HHk1EpVdO-1tTpC2k4IaTzIEjcgnnyOGq2ZJb7x6jUQ",
            expiresAt: "2023-01-23T12:26:30.335Z",
            expiresIn: "2592000",
          },
        };
      })
      .catch((err) => {
        return err.response.data;
      });
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRememberMe(state, action) {
      state.rememberMe = action.payload;
    },
    logout(state) {
      //SESSION
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("tokenExpiration");

      //STORAGE
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");

      state.token = null;
      state.expiresAt = null;
    },
    tryLogin(state) {
      state.token =
        sessionStorage.getItem("token") ?? localStorage.getItem("token");

      if (!state.token) return;

      // const tokenExpiration =
      //   sessionStorage.getItem("tokenExpiration") ??
      //   localStorage.getItem("tokenExpiration");

      // const expiresInMSeconds = +tokenExpiration - new Date().getTime();

      // state.expiresInMSeconds = expiresInMSeconds;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        {
          if (action.payload && action.payload.status === 0) {
            state.error = action.payload;
            state.isLoading = false;
            return;
          }

          state.token = action.payload.token.accessToken;
          state.expiresInSeconds = action.payload.token.expiresIn;

          const expiresInMSeconds = +state.expiresInSeconds * 1000;
          const expirationDate = new Date().getTime() + expiresInMSeconds;

          localStorage.clear();
          sessionStorage.clear();

          if (state.rememberMe) {
            localStorage.setItem("token", state.token);
            localStorage.setItem("tokenExpiration", expirationDate);
          } else {
            sessionStorage.setItem("token", state.token);
            sessionStorage.setItem("tokenExpiration", expirationDate);
          }

          state.isLoading = false;
          state.error = null;
          state.expiresInMSeconds = expiresInMSeconds;
        }
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload.message;
        state.isLoading = false;
      });
  },
});

export const { logout, setRememberMe, tryLogin } = authSlice.actions;
export default authSlice.reducer;

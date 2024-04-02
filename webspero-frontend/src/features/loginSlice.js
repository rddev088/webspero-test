//LoginSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const params = {
        email: email,
        password: password,
      };
      const response = await axios.post("auth/login", params);
      let data = await response.data;
      console.log({ response });
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const LoginSlice = createSlice({
  name: "login",
  initialState: {
    token: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.isFetching = false;
        state.isSuccess = true;
        return state;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage =
          payload.error ?? payload.message ?? "Something went wrong";
      })
      .addCase(loginUser.pending, (state) => {
        state.isFetching = true;
      });
  },
});

export const loginSelector = (state) => state.auth;

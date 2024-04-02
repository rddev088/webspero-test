import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios";

const initialState = {
  nearestUsers: [],
  loading: false,
  error: null,
};

export const findNearestUsers = createAsyncThunk(
  "user/findNearestUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("user/find-nearest-users");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findNearestUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(findNearestUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.nearestUsers = payload;
      })
      .addCase(findNearestUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.error =
          payload?.error ?? payload?.message ?? "Failed to fetch nearest users";
      });
  },
});

export const nearestUsersSelector = (state) => state.nearestUsers;

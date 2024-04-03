import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios";

const initialState = {
  nearestUsers: [],
  user: null,
  loading: false,
  success: false,
  updated: false,
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

export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  try {
    const response = await axios.get("user/get-user");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post("user/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-datas",
        },
      });
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
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.success = true;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error =
          payload?.error ?? payload?.message ?? "Failed to fetch user";
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.updated = true;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error =
          payload?.error ?? payload?.message ?? "Failed to fetch user";
      });
  },
});

export const nearestUsersSelector = (state) => state.user;

import { configureStore } from "@reduxjs/toolkit";
import { LoginSlice } from "./features/loginSlice";
import { UserSlice } from "./features/userSlice";

export const store = configureStore({
  reducer: {
    auth: LoginSlice.reducer,
    user: UserSlice.reducer,
  },
});

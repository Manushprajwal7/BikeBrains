import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/counter/UserSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

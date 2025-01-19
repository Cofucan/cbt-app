import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./userReducer";

export const store = configureStore({
  reducer: {
    user: authReducer,
  }
});


import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";
import leadReducer from "../features/leads/leadSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,   // 👈 EXISTING
    leads: leadReducer,  // 👈 NEW (THIS WAS MISSING)
  },
});

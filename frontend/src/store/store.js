import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice.js";
import subTodoReducer from "./subTodoSlice.js";
import userReducer from "./userSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer,
    subTodo: subTodoReducer,
  },
});

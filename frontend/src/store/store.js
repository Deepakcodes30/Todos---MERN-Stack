import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice.js";
import subTodoReducer from "./subTodoSlice.js";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    subTodo: subTodoReducer,
  },
});

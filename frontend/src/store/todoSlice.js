import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//using async thunks for fetching data from the backend

export const getAllTodo = createAsyncThunk(
  "todo/get-all-todo",
  async (
    {
      page = 1,
      limit = 10,
      query = "",
      sortBy = "createdAt",
      sortType = "desc",
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL_TODO
        }/get-all-todo?page=${page}&limit=${limit}&query=${query}&sortBy=${sortBy}&sortType=${sortType}`,
        { withCredentials: true }
      );

      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createTodo = createAsyncThunk(
  "todo/create-todo",
  async ({ title, dueDate }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL_TODO}/create-todo`,
        {
          title,
          dueDate,
        },
        { withCredentials: true }
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todo/update-todo",
  async ({ todoId, title, content, dueDate }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL_TODO}/update-todo/${todoId}`,
        { title, content, dueDate },
        { withCredentials: true }
      );

      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const toggleCompleteStatus = createAsyncThunk(
  "todo/toggle-Complete-Status",
  async (todoId, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${
          import.meta.env.VITE_BASE_URL_TODO
        }/toggle-complete-status/${todoId}`,
        {},
        { withCredentials: true }
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/delete-todo",
  async (todoId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL_TODO}/delete-todo/${todoId}`,
        { withCredentials: true }
      );
      return todoId; // returning deleted ID to remove from store
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getTodoById = createAsyncThunk(
  "todo/get-current-todo",
  async (todoId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL_TODO}/get-current-todo/${todoId}`,
        { withCredentials: true }
      );

      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

//completing the reducers

const initialState = {
  todos: [],
  currentTodo: null,
  loading: false,
  error: null,
  pagination: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    clearCurrentTodo: (state, action) => {
      state.currentTodo = null; //this is to clear the currently selected todo once the work is done like editing or deleting
    },
  },
  extraReducers: (builder) => {
    builder
      //getAllTodo
      .addCase(getAllTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.todos = action.payload.todos;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //createTodo
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.unshift(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //updateTodo
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.todos.findIndex(
          (todo) => todo._id === action.payload._id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //toggleCompleteStatus
      .addCase(toggleCompleteStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleCompleteStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.todos.findIndex(
          (todo) => todo._id === action.payload._id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(toggleCompleteStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //deleteTodo
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //getTodoById
      .addCase(getTodoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTodoById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTodo = action.payload;
      })
      .addCase(getTodoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentTodo } = todoSlice.actions;

export default todoSlice.reducer;

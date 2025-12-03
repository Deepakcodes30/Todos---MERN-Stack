import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//using async thunks for fetching data from the backend

export const getAllSubTodo = createAsyncThunk(
  "/subTodo/get-all-subTodo",
  async (
    { page = 1, limit = 10, sortBy = "createdAt", sortType = "desc" },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL_SUBTODO
        }/get-all-subTodo?page=${page}&limit=${limit}&sortBy=${sortBy}&sortType=${sortType}`,
        { withCredentials: true }
      );

      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createSubTodo = createAsyncThunk(
  "subTodo/create-subTodo",
  async ({ content }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL_SUBTODO}/create-subTodo`,
        { content },
        { withCredentials: true }
      );

      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateSubTodo = createAsyncThunk(
  "subTodo/update-subTodo",
  async ({ subTodoId, content }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL_SUBTODO}/update-subTodo/${subTodoId}`,
        { content },
        { withCredentials: true }
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const toggleCompleteStatus = createAsyncThunk(
  "subTodo/toggle-complete-status",
  async (subTodoId, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${
          import.meta.env.VITE_BASE_URL_SUBTODO
        }/toggle-complete-status/${subTodoId}`,
        {},
        { withCredentials: true }
      );

      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteSubTodo = createAsyncThunk(
  "subTodo/delete-subTodo",
  async (subTodoId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL_SUBTODO}/delete-subTodo/${subTodoId}`,
        { withCredentials: true }
      );
      return subTodoId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getSubTodoById = createAsyncThunk(
  "subTodo/get-current-subTodo",
  async (subTodoId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL_SUBTODO
        }/get-current-subTodo/${subTodoId}`,
        {
          withCredentials: true,
        }
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

//completing the reducers

const initialState = {
  subTodos: [],
  currentSubTodo: "",
  loading: false,
  error: null,
  pagination: null,
};

export const subTodoSlice = createSlice({
  name: "subTodo",
  initialState,
  reducers: {
    clearCurrentSubTodo: (state) => {
      state.currentSubTodo = null;
    },
  },

  extraReducers: (builder) => {
    builder

      //getAllSubTodo
      .addCase(getAllSubTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSubTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.subTodos = action.payload.subTodo;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllSubTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //createSubTodo
      .addCase(createSubTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.subTodos.unshift(action.payload);
      })
      .addCase(createSubTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //updateSubTodo
      .addCase(updateSubTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.subTodos.findIndex(
          (todo) => todo._id === action.payload._id
        );
        if (index !== -1) {
          state.subTodos[index] = action.payload;
        }
      })
      .addCase(updateSubTodo.rejected, (state, action) => {
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
        const index = state.subTodos.findIndex(
          (subTodo) => subTodo._id === action.payload._id
        );
        if (index !== -1) {
          state.subTodos[index] = action.payload;
        }
      })
      .addCase(toggleCompleteStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //deleteSubTodo
      .addCase(deleteSubTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.subTodos = state.subTodos.filter(
          (subTodo) => subTodo._id !== action.payload
        );
      })
      .addCase(deleteSubTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //getSubTodoById
      .addCase(getSubTodoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubTodoById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSubTodo = action.payload;
      })
      .addCase(getSubTodoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentSubTodo } = subTodoSlice.actions;

export default subTodoSlice.reducer;

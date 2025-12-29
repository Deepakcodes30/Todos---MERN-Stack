import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//using async thunks for fetching data from the backend

export const getAllSubTodo = createAsyncThunk(
  "/subTodo/get-all-subTodo",
  async (
    { todoId, page = 1, limit = 10, sortBy = "createdAt", sortType = "desc" },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL_SUBTODO
        }/${todoId}/get-all-subTodo?page=${page}&limit=${limit}&sortBy=${sortBy}&sortType=${sortType}`,
        { withCredentials: true }
      );

      return {
        todoId,
        subTodos: res.data.data.subTodo,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createSubTodo = createAsyncThunk(
  "subTodo/create-subTodo",
  async ({ todoId, content }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL_SUBTODO}/${todoId}/create-subTodo`,
        { content },
        { withCredentials: true }
      );

      return { todoId, subTodo: res.data.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateSubTodo = createAsyncThunk(
  "subTodo/update-subTodo",
  async ({ todoId, subTodoId, content }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${
          import.meta.env.VITE_BASE_URL_SUBTODO
        }/${todoId}/${subTodoId}/update-subTodo`,
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
  async ({ todoId, subTodoId }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${
          import.meta.env.VITE_BASE_URL_SUBTODO
        }/${todoId}/${subTodoId}/toggle-complete-status`,
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
  async ({ todoId, subTodoId }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_BASE_URL_SUBTODO
        }/${todoId}/${subTodoId}/delete-subTodo`,
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
  async ({ todoId, subTodoId }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL_SUBTODO
        }/${todoId}/${subTodoId}/get-current-subTodo`,
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
        const { todoId, subTodos } = action.payload;
        state.subTodos = state.subTodos.filter(
          (subTodo) => subTodo.todo !== todoId
        );
        state.subTodos.push(...subTodos);
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
        // const { todoId, subTodo } = action.payload;
        // if (!state.subTodos[todoId]) {
        //   state.subTodos[todoId] = [];
        // }
        state.subTodos.unshift(action.payload.subTodo);
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

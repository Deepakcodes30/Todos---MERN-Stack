import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "users/register",
  async ({ fullName, username, password, email }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL_USER}/register`,
        {
          fullName,
          username,
          password,
          email,
        },
        { withCredentials: true }
      );
      console.log(res.data.data); //to check the response
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ email, username, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL_USER}/login`,
        {
          email,
          username,
          password,
        },
        { withCredentials: true }
      );

      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "users/logout",
  async (__, { rejectWithValue }) => {
    //cannot leave empty as an argument is required in thunk (argument, thunk Api)
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL_USER}/logout`,
        {},
        { withCredentials: true }
      );

      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const changeCurrentPassword = createAsyncThunk(
  "users/password-change",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL_USER}/password-change`,
        {
          oldPassword,
          newPassword,
        },
        { withCredentials: true }
      );

      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "users/current-user",
  async (__, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL_USER}/current-user`,
        { withCredentials: true }
      );

      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateAccountDetails = createAsyncThunk(
  "users/update-account-details",
  async ({ username, email, fullName }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL_USER}/update-account-details`,
        {
          username,
          email,
          fullName,
        },
        { withCredentials: true }
      );

      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  "users/update-avatar",
  async (avatarFile, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile);
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL_USER}/update-avatar`,

        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
  isPasswordChanged: false,
  isAccountUpdated: false,
  isAvatarUpdated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  extraReducers: (builder) => {
    builder
      //register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //logout user
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        state.isPasswordChanged = false;
        state.isAccountUpdated = false;
        state.isAvatarUpdated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Change current password
      .addCase(changeCurrentPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isPasswordChanged = false;
      })
      .addCase(changeCurrentPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isPasswordChanged = true;
      })
      .addCase(changeCurrentPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isPasswordChanged = false;
      })

      //get current user
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //update Account details
      .addCase(updateAccountDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAccountUpdated = false;
      })
      .addCase(updateAccountDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAccountUpdated = true;
      })
      .addCase(updateAccountDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAccountUpdated = false;
      })

      //update user avatar
      .addCase(updateUserAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAvatarUpdated = false;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAvatarUpdated = true;
      })
      .addCase(updateUserAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAvatarUpdated = false;
      });
  },
});

export default userSlice.reducer;

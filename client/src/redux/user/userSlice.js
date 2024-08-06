import {
  loadUser,
  login,
  logout,
  refreshToken,
  signup,
  updateUser,
} from "@/helpers/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const signupUser = createAsyncThunk(
  "user/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await signup(userData);

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await login(userData);

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const loadLoggedInUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const data = await loadUser();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const data = await logout();
      localStorage.removeItem("user");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const updateUserDetails = createAsyncThunk(
  "user/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await updateUser(userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const refreshAuthToken = createAsyncThunk(
  "user/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser || !storedUser.refreshToken) {
        throw new Error("No refresh token found");
      }

      const data = await refreshToken(storedUser.refreshToken);

      // Save the new tokens to local storage
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...storedUser,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        }),
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    errorMsg: null,
    successMsg: null,
  },
  reducers: {
    clearError: (state) => {
      state.errorMsg = null;
    },
    clearSuccess: (state) => {
      state.successMsg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.errorMsg = null;
        state.successMsg = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.successMsg = action.payload.msg;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg =
          action.payload?.msg ||
          action.payload?.errors?.[0]?.msg ||
          "An error occurred";
        state.successMsg = null;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.errorMsg = null;
        state.successMsg = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.successMsg = action.payload.msg;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg =
          action.payload?.msg ||
          action.payload?.errors?.[0]?.msg ||
          "An error occurred";
        state.successMsg = null;
      });

    builder
      .addCase(loadLoggedInUser.pending, (state) => {
        state.loading = true;
        state.errorMsg = null;
        state.successMsg = null;
      })
      .addCase(loadLoggedInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loadLoggedInUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg =
          action.payload?.msg ||
          action.payload?.errors?.[0]?.msg ||
          "An error occurred";
        state.successMsg = null;
      });

    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.errorMsg = null;
        state.successMsg = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.successMsg = action.payload.msg;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg =
          action.payload?.msg ||
          action.payload?.errors?.[0]?.msg ||
          "An error occurred";
        state.successMsg = null;
      });

    builder
      .addCase(updateUserDetails.pending, (state) => {
        state.loading = true;
        state.errorMsg = null;
        state.successMsg = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.successMsg = action.payload.msg;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg =
          action.payload?.msg ||
          action.payload?.errors?.[0]?.msg ||
          "An error occurred";
        state.successMsg = null;
      });

    builder
      .addCase(refreshAuthToken.pending, (state) => {
        state.loading = true;
        state.errorMsg = null;
        state.successMsg = null;
      })
      .addCase(refreshAuthToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.successMsg = action.payload.msg;
      })
      .addCase(refreshAuthToken.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg =
          action.payload?.msg ||
          action.payload?.errors?.[0]?.msg ||
          "An error occurred";
        state.successMsg = null;
      });
  },
});

export const { clearError, clearSuccess } = userSlice.actions;

export default userSlice.reducer;

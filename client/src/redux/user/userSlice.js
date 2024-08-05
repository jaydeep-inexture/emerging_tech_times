import { signup, login, loadUser, logout } from "@/helpers/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const signupUser = createAsyncThunk(
  "user/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await signup(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await login(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const loadLoggedInUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await loadUser();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logout();
      return response;
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

        if (action.payload.user) {
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
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

        if (action.payload.user) {
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
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
        localStorage.removeItem("user");

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
  },
});

export const { clearError, clearSuccess } = userSlice.actions;

export default userSlice.reducer;

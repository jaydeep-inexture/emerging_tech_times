import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {signup} from '@/helpers/api';

export const signupUser = createAsyncThunk(
  'user/signup',
  async (userData, {rejectWithValue}) => {
    try {
      const response = await signup(userData);
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
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
        console.log(action.payload.msg);
        state.loading = false;
        state.user = action.payload.user;
        state.successMsg = action.payload.msg;

        if (action.payload.user) {
          localStorage.setItem('user', JSON.stringify(action.payload.user));
        }
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg =
          action.payload?.msg ||
          action.payload?.errors?.[0]?.msg ||
          'An error occurred';
        state.successMsg = null;
      });
  },
});

export const {clearError, clearSuccess} = userSlice.actions;

export default userSlice.reducer;

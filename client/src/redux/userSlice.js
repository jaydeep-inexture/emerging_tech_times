import { loadUser } from "@/helpers/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    users: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadLoggedInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadLoggedInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loadLoggedInUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setLoading, setUser, setUsers } = userSlice.actions;

export default userSlice.reducer;

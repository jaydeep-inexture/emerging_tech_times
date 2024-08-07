import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "@/helpers/api";

export const fetchPostList = createAsyncThunk(
  "post/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchPosts();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    loading: false,
    posts: null,
    selectedPost: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostList.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data.posts;
      })
      .addCase(fetchPostList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setLoading, setSelectedPost } = postSlice.actions;

export default postSlice.reducer;

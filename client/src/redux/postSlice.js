import { fetchPosts } from "@/helpers/api";
import { CONSTANTS } from "@/helpers/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPostList = createAsyncThunk(
  "post/fetchPosts",
  async ({ page, limit, sortBy }, { rejectWithValue }) => {
    try {
      const data = await fetchPosts(page, limit, sortBy);

      return { posts: data.data.posts, total: data.data.total };
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    loading: false,
    posts: [],
    selectedPost: null,
    page: 0,
    limit: CONSTANTS.PAGINATION_LIMIT,
    total: 0,
    hasMore: true,
    dataFetched: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    resetPosts: (state) => {
      state.posts = [];
      state.page = 0;
      state.hasMore = true;
      state.dataFetched = false;
    },
    setDataFetched: (state, action) => {
      state.dataFetched = action.payload;
    },
    resetPage: (state) => {
      state.page = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostList.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [...state.posts, ...action.payload.posts];
        state.total = action.payload.total;
        state.hasMore = state.posts.length < state.total;
        state.dataFetched = true;
      })
      .addCase(fetchPostList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setLoading,
  setSelectedPost,
  incrementPage,
  resetPosts,
  setDataFetched,
  resetPage,
} = postSlice.actions;

export default postSlice.reducer;

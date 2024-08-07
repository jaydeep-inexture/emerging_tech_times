import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    loading: false,
    posts: null,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading, setPosts } = postSlice.actions;

export default postSlice.reducer;

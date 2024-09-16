// import { createSlice } from "@reduxjs/toolkit";

// export const fetchsubscriber = createSlice({
//   name: "subscriber",
//   initialState: {
//     subscriber: null,
//     loading: false,
//   },
//   reducers: {
//     setdata: (state, action) => {
//       state.subscriber = action.payload;
//     },
//   },
// });
// export const { setdata } = fetchsubscriber.actions;
// export default fetchsubscriber.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const subscriberSlice = createSlice({
  name: "subscriber",
  initialState: {
    subscriber: null,
    loading: false,
  },
  reducers: {
    setdata: (state, action) => {
      state.subscriber = action.payload;
    },
  },
});

export const { setdata } = subscriberSlice.actions;
export default subscriberSlice.reducer;

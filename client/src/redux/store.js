import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/userSlice";
import notificationReducer from "@/redux/notificationSlice";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
  },
});

export default store;

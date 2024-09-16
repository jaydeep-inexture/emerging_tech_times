import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/userSlice";
import notificationReducer from "@/redux/notificationSlice";
import postReducer from "@/redux/postSlice";
import subscriberReducer from "@/redux/subscriberSlice";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    post: postReducer,
    subscriber: subscriberReducer,
  },
});

export default store;

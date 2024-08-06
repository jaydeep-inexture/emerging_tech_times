import { clearNotification } from "@/redux/notificationSlice";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const NotificationSnackbar = () => {
  const dispatch = useDispatch();
  const { type, message } = useSelector((state) => state.notification);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  if (!message) return null;

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={6000}
      onClose={() => dispatch(clearNotification())}
    >
      <Alert
        onClose={() => dispatch(clearNotification())}
        severity={type}
        sx={{ width: "100%", padding: "20px 40px", fontSize: "16px" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationSnackbar;

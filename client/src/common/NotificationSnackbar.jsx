import {clearError, clearSuccess} from '@/redux/user/userSlice';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import {useDispatch, useSelector} from 'react-redux';

const NotificationSnackbar = () => {
  const dispatch = useDispatch();
  const errorMsg = useSelector((state) => state.user.errorMsg);
  const successMsg = useSelector((state) => state.user.successMsg);

  const handleClose = () => {
    dispatch(clearError());
    dispatch(clearSuccess());
  };

  // Determine if there's an error or success message to display
  const open = Boolean(errorMsg || successMsg);
  const message = errorMsg || successMsg;
  const severity = errorMsg ? 'error' : 'success';

  return (
    <Snackbar
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{width: '100%', padding: '20px 40px', fontSize: '16px'}}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationSnackbar;

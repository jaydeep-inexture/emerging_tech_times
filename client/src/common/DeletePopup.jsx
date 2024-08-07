import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

const DeletePopup = ({ open, onClose, title, handleClose, handleDelete }) => {
  return (
    <Dialog
      sx={{ "& .MuiPaper-root": { padding: 2 } }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography>
          {`Are you sure you want to delete the post titled ${title}?`}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePopup;

import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import User from "@/assets/user.png";
import { updateUser } from "@/helpers/api";
import { setNotification } from "@/redux/notificationSlice";
import { loadLoggedInUser } from "@/redux/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [isEditable, setIsEditable] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const handleUpdateBtnClicked = async () => {
    try {
      const data = await updateUser({ username });
      dispatch(loadLoggedInUser());
      setIsEditable(false);
      dispatch(
        setNotification({
          type: "success",
          message: data.msg,
        }),
      );
    } catch (error) {
      const errMessage =
        error.response.data.msg ||
        error.response.data?.errors?.[0]?.msg ||
        "An error occurred";
      dispatch(
        setNotification({
          type: "error",
          message: errMessage,
        }),
      );
    }
  };

  return (
    <Box sx={{ padding: "4% 10%" }}>
      <Box
        sx={{
          boxShadow: 3,
          width: "100%",
          height: "500px",
          borderRadius: "20px",
          padding: "20px",
        }}
      >
        <Grid container spacing={2} sx={{ height: "100%" }}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Box
                component="img"
                alt="Profile"
                src={User}
                sx={{
                  width: "50%",
                  height: "auto",
                  borderRadius: "50%",
                  mb: 2,
                }}
              />
              <Typography variant="h5">Profile</Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography variant="h4" gutterBottom fontWeight={800}>
                Personal Information
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Name
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <TextField
                    fullWidth
                    value={username}
                    disabled={!isEditable}
                    onChange={(e) => setUsername(e.target.value)}
                    margin="normal"
                  />
                  <IconButton
                    onClick={() => setIsEditable(!isEditable)}
                    sx={{ ml: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Email
                </Typography>
                <TextField
                  fullWidth
                  value={user?.email || ""}
                  disabled
                  margin="normal"
                />
              </Box>
              {isEditable && (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      width: "300px",
                      fontWeight: 700,
                      fontStyle: "italic",
                      borderRadius: "8px",
                      padding: 1,
                    }}
                    onClick={handleUpdateBtnClicked}
                  >
                    Update
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;

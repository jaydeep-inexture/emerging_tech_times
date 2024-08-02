import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import User from "@/assets/user.png";
import EditIcon from "@mui/icons-material/Edit";

const Profile = () => {
  const signupData = JSON.parse(localStorage.getItem("SignupFormData"));
  const [isEditable, setIsEditable] = useState(false);
  const [userName, setUserName] = useState(signupData.username);
  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };
  const handleUpdateBtnClicked = () =>{
    const updatedData = {
      ...signupData,
      username: userName,
    };
    localStorage.setItem("SignupFormData", JSON.stringify(updatedData));
    setIsEditable(false);
  }
  return (
    <>
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
                      defaultValue={signupData.username}
                      disabled={!isEditable}
                      onChange={(e) => setUserName(e.target.value)}
                      margin="normal"
                    />
                    <IconButton onClick={handleEditClick} sx={{ ml: 1 }}>
                      <EditIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    Email
                  </Typography>
                  <TextField
                    fullWidth
                    defaultValue={signupData.email}
                    disabled
                    margin="normal"
                  />
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    Password
                  </Typography>
                  <TextField
                    fullWidth
                    type="password"
                    defaultValue={signupData.password}
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
    </>
  );
};

export default Profile;

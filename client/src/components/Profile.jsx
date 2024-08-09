import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import User from "@/assets/user.png";
import CustomTextField from "@/common/CustomTextField";
import Spinner from "@/common/Spinner";
import { updateUser } from "@/helpers/api";
import { useIsMobile } from "@/hooks/useIsMobile";
import { setNotification } from "@/redux/notificationSlice";
import { loadLoggedInUser, setLoading } from "@/redux/userSlice";
import { CancelOutlined } from "@mui/icons-material";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const { isMobile } = useIsMobile();

  const [isEditable, setIsEditable] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    } else {
      setUsername("");
    }
  }, [user]);

  const handleUpdateBtnClicked = async () => {
    dispatch(setLoading(true));

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
      dispatch(setLoading(false));
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
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          backgroundColor: "#f0f2f5",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: isMobile ? "90%" : "600px",
            padding: "46px",
            borderRadius: "12px",
            boxShadow: 3,
            margin: 10,
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
              width: "100%",
            }}
          >
            <img
              src={User}
              alt="Profile"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                border: "4px solid #0F172A",
              }}
            />
          </Box>
          <Typography variant="h6" gutterBottom>
            Profile
          </Typography>

          <Box sx={{ width: "100%" }}>
            <Typography
              variant="h4"
              gutterBottom
              fontWeight={800}
              textAlign={"center"}
            >
              Personal Information
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <CustomTextField
                  label="Username"
                  placeholder="Enter Your User Name"
                  name="username"
                  type="text"
                  disabled={!isEditable}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <IconButton
                  onClick={() => setIsEditable(!isEditable)}
                  sx={{ ml: 1 }}
                >
                  {!isEditable ? <EditIcon /> : <CancelOutlined />}
                </IconButton>
              </Box>

              <CustomTextField
                label="Email"
                placeholder="Enter Your Email Address"
                name="username"
                type="email"
                value={user?.email || ""}
                disabled
              />
            </Box>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                disabled={!isEditable}
                variant="contained"
                sx={{
                  mt: 4,
                  width: "300px",
                  fontWeight: 700,
                  fontStyle: "italic",
                  borderRadius: "8px",
                  padding: 1,
                  backgroundColor: "#0F172A",
                  color: "white",
                  ":hover": {
                    backgroundColor: "#0d1127",
                  },
                }}
                onClick={handleUpdateBtnClicked}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Profile;

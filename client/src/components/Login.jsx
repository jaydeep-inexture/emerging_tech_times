import { useState } from "react";

import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Button, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CommonDialog from "@/common/CommonDialog";
import { login, logout, signup } from "@/helpers/api";
import { useIsMobile } from "@/hooks/useIsMobile";
import { setNotification } from "@/redux/notificationSlice";
import { loadLoggedInUser, setLoading, setUser } from "@/redux/userSlice";

const Login = ({ setFlag }) => {
  const { isMobile } = useIsMobile();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const [loginBtnOpen, setLoginBtnOpen] = useState(false);
  const [signupBtnOpen, setSignupBtnOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [signUpFormData, setSignUpFormData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const handleLoginClose = () => {
    setLoginBtnOpen(false);
  };

  const handleLoginOpen = () => {
    setLoginBtnOpen(true);
    setFlag(true);
  };

  const handleSignupClick = () => {
    setSignupBtnOpen(true);
    setFlag(true);
  };

  const handleSignUpClose = () => {
    setSignupBtnOpen(false);
  };

  const handleLoginFormChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await login(loginFormData);

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      dispatch(loadLoggedInUser());
      handleLoginClose();
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

  const handleSignupFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    setSignUpFormData({
      ...signUpFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await signup(signUpFormData);

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      dispatch(loadLoggedInUser());
      handleSignUpClose();
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

  const handleLogout = async () => {
    dispatch(setLoading(true));

    try {
      const data = await logout();
      dispatch(setUser(null));

      localStorage.removeItem("user");
      dispatch(setUser(null));

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
        "Logout failed. Please try again.";
      dispatch(
        setNotification({
          type: "error",
          message: errMessage,
        }),
      );
    }
    dispatch(setLoading(false));
  };

  const handleOpenDialog = (item) => {
    if (item === "signup") {
      setLoginBtnOpen(false);
      setSignupBtnOpen(true);
    }
    if (item === "signin") {
      setLoginBtnOpen(true);
      setSignupBtnOpen(false);
    }
  };

  return (
    <>
      {user ? (
        <Link className="link" to="/profile">
          <Button
            variant="outlined"
            startIcon={<PersonIcon />}
            sx={{
              ml: 3,
              border: 0,
              fontWeight: 800,
              fontSize: "18px",
              textTransform: "none",
              "&:hover": {
                border: 0,
                backgroundColor: "transparent",
              },

              "& .MuiButton-startIcon": {
                margin: user.username ? "" : 0,
              },
            }}
          >
            {user.username}
          </Button>
        </Link>
      ) : isMobile ? (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            position: "absolute",
            bottom: 10,
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              width: "90%",
              background: "#0F172A",
              padding: "15px",
              borderRadius: "8px",
              color: "white",
              height: "55px",
              fontWeight: 800,
              ":hover": { background: "#0F172A" },
            }}
            onClick={handleLoginOpen}
          >
            Login
          </Button>

          <Button
            sx={{
              width: "90%",
              marginTop: 1,
              padding: "15px",
              borderRadius: "8px",
              color: "#0F172A",
              height: "55px",
              fontWeight: 800,
              border: "1px solid #0F172A",
              ":hover": { background: "white" },
            }}
            onClick={handleSignupClick}
          >
            Register
          </Button>
        </Box>
      ) : (
        <>
          <Button
            sx={{
              width: "100px",
              background: "#0F172A",
              padding: "15px",
              marginLeft: "10px",
              borderRadius: "8px",
              color: "white",
              fontWeight: 800,
              ":hover": { background: "#0F172A" },
            }}
            onClick={handleLoginOpen}
          >
            Login
          </Button>

          <Button
            sx={{
              width: "100px",
              padding: "15px",
              marginLeft: "10px",
              borderRadius: "8px",
              color: "#0F172A",
              fontWeight: 800,
              border: "1px solid #0F172A",
              ":hover": { background: "white" },
            }}
            onClick={handleSignupClick}
          >
            Register
          </Button>
        </>
      )}
      {user && (
        <IconButton onClick={handleLogout} className="logout" sx={{ ml: 2 }}>
          <LogoutIcon sx={{ fontSize: "30px", color: "gray" }} />
        </IconButton>
      )}
      {loginBtnOpen ? (
        <CommonDialog
          open={loginBtnOpen}
          isLogin={loginBtnOpen}
          data={loginFormData}
          isMobile={isMobile}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          handleClose={handleLoginClose}
          handleSubmit={handleLoginSubmit}
          handleFormChange={handleLoginFormChange}
          handleOpenDialog={handleOpenDialog}
          buttonText={"Sign In"}
          alternateText={"Dont have an account? Sign up "}
        />
      ) : (
        <CommonDialog
          open={signupBtnOpen}
          data={signUpFormData}
          isMobile={isMobile}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          handleClose={handleSignUpClose}
          handleSubmit={handleSignupSubmit}
          handleFormChange={handleSignupFormChange}
          handleOpenDialog={handleOpenDialog}
          buttonText={"Sign up"}
          alternateText={"Already have an account? Sign in"}
        />
      )}
    </>
  );
};

export default Login;

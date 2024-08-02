
import CommonDialog from '@/common/CommonDialog';
import { useIsMobile } from "@/hooks/useIsMobile";
import { Box, Button } from '@mui/material';
import { useState } from "react";

const Login = ({ setFlag, userName, setUserName }) => {
  const { isMobile } = useIsMobile();
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

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    setUserName(JSON.parse(localStorage.getItem("SignupFormData")).username.slice(0, 1));
    handleLoginClose();
  };


  const handleSignupFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    setSignUpFormData({
      ...signUpFormData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    if (signUpFormData.password === signUpFormData.cpassword) {
      localStorage.setItem("SignupFormData", JSON.stringify(signUpFormData));
      handleSignUpClose();
      handleLoginOpen();
    } else {
      // Handle the case where passwords do not match
      alert("Password and Confirm Password doesn't match");
    }
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
      {userName ? (
        <Button
          sx={{
            width: "50px",
            background: "#ff851b",
            padding: "15px",
            borderRadius: "50%",
            color: "white",
            fontSize: "15px",
            fontWeight: 800,
            marginLeft: "20px",
            ":hover": { background: "#ff851b" },
          }}
        >
          {userName}
        </Button>
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
      ) :(
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
      )
    }
    </>
  );
};
export default Login;

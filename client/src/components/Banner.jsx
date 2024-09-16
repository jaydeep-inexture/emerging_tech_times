import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useIsMobile } from "@/hooks/useIsMobile";
import BannerImage from "@/assets/Banner.jpg";
import { useState } from "react";
import { subscriber } from "../helpers/api";
import { useDispatch } from "react-redux";
import { setdata } from "@/redux/subscriberSlice";
import { setNotification } from "@/redux/notificationSlice";

const Banner = () => {
  const dispatch = useDispatch();
  const { isMobile } = useIsMobile();
  const [data, setData] = useState({ email: "", name: "" });
  const handleSubmit = async () => {
    try {
      const response = await subscriber(data);
      dispatch(setdata(response));
      // console.log("data", data);
      dispatch(
        setNotification({
          type: "success",
          message: response.message,
        })
      );
      setData({ email: "", name: "" });
    } catch (error) {
      dispatch(
        setNotification({
          type: "error",
          message: error.message,
        })
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: isMobile ? "300px" : "300px",
        backgroundImage: `url(${BannerImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: "relative",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "1200px", padding: "16px" }}>
        <Typography variant={isMobile ? "h6" : "h4"} mb={2}>
          Get in Touch for Daily Updates and News
        </Typography>
        <Typography variant="body1" color="lightgray" mb={3}>
          Stay updated with the latest news. Subscribe to our newsletter.
        </Typography>
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <TextField
            variant="outlined"
            placeholder="Your email"
            name="email"
            value={data.email}
            onChange={handleChange}
            sx={{
              width: isMobile ? "250px" : "300px",
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          />
          <TextField
            variant="outlined"
            placeholder="Your name"
            name="name"
            value={data.name}
            onChange={handleChange}
            sx={{
              width: isMobile ? "100px" : "200px",
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ backgroundColor: "#FF6600", padding: "15px 24px" }}
            onClick={handleSubmit}
          >
            Subscribe Now
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Banner;

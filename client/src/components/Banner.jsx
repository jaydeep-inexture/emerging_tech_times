import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useIsMobile } from "@/hooks/useIsMobile";
import BannerImage from "@/assets/Banner.jpg";

const Banner = () => {
  const { isMobile } = useIsMobile();

  return (
    <Box
      sx={{
        width: "100%",
        height: isMobile ? "500px" : "300px",
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
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          padding: "16px",
          // backgroundColor: "rgba(0, 0, 0, 0.3)",
          // borderRadius: "12px",
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{ marginBottom: "16px" }}
        >
          Get in Touch for Daily Updates and News
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "lightgray", marginBottom: "24px" }}
        >
          Stay updated with the latest news and articles. Subscribe to our
          newsletter and never miss out on important updates.
        </Typography>
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ marginTop: "20px" }}
        >
          <TextField
            variant="outlined"
            placeholder="Your email"
            sx={{
              width: isMobile ? "250px" : "400px",
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ backgroundColor: "#FF6600", padding: "15px 24px" }}
          >
            Subscribe Now
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Banner;

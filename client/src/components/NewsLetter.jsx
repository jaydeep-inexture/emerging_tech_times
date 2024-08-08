import { TextField, Button, Box, Typography } from "@mui/material";

const NewsletterSignupForm = () => {
  return (
    <Box sx={{ marginTop: 4, textAlign: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "32vh",
          backgroundColor: "#0A1128",
          color: "#fff",
          textAlign: "center",
          padding: 4,
          backgroundImage:
            "url('https://t3.ftcdn.net/jpg/05/08/74/68/360_F_508746888_tl2EUHrIm1NpPBcwLufaAzbMqNO2kqwR.jpg')",
          backgroundRepeat: "round",
        }}
      >
        <Typography variant="h4" fontWeight={900} gutterBottom>
          Sign Up For Our Newsletter
        </Typography>
        <Typography variant="body1" gutterBottom my={2}>
          {`Don't miss out on this opportunity to join our community of
          like-minded individuals`}
        </Typography>
        <Box
          component="form"
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: 400,
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            variant="outlined"
            placeholder="Your email"
            type="email"
            fullWidth
            sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ backgroundColor: "#FF6600" }}
          >
            Subscribe Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NewsletterSignupForm;

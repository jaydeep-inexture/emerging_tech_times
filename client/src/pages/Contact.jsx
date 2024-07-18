// ContactUs.jsx
import React from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ContactUs from "../assets/ContactUs.png";
import { useMobile } from "../context/isMobileContext";
const Contact = () => {
  const isMobile = useMobile()
  return (
    <Container maxWidth="xl" >
      <Grid
        container
        spacing={4}
        style={{ minHeight: "51vh", marginBottom: isMobile ? "30px" : "100px" }}
      >
        {/* First Part with Image */}
        <Grid
          item
          xs={12}
          md={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={ContactUs}
            alt="Contact Us"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Grid>

        {/* Second Part with Form */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            mx:2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant={isMobile ? "h4" : "h3"} gutterBottom sx={{ fontWeight: 800 }}>
              Get in Touch
            </Typography>
            <form noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox name="terms" color="primary" />}
                    label="I agree to the Terms and Conditions"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;

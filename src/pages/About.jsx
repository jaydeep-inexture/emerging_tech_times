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
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
// import ContactUs from "../assets/ContactUs.png";
import Aboutus from "../assets/Aboutus.json";
import Lottie from "lottie-react";
import { useMobile } from "../context/isMobileContext";
const About = () => {
  const isMobile = useMobile();
  return (
    <Container maxWidth="xl" sx={{ marginBottom:isMobile&& "5%",marginY:!isMobile && "4%" }}>
      <Grid
        container
        spacing={4}
        style={{ minHeight: "45vh", marginBottom: "50px" }}
      >
        {/* First Part with Image */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant={isMobile ? "h5" : "h3"}
              gutterBottom
              sx={{
                fontWeight: 800,
                textTransform: "uppercase",
                fontStyle: "italic",
                color:'#FC6A03'
              }}
            >
              About Us
            </Typography>
            <Typography variant={isMobile ? "h6" : "h5"} gutterBottom>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
              perferendis. Vel odit officia hic neque qui eum eos consequatur
              fugit suscipit in, illum atque! Dolor ratione labore eaque
              provident quibusdam?
            </Typography>
            <Typography variant={isMobile ? "h6" : "h5"} gutterBottom>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
              perferendis. Vel odit officia hic neque qui eum eos consequatur
              fugit suscipit in, illum atque! Dolor ratione labore eaque
              provident quibusdam?
            </Typography>
          </Box>
        </Grid>

        {/* Second Part with Form */}

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
          <Lottie animationData={Aboutus} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;

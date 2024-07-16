import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, Instagram, Telegram } from "@mui/icons-material";
import FooterLogo from "../assets/FooterLogo.png";
import { useMobile } from "../context/isMobileContext";

const Footer = () => {
  const isMobile = useMobile();
  return (
    <>
      {!isMobile && (
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              background: "#ff851b",
              p: 4,
              width: "50%",
              margin: "auto",
              borderRadius: "30px",
              position: "absolute",
            }}
          >
            <Typography
              sx={{
                color: "#F6D9BE",
                fontSize: "24px",
                fontWeight: "bold",
                textAlign: "center",

                width: "220px",
              }}
            >
              Subscribe Us
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <TextField
                id="email"
                placeholder="Enter Your Email Address"
                variant="outlined"
                sx={{
                  mr: 2,
                  flexGrow: 1,
                  background: "#fff",
                  borderRadius: "8px",
                  border: "0.5px solid black",
                }}
              />
              <Button
                sx={{
                  background: "#0F172A",
                  padding: "15px",
                  borderRadius: "8px",
                  color: "white",
                  fontWeight: 800,
                  ":hover": { background: "#0F172A" },
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      <Box
        sx={{
          backgroundColor: "#0F172A",
          color: "white",
          width: "100%",
          py: 10,
        }}
      >
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
          paddingX={"100px"}
        >
          <Grid item xs={12} sm={3} display="flex" justifyContent="center">
            <img
              src={FooterLogo}
              alt="Logo"
              style={{
                width: "200px",
                height: "auto",
                mixBlendMode: "lighten",
                backgroundColor: "#0F172A",
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight={800} marginBottom={"20px"}>
              About Us
            </Typography>
            <Typography variant="body2" lineHeight={1.5} textAlign="center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
              praesentium qui quam obcaecati eos, optio a temporibus, doloremque
              autem facere similique, odit illum nisi natus? Cupiditate debitis
              suscipit tenetur odit.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight={800}>
              Connect
            </Typography>
            <Link
              href="/about"
              color="inherit"
              sx={{ textDecoration: "none", mt: 2, mb: 1 }}
            >
              About Us
            </Link>
            <Link
              href="/subscribe"
              color="inherit"
              sx={{ textDecoration: "none", mb: 1 }}
            >
              Subscribe
            </Link>
            <Link
              href="/news"
              color="inherit"
              sx={{ textDecoration: "none", mb: 1 }}
            >
              News
            </Link>
            <Link
              href="/contact"
              color="inherit"
              sx={{ textDecoration: "none", mb: 1 }}
            >
              Contact Us
            </Link>
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight={800} marginBottom={"20px"}>
              Follow Us
            </Typography>
            <Box>
              <IconButton href="https://facebook.com" color="inherit">
                <Facebook sx={{ fontSize: 30 }} />
              </IconButton>
              <IconButton href="https://twitter.com" color="inherit">
                <Twitter sx={{ fontSize: 30 }} />
              </IconButton>
              <IconButton href="https://instagram.com" color="inherit">
                <Instagram sx={{ fontSize: 30 }} />
              </IconButton>
              <IconButton href="https://telegram.com" color="inherit">
                <Telegram sx={{ fontSize: 30 }} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Footer;

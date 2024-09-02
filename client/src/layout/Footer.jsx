import { Facebook, Instagram, Telegram, Twitter } from "@mui/icons-material";
import { Box, Grid, IconButton, Link, Typography } from "@mui/material";

import White_Logo from "@/assets/White_Logo.png";
import { useIsMobile } from "@/hooks/useIsMobile";

const Footer = () => {
  const { isMobile } = useIsMobile();

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#0F172A",
          color: "white",
          width: "100%",
          py: 2,
        }}
      >
        <Grid
          container
          spacing={isMobile ? 2 : 4}
          justifyContent="center"
          alignItems="center"
          paddingX={isMobile ? 10 : "70px"}
        >
          <Grid item xs={12} sm={3} display="flex" justifyContent="center">
            <img
              src={White_Logo}
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
            <Typography
              variant={isMobile ? "p" : "h5"}
              fontWeight={800}
              fontSize={isMobile && 20}
              marginBottom={"10px"}
            >
              About Us
            </Typography>
            <Typography variant="body2" lineHeight={1.5} textAlign="center">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa
              dolorem libero minima sapiente
              {!isMobile &&
                "laudantium odit sit at veritatis distinctio veniam, neque maxime provident hic nihil reiciendismodi vitae sint corporis."}
            </Typography>
          </Grid>
          {!isMobile && (
            <Grid
              item
              xs={12}
              sm={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography variant="h5" fontWeight={800}>
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
          )}

          <Grid
            item
            xs={12}
            sm={3}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography variant="h5" fontWeight={800} marginBottom={"20px"}>
              Follow Us
            </Typography>
            <Box sx={{ display: "flex" }}>
              <IconButton
                href="https://facebook.com"
                color="inherit"
                sx={{
                  fontSize: 30,
                }}
              >
                <Facebook
                  sx={{
                    fontSize: 30,
                    "&:hover": {
                      color: "#1877F2", // Facebook Blue
                    },
                  }}
                />
              </IconButton>
              <IconButton href="https://twitter.com" color="inherit">
                <Twitter
                  sx={{
                    fontSize: 30,
                    "&:hover": {
                      color: "#1DA1F2", // Twitter Blue
                    },
                  }}
                />
              </IconButton>
              <IconButton href="https://instagram.com" color="inherit">
                <Instagram
                  sx={{
                    fontSize: 30,
                    "&:hover": {
                      color: "#E1306C", // Instagram Pink
                    },
                  }}
                />
              </IconButton>
              <IconButton href="https://telegram.com" color="inherit">
                <Telegram
                  sx={{
                    fontSize: 30,
                    "&:hover": {
                      color: "#0088cc", // Telegram Blue
                    },
                  }}
                />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Footer;

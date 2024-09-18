import { Facebook, Instagram, Telegram, Twitter } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import White_Logo from "@/assets/White_Logo.png";
import { useIsMobile } from "@/hooks/useIsMobile";

const Footer = () => {
  const { isMobile } = useIsMobile();
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.font.main,
          width: "100%",
          py: 4,
        }}
      >
        <Grid
          container
          spacing={isMobile ? 1 : 4}
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
              <Typography
                variant="h6"
                sx={{ color: theme.font.main, textDecoration: "none", mt: 1 }}
                component={Link}
                to="/about"
              >
                About Us
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "white", textDecoration: "none", mt: 1 }}
                component={Link}
                to="/news"
                state={{ value: "1" }}
              >
                news
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: "white", textDecoration: "none", mt: 1 }}
                component={Link}
                to="/contact"
              >
                Contact
              </Typography>
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

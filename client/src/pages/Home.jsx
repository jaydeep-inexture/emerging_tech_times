import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useMobile } from "../context/isMobileContext";
const Home = () => {
  const isMobile = useMobile();

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: isMobile ? " 450px" : "400px",
          backgroundColor: "lightblue",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            textAlign: "center",
            padding: "16px",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontFamily: "URW Chancery L, cursive", marginBottom: "16px" }}
          >
            Get in Touch with us for daily updates and daily news
          </Typography>
          <Typography variant="body1" sx={{ color: "gray" }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem hic
            sunt, ab nostrum ea cum dolores officiis sequi earum optio?
          </Typography>
          {isMobile ? (
            <>
              <Stack
                direction="column"
                spacing={2}
                alignItems="center"
                sx={{ marginTop: "5%" }}
              >
                <TextField
                  label="Email Address"
                  variant="outlined"
                  sx={{ width: "250px" }}
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
              </Stack>
            </>
          ) : (
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ marginTop: "5%" }}
            >
              <TextField
                label="Email Address"
                variant="outlined"
                sx={{ width: "300px" }}
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
            </Stack>
          )}
        </Box>
      </Box>

      <Box sx={{ paddingX: "12%", marginTop: 4, marginBottom: 12 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <Typography variant={isMobile ? "h6" : "h4"} fontWeight={800}>
            Latest News
          </Typography>
          <Link to="/news">
            <Button
              sx={{
                textTransform: "capitalize",
                color: "gray",
                fontSize: isMobile ? 16 : 20,
              }}
            >
              More <KeyboardArrowRightIcon />
            </Button>
          </Link>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Card sx={{ margin: "auto", mt: 4 }}>
                <CardMedia
                  component="img"
                  height={isMobile ? "170" : "550"}
                  image="https://static.toiimg.com/thumb/imgsize-23456,msid-111644636,width-375,resizemode-4/111644636.jpg"
                  alt="news2"
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="body1" color="text.secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fugiat voluptatibus dolorem illum nulla molestiae autem,
                    vero pariatur sit sequi voluptate nesciunt ad iusto
                    exercitationem totam eligendi est porro minima vitae?
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      textAlign: "center",
                      mt: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <PersonIcon sx={{ mr: 1, color: "text.primary" }} />
                      <Typography variant="body2" color="text.secondary">
                        by, Vishal Shah
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      2024-07-11 11:11
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ margin: "auto", mt: 4 }}>
                <CardMedia
                  component="img"
                  height="170"
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFtEPwKHXE0w36wxAe838uaGFBJUzQ3Nup4w&s"
                  alt="news2"
                  sx={{ objectFit: "fill" }}
                />
                <CardContent>
                  <Typography variant="body1" color="text.secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fugiat voluptatibus dolorem illum nulla molestiae autem,
                    vero pariatur sit sequi
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      textAlign: "center",
                      mt: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <PersonIcon sx={{ mr: 1, color: "text.primary" }} />
                      <Typography variant="body2" color="text.secondary">
                        by, Vishal Shah
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      2024-07-11 11:11
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ margin: "auto", mt: 4 }}>
                <CardMedia
                  component="img"
                  height="170"
                  image="https://www.livemint.com/lm-img/img/2024/07/08/600x338/PTI07-08-2024-000210B-0_1720443963570_1720443995911.jpg"
                  alt="news2"
                  sx={{ objectFit: "fill" }}
                />
                <CardContent>
                  <Typography variant="body1" color="text.secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fugiat voluptatibus dolorem illum nulla molestiae autem,
                    vero pariatur sit sequi
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      textAlign: "center",
                      mt: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <PersonIcon sx={{ mr: 1, color: "text.primary" }} />
                      <Typography variant="body2" color="text.secondary">
                        by, Vishal Shah
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      2024-07-11 11:11
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            textAlign: "center",
            alignItems: "center",
            mt: 4,
          }}
        >
          <Typography variant={isMobile ? "h6" : "h4"} fontWeight={800}>
            Top News
          </Typography>
          <Link to="/news">
            <Button
              sx={{
                textTransform: "capitalize",
                color: "gray",
                fontSize: isMobile ? 16 : 20,
              }}
            >
              More <KeyboardArrowRightIcon />
            </Button>
          </Link>
        </Box>

        <Grid container spacing={2}>
          {/* First Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ margin: "auto", mt: 4 }}>
              <CardMedia
                component="img"
                height="200"
                image="https://sc0.blr1.cdn.digitaloceanspaces.com/book/201826-uaficpcydh-1719816029.jpg"
                alt="news1"
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="body1" color="text.secondary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Fugiat voluptatibus dolorem illum nulla molestiae autem, vero
                  pariatur sit sequi
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PersonIcon sx={{ mr: 1, color: "text.primary" }} />
                    <Typography variant="body2" color="text.secondary">
                      by, Vishal Shah
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    2024-07-11 11:11
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Second Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ margin: "auto", mt: 4 }}>
              <CardMedia
                component="img"
                height="200"
                image="https://image.cnbcfm.com/api/v1/image/108004119-240710_cw_thumbnail.jpg?v=1720637051&w=750&h=422&vtcrop=y"
                alt="news2"
                sx={{ objectFit: "fill" }}
              />
              <CardContent>
                <Typography variant="body1" color="text.secondary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Fugiat voluptatibus dolorem illum nulla molestiae autem, vero
                  pariatur sit sequi
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PersonIcon sx={{ mr: 1, color: "text.primary" }} />
                    <Typography variant="body2" color="text.secondary">
                      by, Vishal Shah
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    2024-07-11 11:11
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Third Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ margin: "auto", mt: 4 }}>
              <CardMedia
                component="img"
                height="200"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPcqivCB4luDYB7D4HaMk6GRgXGDcaG_fGiw&s"
                alt="news3"
                sx={{ objectFit: "fill" }}
              />
              <CardContent>
                <Typography variant="body1" color="text.secondary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Fugiat voluptatibus dolorem illum nulla molestiae autem, vero
                  pariatur sit sequi
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PersonIcon sx={{ mr: 1, color: "text.primary" }} />
                    <Typography variant="body2" color="text.secondary">
                      by, Vishal Shah
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    2024-07-11 11:11
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            textAlign: "center",
            alignItems: "center",
            mt: 4,
          }}
        >
          <Typography variant={isMobile ? "h6" :"h4"} fontWeight={800}>
            Trending News
          </Typography>
          <Link to="/news">
            <Button
              sx={{ textTransform: "capitalize", color: "gray", fontSize: isMobile ? 16 :20 }}
            >
              More <KeyboardArrowRightIcon />
            </Button>
          </Link>
        </Box>

        <Grid container spacing={2}>
          {/* First Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ margin: "auto", mt: 4 }}>
              <CardMedia
                component="img"
                height="200"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb6GBo9-NJtYpKVS3sHtaT2uh5dATxORlyyA&s"
                alt="news1"
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="body1" color="text.secondary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Fugiat voluptatibus dolorem illum nulla molestiae autem, vero
                  pariatur sit sequi
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PersonIcon sx={{ mr: 1, color: "text.primary" }} />
                    <Typography variant="body2" color="text.secondary">
                      by, Vishal Shah
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    2024-07-11 11:11
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Second Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ margin: "auto", mt: 4 }}>
              <CardMedia
                component="img"
                height="200"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhv8LFLmO4-Q-Td7Ovw7R4IzOcmFmBF5vFOg&s"
                alt="news2"
                sx={{ objectFit: "fill" }}
              />
              <CardContent>
                <Typography variant="body1" color="text.secondary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Fugiat voluptatibus dolorem illum nulla molestiae autem, vero
                  pariatur sit sequi
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PersonIcon sx={{ mr: 1, color: "text.primary" }} />
                    <Typography variant="body2" color="text.secondary">
                      by, Vishal Shah
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    2024-07-11 11:11
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Third Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ margin: "auto", mt: 4 }}>
              <CardMedia
                component="img"
                height="200"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFtEPwKHXE0w36wxAe838uaGFBJUzQ3Nup4w&s"
                alt="news3"
                sx={{ objectFit: "fill" }}
              />
              <CardContent>
                <Typography variant="body1" color="text.secondary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Fugiat voluptatibus dolorem illum nulla molestiae autem, vero
                  pariatur sit sequi
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PersonIcon sx={{ mr: 1, color: "text.primary" }} />
                    <Typography variant="body2" color="text.secondary">
                      by, Vishal Shah
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    2024-07-11 11:11
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;

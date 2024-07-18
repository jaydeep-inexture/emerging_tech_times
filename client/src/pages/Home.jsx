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
  Chip,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useMobile } from "../context/isMobileContext";
import ArticleCard from "./ArticleCard";
const Home = () => {
  const isMobile = useMobile();
  const articles = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFtEPwKHXE0w36wxAe838uaGFBJUzQ3Nup4w&s",
      title: "Have You Met the Next Generation of AutoGPT?",
      author: "Vishal Shah",
      date: "July 16, 2024",
      description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem quos nulla doloribus ratione amet fuga delectus facilis, architecto hic dolore!",
       
      category: "AI NEWS",
    },
    {
      image:
        "https://www.livemint.com/lm-img/img/2024/07/08/600x338/PTI07-08-2024-000210B-0_1720443963570_1720443995911.jpg",
      title: "AI Advances in Healthcare",
      author: "Dharmesh Patel",
      date: "July 15, 2024",
      description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem quos nulla doloribus ratione amet fuga delectus facilis, architecto hic dolore!",
      category: "HEALTHCARE",
    },

    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFtEPwKHXE0w36wxAe838uaGFBJUzQ3Nup4w&s",
      title: "AI and the Future of Work",
      author: "Dhruv Patel",
      date: "July 12, 2024",
      description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem quos nulla doloribus ratione amet fuga delectus facilis, architecto hic dolore!",
      category: "BUSINESS",
    },
  ];
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: isMobile ? " 500px" : "400px",
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
                sx={{
                  marginTop: "13%",
                }}
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

      <Box sx={{ paddingX: isMobile ? "10%" :"12%", marginTop: 4, marginBottom: 5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant={isMobile ? "h6" : "h4"}
            fontWeight={800}
            textTransform={"uppercase"}
          >
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
            flexDirection: "column",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column" ,
                  height: "100%",
                  marginTop: 3,
                  boxShadow: "none",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: "100%" ,height:'100%' }}
                  image={articles[0].image}
                  alt={articles[0].title}
                />
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      component="div"
                      variant="h5"
                      fontWeight={900}
                      textTransform={"capitalize"}
                    >
                      {articles[0].title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      {articles[0].author} - {articles[0].date}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1.5 }}
                    >
                      {articles[0].description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 1 }}>
                    <Chip label={articles[0].category} variant="outlined" />
                  </Box>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              {articles.map((article, index) => (
                <ArticleCard key={index} {...article} />
              ))}
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
          <Typography
            variant={isMobile ? "h6" : "h4"}
            fontWeight={800}
            textTransform={"uppercase"}
          >
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

        
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Grid>
            {articles.map((article, index) => (
              <ArticleCard {...article} />
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            textAlign: "",
            alignItems: "center",
            mt: 4,
          }}
        >
          <Typography
            variant={isMobile ? "h6" : "h4"}
            fontWeight={800}
            textTransform={"uppercase"}
          >
            Trending News
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
          <Grid>
            {articles.reverse().map((article, index) => (
              // <Grid item key={index} xs={12} sm={6}>
              <ArticleCard {...article} />
              // </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Home;

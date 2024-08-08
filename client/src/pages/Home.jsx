import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Banner from "@/components/Banner";
import CategoryCard from "@/components/CategoryCard";
import { CONSTANTS } from "@/helpers/constants";
import { setNotification } from "@/redux/notificationSlice";
import { fetchPostList, resetPosts, setLoading } from "@/redux/postSlice";
import ArticleCard from "./ArticleCard";
import Placeholder from "@/assets/placeholder.jpg";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, page } = useSelector((state) => state.post);

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(setLoading(true));

      try {
        dispatch(fetchPostList({ page, limit: 3 }));
      } catch (error) {
        const errMessage =
          error.response?.data?.msg ||
          error.response?.data?.errors?.[0]?.msg ||
          "An error occurred";
        dispatch(
          setNotification({
            type: "error",
            message: errMessage,
          }),
        );
        dispatch(setLoading(false));
      }
    };

    fetchPosts();

    return () => {
      dispatch(resetPosts());
    };
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ height: "400px", position: "relative" }}>
        <Banner />
      </Box>

      <Box sx={{ padding: "20px 10%" }}>
        {/* Latest news */}
        {posts.length > 0 && (
          <Box sx={{ paddingX: 2, marginTop: 6 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              <Typography variant="h5" fontWeight={700}>
                Latest News
              </Typography>
              <Button
                component={Link}
                to="/news"
                variant="text"
                color="primary"
                sx={{
                  textTransform: "capitalize",
                  fontWeight: 700,
                  borderRadius: 8,
                  paddingX: 2,
                  paddingY: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover": {
                    backgroundColor: "white !important",
                  },
                }}
              >
                More
                <KeyboardArrowRightIcon />
              </Button>
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
                      flexDirection: "column",
                      height: "100%",
                      boxShadow: "none",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: "100%", height: "100%" }}
                      image={posts[0].imageUrl ? posts[0].imageUrl : Placeholder}
                      alt={posts[0].title}
                    />
                    <Box
                      sx={{ display: "flex", flexDirection: "column", flex: 1 }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          component="div"
                          variant="h5"
                          fontWeight={900}
                          textTransform={"capitalize"}
                        >
                          {posts[0].title}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          {`By ${posts[0].author.name} on ${new Date(
                            posts[0].createdAt,
                          ).toLocaleDateString()}`}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 1.5 }}
                        >
                          {posts[0].description}
                        </Typography>
                      </CardContent>
                      <Box sx={{ p: 1 }}>
                        <Chip label={posts[0].category} variant="outlined" />
                      </Box>
                    </Box>
                  </Card>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  {posts.map((article, index) => (
                    <ArticleCard key={index} {...article} />
                  ))}
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}

        {/* Trending News
        <Box sx={{ paddingX: 2, marginTop: 6 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Typography variant="h5" fontWeight={700}>
              Trending News
            </Typography>
            <Button
              component={Link}
              to="/news"
              variant="text"
              color="primary"
              sx={{
                textTransform: "capitalize",
                fontWeight: 700,
                borderRadius: 8,
                paddingX: 2,
                paddingY: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&:hover": {
                  backgroundColor: "white !important",
                },
              }}
            >
              More
              <KeyboardArrowRightIcon />
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {posts?.map((article, index) => (
                <ArticleCard key={index} {...article} />
              ))}
            </Grid>
          </Box>
        </Box> */}

        {/* Browse through categories */}
        <Box sx={{ paddingX: 2, margin: "32px 0" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Typography variant="h5" fontWeight={700}>
              Browse by Category
            </Typography>
            <Button
              component={Link}
              to="/news"
              variant="text"
              color="primary"
              sx={{
                textTransform: "capitalize",
                fontWeight: 700,
                borderRadius: 8,
                paddingX: 2,
                paddingY: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&:hover": {
                  backgroundColor: "white !important",
                },
              }}
            >
              More
              <KeyboardArrowRightIcon />
            </Button>
          </Box>

          <Grid container spacing={2}>
            {CONSTANTS.CATEGORIES.slice(0, 4).map((category) => (
              <Grid item xs={12} sm={6} md={3} key={category.name}>
                <CategoryCard {...category} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

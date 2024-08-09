import { useIsMobile } from "@/hooks/useIsMobile";
import { setNotification } from "@/redux/notificationSlice";
import { fetchPostList, resetPosts, setLoading } from "@/redux/postSlice";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const NewsData = ({ title }) => {
  const { isMobile } = useIsMobile();
  const dispatch = useDispatch();
  const { posts, page, limit, loading } = useSelector((state) => state.post);

  const [visibleItems, setVisibleItems] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(setLoading(true));

      try {
        dispatch(fetchPostList({ page, limit }));
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

  const loadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
  };

  const displayedData = posts.slice(0, visibleItems);

  return (
    <>
      <Box sx={{ paddingX: "5%" }}>
        <Typography
          variant={isMobile ? "h4" : "h2"}
          gutterBottom
          fontWeight={800}
          fontStyle={"italic"}
        >
          {title}
        </Typography>
        <Grid container spacing={4}>
          {displayedData.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <Card sx={{ height: "400px" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.imageUrl}
                  alt={item.title}
                  sx={{ objectFit: "contain" }}
                />
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div style={{ textAlign: "center", margin: "50px 0" }}>
          {loading ? (
            <CircularProgress />
          ) : (
            visibleItems < posts.length && (
              <Button
                variant="contained"
                color="primary"
                onClick={loadMore}
                sx={{ width: "300px", fontWeight: 800, paddingY: 1 }}
              >
                Load More
              </Button>
            )
          )}
        </div>
      </Box>
    </>
  );
};

export default NewsData;

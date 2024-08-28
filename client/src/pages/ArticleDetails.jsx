import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { fetchPostList, resetPosts, setSelectedPost } from "../redux/postSlice";
import { setNotification } from "@/redux/notificationSlice";
import { setLoading } from "@/redux/postSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useEffect } from "react";
import { fetchPostDetails } from "@/helpers/api";
import Spinner from "@/common/Spinner";
import {
  Person,
  Visibility,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import Placeholder from "@/assets/placeholder.jpg";
import { red } from "@mui/material/colors";
import { likedPost } from "../helpers/api";

const ArticleDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { isMobile } = useIsMobile();
  const { selectedPost, loading, posts, page, limit } = useSelector(
    (state) => state.post
  );
  const fetchPostInfo = async () => {
    dispatch(setLoading(true));
    try {
      const data = await fetchPostDetails(id);
      dispatch(setSelectedPost(data));
      dispatch(setLoading(false));
    } catch (error) {
      const errMessage =
        error.response?.data?.msg ||
        error.response?.data?.errors?.[0]?.msg ||
        "An error occurred";
      dispatch(
        setNotification({
          type: "error",
          message: errMessage,
        })
      );
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (id) {
      fetchPostInfo();
    }

    return () => {
      dispatch(setSelectedPost(null));
    };
  }, [id]);

  const randomNumber = Math.floor(Math.random() * (1500 - 1000 + 1)) + 1000;

  const fetchLatestPosts = async () => {
    dispatch(resetPosts());
    dispatch(setLoading(true));
    try {
      await dispatch(fetchPostList({ page, limit }));
    } catch (error) {
      const errMessage =
        error.response?.data?.msg ||
        error.response?.data?.errors?.[0]?.msg ||
        "An error occurred";
      dispatch(
        setNotification({
          type: "error",
          message: errMessage,
        })
      );
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchLatestPosts();
  }, []);
  const navigate = useNavigate();
  const handleClick = (article) => {
    navigate(`/article/${article._id}`, { state: { article } });
  };
  const likedData = async () => {
    dispatch(resetPosts());
    dispatch(setLoading(true));
    try {
      const response = await likedPost(selectedPost?._id);
      fetchPostInfo();
      dispatch(setLoading(false));
      console.log({ response });
    } catch (error) {
      const errMessage =
        error.response?.data?.msg ||
        error.response?.data?.errors?.[0]?.msg ||
        "An error occurred";
      dispatch(
        setNotification({
          type: "error",
          message: errMessage,
        })
      );
      dispatch(setLoading(false));
    }
  };
  const handleLike = () => {
    likedData();
  };
  const handleUnlike = () => {
    likedData();
  };
  return (
    <>
      {loading && <Spinner />}
      <Box
        bgcolor={"rgb(28, 58, 68)"}
        sx={{
          paddingX: isMobile ? "5%" : "10%",
          marginBottom: isMobile ? "10%" : "5%",
          position: "relative",
          minHeight: "65vh",
        }}
      >
        <Typography
          variant={isMobile ? "h6" : "h4"}
          fontWeight={800}
          textAlign={"center"}
          color={"white"}
          py={"5%"}
        >
          {selectedPost?.title}
        </Typography>
        <img
          src={selectedPost?.imageUrl ? selectedPost?.imageUrl : Placeholder}
          alt={selectedPost?.title}
          style={{
            width: isMobile ? "100%" : "55vw",
            height: "55vh",
            borderRadius: "16px",
            border: "1px solild black",
            position: "absolute",
            top: "40%",
            left: "22%",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
          }}
        />
      </Box>

      <Box mt="20vh" mx={10}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{
            borderBottom: "1px solid #e0e0e0",
            pb: 2,
            mb: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              color: "gray",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Person sx={{ fontSize: 20, mr: 1 }} />
            {`By ${selectedPost?.author.name} on ${new Date(
              selectedPost?.createdAt
            ).toLocaleDateString()}`}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {" "}
            <Typography
              sx={{
                fontSize: 18,
                color: "gray",
                display: "flex",
                alignItems: "center",
                mr: 2,
              }}
            >
              <Visibility sx={{ fontSize: 20, mr: 1 }} />
              {randomNumber}
            </Typography>
            <Typography
              sx={{
                fontSize: 18,
                color: "gray",
                display: "flex",
                alignItems: "center",
              }}
            >
              {!selectedPost?.isLiked ? (
                <FavoriteBorder
                  sx={{ fontSize: 30, mr: 1 }}
                  onClick={handleLike}
                />
              ) : (
                <Favorite
                  sx={{ fontSize: 30, mr: 1, color: red[500] }}
                  onClick={handleUnlike}
                />
              )}
            </Typography>
            <Typography sx={{ fontSize: 18, color: "gray" }}>
              {selectedPost?.likesCount}
            </Typography>
          </Box>
        </Stack>

        {/* Article Description */}
        <Typography fontSize={20} mt={1} whiteSpace="pre-wrap">
          {selectedPost?.description}
        </Typography>

        {/* Author Information Box */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #e0e0e0",
            borderRadius: "10px",
            p: "10px",
            mt: "5vh",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Stack direction="row" spacing={2}>
            <Avatar
              sx={{
                width: 60,
                height: 60,
                backgroundColor: "#f5f5f5",
                marginRight: "1rem",
              }}
            >
              <Person sx={{ fontSize: 30 }} />
            </Avatar>
            <Stack>
              <Typography variant="h6" color="black">
                Written by
              </Typography>
              <Typography variant="subtitle1" color="orange">
                {selectedPost?.author.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedPost?.author.description}
              </Typography>
            </Stack>
          </Stack>
        </Box>

        {/* Recommended Blogs */}
        <Box my={5}>
          <Typography variant="h5" fontWeight={600} mb={2}>
            Recommended Blogs
          </Typography>
          <Grid container spacing={4} py={2}>
            {(posts.length <= 5 ? posts : posts.slice(0, 4))
              .filter((post) => post.title !== selectedPost?.title)
              .slice(0, 4)
              .map((post) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                      borderRadius: "16px",
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-8px)",
                      },
                    }}
                    onClick={() => handleClick(post)}
                  >
                    <CardMedia
                      component="img"
                      image={post.imageUrl || Placeholder}
                      alt={post.title}
                      sx={{
                        height: 180,
                        borderRadius: "16px 16px 0 0",
                      }}
                    />
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{
                          fontWeight: 700,
                          fontSize: isMobile ? "1rem" : "1.2rem",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {post.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          flexGrow: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {post.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>

      {/* Additional Posts Displayed as Cards */}
    </>
  );
};

export default ArticleDetails;

import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
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
import { Person } from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
// import { fetchPostList } from "../redux/postSlice";
const ArticleDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { isMobile } = useIsMobile();
  const { selectedPost, loading, posts, page, limit } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
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

    if (id) {
      fetchPostInfo();
    }

    return () => {
      dispatch(setSelectedPost(null));
    };
  }, [dispatch, id]);

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
  return (
    <>
      {loading && <Spinner />}
      <Box
        sx={{
          paddingX: "10%",
          marginBottom: isMobile ? "10%" : "5%",
          marginTop: "2%",
          minHeight: "70vh",
        }}
      >
        {/* Main Article Details */}
        <Box>
          <Typography
            variant={isMobile ? "h6" : "h4"}
            textTransform={"uppercase"}
            fontWeight={800}
          >
            {selectedPost?.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              my: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                radius="xl"
                sx={{ width: 60, height: 60, marginRight: "1rem" }}
              >
                <Person sx={{ fontSize: 30 }} />
              </Avatar>
              <Stack>
                <Typography color="text.secondary" fontSize={20}>
                  {`By ${selectedPost?.author.name}`}
                </Typography>
                <Typography color="text.secondary" fontSize={"sm"}>
                  {new Date(selectedPost?.createdAt).toLocaleDateString()}
                </Typography>
              </Stack>
              <Stack sx={{ marginLeft: "50px", alignItems: "center" }}>
                <Visibility sx={{ fontSize: 20, color: "gray" }} />
                <Typography color="text.secondary" fontSize={"md"}>
                  {randomNumber}
                </Typography>
              </Stack>
            </Box>

            {selectedPost?.category && (
              <Chip label={selectedPost?.category} variant="outlined" />
            )}
          </Box>

          <Typography fontSize={20} mt={1} whiteSpace="pre-wrap">
            <img
              src={selectedPost?.imageUrl}
              alt={selectedPost?.title}
              style={{
                width: isMobile ? "100%" : "30%",
                height: "100%",
                float: isMobile ? "none" : "right",
                padding: isMobile ? "8px 0" : "8px",
              }}
            />
            {selectedPost?.description}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid gray",
            borderRadius: "10px",
            p: "10px",
            mt: "20px",
          }}
        >
          <Stack spacing={0} direction={"row"}>
            <Avatar radius="xl" size="lg" sx={{ marginRight: "1rem" }}>
              <Person size={24} />
            </Avatar>
            <Stack>
              <Typography variant="h6" color="black">
                Written by
              </Typography>
              <Typography variant="subtitle1" color="orange">
                {selectedPost?.author.name}
              </Typography>
              <Typography size="sm" color="dimmed">
                {selectedPost?.author.description}
              </Typography>
            </Stack>
          </Stack>
        </Box>
        {/* Additional Posts Displayed as Cards */}
        <Box sx={{ marginTop: "40px" }}>
          <Typography variant="h5" fontWeight={600}>
            Recommended
          </Typography>
          <Grid container spacing={4} sx={{ marginTop: "20px" }}>
            {posts
              .filter((post) => post.title !== selectedPost?.title) // Filter out the selected post
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
                      image={post.imageUrl}
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
    </>
  );
};

export default ArticleDetails;

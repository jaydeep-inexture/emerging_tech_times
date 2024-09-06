import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { fetchPostList, resetPosts, setSelectedPost } from "../redux/postSlice";
import { setNotification } from "@/redux/notificationSlice";
import { setLoading } from "@/redux/postSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useEffect, useState } from "react";
import { fetchPostDetails } from "@/helpers/api";
import Spinner from "@/common/Spinner";
import {
  Person,
  Visibility,
  Favorite,
  FavoriteBorder,
  Telegram,
  Twitter,
  Facebook,
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

  useEffect(() => {
    fetchLatestPosts();
  }, []);

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

  const navigate = useNavigate();
  const handleClick = (article) => {
    navigate(`/article/${article._id}`, { state: { article } });
  };
  const likedData = async () => {
    dispatch(resetPosts());
    dispatch(setLoading(true));
    try {
      await likedPost(selectedPost?.data._id);
      fetchPostInfo();
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
  const handleLike = () => {
    likedData();
  };
  const handleUnlike = () => {
    likedData();
  };
  const [toc, setToc] = useState([]);
  const [updatedPost, setUpdatedPost] = useState(selectedPost);
  useEffect(() => {
    if (selectedPost?.data.description) {
      // Parse the HTML string
      const parser = new DOMParser();
      const doc = parser.parseFromString(
        selectedPost.data.description,
        "text/html"
      );
      const headings = doc.querySelectorAll(" h2, h3, h4");
      headings.forEach((heading, index) => {
        if (!heading.id) {
          heading.id = `${heading.tagName.toLowerCase()}-${index}`;
        }
      });
      const tocItems = Array.from(headings).map((heading) => ({
        id: heading.id,
        text: heading.innerText,
        level: parseInt(heading.tagName.replace("H", ""), 10),
      }));

      setToc(tocItems);

      const updatedDescription = doc.body.innerHTML;
      setUpdatedPost((prev) => ({
        ...prev,
        description: updatedDescription,
      }));
    }
  }, [selectedPost]);
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
          variant={isMobile ? "h4" : "h2"}
          fontWeight={800}
          textAlign={"center"}
          color={"white"}
          py={"5%"}
        >
          {selectedPost?.data.title}
        </Typography>
        <img
          src={
            selectedPost?.data.imageUrl
              ? selectedPost?.data.imageUrl
              : Placeholder
          }
          alt={selectedPost?.data.title}
          style={{
            width: isMobile ? "100%" : "55vw",
            height: "55vh",
            borderRadius: "16px",
            border: "1px solild black",
            position: "absolute",
            top: "40%",
            left: isMobile ? 0 : "22%",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
          }}
        />
      </Box>

      <Box mt="20vh" mx={isMobile ? 5 : 10}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{
            borderBottom: "1px solid #e0e0e0",
            pb: isMobile ? 1 : 2,
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
            {`By ${selectedPost?.data.author.name} on ${new Date(
              selectedPost?.data.createdAt
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
              {!selectedPost?.data.isLiked ? (
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
              {selectedPost?.data.likesCount}
            </Typography>
          </Box>
        </Stack>

        {/* Article Description */}
        <Grid container spacing={2}>
          {/* Left Side - Table of Contents */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                position: "sticky",
                top: "20px",
              }}
            >
              {/* Table of Contents Box */}
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "16px",
                  backgroundColor: "#ffffff", 
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
                }}
              >
                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  textAlign="center"
                  sx={{ color: "#333" }} 
                >
                  On This Page:
                </Typography>
                <ul
                  style={{
                    padding: "0",
                    margin: "16px 0 0 0", 
     
                  }}
                >
                  {toc.map((item) => (
                    <li
                      key={item.id}
                      style={{
                        marginLeft: `${(item.level - 1) * 10}px`,
                        marginBottom: "8px",
                      }}
                    >
                      <a
                        href={`#${item.id}`}
                        style={{
                          textDecoration: "none",
                          color: "#007bff", 
                          fontWeight: 500,
                        }}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </Box>

              {/* Social Media Sharing Box */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "12px 16px", // Balanced padding for content
                  backgroundColor: "#ffffff",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Same shadow as above for consistency
                  marginTop: "16px", // Space between the two boxes
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: "#333", fontWeight: 500 }}
                >
                  Don&apos;t forget to share:
                </Typography>
                <Box sx={{ display: "flex", gap: "8px" }}>
                  <IconButton href="https://facebook.com" color="inherit">
                    <Facebook
                      sx={{
                        fontSize: 30,
                        color: "#3b5998",
                        "&:hover": {
                          backgroundColor: "#f0f2f5",
                        },
                      }}
                    />
                  </IconButton>
                  <IconButton href="https://twitter.com" color="inherit">
                    <Twitter
                      sx={{
                        fontSize: 30,
                        color: "#1DA1F2",
                        "&:hover": {
                          backgroundColor: "#e8f5fe",
                        },
                      }}
                    />
                  </IconButton>
                  <IconButton href="https://telegram.com" color="inherit">
                    <Telegram
                      sx={{
                        fontSize: 30,
                        color: "#0088cc",
                        "&:hover": {
                          backgroundColor: "#e0f4fc",
                        },
                      }}
                    />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Right Side - Article Description */}
          <Grid item xs={12} md={8}>
            <Typography
              fontSize={isMobile ? 15 : 20}
              mt={1}
              whiteSpace="pre-wrap"
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: updatedPost?.description,
                }}
              />
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
                p: "10px",
                mt: "5vh",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                // backgroundColor: "#f9f9f9",
              }}
            >
              <Stack direction="row" spacing={2} my={3}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    // backgroundColor: "#f5f5f5",
                    marginRight: "1rem",
                  }}
                >
                  <Person sx={{ fontSize: 30 }} />
                </Avatar>
                <Stack>
                  <Typography variant="h5" color="black">
                    Written by
                  </Typography>
                  <Typography variant="subtitle1" color={"#0F172A"}>
                    {selectedPost?.data.author.name}
                  </Typography>
                  <Typography variant="body2">
                    {selectedPost?.data.author.description}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Grid>
        {/* Author Information Box */}

        {/* Recommended Blogs */}
        <Box my={5}>
          <Typography variant="h5" fontWeight={600} mb={2}>
            Recommended Blogs
          </Typography>
          <Grid container spacing={4} py={2}>
            {(posts.length <= 5 ? posts : posts.slice(0, 4))
              .filter((post) => post.title !== selectedPost?.data.title)
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
                        variant="h4"
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
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              post.description.length > 175
                                ? `${post.description.substring(0, 175)}...`
                                : post.description,
                          }}
                        />
                        {/* {post.description} */}
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

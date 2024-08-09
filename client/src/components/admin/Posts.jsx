import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Placeholder from "@/assets/placeholder.jpg";
import DeletePopup from "@/common/DeletePopup";
import Spinner from "@/common/Spinner";
import { deletePost } from "@/helpers/api";
import { setNotification } from "@/redux/notificationSlice";
import {
  fetchPostList,
  incrementPage,
  resetPage,
  resetPosts,
  setLoading,
  setSelectedPost,
} from "@/redux/postSlice";

const Posts = ({ setActiveTab }) => {
  const dispatch = useDispatch();
  const { posts, selectedPost, page, limit, hasMore, dataFetched, loading } =
    useSelector((state) => state.post);

  const [openDialog, setOpenDialog] = useState(false);

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

  const handleEdit = (post) => {
    dispatch(setSelectedPost(post));
    setActiveTab(2);
  };

  const handleDelete = (post) => {
    dispatch(setSelectedPost(post));
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    setLoading(true);

    try {
      const data = await deletePost(selectedPost._id);
      dispatch(
        setNotification({
          type: "success",
          message: data.msg,
        }),
      );
      dispatch(resetPosts());
      setOpenDialog(false);
      setLoading(false);
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

  const handleCloseDialog = () => {
    setOpenDialog(false);
    dispatch(setSelectedPost(null));
  };

  // stop data fetching while changing tabs if data is already fetched(inital)
  useEffect(() => {
    if (!dataFetched) {
      fetchPosts();
    }
  }, [dispatch, dataFetched]);

  // stop data fetching while changing tabs if data is already fetched(load more)
  useEffect(() => {
    return () => {
      dispatch(resetPage());
    };
  }, [dispatch]);

  // Load more data
  useEffect(() => {
    if (page > 0 && dataFetched) {
      fetchPosts();
    }
  }, [page, dataFetched]);

  return (
    <>
      {loading && <Spinner />}
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Posts
        </Typography>
        {posts?.length > 0 ? (
          <Grid container spacing={2}>
            {posts?.map((post) => (
              <Grid item xs={12} sm={6} md={3} key={post._id}>
                <Card
                  sx={{
                    maxWidth: 345,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    border: "1px solid #e0e0e0",
                    boxShadow: 3,
                    "&:hover": {
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={post.title}
                    height="140"
                    image={post.imageUrl ? post.imageUrl : Placeholder}
                    sx={{ objectFit: "cover", width: "100%" }}
                  />

                  <CardHeader
                    title={post.title}
                    subheader={`By ${post.author.name} on ${new Date(
                      post.createdAt,
                    ).toLocaleDateString()}`}
                    sx={{
                      backgroundColor: "#f5f5f5",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      {post.description.length > 155
                        ? `${post.description.substring(0, 155)}...`
                        : post.description}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" color="text.primary">
                        Author Details:
                      </Typography>
                      {post.author.description && (
                        <Typography variant="body2" color="text.secondary">
                          {post.author.description}
                        </Typography>
                      )}
                      {post.category && (
                        <Chip
                          sx={{
                            mt: 2,
                            p: "20px 0",
                            fontSize: "16px",
                            textTransform: "capitalize",
                          }}
                          label={post.category}
                          variant="outlined"
                        />
                      )}
                      <Box
                        sx={{
                          display: "flex",
                          mt: 2,
                          gap: 2,
                        }}
                      >
                        {post.author.socials.instagram && (
                          <IconButton
                            sx={{
                              borderRadius: "8px",
                              height: "40px",
                              width: "40px",
                              border: "1px solid #0F172A",
                            }}
                          >
                            <Link
                              className="link"
                              href={post.author.socials.instagram}
                              target="_blank"
                              sx={{
                                lineHeight: "0",
                              }}
                            >
                              <InstagramIcon />
                            </Link>
                          </IconButton>
                        )}
                        {post.author.socials.twitter && (
                          <IconButton
                            sx={{
                              borderRadius: "8px",
                              height: "40px",
                              width: "40px",
                              border: "1px solid #0F172A",
                            }}
                          >
                            <Link
                              className="link"
                              href={post.author.socials.twitter}
                              target="_blank"
                              sx={{
                                lineHeight: "0",
                              }}
                            >
                              <TwitterIcon />
                            </Link>
                          </IconButton>
                        )}
                        {post.author.socials.linkedin && (
                          <IconButton
                            sx={{
                              borderRadius: "8px",
                              height: "40px",
                              width: "40px",
                              border: "1px solid #0F172A",
                            }}
                          >
                            <Link
                              className="link"
                              href={post.author.socials.linkedin}
                              target="_blank"
                              sx={{
                                lineHeight: "0",
                              }}
                            >
                              <LinkedInIcon />
                            </Link>
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(post)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(post)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "60vh",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" color="text.secondary">
              No Data to show
            </Typography>
          </Box>
        )}

        {hasMore && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => dispatch(incrementPage())}
            >
              Load More
            </Button>
          </Box>
        )}

        <DeletePopup
          open={openDialog}
          onClose={handleCloseDialog}
          title={selectedPost?.title}
          handleClose={handleCloseDialog}
          handleDelete={confirmDelete}
        />
      </Box>
    </>
  );
};

export default Posts;

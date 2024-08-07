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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setNotification } from "@/redux/notificationSlice";
import { fetchPostList, setLoading } from "@/redux/postSlice";

const Posts = ({ setActiveTab }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchPosts = async () => {
    try {
      dispatch(fetchPostList());
    } catch (error) {
      const errMessage =
        error.response.data.msg ||
        error.response.data?.errors?.[0]?.msg ||
        "An error occurred";
      dispatch(
        setNotification({
          type: "error",
          message: errMessage,
        }),
      );
      dispatch(dispatch(setLoading(false)));
    }
  };

  useEffect(() => {
    if (!posts) {
      fetchPosts();
    }
  }, [dispatch]);

  const handleEdit = (post) => {
    setActiveTab(2);
  };

  const handleDelete = (post) => {
    setSelectedPost(post);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    // try {
    //   await axios.delete(`${env.API_URL}/posts/${selectedPost._id}`);
    //   dispatch(
    //     setPosts((prevPosts) =>
    //       prevPosts.filter((post) => post._id !== selectedPost._id),
    //     ),
    //   );
    //   setOpenDialog(false);
    // } catch (error) {
    //   console.error("Error deleting post:", error);
    // }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPost(null);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      {posts?.length > 0 ? (
        <Grid container spacing={2}>
          {posts?.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
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
                {post.imageUrl && (
                  <CardMedia
                    component="img"
                    alt={post.title}
                    height="140"
                    image={post.imageUrl}
                    sx={{ objectFit: "cover", width: "100%" }}
                  />
                )}
                <CardHeader
                  title={post.title}
                  subheader={`By ${post.author.name} on ${new Date(
                    post.date,
                  ).toLocaleDateString()}`}
                  sx={{
                    backgroundColor: "#f5f5f5",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {post.description}
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
                    <Box sx={{ display: "flex", mt: 1 }}>
                      {post.author.socials.instagram && (
                        <IconButton
                          href={post.author.socials.instagram}
                          target="_blank"
                        >
                          <InstagramIcon />
                        </IconButton>
                      )}
                      {post.author.socials.twitter && (
                        <IconButton
                          href={post.author.socials.twitter}
                          target="_blank"
                        >
                          <TwitterIcon />
                        </IconButton>
                      )}
                      {post.author.socials.linkedin && (
                        <IconButton
                          href={post.author.socials.linkedin}
                          target="_blank"
                        >
                          <LinkedInIcon />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
                  <IconButton color="primary" onClick={() => handleEdit(post)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(post)}>
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

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the post titled "
            {selectedPost?.title}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Posts;

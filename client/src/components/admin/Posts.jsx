import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';


import { env } from '@/helpers/env';

const Posts = ({setActiveTab}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${env.API_URL}/posts`);
        setPosts(response.data.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleEdit = (post) => {
    setActiveTab(2);
  };

  const handleDelete = (post) => {
    setSelectedPost(post);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${env.API_URL}/posts/${selectedPost._id}`);
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== selectedPost._id),
      );
      setOpenDialog(false);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPost(null);
  };

  return (
    <Box sx={{p: 2}}>
      <Typography variant='h4' gutterBottom>
        Posts
      </Typography>
      {posts.length > 0 ? (
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <Card
                sx={{
                  maxWidth: 345,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                {post.imageUrl && (
                  <CardMedia
                    component='img'
                    alt={post.title}
                    height='140'
                    image={post.imageUrl}
                    sx={{objectFit: 'cover'}}
                  />
                )}
                <CardContent sx={{flexGrow: 1}}>
                  <Typography gutterBottom variant='h6' component='div'>
                    {post.title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {post.description}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{mt: 1}}
                  >
                    <strong>Author:</strong> {post.author.name}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    <strong>Date:</strong>{' '}
                    {new Date(post.date).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardActions sx={{justifyContent: 'space-between'}}>
                  <IconButton
                    color='primary'
                    onClick={() => handleEdit(post)}
                    sx={{mr: 1}}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton color='error' onClick={() => handleDelete(post)}>
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '60vh',
            textAlign: 'center',
          }}
        >
          <Typography variant='h6' color='text.secondary'>
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
          <Button onClick={handleCloseDialog} color='primary'>
            Cancel
          </Button>
          <Button onClick={confirmDelete} color='error'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Posts;

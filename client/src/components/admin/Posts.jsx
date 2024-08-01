import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {dummyArticles} from '../../constants/constants';

const PostList = ({posts}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (post) => {
    navigate('/post-form', {state: {post}});
  };

  const handleDelete = (post) => {
    setSelectedPost(post);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    console.log('Deleting post:', selectedPost);
    setOpenDialog(false);
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
      <Grid container spacing={2}>
        {dummyArticles.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post._id}>
            <Card sx={{maxWidth: 345, height: 400}}>
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
                <Typography variant='body2' color='text.secondary' sx={{mt: 1}}>
                  <strong>Author:</strong> {post.author.name}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  <strong>Date:</strong>{' '}
                  {new Date(post.date).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions sx={{justifyContent: 'flex-end'}}>
                <IconButton color='primary' onClick={() => handleEdit(post)}>
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

export default PostList;

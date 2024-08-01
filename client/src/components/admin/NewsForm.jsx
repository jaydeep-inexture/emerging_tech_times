import {Box, Button, Grid, TextField, Typography} from '@mui/material';
import {useState} from 'react';

const PostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    seoTitle: '',
    seoDescription: '',
    seoSlug: '',
    authorName: '',
    authorDescription: '',
    authorTwitter: '',
    authorInstagram: '',
    authorLinkedin: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description)
      newErrors.description = 'Description is required';
    if (!formData.authorName) newErrors.authorName = 'Author Name is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log(formData);

      // Clear form data
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        seoTitle: '',
        seoDescription: '',
        seoSlug: '',
        authorName: '',
        authorDescription: '',
        authorTwitter: '',
        authorInstagram: '',
        authorLinkedin: '',
      });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{p: 3, mt: 3, maxWidth: '800px', mx: 'auto'}}
    >
      <Typography variant='h4' gutterBottom>
        Create a New Post
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Title'
            name='title'
            value={formData.title}
            onChange={handleChange}
            error={Boolean(errors.title)}
            helperText={errors.title}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            error={Boolean(errors.description)}
            helperText={errors.description}
            required
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Image URL'
            name='imageUrl'
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6' gutterBottom>
            SEO Details
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label='SEO Title'
            name='seoTitle'
            value={formData.seoTitle}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label='SEO Description'
            name='seoDescription'
            value={formData.seoDescription}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label='SEO Slug'
            name='seoSlug'
            value={formData.seoSlug}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6' gutterBottom>
            Author Details
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label='Author Name'
            name='authorName'
            value={formData.authorName}
            onChange={handleChange}
            error={Boolean(errors.authorName)}
            helperText={errors.authorName}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label='Author Description'
            name='authorDescription'
            value={formData.authorDescription}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label='Twitter'
            name='authorTwitter'
            value={formData.authorTwitter}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label='Instagram'
            name='authorInstagram'
            value={formData.authorInstagram}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label='LinkedIn'
            name='authorLinkedin'
            value={formData.authorLinkedin}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type='submit' variant='contained' color='primary'>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PostForm;

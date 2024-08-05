import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import {useState} from 'react';

import User from '@/assets/user.png';
import {useIsMobile} from '@/hooks/useIsMobile';

const Profile = () => {
  const {isMobile} = useIsMobile();
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formValues);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: isMobile ? '90%' : '600px',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: 3,
          backgroundColor: 'white',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            width: '100%',
          }}
        >
          <img
            src={User}
            alt='User'
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              border: '4px solid #0F172A',
            }}
          />
        </Box>

        <Typography variant='h6' gutterBottom>
          Edit Profile
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            fullWidth
            label='Username'
            placeholder='Enter Your User Name'
            type='text'
            name='username'
            value={formValues.username}
            onChange={handleInputChange}
            sx={{
              marginBottom: '20px',
              background: '#F6F5F5',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
              '& .MuiInputLabel-root': {
                color: 'gray',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'gray',
              },
              '& .MuiInputBase-input': {
                color: 'gray',
                '&::placeholder': {
                  color: 'gray',
                  opacity: 1,
                },
              },
            }}
          />

          <TextField
            variant='outlined'
            fullWidth
            label='Email Address'
            placeholder='Enter Your Email Address'
            type='email'
            name='email'
            value={formValues.email}
            onChange={handleInputChange}
            sx={{
              marginBottom: '20px',
              background: '#F6F5F5',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
              '& .MuiInputLabel-root': {
                color: 'gray',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'gray',
              },
              '& .MuiInputBase-input': {
                color: 'gray',
                '&::placeholder': {
                  color: 'gray',
                  opacity: 1,
                },
              },
            }}
          />

          <TextField
            variant='outlined'
            fullWidth
            placeholder='Enter Your Password'
            label='Password'
            name='password'
            type={showPassword ? 'text' : 'password'}
            value={formValues.password}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={() => setShowPassword(!showPassword)}
                    edge='end'
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              marginBottom: '30px',
              background: '#F6F5F5',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
              '& .MuiInputLabel-root': {
                color: 'gray',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'gray',
              },
              '& .MuiInputBase-input': {
                color: 'gray',
                '&::placeholder': {
                  color: 'gray',
                  opacity: 1,
                },
              },
            }}
          />

          <Button
            type='submit'
            sx={{
              width: '100%',
              backgroundColor: '#0F172A',
              color: 'white',
              borderRadius: '8px',
              padding: '12px 0',
              fontWeight: 'bold',
              ':hover': {
                backgroundColor: '#0d1127',
              },
            }}
          >
            Update
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Profile;

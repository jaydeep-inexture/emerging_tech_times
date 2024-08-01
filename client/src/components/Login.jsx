import {Visibility, VisibilityOff} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import {useState} from 'react';

import Emerging_Tech_Times_Logo from '@/assets/Emerging_Tech_Times_Logo.png';
import {useIsMobile} from '@/hooks/useIsMobile';

const Login = ({setFlag, userName, setUserName}) => {
  const {isMobile} = useIsMobile();
  const [loginBtnOpen, setLoginBtnOpen] = useState(false);
  const [signupBtnOpen, setSignupBtnOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [signUpFormData, setSignUpFormData] = useState({
    username: '',
    email: '',
    password: '',
    cpassword: '',
    TnC: false,
  });
  const [loginFormData, setLoginFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleLoginClose = () => {
    setLoginBtnOpen(false);
  };

  const handleLoginOpen = () => {
    setLoginBtnOpen(true);
    setFlag(true);
  };

  const handleSignupClick = () => {
    setSignupBtnOpen(true);
    setFlag(true);
  };

  const handleSignUpClose = () => {
    setSignupBtnOpen(false);
  };

  const handleLoginFormChange = (event) => {
    const {name, value} = event.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    setUserName(loginFormData.username.slice(0, 1));
    handleLoginClose();
  };

  const handleSignupFormChange = (event) => {
    const {name, value, type, checked} = event.target;
    setSignUpFormData({
      ...signUpFormData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    if (signUpFormData.password === signUpFormData.cpassword) {
      localStorage.setItem('SignupFormData', JSON.stringify(signUpFormData));
      handleSignUpClose();
      handleLoginOpen();
    } else {
      // Handle the case where passwords do not match
      alert("Password and Confirm Password doesn't match");
    }
  };

  const handleOpenDialog = (item) => {
    if (item === 'signup') {
      setLoginBtnOpen(false);
      setSignupBtnOpen(true);
    }
    if (item === 'signin') {
      setLoginBtnOpen(true);
      setSignupBtnOpen(false);
    }
  };

  return (
    <>
      {userName ? (
        <Button
          sx={{
            width: '50px',
            background: '#ff851b',
            padding: '15px',
            borderRadius: '50%',
            color: 'white',
            fontSize: '15px',
            fontWeight: 800,
            marginLeft: '20px',
            ':hover': {background: '#ff851b'},
          }}
        >
          {userName}
        </Button>
      ) : isMobile ? (
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            position: 'absolute',
            bottom: 10,
            alignItems: 'center',
          }}
        >
          <Button
            sx={{
              width: '90%',
              background: '#0F172A',
              padding: '15px',
              borderRadius: '8px',
              color: 'white',
              height: '55px',
              fontWeight: 800,
              ':hover': {background: '#0F172A'},
            }}
            onClick={handleLoginOpen}
          >
            Login
          </Button>

          <Button
            sx={{
              width: '90%',
              marginTop: 1,
              padding: '15px',
              borderRadius: '8px',
              color: '#0F172A',
              height: '55px',
              fontWeight: 800,
              border: '1px solid #0F172A',
              ':hover': {background: 'white'},
            }}
            onClick={handleSignupClick}
          >
            Register
          </Button>
        </Box>
      ) : (
        <>
          <Button
            sx={{
              width: '100px',
              background: '#0F172A',
              padding: '15px',
              marginLeft: '10px',
              borderRadius: '8px',
              color: 'white',
              fontWeight: 800,
              ':hover': {background: '#0F172A'},
            }}
            onClick={handleLoginOpen}
          >
            Login
          </Button>

          <Button
            sx={{
              width: '100px',
              padding: '15px',
              marginLeft: '10px',
              borderRadius: '8px',
              color: '#0F172A',
              fontWeight: 800,
              border: '1px solid #0F172A',
              ':hover': {background: 'white'},
            }}
            onClick={handleSignupClick}
          >
            Register
          </Button>
        </>
      )}

      <Dialog
        open={loginBtnOpen}
        onClose={handleLoginClose}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
        sx={{
          '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
            background: '#FFFFFF ',
            borderRadius: '8px',
          },
        }}
      >
        <form onSubmit={handleLoginSubmit}>
          <Box
            sx={{
              position: 'relative',
              padding: !isMobile && '16px',
              width: isMobile ? '100%' : '490px',
              height: '480px',
              borderRadius: '10px',
              background: '#FFFFFF ',
            }}
          >
            <CloseIcon
              onClick={handleLoginClose}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                cursor: 'pointer',
                color: '#CACACA',
              }}
            />
            <DialogTitle>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={Emerging_Tech_Times_Logo}
                  alt='Emerging_Tech_Times_Logo'
                  style={{width: '130px', height: '50px', marginTop: 10}}
                />
              </Box>
            </DialogTitle>

            <DialogContent>
              <TextField
                variant='outlined'
                fullWidth
                label='Username'
                autoComplete='off'
                placeholder='Enter Your User Name'
                type='text'
                name='username'
                autoFocus
                value={loginFormData.username}
                onChange={handleLoginFormChange}
                sx={{
                  marginTop: '10px',
                  borderRadius: '8px',
                  background: '#F6F5F5',
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'gray',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'gray',
                      borderWidth: '1px',
                    },
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
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
                autoComplete='off'
                placeholder='Enter Your Email Address'
                type='email'
                name='email'
                value={loginFormData.email}
                onChange={handleLoginFormChange}
                sx={{
                  marginTop: '25px',
                  borderRadius: '8px',
                  background: '#F6F5F5',
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'gray',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'gray',
                      borderWidth: '1px',
                    },
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
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
                type={showPassword ? 'text' : 'password'}
                fullWidth
                placeholder='Enter Your Password'
                label='Password'
                name='password'
                autoComplete='off'
                value={loginFormData.password}
                onChange={handleLoginFormChange}
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
                  marginTop: '25px',
                  borderRadius: '8px',
                  background: '#F6F5F5',
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'gray',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'gray',
                      borderWidth: '1px',
                    },
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
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

              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Button
                  type='submit'
                  sx={{
                    marginTop: '30px',
                    width: '100%',
                    background: '#0F172A',
                    color: 'white',
                    borderRadius: '8px',
                    padding: '16px 0',
                    fontWeight: 'bold',
                    ':hover': {
                      background: '#0F172A',
                    },
                  }}
                >
                  Sign in
                </Button>
              </Box>

              <Typography
                sx={{
                  color: 'gray',
                  marginTop: '20px',
                  textAlign: 'center',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
                onClick={() => handleOpenDialog('signup')}
              >
                Don't have an account? Sign up
              </Typography>
            </DialogContent>
          </Box>
        </form>
      </Dialog>

      <Dialog
        open={signupBtnOpen}
        onClose={handleSignUpClose}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
        sx={{
          '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
            background: '#FFFFFF ',
            borderRadius: '8px',
          },
        }}
      >
        <form onSubmit={handleSignupSubmit}>
          <Box
            sx={{
              position: 'relative',
              padding: !isMobile && '16px',
              width: isMobile ? '100%' : '490px',
              height: '530px',
              borderRadius: '10px',
              background: '#FFFFFF ',
            }}
          >
            <CloseIcon
              onClick={handleSignUpClose}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                cursor: 'pointer',
                color: '#CACACA',
              }}
            />
            <DialogTitle>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={Emerging_Tech_Times_Logo}
                  alt='Emerging_Tech_Times_Logo'
                  style={{width: '130px', height: '50px', marginTop: 10}}
                />
              </Box>
            </DialogTitle>

            <DialogContent>
              <TextField
                variant='outlined'
                fullWidth
                label='Username'
                placeholder='Enter Your User Name'
                type='text'
                name='username'
                autoComplete='off'
                autoFocus
                value={signUpFormData.username}
                onChange={handleSignupFormChange}
                sx={{
                  marginTop: '10px',
                  borderRadius: '8px',
                  background: '#F6F5F5',
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'gray',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'gray',
                      borderWidth: '1px',
                    },
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
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
                autoComplete='off'
                value={signUpFormData.email}
                onChange={handleSignupFormChange}
                sx={{
                  marginTop: '25px',
                  borderRadius: '8px',
                  background: '#F6F5F5',
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'gray',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'gray',
                      borderWidth: '1px',
                    },
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
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
                type={showPassword ? 'text' : 'password'}
                fullWidth
                placeholder='Enter Your Password'
                label='Password'
                name='password'
                autoComplete='off'
                value={signUpFormData.password}
                onChange={handleSignupFormChange}
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
                  marginTop: '25px',
                  borderRadius: '8px',
                  background: '#F6F5F5',
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'gray',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'gray',
                      borderWidth: '1px',
                    },
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
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
                type={showPassword ? 'text' : 'password'}
                fullWidth
                placeholder='Confirm Your Password'
                label='Confirm Password'
                name='cpassword'
                autoComplete='off'
                value={signUpFormData.cpassword}
                onChange={handleSignupFormChange}
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
                  marginTop: '25px',
                  borderRadius: '8px',
                  background: '#F6F5F5',
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'gray',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'gray',
                      borderWidth: '1px',
                    },
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
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

              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Button
                  type='submit'
                  sx={{
                    marginTop: '30px',
                    width: '100%',
                    background: '#0F172A',
                    color: 'white',
                    borderRadius: '8px',
                    padding: '16px 0',
                    fontWeight: 'bold',
                    ':hover': {
                      background: '#0F172A',
                    },
                  }}
                >
                  Sign up
                </Button>
              </Box>

              <Typography
                sx={{
                  color: 'gray',
                  marginTop: '20px',
                  textAlign: 'center',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
                onClick={() => handleOpenDialog('signin')}
              >
                Already have an account? Sign in
              </Typography>
            </DialogContent>
          </Box>
        </form>
      </Dialog>
    </>
  );
};
export default Login;

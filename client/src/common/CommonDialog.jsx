import Emerging_Tech_Times_Logo from '@/assets/Emerging_Tech_Times_Logo.png';
import { Visibility, VisibilityOff } from '@mui/icons-material';
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

const CommonDialog = ({
  open,
  isLogin,
  data,
  isMobile,
  showPassword,
  setShowPassword,
  handleClose,
  handleSubmit,
  handleFormChange,
  handleOpenDialog,
  buttonText,
  alternateText,
}) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
        sx={{
          '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
            background: '#FFFFFF ',
            borderRadius: '8px',
          },
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              position: 'relative',
              padding: !isMobile && '16px',
              width: isMobile ? '100%' : '490px',
              height: isLogin ? '400px' : '530px',
              borderRadius: '10px',
              background: '#FFFFFF ',
            }}
          >
            <CloseIcon
              onClick={handleClose}
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
              {!isLogin && (
                <TextField
                  variant='outlined'
                  fullWidth
                  label='Username'
                  placeholder='Enter Your User Name'
                  type='text'
                  name='username'
                  autoComplete='off'
                  autoFocus
                  value={data?.username}
                  onChange={handleFormChange}
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
              )}

              <TextField
                variant='outlined'
                fullWidth
                label='Email Address'
                placeholder='Enter Your Email Address'
                type='email'
                name='email'
                autoComplete='off'
                value={data.email}
                onChange={handleFormChange}
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
                value={data?.password}
                onChange={handleFormChange}
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
              {!isLogin && (
                <TextField
                  variant='outlined'
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  placeholder='Confirm Your Password'
                  label='Confirm Password'
                  name='cpassword'
                  autoComplete='off'
                  value={data?.cpassword}
                  onChange={handleFormChange}
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
              )}

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
                  {buttonText}
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
                onClick={() => handleOpenDialog(isLogin ? 'signup' : 'signin')}
              >
                {alternateText}
              </Typography>
            </DialogContent>
          </Box>
        </form>
      </Dialog>
    </>
  );
};

export default CommonDialog;

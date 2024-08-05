import Emerging_Tech_Times_Logo from '@/assets/Emerging_Tech_Times_Logo.png';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import CustomTextField from '@/common/CustomTextField';

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
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
      sx={{
        '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
          background: '#FFFFFF',
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
            height: isLogin ? '400px' : '550px',
            borderRadius: '10px',
            background: '#FFFFFF',
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
              <CustomTextField
                label='Username'
                placeholder='Enter Your User Name'
                name='username'
                type='text'
                value={data?.username}
                onChange={handleFormChange}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            )}

            <CustomTextField
              label='Email Address'
              placeholder='Enter Your Email Address'
              name='email'
              type='email'
              value={data.email}
              onChange={handleFormChange}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />

            <CustomTextField
              label='Password'
              placeholder='Enter Your Password'
              name='password'
              type='password'
              value={data?.password}
              onChange={handleFormChange}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />

            {!isLogin && (
              <CustomTextField
                label='Confirm Password'
                placeholder='Confirm Your Password'
                name='cpassword'
                type='password'
                value={data?.cpassword}
                onChange={handleFormChange}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
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
  );
};

export default CommonDialog;

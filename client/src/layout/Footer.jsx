import {Facebook, Instagram, Telegram, Twitter} from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
} from '@mui/material';

import White_Logo from '@/assets/White_Logo.png';
import {useIsMobile} from '@/hooks/useIsMobile';

const Footer = () => {
  const {isMobile} = useIsMobile();

  return (
    <>
      {!isMobile && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '32vh',
            backgroundColor: '#0A1128', // Dark blue background
            color: '#fff',
            textAlign: 'center',
            padding: 4,
            backgroundImage:
              "url('https://t3.ftcdn.net/jpg/05/08/74/68/360_F_508746888_tl2EUHrIm1NpPBcwLufaAzbMqNO2kqwR.jpg')",
            backgroundRepeat: 'round',
          }}
        >
          <Typography variant='h4' fontWeight={900} gutterBottom>
            Sign Up For Our Newsletter
          </Typography>
          <Typography variant='body1' gutterBottom my={2}>
            Don't miss out on this opportunity to join our community of
            like-minded individuals
          </Typography>
          <Box
            component='form'
            sx={{
              mt: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              maxWidth: 400,
            }}
            noValidate
            autoComplete='off'
          >
            <TextField
              variant='outlined'
              placeholder='Your email'
              type='email'
              fullWidth
              sx={{mb: 2, backgroundColor: '#fff', borderRadius: 1}}
            />
            <Button
              variant='contained'
              color='primary'
              size='large'
              fullWidth
              sx={{backgroundColor: '#FF6600'}}
            >
              Subscribe Now
            </Button>
          </Box>
        </Box>
      )}
      <Box
        sx={{
          backgroundColor: '#0F172A',
          color: 'white',
          width: '100%',
          py: 10,
        }}
      >
        <Grid
          container
          spacing={4}
          justifyContent='center'
          alignItems='center'
          paddingX={'100px'}
        >
          <Grid item xs={12} sm={3} display='flex' justifyContent='center'>
            <img
              src={White_Logo}
              alt='Logo'
              style={{
                width: '200px',
                height: 'auto',
                mixBlendMode: 'lighten',
                backgroundColor: '#0F172A',
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            display='flex'
            flexDirection='column'
            alignItems='center'
          >
            <Typography
              variant={isMobile ? 'p' : 'h6'}
              fontWeight={800}
              fontSize={isMobile && 20}
              marginBottom={'10px'}
            >
              About Us
            </Typography>
            <Typography variant='body2' lineHeight={1.5} textAlign='center'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa
              dolorem libero minima sapiente
              {!isMobile &&
                'laudantium odit sit at veritatis distinctio veniam, neque maxime provident hic nihil reiciendismodi vitae sint corporis.'}
            </Typography>
          </Grid>
          {!isMobile && (
            <Grid
              item
              xs={12}
              sm={3}
              display='flex'
              flexDirection='column'
              alignItems='center'
            >
              <Typography variant='h6' fontWeight={800}>
                Connect
              </Typography>
              <Link
                href='/about'
                color='inherit'
                sx={{textDecoration: 'none', mt: 2, mb: 1}}
              >
                About Us
              </Link>
              <Link
                href='/subscribe'
                color='inherit'
                sx={{textDecoration: 'none', mb: 1}}
              >
                Subscribe
              </Link>
              <Link
                href='/news'
                color='inherit'
                sx={{textDecoration: 'none', mb: 1}}
              >
                News
              </Link>
              <Link
                href='/contact'
                color='inherit'
                sx={{textDecoration: 'none', mb: 1}}
              >
                Contact Us
              </Link>
            </Grid>
          )}

          <Grid
            item
            xs={12}
            sm={3}
            display='flex'
            flexDirection='column'
            alignItems='center'
          >
            <Typography variant='h6' fontWeight={800} marginBottom={'20px'}>
              Follow Us
            </Typography>
            <Box sx={{display: 'flex'}}>
              <IconButton href='https://facebook.com' color='inherit'>
                <Facebook sx={{fontSize: 30}} />
              </IconButton>
              <IconButton href='https://twitter.com' color='inherit'>
                <Twitter sx={{fontSize: 30}} />
              </IconButton>
              <IconButton href='https://instagram.com' color='inherit'>
                <Instagram sx={{fontSize: 30}} />
              </IconButton>
              <IconButton href='https://telegram.com' color='inherit'>
                <Telegram sx={{fontSize: 30}} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Footer;

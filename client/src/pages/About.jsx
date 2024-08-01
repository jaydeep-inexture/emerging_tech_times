import {Box, Container, Grid, Typography} from '@mui/material';
import Lottie from 'lottie-react';

import Aboutus from '@/assets/Aboutus.json';
import {useIsMobile} from '@/hooks/useIsMobile';

const About = () => {
  const {isMobile} = useIsMobile();
  return (
    <Container
      maxWidth='xl'
      sx={{marginBottom: isMobile && '5%', marginY: !isMobile && '2%'}}
    >
      <Grid container style={{flexWrap: isMobile ? 'wrap' : 'nowrap'}}>
        {/* First Part with Image */}
        <Grid
          item
          xs={12}
          md={6}
          ml={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography
              variant={isMobile ? 'h5' : 'h3'}
              gutterBottom
              sx={{
                fontWeight: 800,
                textTransform: 'uppercase',
                fontStyle: 'italic',
                color: '#FC6A03',
              }}
            >
              About Us
            </Typography>
            <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
              perferendis. Vel odit officia hic neque qui eum eos consequatur
              fugit suscipit in, illum atque! Dolor ratione labore eaque
              provident quibusdam?
            </Typography>
            <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
              perferendis. Vel odit officia hic neque qui eum eos consequatur
              fugit suscipit in, illum atque! Dolor ratione labore eaque
              provident quibusdam?
            </Typography>
          </Box>
        </Grid>

        {/* Second Part with Form */}

        <Grid
          item
          xs={12}
          md={6}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Lottie animationData={Aboutus} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;

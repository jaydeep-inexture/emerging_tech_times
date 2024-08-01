import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useIsMobile} from '@/hooks/useIsMobile';

const ArticleCard = ({image, title, author, date, description, category}) => {
  const {isMobile} = useIsMobile();
  const navigate = useNavigate();

  const article = {image, title, author, date, description, category};

  const handleClick = () => {
    navigate(`/article/${title}`, {state: {article}});
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        height: 'auto',
        marginTop: 3,
        boxShadow: 'none',
        ':hover': {
          cursor: 'pointer',
        },
      }}
      onClick={handleClick}
    >
      <CardMedia
        component='img'
        sx={{width: isMobile ? '100%' : 200}}
        image={image}
        alt={title}
      />
      <Box sx={{display: 'flex', flexDirection: 'column', flex: 1}}>
        <CardContent sx={{flexGrow: 1}}>
          <Typography
            component='div'
            variant='h5'
            fontWeight={900}
            textTransform={'capitalize'}
          >
            {title}
          </Typography>
          <Typography
            variant='subtitle1'
            color='text.secondary'
            component='div'
          >
            {author} - {date}
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{mt: 1.5}}>
            {description}
          </Typography>
        </CardContent>
        <Box sx={{p: 1}}>
          <Chip label={category} variant='outlined' />
        </Box>
      </Box>
    </Card>
  );
};

export default ArticleCard;

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/useIsMobile";
import Placeholder from "@/assets/placeholder.jpg";

const ArticleCard = (article) => {
  const { isMobile } = useIsMobile();
  const navigate = useNavigate();

  const { _id, imageUrl, title, author, createdAt, description, category } =
    article;

  const handleClick = () => {
    navigate(`/article/${_id}`, { state: { article } });
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        height: "auto",
        boxShadow: "none",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        sx={{
          width: isMobile ? "100%" : 200,
          height: isMobile ? "100%" : "100%",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-8px)",
          },
          // objectFit: "cover",
        }}
        image={imageUrl ? imageUrl : Placeholder}
        alt={title}
      />
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            component="div"
            variant="h5"
            fontWeight={600}
            textTransform={"capitalize"}
          >
            {title.length > 25 ? `${title.substring(0, 25)}...` : title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {`By ${author.name} on ${new Date(createdAt).toLocaleDateString()}`}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  description.length > 175
                    ? `${description.substring(0, 175)}...`
                    : description,
              }}
            />
            {}
          </Typography>
        </CardContent>
        {category && (
          <Box sx={{ p: 1 }}>
            <Chip label={category} variant="outlined" />
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default ArticleCard;

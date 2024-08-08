import { Box, Card, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const CategoryCard = ({ name, imageUrl, slug }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
      component={Link}
      to={`?${slug}`}
    >
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={name}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          transition: "opacity 0.3s ease",
          // opacity: 0,
          opacity: 1,
          // "&:hover": {
          // },
        }}
      >
        <Typography variant="h6" component="div" textAlign="center">
          {name}
        </Typography>
      </Box>
    </Card>
  );
};

export default CategoryCard;

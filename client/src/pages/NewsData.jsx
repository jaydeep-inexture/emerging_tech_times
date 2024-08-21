import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";

const NewsData = ({ posts, loading }) => {
  const [visibleItems, setVisibleItems] = useState(10);

  const loadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
  };

  const displayedData = posts.slice(0, visibleItems);

  return (
    <>
      <Box sx={{ paddingX: "5%" }}>
        {/* <Typography
          variant={isMobile ? "h4" : "h6"}
          gutterBottom
          fontWeight={200}
          fontStyle={"italic"}
        >
          {pageTitle}
        </Typography> */}
        <Grid container spacing={4}>
          {displayedData.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <Card
                sx={{
                  height: "300px",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-8px)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={item.imageUrl}
                  alt={item.title}
                  sx={{ objectFit: "contain" }}
                />
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description.length > 130
                      ? `${item.description.slice(0, 150)}...`
                      : item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div style={{ textAlign: "center", margin: "50px 0" }}>
          {loading ? (
            <CircularProgress />
          ) : (
            visibleItems < posts.length && (
              <Button
                variant="contained"
                color="primary"
                onClick={loadMore}
                sx={{ width: "300px", fontWeight: 800, paddingY: 1 }}
              >
                Load More
              </Button>
            )
          )}
        </div>
      </Box>
    </>
  );
};

export default NewsData;

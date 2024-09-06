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
import Placeholder from "@/assets/placeholder.jpg";
import { useNavigate } from "react-router-dom";

const NewsData = ({ posts, loading }) => {
  const [visibleItems, setVisibleItems] = useState(10);
  const navigate = useNavigate();
  const loadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
  };

  const displayedData = posts.slice(0, visibleItems);
  const handleClick = (article) => {
    // console.log(article);
    navigate(`/article/${article._id}`, { state: { article } });
  };
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
                  cursor: "pointer",
                }}
                onClick={() => handleClick(posts[0])}
              >
                <CardMedia
                  component="img"
                  // height="140"
                  image={item.imageUrl ? item.imageUrl : Placeholder}
                  alt={item.title}
                  sx={{
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    // borderRadius: "16px",
                    objectFit: "contain",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-8px)",
                    },
                  }}
                />
                <CardContent>
                  <Typography variant="h5" fontWeight={700}>
                    {item.title.length > 20
                      ? `${item.title.substring(0, 20)}...`
                      : item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          item.description.length > 130
                            ? `${item.description.slice(0, 150)}...`
                            : item.description,
                      }}
                    />
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

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Tab,
  Typography,
} from "@mui/material";
import { useMobile } from "../context/isMobileContext";

const NewsData = ({ title }) => {
  const [data, setData] = useState([]);
  const [visibleItems, setVisibleItems] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products"
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
  };

  const displayedData = data.slice(0, visibleItems);
  const isMobile= useMobile()
  return (
    <>
      <Box sx={{paddingX:"5%"}}>
        <Typography variant={isMobile?"h4" :"h2"} gutterBottom fontWeight={800} fontStyle={'italic'} >
          {title}
        </Typography>
        <Grid container spacing={4}>
          {displayedData.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card sx={{ height: "400px" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.images[0]}
                  alt={item.title}
                  sx={{ objectFit: "contain" }}
                />
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
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
            visibleItems < data.length && (
              <Button variant="contained" color="primary" onClick={loadMore} sx={{width:'300px',fontWeight:800,paddingY:1}}>
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

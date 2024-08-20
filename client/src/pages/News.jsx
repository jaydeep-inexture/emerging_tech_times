import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NewsData from "./NewsData";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostList, setLoading } from "@/redux/postSlice";
import { setNotification } from "@/redux/notificationSlice";
import { resetPosts } from "../redux/postSlice";

const News = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState();
  const [category, setCategory] = useState("Technology");
  const { posts, page, limit, loading } = useSelector((state) => state.post);
  useEffect(() => {
    if (location.state?.name) {
      console.log("Inside If Condition");
      setTabValue("3");
      setCategory(location.state.name);
    } else if (location.state.tabValue) {
      setTabValue(location.state.tabValue);
    }
  }, [location.state]);

  console.log("location", location);

  const fetchLatestPosts = async () => {
    dispatch(setLoading(true));
    try {
      await dispatch(fetchPostList({ page, limit }));
    } catch (error) {
      const errMessage =
        error.response?.data?.msg ||
        error.response?.data?.errors?.[0]?.msg ||
        "An error occurred";
      dispatch(
        setNotification({
          type: "error",
          message: errMessage,
        })
      );
      dispatch(setLoading(false));
    }
  };
  const fetchFilteredPosts = async () => {
    dispatch(setLoading(true));
    try {
      await dispatch(fetchPostList({ page, limit, category }));
    } catch (error) {
      const errMessage =
        error.response?.data?.msg ||
        error.response?.data?.errors?.[0]?.msg ||
        "An error occurred";
      dispatch(
        setNotification({
          type: "error",
          message: errMessage,
        })
      );
      dispatch(setLoading(false));
    }
  };
  console.log(location.state.tabValue, typeof location.state.tabValue);
  useEffect(() => {
    if (tabValue) {
      dispatch(resetPosts());
      if (tabValue === "3" && location.state.tabValue !== "3") {
        fetchFilteredPosts();
      } else if (
        tabValue === "1" ||
        tabValue === "2" ||
        location.state.tabValue === "3"
      ) {
        fetchLatestPosts();
      }
    }
  }, [tabValue, location.state.tabValue]);

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1", paddingY: "20px" }}>
        <TabContext value={tabValue}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TabList
              onChange={(event, newValue) => setTabValue(newValue)}
              aria-label="lab API tabs example"
              sx={{
                display: "flex",
                width: "100%",
                color: "white",
                backgroundColor: "#0F172A",
                "& .MuiTab-root": {
                  color: "white",
                  fontWeight: 600,
                },
                "& .Mui-selected": {
                  color: "white !important",
                  borderBottom: "4px solid white",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "transparent",
                },
                "& .css-heg063-MuiTabs-flexContainer": {
                  justifyContent: "space-around",
                },
              }}
            >
              <Tab label="Latest News" value={"1"} />
              <Tab label="Trending News" value={"2"} />
              <Tab label={category} value={"3"} />
            </TabList>
          </Box>
          <TabPanel value={"1"}>
            <NewsData
              pageTitle={"Latest News"}
              setActiveTab={setTabValue}
              posts={posts}
              loading={loading}
            />
          </TabPanel>
          <TabPanel value={"2"}>
            <NewsData
              setActiveTab={setTabValue}
              pageTitle={"Trending News"}
              posts={posts}
              loading={loading}
            />
          </TabPanel>
          <TabPanel value={"3"}>
            <NewsData
              setActiveTab={setTabValue}
              pageTitle={category}
              posts={posts}
              loading={loading}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default News;

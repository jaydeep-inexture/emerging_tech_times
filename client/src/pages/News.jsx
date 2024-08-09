import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useEffect, useState } from "react";

import { useIsMobile } from "@/hooks/useIsMobile";
import { useLocation } from "react-router-dom";
import NewsList from "@/components/NewsList";
import NewsData from "./NewsData";

const News = () => {
  const location = useLocation();

  const { isMobile } = useIsMobile();

  const [tabValue, setTabValue] = useState("1");
  const [category, setCategory] = useState("Technology");

  useEffect(() => {
    if (location.state?.name) {
      setTabValue("3");
      setCategory(location.state.name);
    }
  }, [location.state]);

  return (
    <>
      {isMobile ? (
        <>
          <NewsList title={"Latest News"} />
        </>
      ) : (
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
                />
              </TabPanel>
              <TabPanel value={"2"}>
                <NewsData
                  setActiveTab={setTabValue}
                  pageTitle={"Trending News"}
                />
              </TabPanel>
              <TabPanel value={"3"}>
                <NewsData setActiveTab={setTabValue} pageTitle={category} />
              </TabPanel>
            </TabContext>
          </Box>
        </>
      )}
    </>
  );
};

export default News;

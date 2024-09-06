import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Nav from "./Nav";
import { Box } from "@mui/material";

const MainLayout = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <Nav />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default MainLayout;

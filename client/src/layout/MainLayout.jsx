import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Nav from "./Nav";
import { Box } from "@mui/material";
import Scrollup from "../common/Affix";

const MainLayout = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <Nav />
      <Outlet />
      <Scrollup />
      <Footer />
    </Box>
  );
};

export default MainLayout;

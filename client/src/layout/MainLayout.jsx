import { Outlet } from "react-router-dom";

import Spinner from "@/common/Spinner";
import Footer from "./Footer";
import Nav from "./Nav";
import { Box } from "@mui/material";

const MainLayout = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <Spinner />
      <Nav />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default MainLayout;

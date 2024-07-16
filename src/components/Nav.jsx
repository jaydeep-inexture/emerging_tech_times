import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../assets/Logo.png";
import Login from "./Login";
import Close from "@mui/icons-material/Close";
import { useMobile } from "../context/isMobileContext";

const Nav = () => {
  const [language, setLanguage] = useState("ENG");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMobile();


  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = (
    <Box
      sx={{ width: 320, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box px={2}>
        <Close sx={{ position: 'absolute', right: 10, top: 10 }} onClick={toggleDrawer(false)} />
        <List sx={{ mt: 4, color: 'black', textTransform: 'uppercase' }}>
          <ListItem component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component={Link} to="/about">
            <ListItemText primary="About Us" />
          </ListItem>
          <ListItem component={Link} to="/news">
            <ListItemText primary="News" />
          </ListItem>
          <ListItem component={Link} to="/contact">
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
      </Box>
      <Box sx={{ padding: 2 }}>
        <Login  />
      </Box>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "10px 7% 10px 0%" : "10px 10%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/">
            {isMobile ? (
              <img
                src={Logo}
                alt="Logo"
                style={{ width: "100px", height: "100px" }}
              />
            ) : (
              <img
                src={Logo}
                alt="Logo"
                style={{ width: "200px", height: "130px" }}
              />
            )}
          </Link>
          {!isMobile && (
            <>
              <Link
                to="/about"
                style={{ textDecoration: "none", marginLeft: "70px" }}
              >
                <Typography variant="h6" sx={{ color: "black" }}>
                  About Us
                </Typography>
              </Link>
              <Link
                to="/news"
                style={{ textDecoration: "none", marginLeft: "70px" }}
              >
                <Typography variant="h6" sx={{ color: "black" }}>
                  News
                </Typography>
              </Link>
              <Link
                to="/contact"
                style={{ textDecoration: "none", marginLeft: "70px" }}
              >
                <Typography variant="h6" sx={{ color: "black" }}>
                  Contact
                </Typography>
              </Link>
            </>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            
          }}
        >
          {!isMobile && (
            <>
              <FormControl sx={{ minWidth: 70 }}>
                <Select
                  id="demo-select-small"
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  size="small"
                >
                  <MenuItem value={"ENG"}>EN</MenuItem>
                  <MenuItem value={"HIN"}>HIN</MenuItem>
                </Select>
              </FormControl>
              <Login />
            </>
          )}
          {isMobile && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Box>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </>
  );
};

export default Nav;

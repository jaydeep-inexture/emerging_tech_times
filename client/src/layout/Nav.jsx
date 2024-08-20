import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Close from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Drawer,
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import Emerging_Tech_Times_Logo from "@/assets/Emerging_Tech_Times_Logo.png";
import Login from "@/components/Login";
import { useIsMobile } from "@/hooks/useIsMobile";

const Nav = () => {
  const { isMobile } = useIsMobile();

  const [language, setLanguage] = useState("ENG");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [flag, setFlag] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  useEffect(() => {
    if (flag) {
      setDrawerOpen(false);
    }
  }, [flag]);

  const drawerList = (
    <>
      <Box
        sx={{
          width: 320,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Close
            sx={{ position: "absolute", right: 10, top: 10 }}
            onClick={toggleDrawer(false)}
          />
          <List sx={{ mt: 4, textTransform: "uppercase" }}>
            <ListItem
              component={Link}
              to="/"
              sx={{ fontStyle: "italic", color: "#0F172A", fontSize: "20px" }}
              onClick={toggleDrawer(false)}
            >
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem
              component={Link}
              to="/about"
              sx={{ fontStyle: "italic", color: "#0F172A", fontSize: "20px" }}
              onClick={toggleDrawer(false)}
            >
              <ListItemText primary="About Us" />
            </ListItem>
            <ListItem
              component={Link}
              to="/news"
              sx={{ fontStyle: "italic", color: "#0F172A", fontSize: "20px" }}
              onClick={toggleDrawer(false)}
            >
              <ListItemText primary="News" />
            </ListItem>
            <ListItem
              component={Link}
              to="/contact"
              sx={{ fontStyle: "italic", color: "#0F172A", fontSize: "20px" }}
              onClick={toggleDrawer(false)}
            >
              <ListItemText primary="Contact" />
            </ListItem>
          </List>
        </Box>
        <Box>
          <Login setFlag={setFlag} />
        </Box>
      </Box>
    </>
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "10px 7% 10px 5%" : "15px 8%",
          borderBottom: "1px solid gray",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/">
            {isMobile ? (
              <img
                src={Emerging_Tech_Times_Logo}
                alt="Emerging_Tech_Times_Logo"
                style={{ width: "170px", height: "auto", margin: "10px" }}
              />
            ) : (
              <img
                src={Emerging_Tech_Times_Logo}
                alt="Emerging_Tech_Times_Logo"
                style={{ width: "200px", height: "auto" }}
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
              <Login setFlag={setFlag} />
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

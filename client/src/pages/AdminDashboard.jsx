import { Add, Article, Group, Person } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import WhiteLogo from "@/assets/White_Logo.png";
import Profile from "@/components/Profile";
import PostForm from "@/components/admin/PostForm";
import Posts from "@/components/admin/Posts";
import UsersTable from "@/components/admin/UsersTable";
import { resetPosts } from "@/redux/postSlice";

const drawerWidth = 240;

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: `0 ${theme.spacing(3)}`,
  marginLeft: `${drawerWidth}px`,
  backgroundColor: "#f0f2f5",
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  backgroundColor: "#0F172A",
  color: "#fff",
  height: "100%",
  position: "fixed",
  top: 0,
  left: 0,
  display: "flex",
  flexDirection: "column",
}));

const Logo = styled("img")(({ theme }) => ({
  width: "80%",
  height: "auto",
  margin: "16px auto",
}));

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

  let content;

  switch (activeTab) {
    case 0:
      content = <Profile />;
      break;
    case 1:
      content = <Posts setActiveTab={setActiveTab} />;
      break;
    case 2:
      content = <PostForm setActiveTab={setActiveTab} />;
      break;
    case 3:
      content = <UsersTable />;
      break;
    default:
      content = <Profile />;
  }

  useEffect(() => {
    return () => {
      dispatch(resetPosts());
    };
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Main sx={{ height: "100vh" }}>
        <Sidebar>
          <Link style={{ display: "flex" }} to="/">
            <Logo src={WhiteLogo} alt="Logo" />
          </Link>
          <Tabs
            orientation="vertical"
            value={activeTab}
            onChange={(e, value) => setActiveTab(value)}
            textColor="inherit"
            indicatorColor="secondary"
            aria-label="Vertical tabs example"
            sx={{
              "& .MuiTab-root": {
                justifyContent: "start",
                gap: 2,
                color: "#fff",
                "&.Mui-selected": {
                  backgroundColor: "#1e293b",
                },
              },
            }}
          >
            <Tab label="profile" icon={<Person />} iconPosition="start" />
            <Tab label="posts" icon={<Article />} iconPosition="start" />
            <Tab label="create post" icon={<Add />} iconPosition="start" />
            <Tab label="users" icon={<Group />} iconPosition="start" />
          </Tabs>
        </Sidebar>
        {content}
      </Main>
    </Box>
  );
};

export default AdminDashboard;

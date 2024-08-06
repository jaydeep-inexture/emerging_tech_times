import { createTheme, ThemeProvider } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AdminLayout from "@/layout/AdminLayout";
import MainLayout from "@/layout/MainLayout";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import About from "./pages/About";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ArticleDetails from "./pages/ArticleDetails";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import News from "./pages/News";
import Profile from "./pages/Profile";
import { refreshAuthToken } from "./redux/user/userSlice";

const REFRESH_INTERVAL = 24 * 60 * 60 * 1000; // every 24hrs

const theme = createTheme({
  palette: {
    primary: {
      main: "#0F172A",
    },
  },
});

const App = () => {
  const dispatch = useDispatch();

  // check token expiry and refresh if necessary
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(refreshAuthToken());
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/news" element={<News />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/article/:title" element={<ArticleDetails />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;

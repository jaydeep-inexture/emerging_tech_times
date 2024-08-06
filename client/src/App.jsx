import { createTheme, ThemeProvider } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import MainLayout from "@/layout/MainLayout";
import { loadLoggedInUser } from "@/redux/userSlice";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AuthLayout from "./layout/AuthLayout";
import About from "./pages/About";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ArticleDetails from "./pages/ArticleDetails";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import News from "./pages/News";
import Profile from "./pages/Profile";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0F172A",
    },
  },
});

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch(loadLoggedInUser());
    }
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

            <Route element={<AuthLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;

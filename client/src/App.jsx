import { createTheme, ThemeProvider } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import NotificationSnackbar from "@/common/NotificationSnackbar";
import Profile from "@/components/Profile";
import MainLayout from "@/layout/MainLayout";
import { setNotification } from "@/redux/notificationSlice";
import { loadLoggedInUser } from "@/redux/userSlice";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AuthLayout from "./layout/AuthLayout";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";
import ArticleDetails from "./pages/ArticleDetails";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import News from "./pages/News";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0F172A",
    },
  },
  font: {
    main: "White",
    second: "black",
  },
  typography: {
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.75rem", // Adjust the size as needed
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.50rem", // Adjust the size as needed
      fontWeight: 400,
    },
    h5: {
      fontSize: "1.25rem", // Adjust the size as needed
      fontWeight: 300,
    },
    h6: {
      fontSize: "1.00rem", // Adjust the size as needed
      fontWeight: 200,
    },
  },
});

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (user) {
      try {
        dispatch(loadLoggedInUser());
      } catch (error) {
        const errMessage =
          error.response.data.msg ||
          error.response.data?.errors?.[0]?.msg ||
          "An error occurred";
        dispatch(
          setNotification({
            type: "error",
            message: errMessage,
          })
        );
      }
    }
  }, [dispatch]);

  return (
    <>
      <MantineProvider>
        <NotificationSnackbar />
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/news" element={<News />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/article/:id" element={<ArticleDetails />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              <Route element={<AuthLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
      </MantineProvider>
    </>
  );
};

export default App;

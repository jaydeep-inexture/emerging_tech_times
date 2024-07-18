import React from "react";
import Nav from "./components/Nav";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import News from "./pages/News";
import Footer from "./components/Footer";
import { MobileProvider } from "./context/isMobileContext";
import ArticleDetails from "./pages/ArticleDetails";

const App = () => {
  return (
    <>
     <MobileProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/article/:title" element={<ArticleDetails />} />
        </Routes>
      </Router>
      <Footer />
      </MobileProvider>
    </>
  );
};

export default App;

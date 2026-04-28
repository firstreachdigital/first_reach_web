import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ConnectPage from "./pages/ConnectPage";
import ContactPage from "./pages/ContactPage";
import WhyusPage from "./pages/WhyusPage";
import PortfolioPage from "./pages/PortfolioPage";
import TestimonialPage from "./pages/TestimonialPage";
import TeamPage from "./pages/TeamPage";
import Careers from "./pages/CareersPage";
import TeamMemberPage from "./pages/TeamMemberPage";
import BlogPage from "./pages/BlogPage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/Contact" element={<ConnectPage />} />
        <Route path="/FAQ" element={<ContactPage />} />
        <Route path="/choose-us" element={<WhyusPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/testimonial" element={<TestimonialPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/team/:slug" element={<TeamMemberPage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>

      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
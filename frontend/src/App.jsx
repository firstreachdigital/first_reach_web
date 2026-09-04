import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import CtaBanner from "./components/banner/CtaBanner";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import Privacy from "./components/privacy/PrivacyPolicy";
import Terms from "./components/privacy/TermsAndConditions";

import { Routes, Route } from "react-router-dom";


import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import ConnectPage from "./pages/ConnectPage";
import ContactPage from "./pages/ContactPage";
import WhyusPage from "./pages/WhyusPage";
import PortfolioPage from "./pages/PortfolioPage";
import TestimonialPage from "./pages/TestimonialPage";
import TeamPage from "./pages/TeamPage";
import Careers from "./pages/CareersPage";
import CareerApplyPage from "./pages/CareerApplyPage";
import TeamMemberPage from "./pages/TeamMemberPage";
import BlogPage from "./pages/BlogPage";
import GetAQuotePage from "./pages/GetAQuotePage";

//services menu
import ReputationDetailPage from "./pages/ReputationDetailPage";
import RecoveryDetailPage from "./pages/RecoveryDetailPage";
import RemovalDetailPage from "./pages/RemovalDetailPage";

import ReputationPage from "./pages/ReputationPage";
import RecoveryPage from "./pages/RecoveryPage";
import RemovalPage from "./pages/RemovalPage";
import MosasBabuPage from "./pages/MosasBabuPage";


function App() {
 
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/Contact" element={<ConnectPage />} />
        <Route path="/FAQ" element={<ContactPage />} />
        <Route path="/choose-us" element={<WhyusPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/testimonial" element={<TestimonialPage />} />
        <Route path="/mosas-babu" element={<MosasBabuPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/apply/:jobId" element={<CareerApplyPage />} />
        <Route path="/team/:slug" element={<TeamMemberPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPage />} />
        <Route path="/get-a-quote" element={<GetAQuotePage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        {/* services menu */}
        <Route path="/reputation" element={<ReputationPage />} />
        <Route path="/reputation/:slug" element={<ReputationDetailPage />} />
        <Route path="/recovery" element={<RecoveryPage />} />
        <Route path="/recovery/:slug" element={<RecoveryDetailPage />} />
        <Route path="/removal" element={<RemovalPage />} />
        <Route path="/removal/:slug" element={<RemovalDetailPage />} />
      </Routes>
      <CtaBanner />
      <Footer />
    </>
  );
}

export default App;
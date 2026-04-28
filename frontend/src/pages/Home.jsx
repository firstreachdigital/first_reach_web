import Hero from "../components/hero/Hero";
import About from "../components/about/About";
import Services from "../components/services/Services";
import WhyUs from "../components/whyus/whyUs";
import Portfolio from "../components/portfolio/Portfolio";
import MyPort from "../components/myport/MyPort";
import Testimonial from "../components/testimonials/Testimonials";
import Steps from "../components/steps/Steps";
import Team from "../components/team/Team";
import Contact from "../components/contact/Contact";
import Blog from "../components/blog/Blog";
import ConnectUs from "../components/connectUs/ConnectUs";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhyUs />
      <Portfolio />
      <MyPort />
      <Testimonial />
      <Steps />
      <Team />
      <Contact />
      <Blog />
      <ConnectUs />
    </>
  );
}
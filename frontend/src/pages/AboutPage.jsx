import About from "../components/about/About";
import Founder from "../components/founder/Founder";
import Partners from "../components/partners/Partners";
import Expertise from "../components/expertise/Expertise";
import SEO from "../components/SEO";

export default function AboutPage() {
  return (
    <>
    <SEO page="about" />
    <div style={{ paddingTop: "120px" }}>
      <About />
      <Founder />
      {/* <Partners /> */}
      <Expertise />
    </div>
    </>
  );
}
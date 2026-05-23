import About from "../components/about/About";
import SEO from "../components/SEO";

export default function AboutPage() {
  return (
    <>
    <SEO page="about" />
    <div style={{ paddingTop: "120px" }}>
      <About />
    </div>
    </>
  );
}
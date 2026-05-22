import Portfolio from "../components/portfolio/Portfolio";
import MyPort from "../components/myport/MyPort";
import SEO from "../components/SEO";

export default function PortfolioPage() {
  return (
    <>
    <SEO page="portfolio" />
    <div style={{ paddingTop: "120px" }}>
      <Portfolio />
      <MyPort />
    </div>
    </>
  );
}
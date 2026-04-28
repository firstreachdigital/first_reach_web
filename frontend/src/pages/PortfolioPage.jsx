import Portfolio from "../components/portfolio/Portfolio";
import MyPort from "../components/myport/MyPort";

export default function PortfolioPage() {
  return (
    <div style={{ paddingTop: "120px" }}>
      <Portfolio />
      <MyPort />
    </div>
  );
}
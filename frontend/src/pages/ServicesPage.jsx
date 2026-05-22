import SEO from "../components/SEO";
import Services from "../components/services/Services";

export default function ServicesPage() {
  return (
    <>
    <SEO page="services" />
    <div style={{ paddingTop: "120px" }}>
      <Services />
    </div>
    </>
  );
}
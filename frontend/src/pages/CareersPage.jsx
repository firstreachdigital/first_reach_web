import CareersPage from "../components/careers/Careers";
import SEO from "../components/SEO";

export default function Careers() {
  return (
    <>
    <SEO page="careers" />
      <div style={{ paddingTop: "120px" }}>
        <CareersPage />
      </div>
    </>
  );
}

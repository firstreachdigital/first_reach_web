import SEO from "../components/SEO";
import Team from "../components/team/Team";

export default function TeamPage() {
  return (
    <>
    <SEO page="team" />
    <div style={{ paddingTop: "120px" }}>
      <Team />
    </div>
    </>
  );
}

import ConnectUs from "../components/connectUs/ConnectUs";
import SEO from "../components/SEO";

export default function ConnectPage() {
  return (
    <>
      <SEO page="connect" />
      <div style={{ paddingTop: "120px" }}>
        <ConnectUs />
      </div>
    </>
  );
}

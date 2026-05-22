import Contact from "../components/contact/Contact";
import SEO from "../components/SEO";

export default function ContactPage() {
  return (
    <>
    <SEO page="contact" />
    <div style={{ paddingTop: "120px" }}>
      <Contact />
    </div>
    </>
  );
}
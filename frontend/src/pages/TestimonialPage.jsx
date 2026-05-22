import SEO from "../components/SEO";
import Testimonial from "../components/testimonials/Testimonials";

export default function TestimonialPage() {
  return (
    <>
    <SEO page="testimonials" />
    <div style={{ paddingTop: "120px" }}>
      <Testimonial />
    </div>
    </>
  );
}
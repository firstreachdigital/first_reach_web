import { Helmet } from "react-helmet-async";

const SEO_DATA = {
  home: {
    title: "Best Digital Marketing Agency in Kerala & UAE | First Reach Digital",
    description:
      "Grow your business with expert SEO, social media marketing, web development & branding. First Reach Digital Private Limited — Innovating Success Together.",
    keywords:
      "best digital marketing agency Kerala, digital marketing agency UAE, SEO company Kerala, social media marketing Dubai, web development company Kerala, branding agency UAE",
    url: "https://firstreachdigital.com",
  },
  about: {
    title: "About First Reach Digital | Branding & Marketing Experts Kerala UAE",
    description:
      "Discover how First Reach Digital helps brands grow with creative SEO, digital marketing & branding strategies across Kerala and UAE.",
    keywords:
      "about First Reach Digital, creative digital agency Kerala, branding experts UAE, digital marketing company Kerala, SEO specialists Dubai",
    url: "https://firstreachdigital.com/about",
  },
  services: {
    title: "Digital Marketing Services Kerala & UAE | First Reach Digital",
    description:
      "Expert SEO, social media marketing, web development, branding & graphic design by First Reach Digital — driving measurable growth in Kerala & UAE.",
    keywords:
      "SEO services Kerala, social media marketing UAE, web development company Dubai, branding services Kerala, content marketing agency UAE",
    url: "https://firstreachdigital.com/services",
  },
  blog: {
    title: "Digital Marketing Blog | SEO & Growth Tips | First Reach Digital",
    description:
      "Expert insights on SEO, social media strategy, content marketing & branding from First Reach Digital — your growth partner in Kerala & UAE.",
    keywords:
      "digital marketing blog Kerala, SEO tips UAE, branding strategy insights, social media growth tips Dubai",
    url: "https://firstreachdigital.com/blog",
  },
  shop: {
    title: "Digital Marketing Tools & Resources | First Reach Digital Shop",
    description:
      "Shop digital marketing templates, SEO tools, branding kits & resources from First Reach Digital. Empower your business growth in Kerala & UAE.",
    keywords:
      "digital marketing tools Kerala, SEO tools UAE, marketing templates Dubai, branding kits Kerala",
    url: "https://firstreachdigital.com/shop",
  },
  contact: {
    title: "Contact First Reach Digital Private Limited | Kerala & UAE",
    description:
      "Get in touch with First Reach Digital for SEO, web design, social media & branding services across Kerala & UAE. Let's innovate your success together.",
    keywords:
      "contact digital marketing agency Kerala, SEO consultation UAE, branding agency Dubai, web development inquiry Kerala",
    url: "https://firstreachdigital.com/contact",
  },
  career: {
    title: "Careers at First Reach Digital Private Limited | Kerala & UAE",
    description:
      "Explore career opportunities at First Reach Digital. Join our team of marketers, designers & developers innovating success in Kerala & UAE.",
    keywords:
      "digital marketing jobs Kerala, marketing agency careers UAE, SEO jobs Dubai, web developer jobs Kerala",
    url: "https://firstreachdigital.com/career",
  },
  team: {
    title: "Meet Our Team | Digital Marketing Experts | First Reach Digital",
    description:
      "Meet the passionate marketers, SEO specialists, designers & developers behind First Reach Digital — innovating success for clients in Kerala & UAE.",
    keywords:
      "First Reach Digital team, digital marketing experts Kerala, SEO specialists UAE, web developers Kerala",
    url: "https://firstreachdigital.com/team",
  },
  faq: {
    title: "FAQs | Digital Marketing Questions | First Reach Digital",
    description:
      "Got questions about SEO, web design, social media or branding? Find clear answers from First Reach Digital — serving businesses in Kerala & UAE.",
    keywords:
      "digital marketing FAQ Kerala, SEO questions UAE, web development FAQ Dubai, branding FAQ Kerala",
    url: "https://firstreachdigital.com/faq",
  },
  testimonials: {
    title: "Client Testimonials | First Reach Digital | Kerala & UAE",
    description:
      "See what our clients say about First Reach Digital's SEO, web development & branding services. Trusted by businesses across Kerala, Dubai & the UAE.",
    keywords:
      "digital marketing agency reviews Kerala, client testimonials UAE, SEO agency reviews Dubai, First Reach Digital reviews",
    url: "https://firstreachdigital.com/testimonials",
  },
};

const OG_IMAGE = "https://firstreachdigital.com/og-image.jpg";

export default function SEO({ page, title, description, keywords, url }) {
  // Use custom props if passed, otherwise fall back to SEO_DATA
  const data = SEO_DATA[page] || {};
  const _title       = title       || data.title       || "First Reach Digital";
  const _description = description || data.description || "";
  const _keywords    = keywords    || data.keywords    || "";
  const _url         = url         || data.url         || "https://firstreachdigital.com";

  return (
    <Helmet>
      {/* ── Primary ── */}
      <title>{_title}</title>
      <meta name="description"  content={_description} />
      <meta name="keywords"     content={_keywords} />
      <link rel="canonical"     href={_url} />

      {/* ── Open Graph ── */}
      <meta property="og:type"        content="website" />
      <meta property="og:title"       content={_title} />
      <meta property="og:description" content={_description} />
      <meta property="og:url"         content={_url} />
      <meta property="og:image"       content={OG_IMAGE} />
      <meta property="og:site_name"   content="First Reach Digital Private Limited" />
      <meta property="og:locale"      content="en_IN" />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={_title} />
      <meta name="twitter:description" content={_description} />
      <meta name="twitter:image"       content={OG_IMAGE} />

      {/* ── Extra signals ── */}
      <meta name="robots"   content="index, follow" />
      <meta name="author"   content="First Reach Digital Private Limited" />
      <meta name="geo.region"       content="IN-KL" />
      <meta name="geo.placename"    content="Kerala, India" />
    </Helmet>
  );
}
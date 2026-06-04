import React from "react";
import styles from "./GetAQuoteSteps.module.css";
import {
  FaPaintBrush,
  FaImages,
  FaMobileAlt,
  FaVideo,
  FaMagic,
  FaFilm,
  FaYoutube,
  FaImage,
  FaGem,
  FaPen,
  FaStar,
  FaCalendarAlt,
  FaCommentDots,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaLinkedin,
  FaTwitter,
  FaGoogle,
  FaRocket,
  FaMapPin,
  FaTools,
  FaWhatsapp,
  FaEnvelope,
  FaRobot,
  FaMapMarkerAlt,
  FaBullseye,
  FaSearch,
  FaCheck
} from "react-icons/fa";

export const SERVICES = {
  "Content & Design": [
    {
      id: "poster",
      name: "Poster Designs",
      desc: "Social media posters",
      icon: <FaPaintBrush />,
    },
    {
      id: "carousel",
      name: "Carousel Designs",
      desc: "Multi-slide posts",
      icon: <FaImages />,
    },
    {
      id: "story",
      name: "Story Designs",
      desc: "IG & FB stories",
      icon: <FaMobileAlt />,
    },
    {
      id: "video",
      name: "Video Editing",
      desc: "Professional edits",
      icon: <FaVideo />,
    },
    {
      id: "motion",
      name: "Motion Graphics",
      desc: "Animated visuals",
      icon: <FaMagic />,
    },
    {
      id: "reels",
      name: "Reels Editing",
      desc: "Short-form reels",
      icon: <FaFilm />,
    },
    {
      id: "youtube",
      name: "YouTube Editing",
      desc: "Long-form videos",
      icon: <FaYoutube />,
    },
    {
      id: "thumbnail",
      name: "Thumbnail Design",
      desc: "Click-worthy thumbs",
      icon: <FaImage />,
    },
    {
      id: "branding",
      name: "Branding Design",
      desc: "Brand identity",
      icon: <FaGem />,
    },
    {
      id: "logo",
      name: "Logo Design",
      desc: "Logo & brand marks",
      icon: <FaStar />,
    },
    {
      id: "content",
      name: "Content Writing",
      desc: "Blog & web copy",
      icon: <FaPen />,
    },
    {
      id: "caption",
      name: "Caption Writing",
      desc: "Social captions",
      icon: <FaCommentDots />,
    },
    {
      id: "calendar",
      name: "Content Calendar",
      desc: "Monthly planning",
      icon: <FaCalendarAlt />,
    },
  ],
  "Social Media Management": [
    {
      id: "instagram",
      name: "Instagram Mgmt",
      desc: "Full IG management",
      icon: <FaInstagram />,
    },
    {
      id: "facebook",
      name: "Facebook Mgmt",
      desc: "FB page management",
      icon: <FaFacebook />,
    },
    {
      id: "tiktok",
      name: "TikTok Mgmt",
      desc: "TikTok strategy",
      icon: <FaTiktok />,
    },
    {
      id: "linkedin",
      name: "LinkedIn Mgmt",
      desc: "Professional network",
      icon: <FaLinkedin />,
    },
    {
      id: "twitter",
      name: "X (Twitter) Mgmt",
      desc: "Twitter/X presence",
      icon: <FaTwitter />,
    },
    {
      id: "ytmgmt",
      name: "YouTube Mgmt",
      desc: "Channel management",
      icon: <FaYoutube />,
    },
  ],
  "Marketing & Growth": [
    { id: "meta", name: "Meta Ads", desc: "Facebook & IG ads", icon: <FaBullseye /> },
    {
      id: "google",
      name: "Google Ads",
      desc: "Search & display ads",
      icon: <FaGoogle />,
    },
    {
      id: "seo",
      name: "SEO Services",
      desc: "Search optimization",
      icon: <FaSearch />,
    },
    {
      id: "localseo",
      name: "Local SEO",
      desc: "Local search boost",
      icon: <FaMapPin />,
    },
    {
      id: "webmaint",
      name: "Website Maintenance",
      desc: "Site upkeep & updates",
      icon: <FaTools />,
    },
    {
      id: "landing",
      name: "Landing Page",
      desc: "High-convert pages",
      icon: <FaRocket />,
    },
    {
      id: "whatsapp",
      name: "WhatsApp Marketing",
      desc: "WA campaigns",
      icon: <FaWhatsapp />,
    },
    {
      id: "email",
      name: "Email Marketing",
      desc: "Email campaigns",
      icon: <FaEnvelope />,
    },
    { id: "ai", name: "AI Automation", desc: "Smart automations", icon: <FaRobot /> },
    {
      id: "strategy",
      name: "Marketing Strategy",
      desc: "Full growth plan",
      icon: <FaMapMarkerAlt />,
    },
  ],
};

export default function Step1Services({ selected, toggleService, errors }) {
  return (
    <div>
      <div className={styles.stepHead}>
        <h2 className={styles.stepTitle}>
          What Services Do You Need Every Month?
        </h2>
        <p className={styles.stepSubtitle}>
          Select the services your business needs — you can choose multiple.
        </p>
      </div>

      {Object.entries(SERVICES).map(([cat, svcs]) => (
        <div key={cat} className={styles.serviceSection}>
          <div className={styles.sectionTitle}>{cat}</div>
          <div className={styles.serviceGrid}>
            {svcs.map((s) => (
              <div
                key={s.id}
                className={`${styles.svcCard} ${selected.has(s.id) ? styles.svcSelected : ""}`}
                onClick={() => toggleService(s.id)}
              >
                {selected.has(s.id) && (
                  <span className={styles.checkmark}><FaCheck /></span>
                )}
                <div className={styles.svcIcon}>{s.icon}</div>
                <div className={styles.svcName}>{s.name}</div>
                <div className={styles.svcDesc}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {errors.services && <p className={styles.errorMsg}>{errors.services}</p>}
    </div>
  );
}

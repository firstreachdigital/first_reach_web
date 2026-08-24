import React, { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";
import logoElephant from "../../assets/FRST REACH LOGO ELEPHANT.png";
import {
  FaArrowRight,
  FaChevronDown,
  FaTimes,
  FaClock,
  FaTag,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import API from "../../api/axios";

// const pagesMenu = [
//   { label: "Price Page", path: "/pricing" },
//   { label: "Choose Us", path: "/choose-us" },
//   { label: "Work Process", path: "/portfolio" },
// ];

// const shopMenu = [
//   { label: "Shop Grid", path: "/shop" },
//   { label: "Shop Detail", path: "/shop/detail" },
// ];

function useHoverMenu() {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const ref = useRef(null);
  const onEnter = () => {
    clearTimeout(timer.current);
    setOpen(true);
  };
  const onLeave = () => {
    timer.current = setTimeout(() => setOpen(false), 180);
  };
  return { open, setOpen, ref, onEnter, onLeave };
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [hoveredPage, setHoveredPage] = useState(null);
  const [hoveredAbout, setHoveredAbout] = useState(null);
  const [mobilePages, setMobilePages] = useState(false);
  const [mobileAbout, setMobileAbout] = useState(false);
  const [mobileTeam, setMobileTeam] = useState(false);
  const [mobileBlog, setMobileBlog] = useState(false);
  const [mobileShop, setMobileShop] = useState(false);
  const [mobileReputation, setMobileReputation] = useState(false);
  const [mobileRecovery, setMobileRecovery] = useState(false);
  const [mobileRemoval, setMobileRemoval] = useState(false);
  //const [blogModal, setBlogModal] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("frtheme") || "light",
  );

  const [mobileServices, setMobileServices] = useState(false);

  // Dynamic data
  const [teamMembers, setTeamMembers] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

  const megaRef = useRef(null);
  const about = useHoverMenu();
  const shop = useHoverMenu();
  const reputation = useHoverMenu();
  const recovery = useHoverMenu();
  const removal = useHoverMenu();
  const services = useHoverMenu();
  const location = useLocation();

  // Fetch team & blogs on mount
  useEffect(() => {
    API.get("/team")
      .then(({ data }) => setTeamMembers(data))
      .catch(() => {});
    API.get("/blogs")
      .then(({ data }) => setBlogPosts(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) {
        setMegaOpen(false);
        setHoveredPage(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMenuOpen(false);
    setHoveredPage(null);
    setHoveredAbout(null);
    about.setOpen(false);
    shop.setOpen(false);
    reputation.setOpen(false);
    recovery.setOpen(false);
    removal.setOpen(false);
    //setBlogModal(false);
  }, [location.pathname]);

  // useEffect(() => {
  //   document.body.style.overflow = blogModal ? "hidden" : "";
  //   return () => {
  //     document.body.style.overflow = "";
  //   };
  // }, [blogModal]);

  // useEffect(() => {
  //   const onKey = (e) => {
  //     if (e.key === "Escape") setBlogModal(false);
  //   };
  //   window.addEventListener("keydown", onKey);
  //   return () => window.removeEventListener("keydown", onKey);
  // }, []);

  //light/dark theme toggle
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("frtheme", theme);
    if (window.vantaEffect) {
      window.vantaEffect.setOptions({
        backgroundColor: theme === "dark" ? 0x080808 : 0xffffff,
      });
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  // Build aboutMenu dynamically with team members
  const aboutMenu = [
    { label: "CEO", path: "/mosas-babu", hasSubmenu: false },
    {
      label: "Team",
      path: "/team",
      hasSubmenu: false,
      submenu: [
        { label: "All Team", path: "/team" },
        ...teamMembers.map((m) => ({ label: m.name, path: `/team/${m.slug}` })),
      ],
    },
    { label: "Careers", path: "/careers", hasSubmenu: false },
    { label: "FAQ", path: "/FAQ", hasSubmenu: false },
    { label: "Testimonial", path: "/testimonial", hasSubmenu: false },
    // { label: "Portfolio", path: "/portfolio", hasSubmenu: false },
    { label: "Why Us", path: "/why-us", hasSubmenu: false },
  ];

  const servicesMenu = [
    {
      label: "Brand Development & Management",
      path: "/services/brand-development",
    },
    {
      label: "Website and App Development",
      path: "/services/website-app-development",
    },
    { label: "Search Engine Optimization (SEO)", path: "/services/seo" },
    {
      label: "Social Media Management & Marketing",
      path: "/services/social-media-management",
    },
    {
      label: "Influencer Marketing & Media Productions",
      path: "/services/influencer-media",
    },
    {
      label: "Content Marketing & Graphic Design",
      path: "/services/content-graphic-design",
    },
    {
      label: "Brand Protection & Digital Security",
      path: "/services/brand-protection",
    },
    { label: "Reputation & Removal", path: "/services/reputation-removal" },
  ];

  const reputationMenu = [
    { label: "Personal Branding", path: "/reputation/personal-branding" },
    {
      label: "Wikipedia Creation & Consulting",
      path: "/reputation/wikipedia-consulting",
    },
    {
      label: "Social Media Verification",
      path: "/reputation/social-media-verification",
    },
    {
      label: "AI Indexing & AI Search Visibility",
      path: "/reputation/ai-search-visibility",
    },
    {
      label: "Search Engine De-Indexing",
      path: "/reputation/search-engine-deindexing",
    },
    {
      label: "Google Knowledge Panel",
      path: "/reputation/google-knowledge-panel",
    },
    {
      label: "Instagram Username Claim & Recovery",
      path: "/reputation/instagram-username-claim",
    },
  ];

  const recoveryMenu = [
    { label: "Social Media Unban", path: "/recovery/social-media-unban" },
    {
      label: "Social Media Account Recovery",
      path: "/recovery/social-media-account-recovery",
    },
    {
      label: "Instagram Account Recovery",
      path: "/recovery/instagram-account-recovery",
    },
    {
      label: "Facebook Account Recovery",
      path: "/recovery/facebook-account-recovery",
    },
    {
      label: "Business Account Recovery",
      path: "/recovery/business-account-recovery",
    },
    {
      label: "Suspended Account Recovery",
      path: "/recovery/suspended-account-recovery",
    },
    {
      label: "Disabled Account Recovery",
      path: "/recovery/disabled-account-recovery",
    },
    {
      label: "Restricted Account Recovery",
      path: "/recovery/restricted-account-recovery",
    },
    {
      label: "Hacked Account Recovery",
      path: "/recovery/hacked-account-recovery",
    },
    {
      label: "YouTube Channel Recovery",
      path: "/recovery/youtube-channel-recovery",
    },
    {
      label: "YouTube Termination Appeal",
      path: "/recovery/youtube-termination-appeal",
    },
    {
      label: "Content Removal & Policy Review",
      path: "/recovery/content-removal-policy-review",
    },
    {
      label: "Account Appeal & Escalation Support",
      path: "/recovery/account-appeal-escalation",
    },
  ];

  const removalMenu = [
    {
      label: "Negative Links Removal",
      path: "/removal/negative-links-removal",
    },
    {
      label: "Business Manager Recovery",
      path: "/removal/business-manager-recovery",
    },
  ];

  const activeAboutSubmenu = hoveredAbout
    ? aboutMenu.find((a) => a.label === hoveredAbout)?.submenu
    : null;

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.inner}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <img
              src={logoElephant}
              alt="First Reach Digital"
              className={styles.logoImg}
            />
            <div className={styles.logoTextWrap}>
              <span className={styles.logoTop}>First Reach</span>
              <span className={styles.logoBottom}>Digital</span>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className={styles.links}>
            <li className={styles.navItem}>
              {location.pathname === "/" ? (
                <a href="/" className={styles.link}>
                  Home
                </a>
              ) : (
                <Link to="/" className={styles.link}>
                  Home
                </Link>
              )}
            </li>

            {/* About Us */}
            <li
              ref={about.ref}
              className={styles.navItem}
              onMouseEnter={about.onEnter}
              onMouseLeave={about.onLeave}
            >
              <Link
                to="/about"
                className={`${styles.link} ${styles.pagesBtn} ${about.open ? styles.pageBtnActive : ""}`}
              >
                About{" "}
                <FaChevronDown
                  className={`${styles.chevron} ${about.open ? styles.chevronUp : ""}`}
                />
              </Link>
              {about.open && (
                <div
                  className={styles.megaMenu}
                  onMouseEnter={about.onEnter}
                  onMouseLeave={about.onLeave}
                >
                  <div className={styles.megaInner}>
                    <ul className={styles.megaList}>
                      {aboutMenu.map((item) => (
                        <li key={item.label}>
                          {item.hasSubmenu ? (
                            <div
                              className={`${styles.megaItem} ${hoveredAbout === item.label ? styles.megaItemActive : ""}`}
                              onMouseEnter={() => setHoveredAbout(item.label)}
                            >
                              <span>{item.label}</span>
                              <FaChevronDown
                                className={`${styles.megaArrow} ${styles.megaArrowRight}`}
                              />
                            </div>
                          ) : (
                            <Link
                              to={item.path}
                              className={styles.megaItem}
                              onMouseEnter={() => setHoveredAbout(null)}
                              onClick={() => about.setOpen(false)}
                            >
                              <span>{item.label}</span>
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                    {activeAboutSubmenu && (
                      <div className={styles.megaSubmenu}>
                        <div className={styles.megaSubmenuScroll}>
                          {activeAboutSubmenu.map((sub) => (
                            <Link
                              key={sub.label}
                              to={sub.path}
                              className={styles.megaSubItem}
                              onClick={() => {
                                about.setOpen(false);
                                setHoveredAbout(null);
                              }}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </li>

            {/* Services */}
            <li
              ref={services.ref}
              className={styles.navItem}
              onMouseEnter={services.onEnter}
              onMouseLeave={services.onLeave}
            >
              <Link
                to="/services"
                className={`${styles.link} ${styles.pagesBtn} ${services.open ? styles.pageBtnActive : ""}`}
              >
                Services{" "}
                <FaChevronDown
                  className={`${styles.chevron} ${services.open ? styles.chevronUp : ""}`}
                />
              </Link>
              {services.open && (
                <div
                  className={styles.megaMenu}
                  style={{ minWidth: "220px" }}
                  onMouseEnter={services.onEnter}
                  onMouseLeave={services.onLeave}
                >
                  <div className={styles.megaInner}>
                    <ul className={styles.megaList}>
                      {servicesMenu.map((item) => (
                        <li key={item.label}>
                          <Link
                            to={item.path}
                            className={styles.megaItem}
                            onClick={() => services.setOpen(false)}
                          >
                            <span>{item.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>

            {/* Reputation */}
            <li
              ref={reputation.ref}
              className={styles.navItem}
              onMouseEnter={reputation.onEnter}
              onMouseLeave={reputation.onLeave}
            >
              <Link
                to="/reputation"
                className={`${styles.link} ${styles.pagesBtn} ${reputation.open ? styles.pageBtnActive : ""}`}
              >
                Reputation{" "}
                <FaChevronDown
                  className={`${styles.chevron} ${reputation.open ? styles.chevronUp : ""}`}
                />
              </Link>
              {reputation.open && (
                <div
                  className={styles.megaMenu}
                  style={{ minWidth: "220px" }}
                  onMouseEnter={reputation.onEnter}
                  onMouseLeave={reputation.onLeave}
                >
                  <div className={styles.megaInner}>
                    <ul className={styles.megaList}>
                      {reputationMenu.map((item) => (
                        <li key={item.label}>
                          <Link
                            to={item.path}
                            className={styles.megaItem}
                            onClick={() => reputation.setOpen(false)}
                          >
                            <span>{item.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>

            {/* Recovery */}
            <li
              ref={recovery.ref}
              className={styles.navItem}
              onMouseEnter={recovery.onEnter}
              onMouseLeave={recovery.onLeave}
            >
              <Link
                to="/recovery"
                className={`${styles.link} ${styles.pagesBtn} ${recovery.open ? styles.pageBtnActive : ""}`}
              >
                Recovery{" "}
                <FaChevronDown
                  className={`${styles.chevron} ${recovery.open ? styles.chevronUp : ""}`}
                />
              </Link>
              {recovery.open && (
                <div
                  className={styles.megaMenu}
                  style={{ minWidth: "220px" }}
                  onMouseEnter={recovery.onEnter}
                  onMouseLeave={recovery.onLeave}
                >
                  <div className={styles.megaInner}>
                    <ul className={styles.megaList}>
                      {recoveryMenu.map((item) => (
                        <li key={item.label}>
                          <Link
                            to={item.path}
                            className={styles.megaItem}
                            onClick={() => recovery.setOpen(false)}
                          >
                            <span>{item.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>

            {/* Removal */}
            <li
              ref={removal.ref}
              className={styles.navItem}
              onMouseEnter={removal.onEnter}
              onMouseLeave={removal.onLeave}
            >
              <Link
                to="/removal"
                className={`${styles.link} ${styles.pagesBtn} ${removal.open ? styles.pageBtnActive : ""}`}
              >
                Removal{" "}
                <FaChevronDown
                  className={`${styles.chevron} ${removal.open ? styles.chevronUp : ""}`}
                />
              </Link>
              {removal.open && (
                <div
                  className={styles.megaMenu}
                  style={{ minWidth: "220px" }}
                  onMouseEnter={removal.onEnter}
                  onMouseLeave={removal.onLeave}
                >
                  <div className={styles.megaInner}>
                    <ul className={styles.megaList}>
                      {removalMenu.map((item) => (
                        <li key={item.label}>
                          <Link
                            to={item.path}
                            className={styles.megaItem}
                            onClick={() => removal.setOpen(false)}
                          >
                            <span>{item.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>

            <li className={styles.navItem}>
              <Link to="/portfolio" className={styles.link}>
                Portfolio
              </Link>
            </li>

            {/* Blog — opens modal */}
            {/* <li className={styles.navItem}>
              <button
                className={`${styles.link} ${styles.pagesBtn} ${blogModal ? styles.pageBtnActive : ""}`}
                onClick={() => setBlogModal(true)}
              >
                Blogs{" "}
                <FaChevronDown
                  className={`${styles.chevron} ${blogModal ? styles.chevronUp : ""}`}
                />
              </button>
            </li> */}

            <li className={styles.navItem}>
             <Link to="/blog" className={styles.link}>
               Blogs
             </Link>
            </li>

            {/* Shop */}
            {/* <li
              ref={shop.ref}
              className={styles.navItem}
              onMouseEnter={shop.onEnter}
              onMouseLeave={shop.onLeave}
            >
              <Link
                to="/shop"
                className={`${styles.link} ${styles.pagesBtn} ${shop.open ? styles.pageBtnActive : ""}`}
              >
                Shop{" "}
                <FaChevronDown
                  className={`${styles.chevron} ${shop.open ? styles.chevronUp : ""}`}
                />
              </Link>
              {shop.open && (
                <div
                  className={styles.megaMenu}
                  style={{ minWidth: "160px" }}
                  onMouseEnter={shop.onEnter}
                  onMouseLeave={shop.onLeave}
                >
                  <div className={styles.megaInner}>
                    <ul className={styles.megaList}>
                      {shopMenu.map((item) => (
                        <li key={item.label}>
                          <Link
                            to={item.path}
                            className={styles.megaItem}
                            onClick={() => shop.setOpen(false)}
                          >
                            <span>{item.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li> */}

            {/* Pages */}
            {/* <li ref={megaRef} className={styles.navItem}>
              <button
                className={`${styles.link} ${styles.pagesBtn} ${megaOpen ? styles.pageBtnActive : ""}`}
                onClick={() => {
                  setMegaOpen((p) => !p);
                  setHoveredPage(null);
                }}
                aria-haspopup="true"
                aria-expanded={megaOpen}
              >
                Pages{" "}
                <FaChevronDown
                  className={`${styles.chevron} ${megaOpen ? styles.chevronUp : ""}`}
                />
              </button>
              {megaOpen && (
                <div className={styles.megaMenu}>
                  <div className={styles.megaInner}>
                    <ul className={styles.megaList}>
                      {pagesMenu.map((page) => (
                        <li key={page.label}>
                          <Link
                            to={page.path}
                            className={`${styles.megaItem} ${hoveredPage === page.label ? styles.megaItemActive : ""}`}
                            onMouseEnter={() => setHoveredPage(page.label)}
                            onClick={() => setMegaOpen(false)}
                          >
                            <span>{page.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li> */}

            <li className={styles.navItem}>
              <Link to="/contact" className={styles.link}>
                Contact
              </Link>
            </li>
          </ul>

          {/* Theme Toggle */}
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          {/* CTA */}
          {location.pathname === "/" ? (
            <a href="/get-a-quote" className={styles.cta}>
              <span className={styles.ctaArrow}>
                <FaArrowRight />
              </span>
              Get a Quote
            </a>
          ) : (
            <Link to="/get-a-quote" className={styles.cta}>
              <span className={styles.ctaArrow}>
                <FaArrowRight />
              </span>
              Get a Quote
            </Link>
          )}

          {/* Hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`${styles.bar} ${menuOpen ? styles.open1 : ""}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.open2 : ""}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.open3 : ""}`} />
          </button>
        </div>

        {/* ── Mobile menu ── */}
        {menuOpen && (
          <div className={styles.mobileMenu}>
            {location.pathname === "/" ? (
              <a
                href="#home"
                className={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </a>
            ) : (
              <Link
                to="/"
                className={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            )}

            {/* About mobile */}
            <div>
              <button
                className={`${styles.mobileLink} ${styles.mobilePagesBtn}`}
                onClick={() => setMobileAbout((p) => !p)}
              >
                About Us{" "}
                <FaChevronDown
                  className={`${styles.chevron} ${mobileAbout ? styles.chevronUp : ""}`}
                  style={{ fontSize: "0.7rem" }}
                />
              </button>
              {mobileAbout && (
                <div className={styles.mobileSubList}>
                  <Link
                    to="/about"
                    className={styles.mobileSubLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    About Us
                  </Link>
                  <button
                    style={{
                      width: "100%",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      color: "#666",
                      padding: "0.55rem 1rem",
                      fontSize: "0.875rem",
                      borderRadius: "0.4rem",
                    }}
                    onClick={() => setMobileTeam((p) => !p)}
                  >
                    Team{" "}
                    <FaChevronDown
                      className={`${styles.chevron} ${mobileTeam ? styles.chevronUp : ""}`}
                      style={{ fontSize: "0.6rem" }}
                    />
                  </button>
                  {mobileTeam && (
                    <div
                      className={styles.mobileSubList}
                      style={{ marginLeft: "0.8rem" }}
                    >
                      <Link
                        to="/team"
                        className={styles.mobileSubLink}
                        onClick={() => setMenuOpen(false)}
                      >
                        All Team
                      </Link>
                      {/* {teamMembers.map((m) => (
                        <Link
                          key={m._id}
                          to={`/team/${m.slug}`}
                          className={styles.mobileSubLink}
                          onClick={() => setMenuOpen(false)}
                        >
                          {m.name}
                        </Link>
                      ))} */}
                    </div>
                  )}
                  {aboutMenu
                    .filter((i) => !i.hasSubmenu)
                    .map((item) => (
                      <Link
                        key={item.label}
                        to={item.path}
                        className={styles.mobileSubLink}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                </div>
              )}
            </div>

            {/* Services mobile */}
            <div>
              <button
                className={`${styles.mobileLink} ${styles.mobilePagesBtn}`}
                onClick={() => setMobileServices((p) => !p)}
              >
                Services{" "}
                <FaChevronDown
                  className={`${styles.chevron} ${mobileServices ? styles.chevronUp : ""}`}
                  style={{ fontSize: "0.7rem" }}
                />
              </button>
              {mobileServices && (
                <div className={styles.mobileSubList}>
                  {servicesMenu.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className={styles.mobileSubLink}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Reputation mobile */}
            <div>
              <button
                className={`${styles.mobileLink} ${styles.mobilePagesBtn}`}
                onClick={() => setMobileReputation((p) => !p)}
              >
                Reputation{" "}
                <FaChevronDown
                  className={`${styles.chevron} ${mobileReputation ? styles.chevronUp : ""}`}
                  style={{ fontSize: "0.7rem" }}
                />
              </button>
              {mobileReputation && (
                <div className={styles.mobileSubList}>
                  {reputationMenu.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className={styles.mobileSubLink}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Recovery mobile */}
            <div>
              <button
                className={`${styles.mobileLink} ${styles.mobilePagesBtn}`}
                onClick={() => setMobileRecovery((p) => !p)}
              >
                Recovery{" "}
                <FaChevronDown
                  className={`${styles.chevron} ${mobileRecovery ? styles.chevronUp : ""}`}
                  style={{ fontSize: "0.7rem" }}
                />
              </button>
              {mobileRecovery && (
                <div className={styles.mobileSubList}>
                  {recoveryMenu.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className={styles.mobileSubLink}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Removal mobile */}
            <div>
              <button
                className={`${styles.mobileLink} ${styles.mobilePagesBtn}`}
                onClick={() => setMobileRemoval((p) => !p)}
              >
                Removal{" "}
                <FaChevronDown
                  className={`${styles.chevron} ${mobileRemoval ? styles.chevronUp : ""}`}
                  style={{ fontSize: "0.7rem" }}
                />
              </button>
              {mobileRemoval && (
                <div className={styles.mobileSubList}>
                  {removalMenu.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className={styles.mobileSubLink}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Blog mobile */}
            {/* <div>
              <button
                className={`${styles.mobileLink} ${styles.mobilePagesBtn}`}
                onClick={() => setMobileBlog((p) => !p)}
              >
                Blogs{" "}
                <FaChevronDown
                  className={`${styles.chevron} ${mobileBlog ? styles.chevronUp : ""}`}
                  style={{ fontSize: "0.7rem" }}
                />
              </button>
              {mobileBlog && (
                <div className={styles.mobileSubList}>
                  <Link
                    to="/blog"
                    className={styles.mobileSubLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    All Posts
                  </Link>
                  {blogPosts.map((p) => (
                    <Link
                      key={p._id}
                      to={`/blog/${p.slug}`}
                      className={styles.mobileSubLink}
                      onClick={() => setMenuOpen(false)}
                    >
                      {p.title}
                    </Link>
                  ))}
                </div>
              )}
            </div> */}

            <Link
             to="/blog"
             className={styles.mobileLink}
             onClick={() => setMenuOpen(false)}
            >
            Blogs
            </Link>

            {/* Shop mobile */}
            {/* <div>
              <button
                className={`${styles.mobileLink} ${styles.mobilePagesBtn}`}
                onClick={() => setMobileShop((p) => !p)}
              >
                Shop{" "}
                <FaChevronDown
                  className={`${styles.chevron} ${mobileShop ? styles.chevronUp : ""}`}
                  style={{ fontSize: "0.7rem" }}
                />
              </button>
              {mobileShop && (
                <div className={styles.mobileSubList}>
                  {shopMenu.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className={styles.mobileSubLink}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div> */}

            {/* Pages mobile */}
            {/* <div>
              <button
                className={`${styles.mobileLink} ${styles.mobilePagesBtn}`}
                onClick={() => setMobilePages((p) => !p)}
              >
                Pages{" "}
                <FaChevronDown
                  className={`${styles.chevron} ${mobilePages ? styles.chevronUp : ""}`}
                  style={{ fontSize: "0.7rem" }}
                />
              </button>
              {mobilePages && (
                <div className={styles.mobileSubList}>
                  {pagesMenu.map((page) => (
                    <Link
                      key={page.label}
                      to={page.path}
                      className={styles.mobileSubLink}
                      onClick={() => setMenuOpen(false)}
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
              )}
            </div> */}

            <Link
              to="/contact"
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Mobile Theme Toggle */}
            <div className={styles.mobileThemeRow}>
              <span className={styles.mobileThemeLabel}>
                {theme === "light" ? "Light Mode" : "Dark Mode"}
              </span>
              <button
                className={`${styles.mobileThemeToggle} ${theme === "dark" ? styles.dark : ""}`}
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                <span className={styles.mobileThemeKnob}>
                  {theme === "light" ? <FaMoon /> : <FaSun />}
                </span>
              </button>
            </div>

            {location.pathname === "/" ? (
              <a
                href="/get-a-quote"
                className={styles.mobileCta}
                onClick={() => setMenuOpen(false)}
              >
                Get a Quote
              </a>
            ) : (
              <Link
                to="/get-a-quote"
                className={styles.mobileCta}
                onClick={() => setMenuOpen(false)}
              >
                Get a Quote
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* ── BLOG MODAL ── */}
      {/* {blogModal && (
        <div
          className={styles.blogOverlay}
          onClick={(e) => e.target === e.currentTarget && setBlogModal(false)}
        >
          <div className={styles.blogModal}>
            <div className={styles.blogModalHeader}>
              <div>
                <h2 className={styles.blogModalTitle}>Latest Posts</h2>
                <p className={styles.blogModalSub}>
                  Insights, stories & ideas from First Reach
                </p>
              </div>
              <div className={styles.blogModalHeaderRight}>
                <Link
                  to="/blog"
                  className={styles.blogAllLink}
                  onClick={() => setBlogModal(false)}
                >
                  View all <FaArrowRight style={{ fontSize: "0.65rem" }} />
                </Link>
                <button
                  className={styles.blogCloseBtn}
                  onClick={() => setBlogModal(false)}
                  aria-label="Close"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className={styles.blogGrid}>
              {blogPosts.map((post) => (
                <Link
                  key={post._id}
                  to={`/blog/${post.slug}`}
                  className={styles.blogCard}
                  onClick={() => setBlogModal(false)}
                >
                  <div className={styles.blogCardImg}>
                    {post.featuredImage ? (
                      <img src={post.featuredImage} alt={post.title} />
                    ) : (
                      <div className={styles.blogCardImgPlaceholder}>
                        <span>✦</span>
                      </div>
                    )}
                    {post.category && (
                      <span className={styles.blogCardCat}>
                        <FaTag style={{ fontSize: "0.5rem" }} /> {post.category}
                      </span>
                    )}
                  </div>
                  <div className={styles.blogCardContent}>
                    <h3 className={styles.blogCardTitle}>{post.title}</h3>
                    {post.excerpt && (
                      <p className={styles.blogCardExcerpt}>{post.excerpt}</p>
                    )}
                    <div className={styles.blogCardMeta}>
                      {post.readTime && (
                        <span className={styles.blogCardDate}>
                          <FaClock style={{ fontSize: "0.55rem" }} />{" "}
                          {post.readTime}
                        </span>
                      )}
                      <span className={styles.blogCardReadMore}>
                        Read more{" "}
                        <FaArrowRight style={{ fontSize: "0.55rem" }} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}

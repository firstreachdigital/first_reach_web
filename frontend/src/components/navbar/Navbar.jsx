// src/components/navbar/Navbar.jsx

import React, { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";
import logoElephant from "../../assets/FRST REACH LOGO ELEPHANT.png";
import { FaArrowRight, FaChevronDown, FaChevronRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { TEAM_MEMBERS } from "../../data/teamData";

const pagesMenu = [
  {
    label: "Team", path: "/team", hasSubmenu: true,
    submenu: [
      { label: "Team", path: "/team" },
      // { label: "Alfred Noble", path: "/team/alfred-noble" },
      ...TEAM_MEMBERS.map((m) => ({ label: m.name, path: `/team/${m.slug}` })),
    ],
  },
  {
    label: "Shop", path: "/shop", hasSubmenu: true,
    submenu: [
      { label: "Shop Grid", path: "/shop" },
      { label: "Shop Detail", path: "/shop/detail" },
    ],
  },
  {
    label: "Blog", path: "/blog", hasSubmenu: true,
    submenu: [
      { label: "Blog Grid", path: "/blog" },
      { label: "Blog Detail", path: "/blog/detail" },
    ],
  },
  { label: "Price Page",   path: "/pricing",     hasSubmenu: false },
  { label: "FAQs page",    path: "/FAQ",          hasSubmenu: false },
  { label: "Choose Us",    path: "/choose-us",   hasSubmenu: false },
  { label: "Work Process", path: "/portfolio",   hasSubmenu: false },
  { label: "Testimonial",  path: "/testimonial", hasSubmenu: false },
];

const aboutMenu = [
  { label: "Careers", path: "/careers" },
];

const navLinks = [
  { label: "Home",     path: "/",         section: "home", isPage: false },
  { label: "About Us", path: "/about",    section: null,   isPage: false, isAbout: true },
  { label: "Services", path: "/services", section: null,   isPage: true  },
  { label: "Pages",    path: null,        section: null,   isPage: false, isMega: true  },
  { label: "Contact",  path: "/contact",  section: null,   isPage: true  },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [megaOpen,    setMegaOpen]    = useState(false);
  const [hoveredPage, setHoveredPage] = useState(null);
  const [mobilePages, setMobilePages] = useState(false);
  const [mobileAbout, setMobileAbout] = useState(false);
  const [aboutOpen,   setAboutOpen]   = useState(false);

  const megaRef    = useRef(null);
  const aboutRef   = useRef(null);
  const aboutTimer = useRef(null);  // delay timer
  const location   = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) {
        setMegaOpen(false);
        setHoveredPage(null);
      }
      if (aboutRef.current && !aboutRef.current.contains(e.target)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMenuOpen(false);
    setHoveredPage(null);
    setAboutOpen(false);
  }, [location.pathname]);

  // ── Hover with delay so mouse can travel into the dropdown ──────────────
  const handleAboutEnter = () => {
    clearTimeout(aboutTimer.current);
    setAboutOpen(true);
  };

  const handleAboutLeave = () => {
    aboutTimer.current = setTimeout(() => setAboutOpen(false), 200);
  };
  // ────────────────────────────────────────────────────────────────────────

  const renderLink = (link, className, onClick) => {
    if (link.isMega) {
      return (
        <button
          className={`${className} ${styles.pagesBtn} ${megaOpen ? styles.pageBtnActive : ""}`}
          onClick={() => { setMegaOpen((p) => !p); setHoveredPage(null); }}
          aria-haspopup="true"
          aria-expanded={megaOpen}
        >
          {link.label}
          <FaChevronDown className={`${styles.chevron} ${megaOpen ? styles.chevronUp : ""}`} />
        </button>
      );
    }

    if (link.isAbout) {
      return (
        <Link
          to={link.path}
          className={`${className} ${styles.pagesBtn} ${aboutOpen ? styles.pageBtnActive : ""}`}
          onClick={onClick}
        >
          {link.label}
          <FaChevronDown className={`${styles.chevron} ${aboutOpen ? styles.chevronUp : ""}`} />
        </Link>
      );
    }

    if (link.isPage) {
      return <Link to={link.path} className={className} onClick={onClick}>{link.label}</Link>;
    }

    if (location.pathname === "/") {
      return <a href={`#${link.section}`} className={className} onClick={onClick}>{link.label}</a>;
    }
    return <Link to={`/#${link.section}`} className={className} onClick={onClick}>{link.label}</Link>;
  };

  const activeSubmenu = hoveredPage
    ? pagesMenu.find((p) => p.label === hoveredPage)?.submenu
    : null;

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>

        <Link to="/" className={styles.logo}>
          <img src={logoElephant} alt="First Reach Digital" className={styles.logoImg} />
          <div className={styles.logoTextWrap}>
            <span className={styles.logoTop}>First Reach</span>
            <span className={styles.logoBottom}>Digital</span>
          </div>
        </Link>

        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li
              key={link.label}
              ref={link.isMega ? megaRef : link.isAbout ? aboutRef : null}
              className={styles.navItem}
              onMouseEnter={link.isAbout ? handleAboutEnter : undefined}
              onMouseLeave={link.isAbout ? handleAboutLeave : undefined}
            >
              {renderLink(link, styles.link, null)}

              {/* ── About Us hover dropdown ── */}
              {link.isAbout && aboutOpen && (
                <div
                  className={styles.megaMenu}
                  style={{ minWidth: "180px" }}
                  onMouseEnter={handleAboutEnter}  // cancel close when inside dropdown
                  onMouseLeave={handleAboutLeave}  // restart close timer when leaving dropdown
                >
                  <div className={styles.megaInner}>
                    <ul className={styles.megaList}>
                      {aboutMenu.map((item) => (
                        <li key={item.label}>
                          <Link
                            to={item.path}
                            className={styles.megaItem}
                            onClick={() => setAboutOpen(false)}
                          >
                            <span>{item.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* ── Pages mega dropdown ── */}
              {link.isMega && megaOpen && (
                <div className={styles.megaMenu}>
                  <div className={styles.megaInner}>
                    <ul className={styles.megaList}>
                      {pagesMenu.map((page) => (
                        <li key={page.label}>
                          <Link
                            to={page.path}
                            className={`${styles.megaItem} ${hoveredPage === page.label ? styles.megaItemActive : ""}`}
                            onMouseEnter={() => page.hasSubmenu ? setHoveredPage(page.label) : setHoveredPage(null)}
                            onClick={() => setMegaOpen(false)}
                          >
                            <span>{page.label}</span>
                            {page.hasSubmenu && <FaChevronRight className={styles.megaArrow} />}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {activeSubmenu && (
                      <div className={styles.megaSubmenu}>
                        {activeSubmenu.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.path}
                            className={styles.megaSubItem}
                            onClick={() => setMegaOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {location.pathname === "/" ? (
          <a href="/contact" className={styles.cta}>
            <span className={styles.ctaArrow}><FaArrowRight /></span>
            Get in Touch
          </a>
        ) : (
          <Link to="/contact" className={styles.cta}>
            <span className={styles.ctaArrow}><FaArrowRight /></span>
            Get in Touch
          </Link>
        )}

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
          {navLinks.map((link) =>
            link.isAbout ? (
              <div key={link.label}>
                <button
                  className={`${styles.mobileLink} ${styles.mobilePagesBtn}`}
                  onClick={() => setMobileAbout((p) => !p)}
                >
                  {link.label}
                  <FaChevronDown
                    className={`${styles.chevron} ${mobileAbout ? styles.chevronUp : ""}`}
                    style={{ fontSize: "0.7rem" }}
                  />
                </button>
                {mobileAbout && (
                  <div className={styles.mobileSubList}>
                    {/* About Us page link itself */}
                    <Link to="/about" className={styles.mobileSubLink} onClick={() => setMenuOpen(false)}>
                      About Us
                    </Link>
                    {aboutMenu.map((item) => (
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
            ) : link.isMega ? (
              <div key={link.label}>
                <button
                  className={`${styles.mobileLink} ${styles.mobilePagesBtn}`}
                  onClick={() => setMobilePages((p) => !p)}
                >
                  {link.label}
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
              </div>
            ) : (
              <div key={link.label}>
                {renderLink(link, styles.mobileLink, () => setMenuOpen(false))}
              </div>
            )
          )}

          {location.pathname === "/" ? (
            <a href="/contact" className={styles.mobileCta} onClick={() => setMenuOpen(false)}>
              Get in Touch
            </a>
          ) : (
            <Link to="/contact" className={styles.mobileCta} onClick={() => setMenuOpen(false)}>
              Get in Touch
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
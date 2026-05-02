// src/components/navbar/Navbar.jsx

import React, { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";
import logoElephant from "../../assets/FRST REACH LOGO ELEPHANT.png";
import { FaArrowRight, FaChevronDown, FaTimes, FaClock, FaTag } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { TEAM_MEMBERS } from "../../data/teamData";
import { BLOG_POSTS } from "../../data/blogData";

// Pages menu — Blog & Shop removed, now top-level
const pagesMenu = [
  { label: "Price Page",   path: "/pricing",   hasSubmenu: false },
  { label: "Choose Us",    path: "/choose-us", hasSubmenu: false },
  { label: "Work Process", path: "/portfolio", hasSubmenu: false },
];

const aboutMenu = [
  {
    label: "Team", path: "/team", hasSubmenu: true,
    submenu: [
      { label: "All Team", path: "/team" },
      ...TEAM_MEMBERS.map((m) => ({ label: m.name, path: `/team/${m.slug}` })),
    ],
  },
  { label: "Careers",     path: "/careers",    hasSubmenu: false },
  { label: "FAQ",         path: "/FAQ",         hasSubmenu: false },
  { label: "Testimonial", path: "/testimonial", hasSubmenu: false },
];

const shopMenu = [
  { label: "Shop Grid",   path: "/shop" },
  { label: "Shop Detail", path: "/shop/detail" },
];

// ── Reusable hover-with-delay hook ──────────────────────────────────────────
function useHoverMenu() {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const ref   = useRef(null);
  const onEnter = () => { clearTimeout(timer.current); setOpen(true); };
  const onLeave = () => { timer.current = setTimeout(() => setOpen(false), 180); };
  return { open, setOpen, ref, onEnter, onLeave };
}

export default function Navbar() {
  const [scrolled,     setScrolled]  = useState(false);
  const [menuOpen,     setMenuOpen]  = useState(false);
  const [megaOpen,     setMegaOpen]  = useState(false);
  const [hoveredPage,  setHoveredPage]  = useState(null);
  const [hoveredAbout, setHoveredAbout] = useState(null);
  const [mobilePages,  setMobilePages]  = useState(false);
  const [mobileAbout,  setMobileAbout]  = useState(false);
  const [mobileTeam,   setMobileTeam]   = useState(false);
  const [mobileBlog,   setMobileBlog]   = useState(false);
  const [mobileShop,   setMobileShop]   = useState(false);
  const [blogModal,    setBlogModal]    = useState(false);

  const megaRef = useRef(null);
  const about   = useHoverMenu();
  const shop    = useHoverMenu();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) {
        setMegaOpen(false); setHoveredPage(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    setMegaOpen(false); setMenuOpen(false);
    setHoveredPage(null); setHoveredAbout(null);
    about.setOpen(false); shop.setOpen(false);
    setBlogModal(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = blogModal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [blogModal]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setBlogModal(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const activeAboutSubmenu = hoveredAbout
    ? aboutMenu.find((a) => a.label === hoveredAbout)?.submenu
    : null;

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.inner}>

          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <img src={logoElephant} alt="First Reach Digital" className={styles.logoImg} />
            <div className={styles.logoTextWrap}>
              <span className={styles.logoTop}>First Reach</span>
              <span className={styles.logoBottom}>Digital</span>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className={styles.links}>

            {/* Home */}
            <li className={styles.navItem}>
              {location.pathname === "/"
                ? <a href="#home" className={styles.link}>Home</a>
                : <Link to="/#home" className={styles.link}>Home</Link>}
            </li>

            {/* About Us */}
            <li ref={about.ref} className={styles.navItem} onMouseEnter={about.onEnter} onMouseLeave={about.onLeave}>
              <Link to="/about" className={`${styles.link} ${styles.pagesBtn} ${about.open ? styles.pageBtnActive : ""}`}>
                About Us <FaChevronDown className={`${styles.chevron} ${about.open ? styles.chevronUp : ""}`} />
              </Link>
              {about.open && (
                <div className={styles.megaMenu} onMouseEnter={about.onEnter} onMouseLeave={about.onLeave}>
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
                              <FaChevronDown className={`${styles.megaArrow} ${styles.megaArrowRight}`} />
                            </div>
                          ) : (
                            <Link to={item.path} className={styles.megaItem}
                              onMouseEnter={() => setHoveredAbout(null)}
                              onClick={() => about.setOpen(false)}>
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
                            <Link key={sub.label} to={sub.path} className={styles.megaSubItem}
                              onClick={() => { about.setOpen(false); setHoveredAbout(null); }}>
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
            <li className={styles.navItem}>
              <Link to="/services" className={styles.link}>Services</Link>
            </li>

            {/* Blog — opens modal */}
            <li className={styles.navItem}>
              <button
                className={`${styles.link} ${styles.pagesBtn} ${blogModal ? styles.pageBtnActive : ""}`}
                onClick={() => setBlogModal(true)}
              >
                Blog <FaChevronDown className={`${styles.chevron} ${blogModal ? styles.chevronUp : ""}`} />
              </button>
            </li>

            {/* Shop — hover dropdown */}
            <li ref={shop.ref} className={styles.navItem} onMouseEnter={shop.onEnter} onMouseLeave={shop.onLeave}>
              <Link to="/shop" className={`${styles.link} ${styles.pagesBtn} ${shop.open ? styles.pageBtnActive : ""}`}>
                Shop <FaChevronDown className={`${styles.chevron} ${shop.open ? styles.chevronUp : ""}`} />
              </Link>
              {shop.open && (
                <div className={styles.megaMenu} style={{ minWidth: "160px" }}
                  onMouseEnter={shop.onEnter} onMouseLeave={shop.onLeave}>
                  <div className={styles.megaInner}>
                    <ul className={styles.megaList}>
                      {shopMenu.map((item) => (
                        <li key={item.label}>
                          <Link to={item.path} className={styles.megaItem} onClick={() => shop.setOpen(false)}>
                            <span>{item.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>

            {/* Pages */}
            <li ref={megaRef} className={styles.navItem}>
              <button
                className={`${styles.link} ${styles.pagesBtn} ${megaOpen ? styles.pageBtnActive : ""}`}
                onClick={() => { setMegaOpen(p => !p); setHoveredPage(null); }}
                aria-haspopup="true" aria-expanded={megaOpen}
              >
                Pages <FaChevronDown className={`${styles.chevron} ${megaOpen ? styles.chevronUp : ""}`} />
              </button>
              {megaOpen && (
                <div className={styles.megaMenu}>
                  <div className={styles.megaInner}>
                    <ul className={styles.megaList}>
                      {pagesMenu.map((page) => (
                        <li key={page.label}>
                          <Link to={page.path} className={`${styles.megaItem} ${hoveredPage === page.label ? styles.megaItemActive : ""}`}
                            onMouseEnter={() => setHoveredPage(page.label)}
                            onClick={() => setMegaOpen(false)}>
                            <span>{page.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>

            {/* Contact */}
            <li className={styles.navItem}>
              <Link to="/contact" className={styles.link}>Contact</Link>
            </li>

          </ul>

          {/* CTA */}
          {location.pathname === "/" ? (
            <a href="/contact" className={styles.cta}>
              <span className={styles.ctaArrow}><FaArrowRight /></span>Get in Touch
            </a>
          ) : (
            <Link to="/contact" className={styles.cta}>
              <span className={styles.ctaArrow}><FaArrowRight /></span>Get in Touch
            </Link>
          )}

          {/* Hamburger */}
          <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span className={`${styles.bar} ${menuOpen ? styles.open1 : ""}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.open2 : ""}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.open3 : ""}`} />
          </button>
        </div>

        {/* ── Mobile menu ── */}
        {menuOpen && (
          <div className={styles.mobileMenu}>

            {location.pathname === "/"
              ? <a href="#home" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Home</a>
              : <Link to="/#home" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Home</Link>}

            {/* About */}
            <div>
              <button className={`${styles.mobileLink} ${styles.mobilePagesBtn}`} onClick={() => setMobileAbout(p => !p)}>
                About Us <FaChevronDown className={`${styles.chevron} ${mobileAbout ? styles.chevronUp : ""}`} style={{ fontSize: "0.7rem" }} />
              </button>
              {mobileAbout && (
                <div className={styles.mobileSubList}>
                  <Link to="/about" className={styles.mobileSubLink} onClick={() => setMenuOpen(false)}>About Us</Link>
                  <button
                    style={{ width:"100%", background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", textAlign:"left", display:"flex", alignItems:"center", justifyContent:"space-between", color:"#666", padding:"0.55rem 1rem", fontSize:"0.875rem", borderRadius:"0.4rem" }}
                    onClick={() => setMobileTeam(p => !p)}
                  >
                    Team <FaChevronDown className={`${styles.chevron} ${mobileTeam ? styles.chevronUp : ""}`} style={{ fontSize: "0.6rem" }} />
                  </button>
                  {mobileTeam && (
                    <div className={styles.mobileSubList} style={{ marginLeft: "0.8rem" }}>
                      <Link to="/team" className={styles.mobileSubLink} onClick={() => setMenuOpen(false)}>All Team</Link>
                      {TEAM_MEMBERS.map((m) => (
                        <Link key={m.slug} to={`/team/${m.slug}`} className={styles.mobileSubLink} onClick={() => setMenuOpen(false)}>{m.name}</Link>
                      ))}
                    </div>
                  )}
                  {aboutMenu.filter(i => !i.hasSubmenu).map(item => (
                    <Link key={item.label} to={item.path} className={styles.mobileSubLink} onClick={() => setMenuOpen(false)}>{item.label}</Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/services" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Services</Link>

            {/* Blog mobile */}
            <div>
              <button className={`${styles.mobileLink} ${styles.mobilePagesBtn}`} onClick={() => setMobileBlog(p => !p)}>
                Blog <FaChevronDown className={`${styles.chevron} ${mobileBlog ? styles.chevronUp : ""}`} style={{ fontSize: "0.7rem" }} />
              </button>
              {mobileBlog && (
                <div className={styles.mobileSubList}>
                  <Link to="/blog" className={styles.mobileSubLink} onClick={() => setMenuOpen(false)}>All Posts</Link>
                  {BLOG_POSTS.map(p => (
                    <Link key={p.slug} to={`/blog/${p.slug}`} className={styles.mobileSubLink} onClick={() => setMenuOpen(false)}>{p.title}</Link>
                  ))}
                </div>
              )}
            </div>

            {/* Shop mobile */}
            <div>
              <button className={`${styles.mobileLink} ${styles.mobilePagesBtn}`} onClick={() => setMobileShop(p => !p)}>
                Shop <FaChevronDown className={`${styles.chevron} ${mobileShop ? styles.chevronUp : ""}`} style={{ fontSize: "0.7rem" }} />
              </button>
              {mobileShop && (
                <div className={styles.mobileSubList}>
                  {shopMenu.map(item => (
                    <Link key={item.label} to={item.path} className={styles.mobileSubLink} onClick={() => setMenuOpen(false)}>{item.label}</Link>
                  ))}
                </div>
              )}
            </div>

            {/* Pages mobile */}
            <div>
              <button className={`${styles.mobileLink} ${styles.mobilePagesBtn}`} onClick={() => setMobilePages(p => !p)}>
                Pages <FaChevronDown className={`${styles.chevron} ${mobilePages ? styles.chevronUp : ""}`} style={{ fontSize: "0.7rem" }} />
              </button>
              {mobilePages && (
                <div className={styles.mobileSubList}>
                  {pagesMenu.map(page => (
                    <Link key={page.label} to={page.path} className={styles.mobileSubLink} onClick={() => setMenuOpen(false)}>{page.label}</Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/contact" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Contact</Link>

            {location.pathname === "/" ? (
              <a href="/contact" className={styles.mobileCta} onClick={() => setMenuOpen(false)}>Get in Touch</a>
            ) : (
              <Link to="/contact" className={styles.mobileCta} onClick={() => setMenuOpen(false)}>Get in Touch</Link>
            )}
          </div>
        )}
      </nav>

      {/* ── BLOG MODAL ── */}
      {blogModal && (
        <div className={styles.blogOverlay} onClick={(e) => e.target === e.currentTarget && setBlogModal(false)}>
          <div className={styles.blogModal}>
            <div className={styles.blogModalHeader}>
              <div>
                <h2 className={styles.blogModalTitle}>Latest Posts</h2>
                <p className={styles.blogModalSub}>Insights, stories & ideas from First Reach</p>
              </div>
              <div className={styles.blogModalHeaderRight}>
                <Link to="/blog" className={styles.blogAllLink} onClick={() => setBlogModal(false)}>
                  View all <FaArrowRight style={{ fontSize: "0.65rem" }} />
                </Link>
                <button className={styles.blogCloseBtn} onClick={() => setBlogModal(false)} aria-label="Close">
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className={styles.blogGrid}>
              {BLOG_POSTS.map((post) => (
                <Link key={post.slug} to={`/blog/${post.slug}`} className={styles.blogCard} onClick={() => setBlogModal(false)}>
                  <div className={styles.blogCardImg}>
                    {post.image
                      ? <img src={post.image} alt={post.title} />
                      : <div className={styles.blogCardImgPlaceholder}><span>✦</span></div>
                    }
                    {post.category && (
                      <span className={styles.blogCardCat}>
                        <FaTag style={{ fontSize: "0.5rem" }} /> {post.category}
                      </span>
                    )}
                  </div>
                  <div className={styles.blogCardContent}>
                    <h3 className={styles.blogCardTitle}>{post.title}</h3>
                    {post.excerpt && <p className={styles.blogCardExcerpt}>{post.excerpt}</p>}
                    <div className={styles.blogCardMeta}>
                      {post.date && (
                        <span className={styles.blogCardDate}>
                          <FaClock style={{ fontSize: "0.55rem" }} /> {post.date}
                        </span>
                      )}
                      <span className={styles.blogCardReadMore}>
                        Read more <FaArrowRight style={{ fontSize: "0.55rem" }} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
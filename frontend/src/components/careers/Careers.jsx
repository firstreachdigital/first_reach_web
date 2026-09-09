// src/components/careers/Careers.jsx
import React, { useState, useEffect } from "react";
import styles from "./CareersPage.module.css";
import {
  FaArrowRight, FaMapMarkerAlt, FaClock, FaBriefcase,
  FaEnvelope, FaPhone, FaUsers, FaHeart, FaLightbulb,
  FaBullhorn, FaPalette, FaCode, FaChartLine, FaEllipsisH, FaThLarge,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import teamPhoto from "../../assets/careers-team.png";

const DEPARTMENTS = [
  { name: "All",         icon: <FaThLarge /> },
  { name: "Design",      icon: <FaPalette /> },
  { name: "Development", icon: <FaCode /> },
  { name: "Marketing",   icon: <FaBullhorn /> },
  { name: "Strategy",    icon: <FaChartLine /> },
  { name: "Other",       icon: <FaEllipsisH /> },
];

const DEPT_STYLE = {
  Marketing:   { icon: <FaBullhorn />,   cls: "deptMarketing" },
  Design:      { icon: <FaPalette />,    cls: "deptDesign" },
  Development: { icon: <FaCode />,       cls: "deptDevelopment" },
  Strategy:    { icon: <FaChartLine />,  cls: "deptStrategy" },
  Other:       { icon: <FaEllipsisH />,  cls: "deptOther" },
};

export default function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/careers/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeTab === "All" ? jobs : jobs.filter((j) => j.department === activeTab);

  return (
    <main className={styles.page}>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGrid} />
        <div className={styles.heroTop}>
          <div className={styles.heroContent}>
            <span className={styles.pill}>Careers at First Reach Digital</span>
            <h1 className={styles.heroTitle}>
              Build the future of <span className={styles.accent}>digital</span> with us.
            </h1>
            <p className={styles.heroSub}>
              First Reach Digital is a crew of makers, strategists, and dreamers.
              If you want to do the best work of your life - you're in the right place.
            </p>
            <div className={styles.heroBtns}>
              <a href="#openings" className={styles.heroBtn}>
                <span className={styles.heroBtnIcon}><FaArrowRight /></span>
                View Open Roles
              </a>
            </div>
          </div>

          <div className={styles.heroImageWrap}>
            <img src={teamPhoto} alt="First Reach Digital team" className={styles.heroImage} />
            <div className={`${styles.badge} ${styles.badgeTeam}`}>
              <FaUsers className={styles.badgeIcon} />
              <div><strong>50+</strong><span>Team Members</span></div>
            </div>
            <div className={`${styles.badge} ${styles.badgeCulture}`}>
              <FaHeart className={styles.badgeIcon} />
              <div><strong>Great</strong><span>Work Culture</span></div>
            </div>
            <div className={`${styles.badge} ${styles.badgeOpportunity}`}>
              <FaLightbulb className={styles.badgeIcon} />
              <div><strong>Real</strong><span>Opportunities</span></div>
            </div>
            <span className={styles.scribble}>Better Ideas Together</span>
          </div>
        </div>
      </section>

      {/* ── OPENINGS ── */}
      <section className={styles.openingsSection} id="openings">
        <div className={styles.container}>
          <span className={styles.pill}>Careers at First Reach Digital</span>
          <h2 className={styles.sectionTitle}>
            Open <span className={styles.accent}>Positions</span>
          </h2>
          <p className={styles.sectionSub}>
            Find your next opportunity and be part of a team that builds brands,
            creates impact and grows together.
          </p>

          <div className={styles.tabs}>
            {DEPARTMENTS.map((d) => (
              <button
                key={d.name}
                className={`${styles.tab} ${activeTab === d.name ? styles.tabActive : ""}`}
                onClick={() => { setActiveTab(d.name); setExpanded(null); }}
              >
                <span className={styles.tabIcon}>{d.icon}</span>
                {d.name}
              </button>
            ))}
          </div>

          <div className={styles.jobList}>
            {loading && <p style={{ color: "var(--muted)" }}>Loading...</p>}

            {!loading && filtered.map((job) => {
              const dept = DEPT_STYLE[job.department] || DEPT_STYLE.Other;
              const isOpen = expanded === job._id;
              return (
                <div
                  key={job._id}
                  className={`${styles.jobRowWrap} ${isOpen ? styles.jobRowWrapOpen : ""}`}
                >
                  <div
                    className={styles.jobRow}
                    onClick={() => setExpanded(isOpen ? null : job._id)}
                  >
                    <div className={`${styles.jobIcon} ${styles[dept.cls]}`}>
                      {dept.icon}
                    </div>

                    <div className={styles.jobRowMeta}>
                      <span className={`${styles.jobDeptTag} ${styles[dept.cls]}`}>
                        {job.department}
                      </span>
                      <h3 className={styles.jobRowTitle}>{job.title}</h3>
                      <div className={styles.jobPills}>
                        <span className={styles.jobPill}><FaClock className={styles.pillIcon} /> {job.type}</span>
                        <span className={styles.jobPill}><FaMapMarkerAlt className={styles.pillIcon} /> {job.location}</span>
                        <span className={styles.jobPill}><FaUsers className={styles.pillIcon} /> {job.experience}</span>
                      </div>
                    </div>

                    <span
                      className={`${styles.viewDetailsIcon} ${isOpen ? styles.viewDetailsIconOpen : ""}`}
                      onClick={(e) => { e.stopPropagation(); navigate(`/careers/apply/${job.slug}`); }}
                    >
                      <FaArrowRight />
                    </span>
                  </div>

                  {isOpen && (
                    <div className={styles.jobBody}>
                      <p className={styles.jobDesc}>{job.description}</p>

                      {(job.salary || job.benefits) && (
                        <div className={styles.jobMetaRow}>
                          {job.salary && (
                            <span className={styles.jobMetaItem}>
                              <FaBriefcase className={styles.pillIcon} />
                              <strong>Salary:</strong> {job.salary}
                            </span>
                          )}
                          {job.benefits && (
                            <span className={styles.jobMetaItem}>
                              <FaHeart className={styles.pillIcon} />
                              <strong>Benefits:</strong> {job.benefits}
                            </span>
                          )}
                        </div>
                      )}

                      {job.qualifications && (
                        <div className={styles.jobQualifications}>
                          <p className={styles.jobQualLabel}>Qualifications</p>
                          <p className={styles.jobDesc} style={{ marginTop: 0 }}>{job.qualifications}</p>
                        </div>
                      )}

                      <div className={styles.jobTags}>
                        {job.tags?.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
                      </div>
                      <button
                        className={styles.applyBtn}
                        onClick={() => navigate(`/careers/apply/${job.slug}`)}
                      >
                        <span className={styles.applyIcon}><FaArrowRight /></span>
                        Apply for this role
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {!loading && filtered.length === 0 && (
              <div className={styles.empty}>No openings in this department right now. Check back soon!</div>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaBannerGlow} />
        <h2 className={styles.ctaTitle}>Don't see your fit?</h2>
        <p className={styles.ctaSub}>
          We're always looking for exceptional talent. Send us your portfolio and we'll be in touch.
        </p>
        <a href="/contact" className={styles.ctaButton}>
          <span className={styles.ctaBtnIcon}><FaArrowRight /></span>
          Get in Touch
        </a>
        <div className={styles.ctaContactRow}>
          <a href="mailto:hr@firstreachdigital.com" className={styles.ctaContactItem}>
            <FaEnvelope className={styles.ctaContactIcon} />
            hr@firstreachdigital.com
          </a>
          <span className={styles.ctaDivider}>|</span>
          <a href="tel:+919946618222" className={styles.ctaContactItem}>
            <FaPhone className={styles.ctaContactIcon} />
            +91 99466 18222
          </a>
        </div>
      </section>
    </main>
  );
}
// src/components/careers/Careers.jsx
import React, { useState, useEffect } from "react";
import styles from "./CareersPage.module.css";
//import JobApplyModal from "../jobApplyModal/JobApplyModal";
import { FaArrowRight, FaMapMarkerAlt, FaClock, FaBriefcase, FaEnvelope, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

const DEPARTMENTS = ["All", "Design", "Development", "Marketing", "Strategy", "Other"];



export default function CareersPage() {
  const [jobs, setJobs]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [expanded, setExpanded]   = useState(null);
  //const [applyJob, setApplyJob]   = useState(null);
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

      {/* {applyJob && <JobApplyModal job={applyJob} onClose={() => setApplyJob(null)} />} */}

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGrid} />
        <div className={styles.heroContent}>
          <span className={styles.pill}>We're Hiring</span>
          <h1 className={styles.heroTitle}>
            Build the future of<br />
            <span className={styles.accent}>digital</span> with us.
          </h1>
          <p className={styles.heroSub}>
            First Reach Digital is a crew of makers, strategists, and dreamers.
            If you want to do the best work of your life — you're in the right place.
          </p>
          <a href="#openings" className={styles.heroBtn}>
            <span className={styles.heroBtnIcon}><FaArrowRight /></span>
            See Open Roles
          </a>
        </div>
      </section>

      {/* ── OPENINGS ── */}
      <section className={styles.openingsSection} id="openings">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Open Positions</h2>
          {/* <p className={styles.sectionSub}>
            Don't see your role? Drop us a note at{" "}
            <a href="mailto:careers@firstreach.in" className={styles.mailLink}>careers@firstreach.in</a>
          </p> */}

          <div className={styles.tabs}>
            {DEPARTMENTS.map((d) => (
              <button
                key={d}
                className={`${styles.tab} ${activeTab === d ? styles.tabActive : ""}`}
                onClick={() => { setActiveTab(d); setExpanded(null); }}
              >
                {d}
              </button>
            ))}
          </div>

          <div className={styles.jobList}>
            {loading && <p style={{ color: "#aaa" }}>Loading...</p>}

            {!loading && filtered.map((job) => (
              <div
                key={job._id}
                className={`${styles.jobCard} ${expanded === job._id ? styles.jobCardOpen : ""}`}
              >
                <div className={styles.jobHeader} onClick={() => setExpanded(expanded === job._id ? null : job._id)}>
                  <div className={styles.jobMeta}>
                    <span className={styles.jobDept}>{job.department}</span>
                    <h3 className={styles.jobTitle}>{job.title}</h3>
                    <div className={styles.jobPills}>
                      <span className={styles.jobPill}><FaClock className={styles.pillIcon} /> {job.type}</span>
                      <span className={styles.jobPill}><FaMapMarkerAlt className={styles.pillIcon} /> {job.location}</span>
                      <span className={styles.jobPill}><FaBriefcase className={styles.pillIcon} /> {job.experience}</span>
                    </div>
                  </div>
                  <div className={`${styles.jobToggle} ${expanded === job._id ? styles.jobToggleOpen : ""}`}>
                    <FaArrowRight />
                  </div>
                </div>

                {expanded === job._id && (
                  <div className={styles.jobBody}>
                    <p className={styles.jobDesc}>{job.description}</p>
                    <div className={styles.jobTags}>
                      {job.tags?.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
                    </div>
                    <button className={styles.applyBtn} onClick={() => navigate(`/careers/apply/${job._id}`)}>
                      <span className={styles.applyIcon}><FaArrowRight /></span>
                      Apply for this role
                    </button>
                  </div>
                )}
              </div>
            ))}

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

  <a href="mailto:hr@firstreachdigital.com" className={styles.ctaButton}>
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

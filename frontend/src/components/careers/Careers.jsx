// src/pages/CareersPage.jsx
import React, { useState } from "react";
import styles from "./CareersPage.module.css";
import { FaArrowRight, FaMapMarkerAlt, FaClock, FaBriefcase, FaGlobe, FaChartLine, FaPaintBrush, FaMoneyBillWave, FaUmbrellaBeach, FaTools } from "react-icons/fa";

// ─── STATIC DATA (swap with API call later) ───────────────────────────────────
const DEPARTMENTS = ["All", "Design", "Development", "Marketing", "Strategy"];

const JOBS = [
  {
    id: 1,
    title: "UI/UX Designer",
    department: "Design",
    type: "Full-time",
    location: "Remote",
    experience: "2–4 years",
    description:
      "Craft exceptional digital experiences for our global clients. You'll own the design process from wireframes to polished, pixel-perfect interfaces.",
    tags: ["Figma", "Prototyping", "Design Systems"],
  },
  {
    id: 2,
    title: "Senior React Developer",
    department: "Development",
    type: "Full-time",
    location: "Hybrid – Kochi",
    experience: "4–6 years",
    description:
      "Build fast, scalable web applications for industry-leading brands. You'll work closely with design and strategy teams to ship impactful products.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    id: 3,
    title: "Brand Strategist",
    department: "Strategy",
    type: "Full-time",
    location: "Kochi, Kerala",
    experience: "3–5 years",
    description:
      "Define the voice, identity, and positioning of brands across industries. You'll lead discovery workshops and develop comprehensive brand strategies.",
    tags: ["Brand Identity", "Positioning", "Research"],
  },
  {
    id: 4,
    title: "Motion Designer",
    department: "Design",
    type: "Contract",
    location: "Remote",
    experience: "2–3 years",
    description:
      "Bring brands to life through animation and motion. Create scroll animations, brand films, and micro-interactions that leave lasting impressions.",
    tags: ["After Effects", "Lottie", "GSAP"],
  },
  {
    id: 5,
    title: "Digital Marketing Lead",
    department: "Marketing",
    type: "Full-time",
    location: "Kochi, Kerala",
    experience: "3–5 years",
    description:
      "Drive growth for First Reach and our clients through data-driven campaigns, SEO, and performance marketing strategies.",
    tags: ["SEO", "Paid Media", "Analytics"],
  },
  {
    id: 6,
    title: "WordPress / Webflow Developer",
    department: "Development",
    type: "Part-time",
    location: "Remote",
    experience: "1–3 years",
    description:
      "Develop custom themes and no-code builds for clients who need speed and flexibility. Eye for detail and design sensibility are a must.",
    tags: ["Webflow", "WordPress", "CSS"],
  },
];

const PERKS = [
  { icon: <FaGlobe />, title: "Remote Friendly", desc: "Work from anywhere. Output over hours, always." },
  { icon: <FaChartLine />, title: "Grow Fast", desc: "Real ownership, mentorship, and promotions tied to impact." },
  { icon: <FaPaintBrush />, title: "Creative Freedom", desc: "Bring your ideas. We build what hasn't been built before." },
  { icon: <FaMoneyBillWave />, title: "Competitive Pay", desc: "Industry-leading compensation benchmarked globally." },
  { icon: <FaUmbrellaBeach />, title: "Flex Leaves", desc: "Unlimited PTO policy. Rest is part of the job." },
  { icon: <FaTools />, title: "Best Tools", desc: "Every tool you need, paid for. No budget arguments." },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function CareersPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [expanded, setExpanded] = useState(null);

  const filtered =
    activeTab === "All" ? JOBS : JOBS.filter((j) => j.department === activeTab);

  return (
    <main className={styles.page}>
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

        <div className={styles.heroStat}>
          <div className={styles.statItem}>
            <span className={styles.statNum}>40+</span>
            <span className={styles.statLabel}>Team Members</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNum}>12</span>
            <span className={styles.statLabel}>Countries Reached</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNum}>100%</span>
            <span className={styles.statLabel}>Remote Option</span>
          </div>
        </div>
      </section>

      {/* ── PERKS ── */}
      <section className={styles.perksSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why First Reach?</h2>
          <p className={styles.sectionSub}>
            We don't do average. Here's what makes working here different.
          </p>
          <div className={styles.perksGrid}>
            {PERKS.map((p) => (
              <div key={p.title} className={styles.perkCard}>
                <span className={styles.perkIcon}>{p.icon}</span>
                <h3 className={styles.perkTitle}>{p.title}</h3>
                <p className={styles.perkDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPENINGS ── */}
      <section className={styles.openingsSection} id="openings">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Open Positions</h2>
          <p className={styles.sectionSub}>
            Don't see your role? Drop us a note at{" "}
            <a href="mailto:careers@firstreach.in" className={styles.mailLink}>
              careers@firstreach.in
            </a>
          </p>

          {/* Filter tabs */}
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

          {/* Job cards */}
          <div className={styles.jobList}>
            {filtered.map((job) => (
              <div
                key={job.id}
                className={`${styles.jobCard} ${expanded === job.id ? styles.jobCardOpen : ""}`}
              >
                <div
                  className={styles.jobHeader}
                  onClick={() => setExpanded(expanded === job.id ? null : job.id)}
                >
                  <div className={styles.jobMeta}>
                    <span className={styles.jobDept}>{job.department}</span>
                    <h3 className={styles.jobTitle}>{job.title}</h3>
                    <div className={styles.jobPills}>
                      <span className={styles.jobPill}>
                        <FaClock className={styles.pillIcon} /> {job.type}
                      </span>
                      <span className={styles.jobPill}>
                        <FaMapMarkerAlt className={styles.pillIcon} /> {job.location}
                      </span>
                      <span className={styles.jobPill}>
                        <FaBriefcase className={styles.pillIcon} /> {job.experience}
                      </span>
                    </div>
                  </div>
                  <div className={`${styles.jobToggle} ${expanded === job.id ? styles.jobToggleOpen : ""}`}>
                    <FaArrowRight />
                  </div>
                </div>

                {expanded === job.id && (
                  <div className={styles.jobBody}>
                    <p className={styles.jobDesc}>{job.description}</p>
                    <div className={styles.jobTags}>
                      {job.tags.map((t) => (
                        <span key={t} className={styles.tag}>{t}</span>
                      ))}
                    </div>
                    <a
                      href={`mailto:careers@firstreach.in?subject=Application – ${job.title}`}
                      className={styles.applyBtn}
                    >
                      <span className={styles.applyIcon}><FaArrowRight /></span>
                      Apply for this role
                    </a>
                  </div>
                )}
              </div>
            ))}

            {filtered.length === 0 && (
              <div className={styles.empty}>
                No openings in this department right now. Check back soon!
              </div>
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
        <a href="mailto:careers@firstreach.in" className={styles.ctaButton}>
          <span className={styles.ctaBtnIcon}><FaArrowRight /></span>
          Get in Touch
        </a>
      </section>
    </main>
  );
}
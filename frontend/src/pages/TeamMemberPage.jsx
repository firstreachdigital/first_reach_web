// src/pages/TeamMemberPage.jsx
// Route: /team/:slug

import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./TeamMemberPage.module.css";
import { TEAM_MEMBERS } from "../data/teamData";
import { FaArrowRight, FaArrowLeft, FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";

export default function TeamMemberPage() {
  const { slug }   = useParams();
  const navigate   = useNavigate();

  // Find member by slug — later: fetch(`/api/team/${slug}`)
  const member     = TEAM_MEMBERS.find((m) => m.slug === slug);
  const currentIdx = TEAM_MEMBERS.findIndex((m) => m.slug === slug);
  const prevMember = TEAM_MEMBERS[currentIdx - 1] || null;
  const nextMember = TEAM_MEMBERS[currentIdx + 1] || null;

  if (!member) {
    return (
      <div className={styles.notFound}>
        <h2>Member not found</h2>
        <Link to="/team" className={styles.backBtn}>← Back to Team</Link>
      </div>
    );
  }

  return (
    <main className={styles.page}>

      {/* ── Back navigation ── */}
      <div className={styles.topNav}>
        <button className={styles.backLink} onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
        <span className={styles.breadcrumb}>
          <Link to="/">Home</Link> / <Link to="/team">Team</Link> / {member.name}
        </span>
      </div>

      {/* ── Main card ── */}
      <section className={styles.container}>
        <div className={styles.card}>
          {/* Glow accents */}
          <div className={styles.glowLeft} />
          <div className={styles.glowRight} />

          <div className={styles.inner}>

            {/* Left: content */}
            <div className={styles.content}>
              <div className={styles.header}>
                <div>
                  <h1 className={styles.name}>{member.name}</h1>
                  <span className={styles.role}>{member.role}</span>
                </div>
                <span className={styles.dot} />
              </div>

              <div className={styles.bio}>
                {member.bio.map((para, i) => (
                  <p key={i} className={styles.para}>{para}</p>
                ))}
              </div>

              <div className={styles.footer}>
                <Link to="/contact" className={styles.ctaBtn}>
                  <span className={styles.ctaIcon}><FaArrowRight /></span>
                  Contact Us
                </Link>

                <div className={styles.socials}>
                  {member.socials?.linkedin && (
                    <a href={member.socials.linkedin} target="_blank" rel="noreferrer" className={styles.socialLink}>
                      <FaLinkedinIn />
                    </a>
                  )}
                  {member.socials?.twitter && (
                    <a href={member.socials.twitter} target="_blank" rel="noreferrer" className={styles.socialLink}>
                      <FaTwitter />
                    </a>
                  )}
                  {member.socials?.instagram && (
                    <a href={member.socials.instagram} target="_blank" rel="noreferrer" className={styles.socialLink}>
                      <FaInstagram />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right: photo */}
            <div className={styles.imageWrap}>
              <img src={member.img} alt={member.name} className={styles.image} />
              <div className={styles.imageGlow} />
            </div>
          </div>
        </div>

        {/* ── Prev / Next navigation ── */}
        <div className={styles.memberNav}>
          {prevMember ? (
            <Link to={`/team/${prevMember.slug}`} className={styles.memberNavBtn}>
              <FaArrowLeft />
              <div className={styles.memberNavInfo}>
                <span className={styles.memberNavLabel}>Previous</span>
                <span className={styles.memberNavName}>{prevMember.name}</span>
              </div>
            </Link>
          ) : <div />}

          {nextMember ? (
            <Link to={`/team/${nextMember.slug}`} className={`${styles.memberNavBtn} ${styles.memberNavBtnRight}`}>
              <div className={styles.memberNavInfo} style={{ textAlign: "right" }}>
                <span className={styles.memberNavLabel}>Next</span>
                <span className={styles.memberNavName}>{nextMember.name}</span>
              </div>
              <FaArrowRight />
            </Link>
          ) : <div />}
        </div>
      </section>
    </main>
  );
}
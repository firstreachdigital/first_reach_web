// src/pages/BlogPage.jsx
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./BlogPage.module.css";
import { BLOG_POSTS } from "../data/blogData";
import { FaArrowLeft, FaArrowRight, FaTwitter, FaLinkedinIn, FaLink } from "react-icons/fa";
import Blog from "../components/blog/Blog";

export default function BlogPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // ── No slug → show blog list page ──────────────────────────────────────
  if (!slug) {
    return (
      <div style={{ paddingTop: "120px" }}>
        <Blog />
      </div>
    );
  }

  // ── Has slug → show detail page ─────────────────────────────────────────
  const post       = BLOG_POSTS.find((p) => p.slug === slug);
  const currentIdx = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const prevPost   = BLOG_POSTS[currentIdx - 1] || null;
  const nextPost   = BLOG_POSTS[currentIdx + 1] || null;

  const copyLink = () => navigator.clipboard.writeText(window.location.href);

  if (!post) {
    return (
      <div className={styles.notFound}>
        <h2>Post not found</h2>
        <Link to="/blog" className={styles.backBtn}>← Back to Blog</Link>
      </div>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.topNav}>
        <button className={styles.backLink} onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
        <span className={styles.breadcrumb}>
          <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / {post.title}
        </span>
      </div>

      <div className={styles.container}>
        <div className={styles.heroImgWrap}>
          <img src={post.img} alt={post.title} className={styles.heroImg} />
          <div className={styles.heroOverlay} />
          <span className={styles.heroTag}>{post.tag}</span>
        </div>

        <article className={styles.article}>
          <div className={styles.meta}>
            <div className={styles.authorRow}>
              <img src={post.author.avatar} alt={post.author.name} className={styles.avatar} />
              <div>
                <p className={styles.authorName}>{post.author.name}</p>
                <p className={styles.authorRole}>{post.author.role}</p>
              </div>
            </div>
            <div className={styles.metaRight}>
              <span className={styles.metaItem}>{post.date}</span>
              <span className={styles.metaDot} />
              <span className={styles.metaItem}>{post.readTime}</span>
            </div>
          </div>

          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.excerpt}>{post.excerpt}</p>
          <div className={styles.divider} />

          <div className={styles.body}>
            {post.content.map((para, i) => (
              <p key={i} className={styles.para}>{para}</p>
            ))}
          </div>

          <div className={styles.shareRow}>
            <span className={styles.shareLabel}>Share</span>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank" rel="noreferrer" className={styles.shareBtn}>
              <FaTwitter />
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank" rel="noreferrer" className={styles.shareBtn}>
              <FaLinkedinIn />
            </a>
            <button className={styles.shareBtn} onClick={copyLink}><FaLink /></button>
          </div>
        </article>

        <div className={styles.postNav}>
          {prevPost ? (
            <Link to={`/blog/${prevPost.slug}`} className={styles.postNavBtn}>
              <FaArrowLeft />
              <div className={styles.postNavInfo}>
                <span className={styles.postNavLabel}>Previous</span>
                <span className={styles.postNavTitle}>{prevPost.title}</span>
              </div>
            </Link>
          ) : <div />}
          {nextPost ? (
            <Link to={`/blog/${nextPost.slug}`} className={`${styles.postNavBtn} ${styles.postNavBtnRight}`}>
              <div className={styles.postNavInfo} style={{ textAlign: "right" }}>
                <span className={styles.postNavLabel}>Next</span>
                <span className={styles.postNavTitle}>{nextPost.title}</span>
              </div>
              <FaArrowRight />
            </Link>
          ) : <div />}
        </div>

        <div className={styles.related}>
          <h2 className={styles.relatedTitle}>More Articles</h2>
          <div className={styles.relatedGrid}>
            {BLOG_POSTS.filter((p) => p.slug !== slug).map((p) => (
              <Link key={p.id} to={`/blog/${p.slug}`} className={styles.relatedCard}>
                <div className={styles.relatedImgWrap}>
                  <img src={p.img} alt={p.title} className={styles.relatedImg} />
                </div>
                <div className={styles.relatedBody}>
                  <span className={styles.relatedTag}>{p.tag}</span>
                  <h3 className={styles.relatedCardTitle}>{p.title}</h3>
                  <p className={styles.relatedDate}>{p.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
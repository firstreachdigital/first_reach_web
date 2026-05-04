// src/pages/BlogPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./BlogPage.module.css";
import { FaArrowLeft, FaTwitter, FaLinkedinIn, FaLink } from "react-icons/fa";
import Blog from "../components/blog/Blog";
import API from "../api/axios";

export default function BlogPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);
    API.get(`/blogs/${slug}`)
      .then((res) => {
        setPost(res.data);
        return API.get("/blogs");
      })
      .then((res) => setRelated(res.data.filter((p) => p.slug !== slug).slice(0, 3)))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  // ── No slug → show blog list page
  if (!slug) {
    return (
      <div style={{ paddingTop: "120px" }}>
        <Blog />
      </div>
    );
  }

  if (loading) return <div className={styles.notFound}><p style={{ color: "#aaa" }}>Loading...</p></div>;

  if (notFound || !post) {
    return (
      <div className={styles.notFound}>
        <h2>Post not found</h2>
        <Link to="/blog" className={styles.backBtn}>← Back to Blog</Link>
      </div>
    );
  }

  const copyLink = () => navigator.clipboard.writeText(window.location.href);

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";

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
          <img src={post.featuredImage} alt={post.title} className={styles.heroImg} />
          <div className={styles.heroOverlay} />
          <span className={styles.heroTag}>{post.category}</span>
        </div>

        <article className={styles.article}>
          <div className={styles.meta}>
            <div className={styles.authorRow}>
              <div>
                <p className={styles.authorName}>{post.author}</p>
              </div>
            </div>
            <div className={styles.metaRight}>
              <span className={styles.metaItem}>{formattedDate}</span>
              <span className={styles.metaDot} />
              <span className={styles.metaItem}>{post.readTime}</span>
            </div>
          </div>

          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.excerpt}>{post.excerpt}</p>
          <div className={styles.divider} />

          <div className={styles.body}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={styles.shareRow}>
            <span className={styles.shareLabel}>Share</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank" rel="noreferrer" className={styles.shareBtn}
            >
              <FaTwitter />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank" rel="noreferrer" className={styles.shareBtn}
            >
              <FaLinkedinIn />
            </a>
            <button className={styles.shareBtn} onClick={copyLink}><FaLink /></button>
          </div>
        </article>

        {related.length > 0 && (
          <div className={styles.related}>
            <h2 className={styles.relatedTitle}>More Articles</h2>
            <div className={styles.relatedGrid}>
              {related.map((p) => (
                <Link key={p._id} to={`/blog/${p.slug}`} className={styles.relatedCard}>
                  <div className={styles.relatedImgWrap}>
                    <img src={p.featuredImage} alt={p.title} className={styles.relatedImg} />
                  </div>
                  <div className={styles.relatedBody}>
                    <span className={styles.relatedTag}>{p.category}</span>
                    <h3 className={styles.relatedCardTitle}>{p.title}</h3>
                    <p className={styles.relatedDate}>
                      {new Date(p.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

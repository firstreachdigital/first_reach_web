import React, { useState, useEffect, useRef } from 'react'
import styles from './Services.module.css'
import { TbCube3dSphere } from 'react-icons/tb'
import { TbDeviceDesktopCode } from 'react-icons/tb'
import { MdOutlineDesignServices } from 'react-icons/md'
import { TbBrandGoogleAnalytics } from 'react-icons/tb'
import { TbShoppingCart } from 'react-icons/tb'
import { FaArrowRight } from "react-icons/fa";

const services = [
  {
    num: '1',
    title: 'Brand Identity & Graphics',
    icon: <TbCube3dSphere />,
    desc: 'We go beyond logos — building complete visual identities that tell your story and reflect your values. From color palettes to typography, tone of voice to brand guidelines, we shape every element to ensure your brand stands out across every touching.',
    tags: ['Logo design', 'Typography & color systems', 'Brand guidelines', 'Art Direction', 'Motion Identity'],
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
  },
  {
    num: '2',
    title: 'Web & App Development',
    icon: <TbDeviceDesktopCode />,
    desc: 'We build fast, scalable, and beautiful web and mobile applications. From landing pages to full-stack platforms, every line of code is written with performance and user experience in mind.',
    tags: ['React / Next.js', 'Mobile Apps', 'API Integration', 'CMS Development', 'Performance Optimization'],
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
  },
  {
    num: '3',
    title: 'UI/UX Design',
    icon: <MdOutlineDesignServices />,
    desc: 'Great design is invisible — it just works. We craft intuitive interfaces and seamless experiences that delight users and drive conversions, from wireframes to pixel-perfect final designs.',
    tags: ['Wireframing', 'Prototyping', 'User Research', 'Design Systems', 'Interaction Design'],
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
  },
  {
    num: '4',
    title: 'Digital Strategy & Marketing',
    icon: <TbBrandGoogleAnalytics />,
    desc: 'We help brands grow online through data-driven strategies. From SEO and content marketing to paid campaigns and analytics, we align every move with your business goals.',
    tags: ['SEO & Content', 'Paid Advertising', 'Analytics & Reporting', 'Social Media', 'Email Marketing'],
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
  },
  {
    num: '5',
    title: 'E-Commerce Solutions',
    icon: <TbShoppingCart />,
    desc: 'We build high-converting online stores that look great and sell more. From product pages to checkout flows, we optimize every step of the customer journey for maximum revenue.',
    tags: ['Shopify / WooCommerce', 'Product Photography', 'Conversion Optimization', 'Payment Integration', 'Inventory Management'],
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
  },
]

export default function Services() {
  const [active, setActive] = useState(0)
  const titleFillRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    // Inview fade
    const els = document.querySelectorAll('[data-sv-inview]')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add(styles.inView)
          obs.unobserve(e.target)
        }
      }),
      { threshold: 0.15 }
    )
    els.forEach(el => obs.observe(el))

    // Title fill scroll
    const onScroll = () => {
      if (!titleFillRef.current) return
      const rect = titleFillRef.current.getBoundingClientRect()
      const progress = Math.min(Math.max((window.innerHeight - rect.top) / (window.innerHeight * 0.5), 0), 1)
      titleFillRef.current.style.clipPath = `inset(0 ${(1 - progress) * 100}% 0 0)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { window.removeEventListener('scroll', onScroll); obs.disconnect() }
  }, [])

  return (
    <section className={styles.services} id="services" ref={sectionRef}>
      <div className={styles.bgGlow} />

      {/* ── HEADER ── */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.label} data-sv-inview>
            <span className={styles.labelDot} /> &#123;02&#125; Our Services
          </span>
          <div className={styles.titleWrap}>
            <h2 className={styles.titleBase}>
              We are offering the best solutions
            </h2>
            <h2 className={styles.titleFill} ref={titleFillRef}>
              We are offering the best solutions
            </h2>
          </div>
        </div>
        <p className={styles.headerDesc} data-sv-inview>
          We offer a full range of digital services to help your brand
          stand out, connect, and grow.
        </p>
      </div>

      {/* ── MAIN GRID ── */}
      <div className={styles.grid}>

        {/* LEFT — service list */}
        <div className={styles.list}>
          {services.map((s, i) => (
            <button
              key={i}
              className={`${styles.listItem} ${active === i ? styles.listItemActive : ''}`}
              onClick={() => setActive(i)}
            >
              <span className={styles.listNum}>{s.num}.</span>
              <span className={styles.listTitle}>{s.title}</span>
              {active === i && <span className={styles.listArrow}><FaArrowRight /></span>}
            </button>
          ))}
        </div>

        {/* MIDDLE — content */}
        <div className={styles.content}>
          <div className={styles.contentInner} key={active}>
            <div className={styles.contentIcon}>{services[active].icon}</div>
            <p className={styles.contentDesc}>
              <strong>{services[active].desc.split('—')[0]}</strong>
              {services[active].desc.includes('—') ? '—' + services[active].desc.split('—')[1] : ''}
            </p>
            <div className={styles.tags}>
              {services[active].tags.map((tag, i) => (
                <span key={i} className={styles.tag}>
                  <span className={styles.tagPlus}>+</span> {tag}
                </span>
              ))}
            </div>
            <a href="#contact" className={styles.readMore}>
              <span className={styles.readMoreArrow}><FaArrowRight /></span>
              Read more
            </a>
          </div>
        </div>

        {/* RIGHT — image */}
        <div className={styles.imgWrap}>
          <img
            key={active}
            src={services[active].img}
            alt={services[active].title}
            className={styles.img}
          />
          <div className={styles.imgOverlay} />
        </div>

      </div>
    </section>
  )
}
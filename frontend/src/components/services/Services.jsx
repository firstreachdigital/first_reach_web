import React, { useState, useEffect, useRef } from 'react'
import styles from './Services.module.css'
import { TbCube3dSphere, TbDeviceDesktopCode, TbBrandGoogleAnalytics, TbShoppingCart } from 'react-icons/tb'
import { MdOutlineDesignServices, MdPermMedia } from 'react-icons/md'
import { FaArrowRight, FaCopyright } from "react-icons/fa";
import { AiOutlineFileProtect } from "react-icons/ai";
import { LuRocket } from "react-icons/lu";

import { Brand, Brandpro, copywrite, influencer, media, Seo, SocialMedia, web } from "../../assets";

const services = [
  {
    num: '1',
    title: 'Brand Development & Management',
    icon: <TbCube3dSphere />,
    desc: ' We takes your brand in & starts the whole deep process of understanding & analysing what’s going on inside your brand framework to completely renew its value.',
    tags: ['Assessment of the Brand Framework', 'Examining the Current Marketing Efforts', 'Developing New Brand Strategy / Brand Messaging / Brand Design', 'Creating New Brand Guidelines, Evaluating Social Media',],
    img: Brand,
  },
  {
    num: '2',
    title: 'Website and App Development',
    icon: <TbDeviceDesktopCode />,
    desc: 'A website that clearly shows how unique your brand & how powerful your mission is; that’s what First Reach Digital promises every brand With smooth dynamics & converting design, your brand will get a great identity.',
    tags: ['Wordpress & Shopify Development', 'Webflow Development', 'Magento & Odoo Development', 'Android and IOS App Development', 'Flutter Mobile App Development'],
    img: web,
  },
  {
  num: '3',
  title: 'Search Engine Optimization (SEO)',
  icon: <LuRocket />,
  desc: 'On top & at first is where your brand needs to be, when a potential customer looks for you. We’ll take care of that dilemma with our expert SEO measures & tactics.',
  tags: [
    'SEO Audit Report',
    'On Page SEO ',
    ' Off Page SEO',
    'Technical SEO',
  ],
  img: Seo,
},
  {
    num: '4',
    title: 'Social Media Management & Marketing',
    icon: <TbBrandGoogleAnalytics />,
    desc: 'The legendary virtual world is where all your potential and future customers are spending most of their time. Be in their sight, at the right time, in the right places. We’ll take your brand across all social media platforms to get the much needed attention.',
    tags: ['Facebook', 'Instagram', 'Linkedin', 'YouTube', 'Google', 'Others,'],
    img: SocialMedia,
  },
  {
    num: '5',
    title: 'Influencer Marketing',
    icon: <TbShoppingCart />,
    desc: 'Collab with iconic content creators/influencers to boost your brand’s reach, within a shorter time. Teaming up with First Reach Digital will get you closer to all these golden opportunities.',
    tags: ['Instagram Collabs', 'Partnership campaigns', 'Reviews/Testimonials',],
    img: influencer,
  },
  {
    num: '6',
    title: 'Media Productions & Graphic Design',
    icon: <MdPermMedia />,
    desc: 'We’ll build a visual identity that tells your brand story, in a way, that’ll catch the public’s eye. From color palettes to typography,tone of voice to brand guidelines, we shape every element to ensure your brand stands out across every platform.',
    tags: ['Videography', 'Video Editing', 'Motion & Graphic works', 'Logo & other brand assets'],
    img: media,
  },
   {
    num: '7',
    title: 'Copywriting & Content marketing',
    icon: <FaCopyright />,
    desc: 'A talk with your audience, in the most creative & strategic way, with excellent visualizations that reflect your brand’s identity. We craft each sentence for your brand with a purpose that brings real results in a short time.',
    tags: ['Uniquely crafted ad copies & content', 'SEO Integrated Content Preparation',],
    img: copywrite,
  },
   {
    num: '8',
    title: 'Brand Protection & Digital Security',
    icon: <AiOutlineFileProtect />,
    desc: 'We monitor where your audience is; and also where your attackers could be. Complete digital security with proven results; only with First Reach Digital.',
    tags: ['24/7 Monitoring', 'Fake Account Detection, Removal & Fast Content Takedown', 'Trademark & Copyright Violation Reporting', 'Online Reputation Management (ORM)', ' Crisis Handling & Response Strategy & Monthly Reports'],
    img: Brandpro,
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
              BEST DIGITAL MARKETING meets TOP DIGITAL SECURITY
            </h2>
            <h2 className={styles.titleFill} ref={titleFillRef}>
              BEST DIGITAL MARKETING meets TOP DIGITAL SECURITY
            </h2>
          </div>
        </div>
        <p className={styles.headerDesc} data-sv-inview>
          With First Reach Digital, see the world of infinite
          possibilities for your brand. Stand-out. Shine.
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
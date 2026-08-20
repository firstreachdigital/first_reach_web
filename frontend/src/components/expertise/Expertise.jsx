import React from "react";
import styles from "./Expertise.module.css";
import {
  TbBrandGoogleAnalytics,
  TbCube3dSphere,
  TbDeviceDesktopCode,
} from "react-icons/tb";
import { AiOutlineFileProtect } from "react-icons/ai";
import { FaCopyright } from "react-icons/fa";
import { MdPermMedia } from "react-icons/md";
import { LuShieldCheck } from "react-icons/lu";

const expertise = [
  {
    icon: <TbBrandGoogleAnalytics />,
    title: "Digital Marketing",
    desc: "SEO, social media marketing, performance marketing, content marketing, influencer marketing, and AI-powered marketing automation.",
  },
  {
    icon: <TbCube3dSphere />,
    title: "Brand Development & Management",
    desc: "Building distinctive brand identities, positioning strategies, communication systems, and consistent digital experiences.",
  },
  {
    icon: <LuShieldCheck />,
    title: "Digital Security & Brand Protection",
    desc: "24/7 monitoring, fake account detection, content takedown assistance, copyright and trademark violation reporting, and digital threat identification.",
  },
  {
    icon: <AiOutlineFileProtect />,
    title: "Reputation Management & PR",
    desc: "Strengthening online reputation, managing digital perception, developing positive visibility, and preparing strategic responses to reputation challenges.",
  },
  {
    icon: <FaCopyright />,
    title: "Anti-Piracy & Content Protection",
    desc: "Helping entertainment brands identify unauthorized content, monitor piracy threats, and initiate appropriate takedown and reporting processes.",
  },
  {
    icon: <TbDeviceDesktopCode />,
    title: "Technology & Digital Experiences",
    desc: "Secure, scalable websites, applications, landing pages, and digital platforms designed for performance, usability, and conversion.",
  },
  {
    icon: <MdPermMedia />,
    title: "Creative & Media Production",
    desc: "Graphic design, motion graphics, video production, photography, campaign creatives, and visual storytelling that make brands impossible to ignore.",
  },
];

export default function Expertise() {
  return (
    <section className={styles.section} id="expertise">
      <div className={styles.header}>
        <span className={styles.label} data-inview>
          <span className={styles.labelDot} /> &#123;C&#125; What We Do
        </span>
        <h2 className={styles.title} data-inview>
          Our Expertise
        </h2>
        <p className={styles.desc} data-inview>
          At First Reach Digital, we bring together strategy, creativity,
          technology, marketing, public relations, and digital security to
          help brands build visibility, strengthen credibility, protect
          their reputation, and accelerate growth.
        </p>
      </div>

      <div className={styles.grid}>
        {expertise.map((item, i) => (
          <div key={item.title} className={styles.card} data-inview style={{ transitionDelay: `${i * 60}ms` }}>
            <div className={styles.icon}>{item.icon}</div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDesc}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
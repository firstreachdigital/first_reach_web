// src/data/careersSeo.js
// Maps job title -> SEO meta content for the apply page

const CAREERS_SEO = [
  {
    match: "content creator",
    title: "Content Creator Opening in Kalamassery, Kochi | First Reach Digital",
    description:
      "Explore a content creator opportunity in Kalamassery, Kochi focused on creative writing, brand storytelling, social media content, campaign ideas and digital communication.",
    keywords:
      "content creator Kalamassery, content creator Kochi, content writing opportunity Kerala, creative writer Kalamassery, digital content career Kochi, brand storytelling jobs, social content creator Kerala, copywriter opportunity Kochi",
  },
  {
    match: "video editor intern",
    title: "Video Editor Internship in Kalamassery, Kochi | First Reach Digital",
    description:
      "Gain hands-on video editing experience in Kalamassery, Kochi while producing reels, social videos, promotional content and engaging media for digital marketing campaigns.",
    keywords:
      "video editor intern Kalamassery, video editing internship Kochi, video editing trainee Kerala, reel editing internship, social video trainee, multimedia internship Kochi",
  },
  {
    match: "video editor",
    title: "Video Editing Career in Kalamassery, Kochi | First Reach Digital",
    description:
      "Build a video editing career in Kalamassery, Kochi by creating reels, promotional videos and engaging visual stories for brands, campaigns and digital platforms.",
    keywords:
      "video editor Kalamassery, video editing Kochi, video editor vacancy Kerala, reel editor opportunity, promotional video editing, short form video career",
  },
  {
    match: "react developer",
    title: "React Developer Opportunity in Kalamassery, Kochi | First Reach Digital",
    description:
      "Join a React development team in Kalamassery, Kochi and work on responsive interfaces, modern web applications, frontend technologies and user-focused digital products.",
    keywords:
      "React developer Kalamassery, React developer Kochi, React JS opportunity Kerala, frontend developer Kalamassery, JavaScript developer Kochi, React programming career",
  },
  {
    match: "sales team lead",
    title: "Sales Team Lead Position in Kalamassery, Kochi | First Reach Digital",
    description:
      "Lead a high-performing sales team in Kalamassery, Kochi with responsibilities across sales planning, team mentoring, client development, target management and business growth.",
    keywords:
      "sales team lead Kalamassery, sales team leader Kochi, sales leadership Kerala, sales manager opportunity, team management career, sales supervisor vacancy",
  },
  {
    match: "sales executive",
    title: "Sales Executive Vacancy in Kalamassery, Kochi | First Reach Digital",
    description:
      "Find a sales executive vacancy in Kalamassery, Kochi involving client acquisition, lead conversion, relationship building, business communication and revenue development.",
    keywords:
      "sales executive Kalamassery, sales executive Kochi, sales vacancy Kerala, client acquisition executive, business development opportunity, lead conversion jobs",
  },
  {
    match: "performance marketer",
    title: "Performance Marketing Role in Kalamassery, Kochi | First Reach Digital",
    description:
      "Develop your performance marketing career in Kalamassery, Kochi through paid campaigns, conversion tracking, audience targeting, advertising analytics and growth-focused strategies.",
    keywords:
      "performance marketer Kalamassery, performance marketing Kochi, paid advertising Kerala, PPC marketing opportunity, Google Ads career, Meta Ads specialist Kochi",
  },
  {
    match: "graphic design intern",
    title: "Graphic Design Internship in Kalamassery, Kochi | First Reach Digital",
    description:
      "Start a graphic design internship in Kalamassery, Kochi and gain practical exposure to branding, social media creatives, visual layouts, campaign artwork and digital design.",
    keywords:
      "graphic design intern Kalamassery, graphic design internship Kochi, design trainee Kerala, visual design internship, creative design trainee, branding internship Kochi",
  },
  {
    match: "digital marketing intern",
    title: "Digital Marketing Internship in Kalamassery, Kochi | First Reach Digital",
    description:
      "Join a digital marketing internship in Kalamassery, Kochi to learn campaign execution, online promotion, marketing analytics, brand awareness and digital customer engagement.",
    keywords:
      "digital marketing intern Kalamassery, digital marketing internship Kochi, marketing trainee Kerala, online marketing intern, digital campaign internship, marketing analytics trainee",
  },
  {
    match: "seo intern",
    title: "SEO Internship Opportunity in Kalamassery, Kochi | First Reach Digital",
    description:
      "Learn SEO in Kalamassery, Kochi through practical work in keyword research, on-page optimization, local search, website audits, organic visibility and search performance.",
    keywords:
      "SEO intern Kalamassery, SEO internship Kochi, search optimization trainee Kerala, keyword research intern, on page SEO trainee, local SEO internship",
  },
  {
    match: "social media marketing intern",
    title: "Social Media Marketing Internship in Kalamassery, Kochi",
    description:
      "Build social media marketing skills in Kalamassery, Kochi through Instagram and Facebook campaigns, content planning, audience engagement, platform management and brand growth.",
    keywords:
      "social media marketing intern Kalamassery, social media internship Kochi, social media trainee Kerala, Instagram marketing internship, Facebook marketing trainee",
  },
];

export function getCareersSeo(jobTitle = "") {
  const lower = jobTitle.toLowerCase();
  const found = CAREERS_SEO.find((entry) => lower.includes(entry.match));
  if (found) return found;
  return {
    title: `${jobTitle} | Careers at First Reach Digital`,
    description: `Apply for the ${jobTitle} role at First Reach Digital, Kalamassery, Kochi.`,
    keywords: `${jobTitle} Kalamassery, ${jobTitle} Kochi, careers First Reach Digital`,
  };
}

export default CAREERS_SEO;
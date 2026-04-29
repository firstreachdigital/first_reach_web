// src/data/blogData.js
// ── Single source of truth — swap with API fetch later ────────────────────

export const BLOG_POSTS = [
  {
    id: 0,
    slug: "top-creative-agency-award",
    tag: "Strategy",
    date: "January 10, 2024",
    title: 'First Reach Wins "Top Creative Agency" Award',
    img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80",
    featured: false,
    readTime: "4 min read",
    author: {
      name: "Alex Johnson",
      role: "Creative Director",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80",
    },
    excerpt:
      "First Reach Digital has been recognized as the Top Creative Agency of 2024, a testament to our team's relentless pursuit of design excellence and digital innovation.",
    content: [
      "First Reach Digital has been recognized as the Top Creative Agency of 2024 by the Global Digital Excellence Awards. This prestigious recognition reflects our team's commitment to pushing the boundaries of what's possible in digital design and strategy.",
      "The award was presented at the Annual Creative Summit held in Dubai, where agencies from over 40 countries competed across categories including Brand Identity, Web Innovation, and Digital Campaign Excellence. First Reach took home the top honor in the Digital Agency of the Year category.",
      "Our Creative Director Alex Johnson accepted the award on behalf of the entire team: 'This is for every late night, every revision, every bold decision we made together. We don't design for awards — we design for impact. But it's humbling to be recognized by peers we deeply respect.'",
      "This recognition follows a landmark year for First Reach, during which we delivered over 40 projects across 12 countries, launched our proprietary design system framework, and grew our team by 60%. The momentum continues into 2025 with several major brand partnerships already in progress.",
    ],
  },
  {
    id: 1,
    slug: "10-digital-solutions-launch",
    tag: "Email Marketing",
    date: "January 10, 2024",
    title: "First Reach Launches 10+ Digital Solutions On the Market",
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
    featured: true,
    readTime: "6 min read",
    author: {
      name: "Maya Patel",
      role: "Brand Strategist",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    },
    excerpt:
      "2024 has been a landmark year for product launches at First Reach Digital. Here's a deep dive into the 10+ digital solutions we shipped and how they're changing the game.",
    content: [
      "2024 has been our most ambitious year yet. We shipped over 10 digital products and platforms across industries including fintech, healthcare, e-commerce, and education — each built with the same obsession for performance and craft.",
      "Among the highlights: a real-time analytics dashboard for a European fintech startup that reduced decision latency by 40%; a fully accessible e-commerce platform for a sustainable fashion brand that drove a 3x increase in conversion within 90 days of launch; and a mobile-first patient portal for a healthcare network serving over 200,000 users.",
      "Each solution began with a deep discovery phase — understanding not just what clients needed to build, but why it mattered and who it was for. This human-centered approach is baked into everything we do at First Reach.",
      "As we look toward 2025, our product pipeline is already full. We're doubling down on AI-integrated design tools, real-time personalization systems, and scalable design systems that clients can own and evolve independently.",
    ],
  },
  {
    id: 2,
    slug: "digital-future-summit-2025",
    tag: "Events",
    date: "January 10, 2024",
    title: "First Reach at the Digital Future Summit 2025",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    featured: false,
    readTime: "3 min read",
    author: {
      name: "Ryan Torres",
      role: "Motion Designer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    },
    excerpt:
      "Our team attended the Digital Future Summit 2025, where we led a keynote on motion design, AI-assisted creativity, and the future of immersive brand experiences.",
    content: [
      "The Digital Future Summit 2025 brought together over 3,000 industry leaders, designers, developers, and strategists from across the globe. First Reach was proud to attend not just as participants, but as featured speakers on the main stage.",
      "Our Motion Designer Ryan Torres led a keynote titled 'Movement as Language: How Animation Shapes User Trust' — a talk that explored the neurological and emotional impact of micro-interactions, scroll-based storytelling, and brand motion systems.",
      "The session was followed by a live design sprint where Ryan and the audience co-created an animated brand sequence in real time — a session that received a standing ovation and became one of the summit's most-shared moments on social media.",
      "Beyond the keynote, the summit provided incredible opportunities to connect with peers, discover emerging tools, and stay ahead of the curve on everything from AI-generated design assets to spatial computing interfaces.",
    ],
  },
];
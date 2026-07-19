/*
 * =====================================================
 *  portfolioData.js — Single source of truth
 *  To add new projects, skills, achievements, or
 *  certifications, just add a new object to the
 *  corresponding array below. The UI updates automatically.
 * =====================================================
 */

export const personalInfo = {
  name: "Dilip Magar",
  title: "Full-Stack Developer",
  roles: [
    "Full-Stack Developer",
    "MERN Stack Developer",
    "Problem Solver",
    "MCA @ PCCoE, Pune",
  ],
  about:
    "I'm a full-stack developer specializing in the MERN stack, currently pursuing my MCA at PCCoE, Pune. I build production-grade web applications that solve real-world problems — from examination platforms used by students to rental management systems used by local businesses. I'm passionate about writing clean, scalable code and shipping products that people actually use.",
  email: "dilipmagarooooi@gmail.com",
  phone: "+91 9356331879",
  location: "Pune, Maharashtra",
  photo: "/profile-photo-optimized.jpg",
  resume: "/DILIP_MAGAR_MCA_RESUME.pdf",
};

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/MAGARDILIP",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/dilip-magar",
    icon: "linkedin",
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/dilip_magar",
    icon: "leetcode",
  },
  {
    name: "HackerRank",
    url: "https://www.hackerrank.com/profile/dilipmagarooooi",
    icon: "hackerrank",
  },
];

/*
 * ---- SKILLS ----
 * To add a new skill: push { name, icon, level } into the array.
 * level: "expert" | "advanced" | "intermediate"
 */
export const skills = [
  { name: "Java", icon: "☕", level: "advanced", category: "Languages" },
  {
    name: "JavaScript",
    icon: "⚡",
    level: "intermediate",
    category: "Languages",
  },
  { name: "SQL", icon: "🗄️", level: "advanced", category: "Languages" },
  {
    name: "HTML/CSS",
    icon: "🎨",
    level: "intermediate",
    category: "Languages",
  },
  { name: "React", icon: "⚛️", level: "intermediate", category: "Frameworks" },
  {
    name: "Node.js",
    icon: "🟢",
    level: "intermediate",
    category: "Frameworks",
  },
  {
    name: "Express.js",
    icon: "🚀",
    level: "intermediate",
    category: "Frameworks",
  },
  { name: "MongoDB", icon: "🍃", level: "intermediate", category: "Databases" },
  { name: "MySQL", icon: "🐬", level: "advanced", category: "Databases" },
  { name: "Git", icon: "📦", level: "intermediate", category: "Tools" },
];

/*
 * ---- PROJECTS ----
 * To add a new project: push a new object here.
 * The UI renders all entries automatically.
 */
export const projects = [
  {
    id: 1,
    title: "AptiPrep",
    tagline: "Full-Stack Examination Platform",
    description:
      "A comprehensive examination platform with real-time proctoring, live leaderboards, and automated test lifecycle management.",
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "JWT"],
    features: [
      "Real-time proctoring & live leaderboards with server-side scoring",
      "Secure JWT auth with refresh token rotation & httpOnly cookies",
      "Tamper-proof scoring engine with partial and negative marking",
      "Automated test lifecycle — auto-publish, auto-submit, rank calculation",
    ],
    github: "https://github.com/MAGARDILIP",
    live: null,
    featured: true,
    period: "Feb 2026 – Apr 2026",
  },
  {
    id: 2,
    title: "Dhanadai Rental",
    tagline: "Multilingual PWA for Rental Business",
    description:
      "A progressive web app deployed and actively used by a local business client to digitize daily rental operations with multilingual support.",
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "Vite PWA"],
    features: [
      "Multilingual PWA (Marathi, Hindi, English) — deployed & used by a real business",
      "Offline-first sync engine with automatic backend reconciliation",
      "Dynamic PDF reports with custom Devanagari fonts via pdfkit",
      "Automated WhatsApp notifications bypassing SMS gateway costs",
    ],
    github: "https://github.com/MAGARDILIP",
    live: "https://dhandai-kn23.vercel.app",
    featured: true,
    period: "Dec 2025 – Jan 2026",
  },
  // ---- ADD MORE PROJECTS HERE ----
  // {
  //   id: 3,
  //   title: "Your Next Project",
  //   tagline: "Short tagline",
  //   description: "Description here",
  //   techStack: ["Tech1", "Tech2"],
  //   features: ["Feature 1", "Feature 2"],
  //   github: "https://github.com/...",
  //   live: "https://...",
  //   featured: false,
  //   period: "Month Year",
  // },
];

/*
 * ---- EDUCATION ----
 * Add new entries and they appear in the timeline.
 */
export const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "PCCoE, Savitribai Phule Pune University",
    location: "Pune, Maharashtra",
    score: "CGPA: 8.75",
    period: "2025 – Present",
    current: true,
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "KTHM College, Savitribai Phule Pune University",
    location: "Nashik, Maharashtra",
    score: "CGPA: 9.25",
    period: "2022 – 2025",
    current: false,
  },
  {
    degree: "HSC — Science",
    institution: "Maharashtra State Board",
    location: "Aurangabad, Maharashtra",
    score: "78.50%",
    period: "2022",
    current: false,
  },
  {
    degree: "SSC",
    institution: "Maharashtra State Board",
    location: "Aurangabad, Maharashtra",
    score: "91.40%",
    period: "2020",
    current: false,
  },
];

/*
 * ---- ACHIEVEMENTS ----
 * Add new achievements anytime.
 */
export const achievements = [
  {
    title: "MAH-CET 2025",
    value: "99.20",
    unit: "Percentile",
    icon: "🏆",
    description: "Secured 99.20 percentile in MAH-CET entrance exam",
  },
  {
    title: "LeetCode",
    value: "120+",
    unit: "Problems",
    icon: "💻",
    description: "Solved 120+ problems across data structures and algorithms",
  },
  {
    title: "HackerRank",
    value: "5",
    unit: "Stars",
    icon: "⭐",
    description: "Achieved 5-star rating on HackerRank",
  },
];

/*
 * =====================================================
 *  CERTIFICATIONS
 * =====================================================
 *
 *  HOW TO ADD A NEW CERTIFICATE:
 *
 *  ── Option A: HackerRank (iframe embed) ──
 *  No local file needed! Just add:
 *    {
 *      title: "HackerRank ______ Certification",
 *      issuer: "HackerRank",
 *      description: "...",
 *      icon: "☕",
 *      iframeUrl: "https://www.hackerrank.com/certificates/iframe/YOUR_ID",
 *      credentialUrl: "https://www.hackerrank.com/certificates/YOUR_ID",
 *      credentialId: "YOUR_ID",
 *    },
 *
 *  ── Option B: Local file (PDF/PNG/JPG) ──
 *  1. Save your certificate into: public/certificates/
 *  2. Add:
 *    {
 *      title: "Display Title",
 *      issuer: "Issuing Organization",
 *      description: "...",
 *      icon: "📜",
 *      file: "/certificates/your-certificate-file.pdf",
 *      credentialUrl: "https://...",   // optional — link to verify
 *      credentialId: "abc123",         // optional — ID to display
 *    },
 *
 *  3. Save this file → the portfolio auto-updates. That's it!
 * =====================================================
 */
export const certifications = [
  /* ── Course Certificates (local PDF + credential URL) ── */
  {
    title: "Apna College – Full Stack Web Development (Sigma 5.0)",
    issuer: "Apna College",
    description:
      "Successfully completed the Sigma 5.0 Full Stack Web Development course covering HTML, CSS, JavaScript, React, Node.js, Express.js, and MongoDB.",
    icon: "🎓",
    file: "/certificates/certificate-sigma-5-development-68371e0f1357f669e5041882.pdf",
    credentialUrl: "https://mycourse.app/iYKBAUkv2pbsV6L0p",
    credentialId: "68371e0f1357f669e5041882",
  },
  
  /* ── HackerRank Certifications (iframe embed + credential URL) ── */
  {
    title: "HackerRank SQL (Basic) Certification",
    issuer: "HackerRank",
    description:
      "Successfully passed the HackerRank SQL (Basic) certification assessment, demonstrating foundational SQL querying and database management skills.",
    icon: "🗄️",
    iframeUrl: "https://www.hackerrank.com/certificates/iframe/9788399fecb1",
    credentialUrl: "https://www.hackerrank.com/certificates/9788399fecb1",
    credentialId: "9788399fecb1",
  },
  {
    title: "HackerRank SQL (Intermediate) Certification",
    issuer: "HackerRank",
    description:
      "Successfully passed the HackerRank SQL (Intermediate) certification assessment, demonstrating proficiency in complex queries, joins, subqueries, and advanced SQL techniques.",
    icon: "🗄️",
    iframeUrl: "https://www.hackerrank.com/certificates/iframe/370d8f48cdbe",
    credentialUrl: "https://www.hackerrank.com/certificates/370d8f48cdbe",
    credentialId: "370d8f48cdbe",
  },
  {
    title: "HackerRank Java (Basic) Certification",
    issuer: "HackerRank",
    description:
      "Successfully passed the HackerRank Java (Basic) certification assessment, demonstrating foundational Java programming skills including OOP, data types, and control flow.",
    icon: "☕",
    iframeUrl: "https://www.hackerrank.com/certificates/iframe/22d2319bcd02",
    credentialUrl: "https://www.hackerrank.com/certificates/22d2319bcd02",
    credentialId: "22d2319bcd02",
  },

  // ── ADD YOUR NEXT CERTIFICATE HERE (see instructions above) ──
  //
  // HackerRank template (just fill in YOUR_ID):
  // {
  //   title: "HackerRank ______ Certification",
  //   issuer: "HackerRank",
  //   description: "Successfully passed the HackerRank ... certification assessment.",
  //   icon: "☕",
  //   iframeUrl: "https://www.hackerrank.com/certificates/iframe/YOUR_ID",
  //   credentialUrl: "https://www.hackerrank.com/certificates/YOUR_ID",
  //   credentialId: "YOUR_ID",
  // },

  /* ── Workshop / Event Certificates (local PDF, no credential URL) ── */
  {
    title: "Cyber Security & Cyber Hygiene Workshop",
    issuer: "SPPU – Quality Improvement Programme",
    description:
      "Participated in a state-level workshop on Cyber Security and Cyber Hygiene conducted under SPPU's Quality Improvement Programme and learned cybersecurity fundamentals, cyber threats, and safe online practices.",
    icon: "🛡️",
    file: "/certificates/Cyber Security & Cyber Hygiene Workshop Participation Certificate.pdf",
  },
  {
    title: "Bluepineapple Campus Connect – Best Team Performance",
    issuer: "Bluepineapple Campus Connect Program 2026",
    description:
      "Received a Certificate of Merit for outstanding team performance, demonstrating teamwork, collaboration, communication, and problem-solving skills.",
    icon: "🏅",
    file: "/certificates/Bluepineapple Campus Connect Program 2026 – Best Team Performance.pdf",
  },
  {
    title: "Dnyanotsav 2026 – Statistical Modeling Poster",
    issuer: "Dnyanotsav 2026",
    description:
      "Participated in Dnyanotsav 2026 and presented a poster on Statistical Modeling under the Mathematical Foundation in Computer Application II course.",
    icon: "📊",
    file: "/certificates/Dnyanotsav 2026 – Statistical Modeling Poster Presentation.pdf",
  },
  {
    title: "Dnyanotsav 2026 – Django Web Dev Project",
    issuer: "Dnyanotsav 2026",
    description:
      "Presented a project on Web Development using Django, showcasing web application development and project presentation skills.",
    icon: "🌐",
    file: "/certificates/Dnyanotsav 2026 – Django Web Development Project Presentation.pdf",
  },
  {
    title: "INSPERIA 2026 – Technical Team Volunteer",
    issuer: "INSPERIA 2026",
    description:
      "Served as a Technical Team Volunteer and contributed to the successful organization and execution of a state-level technical event.",
    icon: "⚙️",
    file: "/certificates/INSPERIA 2026 – Technical Team Volunteer.pdf",
  },
];

/*
 * ---- COURSEWORK ----
 */
export const coursework = [
  "Data Structures and Algorithms",
  "Object-Oriented Programming (Java)",
  "Database Management Systems",
  "Operating Systems",
  "Web Development",
  "Data Science",
  "Software Engineering",
];

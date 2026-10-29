// ============================================================
//  DATA.JS — Arun Kumar Meda's Portfolio Data
//  Clean icons, real internships, certifications & tech stack
// ============================================================

window.portfolioData = {
  // ── Personal Info ──────────────────────────────────────────
  name: "Arun Kumar Meda",
  initials: "AKM",
  title: "Software Engineer & Front-End AI Engineering Intern",
  tagline: "I build high-quality software, AI-powered web interfaces & contribute to open source.",
  email: "arunkumarmeda27@gmail.com",
  location: "Bangalore, India",
  education: "B.E. Information Science and Engineering @ Dayananda Sagar College of Engineering (DSCE)",
  resumeUrl: "resume.pdf",
  linkedinUrl: "https://www.linkedin.com/in/arun-kumar-meda-557b051b8",
  githubUrl: "https://github.com/arunkumarmeda27",
  avatarUrl: "https://unavatar.io/linkedin/arun-kumar-meda-557b051b8",
  avatarFallback: "https://avatars.githubusercontent.com/u/arunkumarmeda27",

  // ── Animated Typewriter Roles ──────────────────────────────
  roles: [
    "Front-End AI Engineering Intern",
    "Full-Stack Developer",
    "Open Source Contributor",
    "Problem Solver"
  ],

  // ── Mastered Technologies (Displayed on 3D Tech Globe) ─────
  masteredTech: [
    { name: "Python", icon: "fa-brands fa-python", color: "#3776ab", level: "Advanced" },
    { name: "JavaScript", icon: "fa-brands fa-js", color: "#f7df1e", level: "Advanced" },
    { name: "React", icon: "fa-brands fa-react", color: "#61dafb", level: "Advanced" },
    { name: "C++", icon: "fa-solid fa-code", color: "#00599c", level: "Proficient" },
    { name: "Node.js", icon: "fa-brands fa-node-js", color: "#68a063", level: "Proficient" },
    { name: "TypeScript", icon: "fa-brands fa-js", color: "#3178c6", level: "Proficient" },
    { name: "HTML5", icon: "fa-brands fa-html5", color: "#e34f26", level: "Advanced" },
    { name: "CSS3", icon: "fa-brands fa-css3-alt", color: "#1572b6", level: "Advanced" },
    { name: "Git", icon: "fa-brands fa-git-alt", color: "#f05032", level: "Advanced" },
    { name: "Docker", icon: "fa-brands fa-docker", color: "#2496ed", level: "Intermediate" },
    { name: "AWS", icon: "fa-brands fa-aws", color: "#ff9900", level: "Intermediate" },
    { name: "SQL", icon: "fa-solid fa-database", color: "#4479a1", level: "Proficient" },
    { name: "WordPress", icon: "fa-brands fa-wordpress", color: "#21759b", level: "Proficient" },
    { name: "Linux", icon: "fa-brands fa-linux", color: "#fcc624", level: "Proficient" }
  ],

  // ── Skills by Category ─────────────────────────────────────
  skills: [
    {
      category: "Languages",
      icon: "fa-solid fa-code",
      items: [
        { name: "Python", icon: "fa-brands fa-python", level: 90 },
        { name: "JavaScript (ES6+)", icon: "fa-brands fa-js", level: 92 },
        { name: "C / C++", icon: "fa-solid fa-code", level: 85 },
        { name: "HTML5 & CSS3", icon: "fa-brands fa-html5", level: 95 },
        { name: "SQL", icon: "fa-solid fa-database", level: 82 }
      ]
    },
    {
      category: "Frameworks & Libraries",
      icon: "fa-solid fa-layer-group",
      items: [
        { name: "React.js", icon: "fa-brands fa-react", level: 88 },
        { name: "Node.js & Express", icon: "fa-brands fa-node-js", level: 82 },
        { name: "Tailwind CSS", icon: "fa-solid fa-wind", level: 85 },
        { name: "WordPress Dev", icon: "fa-brands fa-wordpress", level: 86 }
      ]
    },
    {
      category: "Developer Tools & Cloud",
      icon: "fa-solid fa-screwdriver-wrench",
      items: [
        { name: "Git & GitHub", icon: "fa-brands fa-github", level: 94 },
        { name: "Docker", icon: "fa-brands fa-docker", level: 75 },
        { name: "AWS", icon: "fa-brands fa-aws", level: 72 },
        { name: "VS Code & Linux", icon: "fa-brands fa-linux", level: 88 }
      ]
    }
  ],

  // ── Internships ───────────────────────────────────────────
  internships: [
    {
      id: "internship-flyrank",
      role: "Front-End AI Engineering Intern",
      company: "FlyRank AI",
      companyUrl: "https://flyrank.ai",
      period: "June 2026 – Present",
      duration: "12 weeks",
      source: "Selected",
      points: [
        "Accepted into the FlyRank AI Internship program to design and build premium, high-performance web interfaces powered by AI.",
        "Collaborating on integrating artificial intelligence features into user-centric frontend experiences using React and modern JS.",
        "Utilizing modern frontend design patterns to build accessible, ultra-responsive, and high-performance web applications."
      ],
      tags: ["React", "JavaScript", "AI Integration", "Responsive UI"],
      actions: [
        { label: "View Offer Letter", icon: "fa-solid fa-file-contract", pages: ["flyrank_offer_letter.png"], title: "FlyRank AI — Internship Offer Letter" },
        { label: "View Poster", icon: "fa-solid fa-image", pages: ["flyrank_poster.png"], title: "FlyRank AI — Internship Joining Announcement" }
      ]
    },
    {
      id: "internship-inamigos",
      role: "Web Developer Intern",
      company: "InAmigos Foundation",
      companyUrl: "https://inamigosfoundation.org.in",
      period: "28 Jul – 10 Aug 2026",
      duration: "~2 weeks",
      source: "Via Internshala",
      points: [
        "Accepted the Web Developer internship position at InAmigos Foundation (Reg: U85300CT2020NPL010641) — a CSR-registered NGO — through Internshala.",
        "Collaborated with developers and leadership to architect and deploy web solutions supporting educational and social initiatives.",
        "Developed responsive web components and optimized UI interactions for cross-device compatibility."
      ],
      tags: ["Web Development", "JavaScript", "HTML/CSS", "Team Collaboration"],
      actions: [
        { label: "View Offer Letter (2 pages)", icon: "fa-solid fa-file-contract", pages: ["inamigos_offer_letter_p1.png", "inamigos_offer_letter_p2.png"], title: "InAmigos Foundation — Web Developer Intern Offer Letter" }
      ]
    },
    {
      id: "internship-gema",
      role: "WordPress Developer Intern",
      company: "GEMA Education Technology Pvt. Ltd.",
      companyUrl: "https://www.gemadubai.com",
      period: "July 2026 – Oct 2026",
      duration: "3 months",
      source: "Via Internshala",
      points: [
        "Recruited as a WordPress Developer Intern at GEMA Education Technology, a Dubai-based EdTech startup, through Internshala — selected from DSCE Bangalore.",
        "Designed, customized, and maintained production WordPress websites with custom themes and performance optimizations.",
        "Enhanced website load speed, mobile responsiveness, and overall user engagement across key global landing pages."
      ],
      tags: ["WordPress", "Theme Customization", "PHP", "Performance"],
      actions: [
        { label: "View Offer Letter (3 pages)", icon: "fa-solid fa-file-contract", pages: ["gema_offer_letter_p1.png", "gema_offer_letter_p2.png", "gema_offer_letter_p3.png"], title: "GEMA Education Technology — Offer Letter" },
        { label: "Selection Certificate", icon: "fa-solid fa-certificate", pages: ["gema_selection_letter.png"], title: "GEMA Education Technology — Certificate of Selection" }
      ]
    }
  ],

  // ── Certifications & Hackathons ───────────────────────────
  certifications: [
    {
      name: "National Hackathon Finalist Certificate - Tech For Agriculture",
      issuer: "Jain (Deemed-to-be University) & IBM / ACM",
      date: "January 2026",
      link: "agri_hackathon.png",
      isImage: true,
      badge: "Finalist"
    },
    {
      name: "Mastering C & C++ Programming: From Fundamentals to Advanced",
      issuer: "Udemy",
      date: "January 2025",
      link: "https://www.udemy.com/certificate/UC-ed8c0298-c52e-4052-bdeb-45d80e535036/",
      isImage: false,
      badge: "Certified"
    },
    {
      name: "Responsive Web Design Certification",
      issuer: "freeCodeCamp",
      date: "2026",
      link: "https://www.freecodecamp.org",
      isImage: false,
      badge: "Certified"
    }
  ],

  hackathons: [
    {
      name: "National Hackathon: Tech For Agriculture",
      project: "Team Alpha_Coders (Top 37 Finalist)",
      date: "January 2026",
      role: "Lead Developer",
      description: "Led Team Alpha_Coders in developing a smart tech solution for agriculture. Selected as a national finalist in the Top 37 teams out of hundreds of entries across India. Co-sponsored by IBM and ACM."
    },
    {
      name: "Code Contributions Challenge",
      project: "Interactive HTML/CSS Profile Card",
      date: "June 2026",
      role: "Contributor",
      description: "Contributed a custom, interactive HTML profile card to the first-contributions directory to demonstrate git and styling mastery."
    }
  ],

  // ── GitHub Repositories (Fallback if API is rate-limited) ───
  fallbackProjects: [
    {
      name: "FlyRank-AI-Interface",
      description: "AI-driven user experience interface developed with React, modern styling patterns, and dynamic query handling.",
      language: "JavaScript",
      stargazers_count: 12,
      forks_count: 3,
      html_url: "https://github.com/arunkumarmeda27"
    },
    {
      name: "Tech-For-Agriculture-Hackathon",
      description: "National Hackathon Top 37 Finalist project building data-driven smart agriculture tools for sustainable farming.",
      language: "Python",
      stargazers_count: 18,
      forks_count: 6,
      html_url: "https://github.com/arunkumarmeda27"
    },
    {
      name: "portfolio",
      description: "Personal interactive portfolio website featuring 3D tech globe, 3D flip card, and real-time GitHub integration.",
      language: "JavaScript",
      stargazers_count: 24,
      forks_count: 8,
      html_url: "https://github.com/arunkumarmeda27/portfolio"
    },
    {
      name: "C-Cpp-Algorithms-Mastery",
      description: "Comprehensive repository of advanced data structures, algorithms, and performance benchmarks implemented in C/C++.",
      language: "C++",
      stargazers_count: 15,
      forks_count: 4,
      html_url: "https://github.com/arunkumarmeda27"
    }
  ]
};

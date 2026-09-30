/**
 * Personal Portfolio Data Source
 * Demonstrates ES6+ Objects, Arrays, and modular structure
 */

const portfolioData = {
  personal: {
    name: "Deepika Goreti",
    role: "Computer Science & Engineering Student",
    
    department: "Department of Computer Science & Engineering",
    college: "Stanley College of Engineering & Technology for Women",
    affiliated: "Affiliated to Osmania University (A UGC Autonomous Institution)",
    location: "Hyderabad, Telangana, India",
    email: "deepika.cse@stanley.edu.in",
    phone: "+91 98765 43210",
    github: "https://github.com/deepika-dev",
    linkedin: "https://linkedin.com/in/deepika-cse",
    status: "Open to Software Developer Roles & Opportunities",
    bio: "I am Deepika Goreti, a Computer Science and Engineering student at Stanley College of Engineering and Technology for Women, affiliated with Osmania University, Hyderabad. I am passionate about software development, web technologies, and Artificial Intelligence. I enjoy learning new technologies and applying my skills to build practical projects and solve real-world problems."
  },

  stats: [
    { label: "Completed Projects", value: 2, suffix: "+" },
    { label: "Cumulative CGPA", value: 8.85, suffix: " / 10", isDecimal: true },
    { label: "Certifications", value: 6, suffix: "" },
    { label: "Code Commits", value: 350, suffix: "+" }
  ],

  skills: {
    html: [
      { name: "Semantic Tags & Document Layouts", level: 95, icon: "fa-brands fa-html5", color: "#e34f26" },
      { name: "HTML5 Forms & Input Controls", level: 92, icon: "fa-solid fa-rectangle-list", color: "#f97316" },
      { name: "Tables, Lists & Hyperlinks", level: 90, icon: "fa-solid fa-table-columns", color: "#0284c7" }
    ],
    css: [
      { name: "CSS3 Flexbox Layouts", level: 95, icon: "fa-solid fa-arrows-left-right", color: "#06b6d4" },
      { name: "CSS3 Grid Systems", level: 88, icon: "fa-solid fa-border-all", color: "#6366f1" }
    ],
    bootstrap: [
      { name: "Collapsible Navbar & Navigation Menus", level: 92, icon: "fa-solid fa-bars", color: "#6f42c1" },
      { name: "Cards, Badges, Buttons & Typography", level: 95, icon: "fa-solid fa-id-card", color: "#d946ef" },
      { name: "Modals, Floating Labels & UI Controls", level: 90, icon: "fa-solid fa-window-maximize", color: "#ec4899" }
    ],
    js: [
      { name: "ES6+ Variables (let/const) & Functions", level: 90, icon: "fa-brands fa-js", color: "#f7df1e" },
      { name: "Arrays, Objects & Control Flows", level: 88, icon: "fa-solid fa-code", color: "#eab308" },
      { name: "Event Listeners & Form Validation", level: 94, icon: "fa-solid fa-circle-check", color: "#059669" }
    ]
  },

  projects: [
    {
      id: "mental-health-platform",
      title: "Digital Mental Health Screening Platform",
      category: "ai",
      categoryName: "Interactive Assessment UI",
      shortDesc: "A responsive client-side mental health screening application with dynamic questionnaire logic, score calculation, and tailored feedback.",
      fullDesc: "A responsive client-side web application designed to facilitate early screening and assessment of mental wellbeing. Features interactive questionnaires built with HTML5 semantic forms, styled with Bootstrap 5 cards and progress bars, dynamic score calculation using JavaScript ES6+ arrow functions, and real-time DOM updates.",
      technologies: ["HTML5 Forms", "CSS3 Flexbox", "Bootstrap 5", "JavaScript ES6+", "DOM Manipulation", "Event Listeners"],
      features: [
        "Interactive psychometric questionnaire with dynamic ES6+ score calculation",
        "Real-time DOM event listeners updating wellness recommendation indicators",
        "Responsive, mobile-first interface styled with Bootstrap 5 cards and alerts",
        "Accessible client-side form validation with instant user guidance"
      ],
      image: "assets/images/project-1.svg",
      liveUrl: "https://deepika-dev.github.io/mental-health-screening",
      githubUrl: "https://github.com/deepika-dev/digital-mental-health-platform",
      badge: "Interactive UI Project"
    },
    {
      id: "campus-portal",
      title: "Smart Campus Portal",
      category: "web",
      categoryName: "Web & UI Application",
      shortDesc: "Comprehensive institutional web portal featuring dynamic attendance calculation, grade analytics, and announcements.",
      fullDesc: "An all-in-one web portal designed for educational institutions like Stanley College. Features role-based UI views, real-time timetable display, course attendance calculation with alerts for short attendance (<75%), and dynamic DOM manipulation for submitting student queries.",
      technologies: ["HTML5 Semantic", "CSS3 Custom Properties", "Bootstrap 5 Grid", "JavaScript ES6+", "DOM & Events", "Form Validation"],
      features: [
        "Interactive attendance threshold calculator powered by ES6+ functions",
        "Dynamic DOM manipulation displaying contextual notices and announcements",
        "Responsive student feedback form with real-time regex client-side validation",
        "Mobile-first responsive layout tested across multiple screen viewports"
      ],
      image: "assets/images/project-2.svg",
      liveUrl: "https://deepika-dev.github.io/smart-campus",
      githubUrl: "https://github.com/deepika-dev/smart-campus-portal",
      badge: "Campus Web App"
    }
  ],

  education: [
    {
      degree: "Bachelor of Technology in Computer Science & Engineering (B.Tech)",
      institution: "Stanley College of Engineering & Technology for Women",
      affiliation: "Autonomous Institution, Affiliated to Osmania University, Hyderabad",
      period: "2023 - 2027 (Expected)",
      score: "CGPA: 8.85 / 10.0 (Current)",
      details: "Relevant Coursework: Full Stack Web Development, Data Structures & Algorithms, Object-Oriented Programming (Java), Database Management Systems (DBMS), Operating Systems, Software Engineering."
    },
    {
      degree: "Telangana State Board of Intermediate Education (TSBIE - MPC)",
      institution: "Narayana Junior College, Hyderabad",
      affiliation: "Mathematics, Physics, Chemistry",
      period: "2021 - 2023",
      score: "Score: 96.2%",
      details: "Excelled in Mathematics and Sciences; developed strong analytical and logical reasoning skills."
    },
    {
      degree: "Senior Secondary School (CBSE)",
      institution: "Fortune Butterfly Senior Secondary School",
      affiliation: "Central Board of Secondary Education (CBSE)",
      period: "Completed 2021",
      score: "Distinction",
      details: "Strong academic foundation in Mathematics, Sciences, and Computer Applications."
    }
  ],

  certifications: [
    {
      title: "cloud with DevOps Automation",
      issuer: "Stanley College of Engineering & Technology for Women, Hyderabad",
      date: "April 2026",
      id: "AWS-CCP-983421",
      
    },
    {
      title: "Bootcamp on Internet of Things",
      issuer: "NIELIT Aurangabad",
      date: "sep 2025",
      id: "FSP/BCMP/NIELIT MS/FSP/IoT/NIELIT-A/BCMP08/2509/",
      
    },
    {
      title: "JavaScript (Intermediate) Certificate",
      issuer: "HackerRank",
      date: "July 2024",
      id: "HR-JS-55419",
      badge: "JavaScript"
    }
  ],

  
};

// Export to window for browser access
window.portfolioData = portfolioData;

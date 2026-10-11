export interface EducationItem {
  institution: string;
  location: string;
  degree: string;
  period: string;
  status?: string;
  badge?: string;
  equivalence?: string;
  highlights?: string[];
}

export interface ExperienceItem {
  company: string;
  location: string;
  role: string;
  period: string;
  badge?: string;
  descriptionBullets: string[];
  technologies: string[];
  repoUrl?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  period?: string;
  technologies: string[];
  description: string;
  impactMetrics?: string;
  repoUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  category: string;
  skills: string[];
  icon?: string;
}

export interface HonorAward {
  title: string;
  organization: string;
  year: string;
  ranking: string;
  icon: string;
}

export interface LeadershipItem {
  organization: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  icon?: string;
  imageUrl?: string;
  credentialUrl?: string;
}

export interface LanguageItem {
  language: string;
  proficiency: string;
  level: string;
}

export const resumeData = {
  personal: {
    name: "Zaidane Ayman",
    role: "Future AI / Software Engineer",
    subheading: "Dual Degree: École Centrale de Nantes & ENSAM Meknès",
    statusBadge: "Available May 2027",
    email: "aymanzaidanepro@gmail.com",
    phone: "+33 6 76 05 21 18",
    resumePdf: `${import.meta.env.BASE_URL}cv_fr_en.pdf`,
    location: "Nantes, France",
    linkedin: "https://www.linkedin.com/in/zaidane-ayman/",
    linkedinUsername: "zaidane-ayman",
    github: "https://github.com/eayzaid",
    githubUsername: "eayzaid",
    summary:
      "Computer Science engineering student pursuing a dual degree at École Centrale de Nantes in France, looking forward to learning new things each day while solving problems at the intersection of AI and Software.",
    internshipGoal: {
      duration: "16 WEEKS",
      startDate: "May 2027",
      targetDomain: "AI & Software Engineering",
      locations: "On-site across EU (particularly France)",
    },
  },

  stats: [
    { label: "Seeking Internship", value: "May 2027 (16 wks)", icon: "star" },
    { label: "Competitive Rank", value: "1st ENSAM / 15th Nat.", icon: "trophy" },
    { label: "Impact Raised", value: "$20,000+ Charité", icon: "heart" },
  ],

  education: [
    {
      institution: "École Centrale de Nantes",
      location: "Nantes, France",
      degree: "Master of Science in General Engineering (Diplôme d'Ingénieur)",
      period: "2026 – Expected Sept 2028",
      status: "In Progress",
      badge: "Dual Degree",
      highlights: [
        "Advanced engineering coursework covering Intelligent Systems, distributed computing, and data architecture.",
        "Preparation for top-tier European tech ecosystem and research.",
      ],
    },
    {
      institution: "École Nationale Supérieure d'Arts et Métiers – Meknès",
      location: "Meknes, Morocco",
      degree: "State Engineering Degree in Computer Science: Software Engineering & Intelligent Systems",
      period: "2022 – 2026",
      status: "Completed / In Progress",
      badge: "Grande École",
      equivalence: "Equivalent to a Master of Science in Engineering (M.Sc.)",
      highlights: [
        "Rigorous foundation in algorithmics, computer architectures, system design, and AI models.",
        "Led multiple high-impact university software deployments and student leadership initiatives.",
      ],
    },
  ] as EducationItem[],

  experience: [
    {
      company: "NT SHIELD",
      location: "Morocco",
      role: "AI Engineering Intern – Anomaly Detection for Open Banking",
      period: "Summer 2026",
      badge: "AI & Fintech",
      descriptionBullets: [
        "Engineered **AI-BIMAC**, a real-time **open banking** anomaly detection engine using an **Isolation Forest** model with **SHAP** explainability and decoupled **FastAPI** services orchestrated via **RabbitMQ** and **Airflow**.",
      ],
      technologies: ["Python", "FastAPI", "Scikit-Learn", "RabbitMQ", "Apache Airflow"],
    },
    {
      company: "OCP Group",
      location: "Morocco",
      role: "Software Engineering Intern – Full-Stack Development",
      period: "Summer 2025",
      badge: "Enterprise Full-Stack",
      repoUrl: "https://github.com/eayzaid/OCPInterns",
      descriptionBullets: [
        "Developed **OCPInterns**, an end-to-end **MERN** portal with **JWT**-secured **REST APIs**, analytical dashboards, automated **PDF** generation, and **QR code** credential verification.",
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB"],
    },
  ] as ExperienceItem[],

  projects: [
    {
      id: "agile-microservices",
      title: "Agile Workspace",
      subtitle: "Event-Driven Microservices Platform",
      period: "2026",
      technologies: ["Spring Boot", "Spring Cloud", "RabbitMQ", "PostgreSQL", "MongoDB", "React", "Docker", "Kubernetes"],
      description:
        "Architected an event-driven Agile platform with **Spring Cloud** and **RabbitMQ**, decoupling async workflows and optimizing team sprint capacity.",
      repoUrl: "https://github.com/eayzaid/Agile_Microservices",
      featured: true,
    },
    {
      id: "dokumind",
      title: "DokuMind",
      subtitle: "Intelligent Onboarding SaaS (RAG & Multi-Tenant)",
      period: "2025 - 2026",
      technologies: ["Spring Boot", "Python", "React", "LangChain", "Docker", "ChromaDB"],
      description:
        "Built a multi-tenant **RAG** SaaS using **LangChain** and **Spring Boot**, automating document indexing to deliver zero-code enterprise onboarding.",
      repoUrl: "https://github.com/eayzaid/DokuMind",
      featured: true,
    },
    {
      id: "egrading",
      title: "eGrading",
      subtitle: "Digital Examination Platform for ENSAM",
      period: "2024 - 2025",
      technologies: ["Spring Boot", "React", "TypeScript", "PostgreSQL", "MongoDB", "Docker"],
      description:
        "Built ENSAM's official testing platform via **Spring Boot** and **React**, scaling exam generation and automated grading across **1,000+ monthly exams**.",
      repoUrl: "https://github.com/eayzaid/eGrading",
      featured: true,
    },
    {
      id: "emotion-rec",
      title: "Facial Emotion Recognition",
      subtitle: "Deep Learning CNN with Transfer Learning",
      period: "2024",
      technologies: ["Python", "TensorFlow", "Mediapipe", "Optuna"],
      description:
        "Trained a **VGGNet**-inspired **CNN** on **FER-2013**, leveraging **Mediapipe** and **Optuna** to maximize weighted F1-score across 7 emotion classes.",
      repoUrl: "https://github.com/eayzaid/DL_facial_emotion_recognition",
      featured: true,
    },
    {
      id: "wassal",
      title: "WASSAL Platform",
      subtitle: "Operations & Volunteer Coordination System",
      period: "2023 - 2026",
      technologies: ["Spring Boot", "React", "TypeScript", "PostgreSQL", "Docker", "TailwindCSS"],
      description:
        "Engineered an operations and member management platform for **Caravane El Hayat** using **Spring Boot** and **React**, streamlining volunteer onboarding and field logistics.",
      repoUrl: "https://github.com/eayzaid/wassal",
      featured: false,
    },
  ] as ProjectItem[],

  skills: [
    {
      category: "AI & Machine Learning",
      skills: ["Scikit-Learn", "TensorFlow", "LangChain"],
    },
    {
      category: "Backend & Systems",
      skills: ["Spring Boot", "FastAPI", "Express", "Node.js", "RabbitMQ", "Apache Airflow"],
    },
    {
      category: "Frontend",
      skills: ["React", "TypeScript", "TailwindCSS", "HTML5/CSS3"],
    },
    {
      category: "Languages",
      skills: ["Java", "Python", "JavaScript", "Bash"],
    },
    {
      category: "Databases & Storage",
      skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "OracleDB"],
    },
    {
      category: "DevOps & Tools",
      skills: ["Docker", "K8s", "Git", "Linux", "Postman", "Vercel", "Netlify"],
    },
  ] as SkillCategory[],

  certifications: [
    {
      title: "Oracle Cloud Infrastructure Foundations Associate",
      issuer: "Oracle",
      icon: "star",
      imageUrl: `${import.meta.env.BASE_URL}certificates/OCI_founations_associate_certificatre.jpg`,
      credentialUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=CFA92E3FEE960CD6415BCFCEF5CD69406DDC741CB6D9B08E0B5831D475105AE6",
    },
    {
      title: "MongoDB Developer Path (Node.js)",
      issuer: "MongoDB",
      icon: "leaf",
      imageUrl: `${import.meta.env.BASE_URL}certificates/mongodb_nodejs_developer_path_certificatre_page.jpg`,
      credentialUrl: "https://learn.mongodb.com/c/GTy2W196QvG583foAzK8vg",
    },
    {
      title: "Linux Essentials Certificate",
      issuer: "Linux Professional Institute",
      icon: "tree",
      imageUrl: `${import.meta.env.BASE_URL}certificates/LPI_certificate.jpg`,
      credentialUrl: "https://www.credly.com/badges/f3f66f5c-b653-42d9-b298-481c24de6b87/linked_in_profile",
    },
  ] as CertificationItem[],

  honors: [
    {
      title: "Arts et Métiers Programming Contest",
      organization: "ENSAM",
      year: "2024",
      ranking: "1st at ENSAM · 15th Nationally",
      icon: "trophy",
    },
    {
      title: "CyberAI CTF",
      organization: "GadzIT Club",
      year: "2026",
      ranking: "2nd Place",
      icon: "star",
    },
  ] as HonorAward[],

  leadership: [
    {
      organization: "Caravane El Hayat (ENSAM Meknès Volunteer Committee)",
      role: "Social Media Lead & IT Lead",
      location: "Meknes, Morocco",
      period: "2023 – 2026",
      bullets: [
        "Engineered **WASSAL**, a full-stack coordination and operations management platform (**Spring Boot** + **React.js**) for committee teams.",
        "Directed multi-channel **media campaigns** over two years with a **15+ member team**, helping raise over **$20,000** for charitable initiatives.",
      ],
    },
    {
      organization: "GadzIT – Computer Science Club, ENSAM",
      role: "Head of Competitive Programming Division",
      location: "Meknes, Morocco",
      period: "2024 – 2025",
      bullets: [
        "Mentored **30+ students** in algorithms and data structure problem-solving, driving a **200%+ increase** in active member participation through structured weekly sessions.",
      ],
    },
  ] as LeadershipItem[],

  languages: [
    { language: "Arabic", proficiency: "Native", level: "Native proficiency" },
    { language: "English", proficiency: "Fluent", level: "Professional working proficiency" },
    { language: "French", proficiency: "Fluent", level: "Full professional proficiency" },
  ] as LanguageItem[],
};

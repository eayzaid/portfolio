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

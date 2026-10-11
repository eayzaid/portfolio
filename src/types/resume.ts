export interface EducationItem {
  institution: string;
  location: string;
  degree: string;
  period: string;
  badge?: string;
  equivalence?: string;
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
  repoUrl?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface HonorAward {
  title: string;
  organization: string;
  year: string;
  ranking: string;
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
  imageUrl?: string;
  credentialUrl?: string;
}

export interface LanguageItem {
  language: string;
  proficiency: string;
}

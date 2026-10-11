import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import enData from '../locales/en.json';
import frData from '../locales/fr.json';
import type { RadioStation } from '../components/RetroRadio';
import type {
  EducationItem,
  ExperienceItem,
  ProjectItem,
  SkillCategory,
  HonorAward,
  LeadershipItem,
  CertificationItem,
  LanguageItem,
} from '../types/resume';

export type Language = 'en' | 'fr';

export interface LocalizedResumeData {
  personal: {
    name: string;
    role: string;
    subheading: string;
    statusBadge: string;
    email: string;
    phone: string;
    resumePdf: string;
    location: string;
    linkedin: string;
    linkedinUsername: string;
    github: string;
    githubUsername: string;
    summary: string;
    internshipGoal: {
      duration: string;
      startDate: string;
      targetDomain: string;
      locations: string;
    };
  };
  stats: Array<{ label: string; value: string; icon: string }>;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillCategory[];
  certifications: CertificationItem[];
  honors: HonorAward[];
  leadership: LeadershipItem[];
  languages: LanguageItem[];
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (path: string, fallback?: string) => string;
  resumeData: LocalizedResumeData;
  stations: RadioStation[];
}

const translations: Record<Language, typeof enData> = {
  en: enData,
  fr: frData,
};

const withBase = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fp-lang') as Language | null;
      if (saved && (saved === 'en' || saved === 'fr')) {
        return saved;
      }
      const navLang = navigator.language?.toLowerCase() || '';
      if (navLang.startsWith('fr')) return 'fr';
    }
    return 'en';
  });

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem('fp-lang', language);
    } catch {
      // localStorage may fail in private mode
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'fr' : 'en'));
  };

  const currentDict = translations[language] || translations.en;

  const t = useMemo(() => {
    return (path: string, fallback?: string): string => {
      const keys = path.split('.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let current: any = currentDict;
      for (const k of keys) {
        if (current && typeof current === 'object' && k in current) {
          current = current[k];
        } else {
          // Fallback to English dictionary if key missing
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let fallbackCurrent: any = translations.en;
          for (const fbKey of keys) {
            if (fallbackCurrent && typeof fallbackCurrent === 'object' && fbKey in fallbackCurrent) {
              fallbackCurrent = fallbackCurrent[fbKey];
            } else {
              return fallback || path;
            }
          }
          return typeof fallbackCurrent === 'string' ? fallbackCurrent : fallback || path;
        }
      }
      return typeof current === 'string' ? current : fallback || path;
    };
  }, [currentDict]);

  const resumeData = useMemo<LocalizedResumeData>(() => {
    const raw = currentDict.resumeData || translations.en.resumeData;
    return {
      personal: {
        ...raw.personal,
        resumePdf: withBase(raw.personal.resumePdf),
      },
      stats: raw.stats,
      education: raw.education,
      experience: raw.experience,
      projects: raw.projects,
      skills: raw.skills,
      certifications: raw.certifications.map((cert) => ({
        ...cert,
        imageUrl: cert.imageUrl ? withBase(cert.imageUrl) : undefined,
      })),
      honors: raw.honors,
      leadership: raw.leadership,
      languages: raw.languages,
    };
  }, [currentDict]);

  const stations = useMemo<RadioStation[]>(() => {
    const s = currentDict.stations || translations.en.stations;
    return [
      {
        id: 'about',
        name: s.about.name,
        preset: 1,
        freq: '88.5',
        mhz: 88.5,
        tagline: s.about.tagline,
        badge: s.about.badge,
      },
      {
        id: 'experience',
        name: s.experience.name,
        preset: 2,
        freq: '92.3',
        mhz: 92.3,
        tagline: s.experience.tagline,
        badge: s.experience.badge,
      },
      {
        id: 'education',
        name: s.education.name,
        preset: 3,
        freq: '96.5',
        mhz: 96.5,
        tagline: s.education.tagline,
        badge: s.education.badge,
      },
      {
        id: 'projects',
        name: s.projects.name,
        preset: 4,
        freq: '101.1',
        mhz: 101.1,
        tagline: s.projects.tagline,
        badge: s.projects.badge,
      },
      {
        id: 'skills',
        name: s.skills.name,
        preset: 5,
        freq: '104.7',
        mhz: 104.7,
        tagline: s.skills.tagline,
        badge: s.skills.badge,
      },
      {
        id: 'honors',
        name: s.honors.name,
        preset: 6,
        freq: '107.9',
        mhz: 107.9,
        tagline: s.honors.tagline,
        badge: s.honors.badge,
      },
    ];
  }, [currentDict]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
      resumeData,
      stations,
    }),
    [language, t, resumeData, stations]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

// oxlint-disable-next-line react/only-export-components
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

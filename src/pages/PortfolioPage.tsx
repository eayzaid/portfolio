import { useState, lazy, Suspense } from 'react';
import { RetroRadio, type RadioStationId } from '../components/RetroRadio';
import { HeroSection } from '../components/HeroSection';
import { PixelIcon } from '../components/PixelIcon';
import { useLanguage } from '../context/LanguageContext';

const ExperienceSection = lazy(() => import('../components/ExperienceSection').then((m) => ({ default: m.ExperienceSection })));
const EducationSection = lazy(() => import('../components/EducationSection').then((m) => ({ default: m.EducationSection })));
const ProjectsSection = lazy(() => import('../components/ProjectsSection').then((m) => ({ default: m.ProjectsSection })));
const SkillsSection = lazy(() => import('../components/SkillsSection').then((m) => ({ default: m.SkillsSection })));
const HonorsCertificationsSection = lazy(() => import('../components/HonorsCertificationsSection').then((m) => ({ default: m.HonorsCertificationsSection })));

function StationFallback() {
  const { t } = useLanguage();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        textAlign: 'center',
        fontFamily: 'var(--fp-font-mono, "JetBrains Mono", monospace)',
      }}
    >
      <div
        style={{
          fontSize: '13px',
          color: 'var(--fp-accent)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontWeight: 600,
          marginBottom: '8px',
        }}
      >
        {t('radio.tuningStation', 'TUNING STATION FREQUENCY...')}
      </div>
      <div style={{ fontSize: '11px', color: 'var(--fp-muted)' }}>
        [ ░▒▓▒░▒▓▒░ ]
      </div>
    </div>
  );
}

type SectionTab = RadioStationId;

export function PortfolioPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<SectionTab>('about');

  const handleStationChange = (stationId: SectionTab) => {
    setActiveTab(stationId);
  };

  return (
    <>
      {/* 1. Dashboard Radio Tuner (6 Stations) */}
      <div style={{ marginTop: '20px' }}>
        <RetroRadio
          activeStation={activeTab}
          onStationChange={handleStationChange}
        />
      </div>

      {/* 2. Main Dynamic Section: Selected station replaces the About card */}
      <main style={{ marginTop: '24px' }}>
        <div id="main-active-card">
          {activeTab === 'about' && <HeroSection />}

          {activeTab !== 'about' && (
            <section
              className="fp-panel fp-gridpaper"
              id="active-station-panel"
              style={{
                marginTop: '24px',
                position: 'relative',
                width: '100%',
                boxSizing: 'border-box',
                backgroundColor: 'var(--fp-surface)',
              }}
            >
              {/* Station Views (Lazy Loaded on Demand) */}
              <Suspense fallback={<StationFallback />}>
                {activeTab === 'experience' && <ExperienceSection />}
                {activeTab === 'education' && <EducationSection />}
                {activeTab === 'projects' && <ProjectsSection />}
                {activeTab === 'skills' && <SkillsSection />}
                {activeTab === 'honors' && <HonorsCertificationsSection />}
              </Suspense>
            </section>
          )}
        </div>

        {/* 4. Return to Top Button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '36px 0 24px 0',
          }}
        >
          <button
            type="button"
            className="fp-btn fp-btn--primary"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              padding: '12px 28px',
              fontSize: '13px',
              fontFamily: 'var(--fp-font-mono, "JetBrains Mono", monospace)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
            }}
            aria-label="Scroll all the way to top of page"
          >
            <PixelIcon name="arrowUp" size={16} />
            <span>{t('radio.scrollToTop', 'Scroll To Top')}</span>
            <span style={{ fontSize: '11px', opacity: 0.85 }}>[ ▲ ]</span>
          </button>
        </div>
      </main>
    </>
  );
}

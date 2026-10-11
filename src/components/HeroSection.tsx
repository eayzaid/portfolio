import React, { useState } from 'react';
import { PixelIcon } from './PixelIcon';
import { NantesTimeBox } from './NantesTimeBox';
import { TrueGitHubLogo, TrueLinkedInLogo, TrueEmailLogo, TruePhoneLogo } from './TrueLogos';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/8bit/select';
import { useLanguage } from '../context/LanguageContext';

export const HeroSection: React.FC = () => {
  const { resumeData, t, language } = useLanguage();
  const [avatarMode, setAvatarMode] = useState<'8bit' | 'real'>('8bit');

  return (
    <section className="fp-panel fp-gridpaper" id="hero" style={{ marginTop: '24px', position: 'relative', width: '100%', boxSizing: 'border-box' }}>
      {/* 1. Top Header Row: Status Badge on Top-Left & Nantes Datebox on Top-Right (always in top right even on phone) */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          gap: '12px',
          marginBottom: '24px',
          flexWrap: 'wrap',
        }}
      >
        <span
          className="fp-badge fp-badge--ok"
          style={{
            height: 'fit-content',
            padding: '6px 12px',
            fontSize: '12px',
            flexShrink: 0,
            boxShadow: '2px 2px 0 var(--fp-shadow)',
          }}
        >
          <span className="fp-led" style={{ background: 'currentColor', marginRight: '6px' }} />
          {resumeData.personal.statusBadge}
        </span>

        {/* Nantes Datebox always on the top right, sharing right margin */}
        <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
          <NantesTimeBox size="lg" />
        </div>
      </div>

      {/* 2. Main Body Grid: Left is Centered Name, Description, Specs; Right is Profile Picture & Contact Buttons */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '32px',
          alignItems: 'center',
        }}
      >
        {/* Left Column: Name, Role, Description, and Internship Specs (Left-aligned) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
              fontWeight: 700,
              letterSpacing: '-.03em',
              lineHeight: 1.05,
              margin: '0 0 10px 0',
              textAlign: 'left',
            }}
          >
            {resumeData.personal.name}
          </h1>

          <div
            className="fp-mono"
            style={{
              fontSize: '15px',
              fontWeight: 600,
              color: 'var(--fp-primary)',
              marginBottom: '16px',
              letterSpacing: '.02em',
              textAlign: 'left',
            }}
          >
            {resumeData.personal.role}
          </div>

          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: 'var(--fp-text)',
              marginBottom: '20px',
              maxWidth: '580px',
              textAlign: 'left',
              margin: '0 0 20px 0',
            }}
          >
            {language === 'fr' ? (
              <>
                <strong>Élève-ingénieur en informatique</strong> en double diplôme à l'
                <strong>École Centrale de Nantes</strong> en <strong>France</strong>, passionné par la{' '}
                <em><strong>résolution de problèmes concrets</strong></em> à l'intersection de l'
                <strong style={{ color: 'var(--fp-primary)' }}>IA</strong> et du{' '}
                <strong style={{ color: 'var(--fp-primary)' }}>Génie Logiciel</strong>.
              </>
            ) : (
              <>
                <strong>Computer Science engineering student</strong> pursuing a dual degree at{' '}
                <strong>École Centrale de Nantes</strong> in <strong>France</strong>, looking forward to{' '}
                <em><strong>learning new things each day</strong></em> while solving problems at the intersection of{' '}
                <strong style={{ color: 'var(--fp-primary)' }}>AI</strong> and{' '}
                <strong style={{ color: 'var(--fp-primary)' }}>Software</strong>.
              </>
            )}
          </p>

          {/* Quick Target Specs with DURATION: 16 WEEKS */}
          <div
            style={{
              background: 'var(--fp-surface-2)',
              border: '2px solid var(--fp-border)',
              padding: '14px 18px',
              width: '100%',
              maxWidth: '520px',
              boxSizing: 'border-box',
              margin: 0,
            }}
          >
            <div className="fp-label" style={{ marginBottom: '8px' }}>
              <span>{t('hero.specsTitle', 'Internship Specifications')}</span>
            </div>
            <div style={{ fontSize: '13px', lineHeight: 1.6, display: 'grid', gap: '4px', textAlign: 'left' }}>
              <div><strong>{t('hero.durationLabel', 'DURATION:')}</strong> {resumeData.personal.internshipGoal.duration}</div>
              <div><strong>{t('hero.startLabel', 'TARGET START:')}</strong> {resumeData.personal.internshipGoal.startDate}</div>
              <div><strong>{t('hero.focusLabel', 'FOCUS:')}</strong> {resumeData.personal.internshipGoal.targetDomain}</div>
              <div><strong>{t('hero.mobilityLabel', 'MOBILITY:')}</strong> {resumeData.personal.internshipGoal.locations}</div>
            </div>
          </div>

          {/* Action Row: Download Resume */}
          <div style={{ marginTop: '16px' }}>
            <a
              href={resumeData.personal.resumePdf}
              download="Zaidane_Ayman_CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="fp-btn fp-btn--primary"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                fontWeight: 700,
              }}
              title="Download Zaidane Ayman's Resume (PDF)"
            >
              <PixelIcon name="download" size={14} />
              <span>{t('hero.downloadResume', 'Download My Resume')}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Profile Picture & Contact Boxes (Centered on mobile, right on desktop) */}
        <div className="fp-hero-portrait-col">
          {/* Profile Picture Frame */}
          <div
            style={{
              width: '100%',
              border: '2px solid var(--fp-border)',
              background: 'var(--fp-surface)',
              boxShadow: '6px 6px 0 var(--fp-shadow)',
              overflow: 'hidden',
              position: 'relative',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '6px 10px',
                borderBottom: '2px solid var(--fp-border)',
                background: 'var(--fp-surface-2)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '11px',
                fontWeight: 600,
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="fp-led" style={{ flexShrink: 0 }} />
                <Select value={avatarMode} onValueChange={(val) => setAvatarMode(val as '8bit' | 'real')}>
                  <SelectTrigger aria-label="Select avatar mode" style={{ minWidth: '136px' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8bit">{t('hero.toggle8bit', '8-bit Portrait').toUpperCase()}</SelectItem>
                    <SelectItem value="real">{t('hero.toggleReal', 'Real Photo').toUpperCase()}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1824 / 2346',
                maxHeight: '420px',
                overflow: 'hidden',
                background: '#171a1c',
                cursor: 'pointer',
              }}
              onClick={() => setAvatarMode((prev) => (prev === '8bit' ? 'real' : '8bit'))}
              title="Click to toggle avatar (8-Bit / Real Photo)"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setAvatarMode((prev) => (prev === '8bit' ? 'real' : '8bit'));
                }
              }}
              aria-label={`Current avatar: ${avatarMode === '8bit' ? '8-Bit Avatar' : 'Real Photo'}. Press Enter to toggle.`}
            >
              {/* Slide 1: 8-Bit Avatar */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  transform: avatarMode === '8bit' ? 'translateY(0%)' : 'translateY(-100%)',
                  transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                  willChange: 'transform',
                }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}art/my_profile_8bit_picture.jpeg`}
                  alt="8-bit Profile Portrait of Zaidane Ayman"
                  fetchPriority="high"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    imageRendering: 'pixelated',
                    display: 'block',
                  }}
                />
              </div>

              {/* Slide 2: Real Photo */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  transform: avatarMode === 'real' ? 'translateY(0%)' : 'translateY(100%)',
                  transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                  willChange: 'transform',
                }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}art/my_profile_picture.jpeg`}
                  alt="Real Portrait Photo of Zaidane Ayman"
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                  }}
                />
              </div>
            </div>

          </div>

          <div
            className="fp-dither"
            style={{ height: '6px', width: '100%' }}
            aria-hidden="true"
          />

          {/* Contact Boxes (Centered on mobile, bottom right on desktop) */}
          <div className="fp-hero-contact-row">
            <a
              href={resumeData.personal.github}
              target="_blank"
              rel="noreferrer"
              className="fp-btn fp-btn--icon"
              aria-label="GitHub Profile"
              title="GitHub Profile"
              style={{ width: '42px', height: '42px' }}
            >
              <TrueGitHubLogo size={20} />
            </a>

            <a
              href={resumeData.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="fp-btn fp-btn--icon"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
              style={{ width: '42px', height: '42px' }}
            >
              <TrueLinkedInLogo size={20} />
            </a>

            <a
              href={`mailto:${resumeData.personal.email}`}
              className="fp-btn fp-btn--icon"
              aria-label={`Email ${resumeData.personal.email}`}
              title={`Send Email (${resumeData.personal.email})`}
              style={{ width: '42px', height: '42px' }}
            >
              <TrueEmailLogo size={20} />
            </a>

            <a
              href={`tel:${resumeData.personal.phone.replace(/\s+/g, '')}`}
              className="fp-btn fp-btn--icon"
              aria-label={`Call ${resumeData.personal.phone}`}
              title={`Call (${resumeData.personal.phone})`}
              style={{ width: '42px', height: '42px' }}
            >
              <TruePhoneLogo size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

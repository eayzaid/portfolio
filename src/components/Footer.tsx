import React from 'react';
import { PixelIcon } from './PixelIcon';
import { TrueGitHubLogo, TrueLinkedInLogo, TrueEmailLogo, TruePhoneLogo } from './TrueLogos';
import { resumeData } from '../data/resumeData';

export const Footer: React.FC = () => {
  return (
    <footer
      className="fp-card"
      style={{
        marginTop: '48px',
        padding: '24px',
        background: 'var(--fp-surface)',
        marginBottom: '24px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '18px' }}>
            <PixelIcon name="tree" size={18} />
            <span>{resumeData.personal.name}</span>
          </div>
          <div className="fp-mono" style={{ fontSize: '12px', color: 'var(--fp-muted)', marginTop: '4px' }}>
            {resumeData.personal.role} • {resumeData.personal.location}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a
            href={resumeData.personal.resumePdf}
            download="Zaidane_Ayman_CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="fp-btn fp-btn--sm fp-btn--primary"
            title="Download Zaidane Ayman's Resume (PDF)"
          >
            <PixelIcon name="download" size={14} style={{ marginRight: '6px' }} />
            Download Resume
          </a>
          <a
            href={`mailto:${resumeData.personal.email}`}
            className="fp-btn fp-btn--sm"
          >
            <TrueEmailLogo size={14} style={{ marginRight: '6px' }} />
            {resumeData.personal.email}
          </a>
          <a
            href={`tel:${resumeData.personal.phone.replace(/\s+/g, '')}`}
            className="fp-btn fp-btn--sm"
          >
            <TruePhoneLogo size={14} style={{ marginRight: '6px' }} />
            {resumeData.personal.phone}
          </a>
          <a
            href={resumeData.personal.github}
            target="_blank"
            rel="noreferrer"
            className="fp-btn fp-btn--sm"
          >
            <TrueGitHubLogo size={14} style={{ marginRight: '6px' }} />
            GitHub
          </a>
          <a
            href={resumeData.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="fp-btn fp-btn--sm"
          >
            <TrueLinkedInLogo size={14} style={{ marginRight: '6px' }} />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

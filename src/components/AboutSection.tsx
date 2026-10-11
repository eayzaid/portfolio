import React from 'react';
import { PixelIcon } from './PixelIcon';
import { NantesTimeBox } from './NantesTimeBox';
import { TrueOracleLogo, TrueMongoDBLogo, TrueLinuxLogo } from './TrueLogos';
import { resumeData } from '../data/resumeData';

const renderCertLogo = (issuer: string, size = 16) => {
  const norm = issuer.toLowerCase();
  if (norm.includes('oracle')) {
    return <TrueOracleLogo size={size} style={{ color: '#F80000' }} />;
  }
  if (norm.includes('mongodb')) {
    return <TrueMongoDBLogo size={size} style={{ color: '#47A248' }} />;
  }
  if (norm.includes('linux')) {
    return <TrueLinuxLogo size={size} />;
  }
  return <PixelIcon name="star" size={size} />;
};

export const AboutSection: React.FC = () => {
  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      {/* Primary About Card with Nantes Locale & Live Paris Time in Top-Right Corner */}
      <div className="fp-card" style={{ position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '16px',
            borderBottom: '2px solid var(--fp-border)',
            paddingBottom: '14px',
          }}
        >
          <div>
            <div className="fp-label" style={{ marginBottom: '6px' }}>
              <span>Engineering Profile &amp; Location</span>
            </div>
            <h2 style={{ margin: 0, fontSize: '24px' }}>{resumeData.personal.name}</h2>
            <div className="fp-mono" style={{ fontSize: '13px', color: 'var(--fp-primary)', fontWeight: 600 }}>
              {resumeData.personal.role}
            </div>
          </div>

          {/* Top-Right Corner Box: Nantes Locale & Live Paris Time */}
          <NantesTimeBox />
        </div>

        <p style={{ fontSize: '15px', lineHeight: 1.6, margin: '0 0 16px 0', color: 'var(--fp-text)' }}>
          <strong>Computer Science engineering student</strong> pursuing a dual degree at{' '}
          <strong>École Centrale de Nantes</strong> in <strong>France</strong>, looking forward to{' '}
          <em><strong>learning new things each day</strong></em> while solving problems at the intersection of{' '}
          <strong style={{ color: 'var(--fp-primary)' }}>AI</strong> and{' '}
          <strong style={{ color: 'var(--fp-primary)' }}>Software</strong>.
        </p>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <span className="fp-badge fp-badge--ok">
            <PixelIcon name="check" size={12} />
            Available May 2027
          </span>
          <span className="fp-badge">
            <PixelIcon name="pin" size={12} />
            Based in {resumeData.personal.location}
          </span>
          <span className="fp-badge">
            <PixelIcon name="star" size={12} />
            AI &amp; Software Engineering
          </span>
        </div>
      </div>

      {/* Grid: Languages & Certifications + Honors & Leadership */}
      <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
        {/* Languages & Certifications */}
        <div className="fp-card">
          <div className="fp-label" style={{ marginBottom: '12px' }}>
            <span>Languages &amp; Certifications</span>
          </div>

          <h3 style={{ marginBottom: '16px' }}>Spoken Languages</h3>
          <div style={{ display: 'grid', gap: '10px', marginBottom: '24px' }}>
            {resumeData.languages.map((lang, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 12px',
                  border: '2px solid var(--fp-border)',
                  background: 'var(--fp-surface-2)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                  <PixelIcon name="check" size={12} />
                  <span>{lang.language}</span>
                </div>
                <span className="fp-badge fp-badge--ok">{lang.proficiency}</span>
              </div>
            ))}
          </div>

          <h3 style={{ marginBottom: '16px' }}>Industry Certifications</h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            {resumeData.certifications.map((cert, idx) => (
              <div
                key={idx}
                style={{
                  padding: '10px 14px',
                  border: '2px solid var(--fp-border)',
                  background: 'var(--fp-surface)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                    <span>{cert.title}</span>
                  </div>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="fp-btn fp-btn--sm"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '10px',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {renderCertLogo(cert.issuer, 12)}
                      <span>Check Certificate</span>
                    </a>
                  )}
                </div>
                <div className="fp-mono" style={{ fontSize: '12px', color: 'var(--fp-muted)' }}>
                  Issuer: {cert.issuer}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Honors, Awards & Community Leadership */}
        <div className="fp-card">
          <div className="fp-label" style={{ marginBottom: '12px' }}>
            <span>Honors &amp; Leadership</span>
          </div>

          <h3 style={{ marginBottom: '16px' }}>Competitive Programming &amp; CTF</h3>
          <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
            {resumeData.honors.map((honor, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px',
                  border: '2px solid var(--fp-border)',
                  background: 'var(--fp-surface-2)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{honor.title}</div>
                    <div className="fp-mono" style={{ fontSize: '12px', color: 'var(--fp-muted)' }}>
                      {honor.organization}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    <span className="fp-badge fp-badge--warn">
                      {honor.ranking}
                    </span>
                    <span className="fp-badge fp-badge--ok">
                      {honor.year}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 style={{ marginBottom: '16px' }}>Community Leadership</h3>
          <div style={{ display: 'grid', gap: '14px' }}>
            {resumeData.leadership.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '14px',
                  border: '2px solid var(--fp-border)',
                  background: 'var(--fp-surface)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '6px' }}>
                  <div style={{ fontWeight: 700, fontSize: '15px', lineHeight: 1.3, flex: 1, minWidth: 0 }}>{item.organization}</div>
                  <div className="fp-mono" style={{ fontSize: '11px', color: 'var(--fp-muted)', flexShrink: 0, whiteSpace: 'nowrap' }}>
                    {item.period}
                  </div>
                </div>
                <div className="fp-mono" style={{ fontSize: '12px', color: 'var(--fp-primary)', fontWeight: 600, marginBottom: '8px' }}>
                  {item.role} • {item.location}
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', lineHeight: 1.5 }}>
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} style={{ marginBottom: '4px' }}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

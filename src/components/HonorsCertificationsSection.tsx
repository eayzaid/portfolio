import React, { useState } from 'react';
import { PixelIcon } from './PixelIcon';
import { TrueOracleLogo, TrueMongoDBLogo, TrueLinuxLogo } from './TrueLogos';
import { useLanguage } from '../context/LanguageContext';
import { formatEmphasizedText } from '../utils/formatText';

const renderCertLogo = (issuer: string, size = 18) => {
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

export const HonorsCertificationsSection: React.FC = () => {
  const { resumeData, t } = useLanguage();
  const [selectedCert, setSelectedCert] = useState<{ title: string; imageUrl: string } | null>(null);

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      {/* 1. Honors, Awards & Competitive Programming */}
      <div>
        <div className="fp-label" style={{ marginBottom: '12px' }}>
          <span>{t('sections.honorsTitle', 'Honors & Competitive Programming')}</span>
        </div>

        <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))' }}>
          {resumeData.honors.map((honor, idx) => (
            <div
              key={idx}
              className="fp-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '16px',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '17px', lineHeight: 1.3, flex: 1, minWidth: 0 }}>{honor.title}</h3>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    <span className="fp-badge fp-badge--warn" style={{ fontSize: '10px', whiteSpace: 'nowrap' }}>
                      {honor.ranking}
                    </span>
                    <span className="fp-badge fp-badge--ok" style={{ fontSize: '10px', whiteSpace: 'nowrap' }}>
                      {honor.year}
                    </span>
                  </div>
                </div>
                <div className="fp-mono" style={{ fontSize: '12px', color: 'var(--fp-muted)' }}>
                  {honor.organization}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Industry Certifications */}
      <div>
        <div className="fp-label" style={{ marginBottom: '12px' }}>
          <span>{t('sections.certificationsTitle', 'Industry Certifications')}</span>
        </div>

        <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' }}>
          {resumeData.certifications.map((cert, idx) => (
            <div
              key={idx}
              className="fp-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '14px',
                background: 'var(--fp-surface)',
              }}
            >
              <div>
                {cert.imageUrl && (
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '11 / 8.5',
                      overflow: 'hidden',
                      border: '2px solid var(--fp-border)',
                      marginBottom: '12px',
                      backgroundColor: '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={() =>
                      setSelectedCert({
                        title: cert.title,
                        imageUrl: cert.imageUrl!,
                      })
                    }
                    title={t('sections.clickToViewCert', 'Click to view full certificate')}
                  >
                    <img
                      src={cert.imageUrl}
                      alt={`${cert.title} Certificate`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}

                <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', lineHeight: 1.35 }}>
                  {cert.title}
                </h4>
                <div
                  className="fp-mono"
                  style={{
                    fontSize: '11px',
                    color: 'var(--fp-primary)',
                    fontWeight: 600,
                    marginBottom: '10px',
                  }}
                >
                  {t('sections.issuer', 'Issuer:')} {cert.issuer}
                </div>
              </div>

              {cert.credentialUrl && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: 'auto',
                    paddingTop: '10px',
                    borderTop: '1px dashed var(--fp-border)',
                  }}
                >
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="fp-btn fp-btn--sm"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '11px',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                    }}
                    title={`Check ${cert.title} credential verification`}
                  >
                    {renderCertLogo(cert.issuer, 14)}
                    <span>{t('sections.verifyCredential', 'Check Certificate')}</span>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Community Leadership & Volunteering */}
      <div>
        <div className="fp-label" style={{ marginBottom: '12px' }}>
          <span>{t('sections.communityTitle', 'Community Leadership & Initiatives')}</span>
        </div>

        <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))' }}>
          {resumeData.leadership.map((item, idx) => (
            <div
              key={idx}
              className="fp-card"
              style={{ padding: '18px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '6px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', lineHeight: 1.3, flex: 1, minWidth: 0 }}>{item.organization}</h3>
                <span className="fp-badge fp-badge--ok" style={{ fontSize: '10px', flexShrink: 0, whiteSpace: 'nowrap' }}>
                  {item.period}
                </span>
              </div>

              <div className="fp-mono" style={{ fontSize: '12px', color: 'var(--fp-primary)', fontWeight: 600, marginBottom: '12px' }}>
                {item.role} • {item.location}
              </div>

              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', lineHeight: 1.6 }}>
                {item.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} style={{ marginBottom: '6px' }}>
                    {formatEmphasizedText(bullet)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Spoken Languages */}
      <div>
        <div className="fp-label" style={{ marginBottom: '12px' }}>
          <span>{t('sections.languagesTitle', 'Spoken Languages')}</span>
        </div>

        <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))' }}>
          {resumeData.languages.map((lang, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 14px',
                border: '2px solid var(--fp-border)',
                background: 'var(--fp-surface-2)',
              }}
            >
              <span style={{ fontWeight: 700, fontSize: '13px' }}>{lang.language}</span>
              <span className="fp-badge fp-badge--ok" style={{ fontSize: '10px' }}>{lang.proficiency}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Image Lightbox Modal */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedCert(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.82)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 9999,
            padding: '20px',
            cursor: 'zoom-out',
          }}
        >
          <div
            style={{
              maxWidth: '92vw',
              maxHeight: '92vh',
              background: 'var(--fp-surface)',
              border: '3px solid var(--fp-border)',
              boxShadow: '6px 6px 0 var(--fp-shadow)',
              padding: '16px',
              position: 'relative',
              cursor: 'default',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px',
                borderBottom: '2px solid var(--fp-border)',
                paddingBottom: '8px',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '15px' }}>{selectedCert.title}</h3>
              <button
                type="button"
                className="fp-btn fp-btn--sm"
                onClick={() => setSelectedCert(null)}
              >
                ✕ {t('sections.closeModal', 'Close')}
              </button>
            </div>
            <img
              src={selectedCert.imageUrl}
              alt={selectedCert.title}
              decoding="async"
              style={{
                maxWidth: '100%',
                maxHeight: 'calc(80vh - 60px)',
                objectFit: 'contain',
                display: 'block',
                border: '1px solid var(--fp-border)',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

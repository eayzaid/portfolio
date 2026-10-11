import React from 'react';
import { TrueGitHubLogo } from './TrueLogos';
import { useLanguage } from '../context/LanguageContext';
import { formatEmphasizedText } from '../utils/formatText';

export const ExperienceSection: React.FC = () => {
  const { resumeData, t } = useLanguage();

  return (
    <div style={{ display: 'grid', gap: '32px' }}>
      <div>
        <div className="fp-label" style={{ marginBottom: '14px' }}>
          <span>{t('sections.experienceTitle', 'Professional Experience')}</span>
        </div>
        <div style={{ display: 'grid', gap: '20px' }}>
          {resumeData.experience.map((exp, idx) => (
            <div key={idx} className="fp-card" style={{ padding: '22px 24px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '12px',
                  marginBottom: '6px',
                }}
              >
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, flex: 1, minWidth: 0 }}>{exp.company}</h3>
                <div className="fp-mono" style={{ fontSize: '12px', fontWeight: 600, flexShrink: 0, whiteSpace: 'nowrap' }}>
                  {exp.period} • {exp.location}
                </div>
              </div>

              <div
                className="fp-mono"
                style={{
                  fontSize: '13px',
                  color: 'var(--fp-primary)',
                  fontWeight: 600,
                  marginBottom: '14px',
                }}
              >
                {exp.role}
              </div>

              {/* Detailed Experience Bullet Points with Resume Emphasis */}
              <ul style={{ margin: '0 0 16px 0', paddingLeft: '20px', lineHeight: 1.65 }}>
                {exp.descriptionBullets.map((bullet, bIdx) => (
                  <li key={bIdx} style={{ marginBottom: '8px', color: 'var(--fp-text)' }}>
                    {formatEmphasizedText(bullet)}
                  </li>
                ))}
              </ul>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                  marginTop: '12px',
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {exp.technologies.map((tech, tIdx) => (
                    <span key={tIdx} className="fp-badge" style={{ fontSize: '10px' }}>
                      {tech}
                    </span>
                  ))}
                </div>

                {exp.repoUrl && (
                  <a
                    href={exp.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="fp-btn fp-btn--sm fp-btn--accent"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '11px',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                    }}
                    title={`Visit ${exp.company} repository on GitHub`}
                  >
                    <TrueGitHubLogo size={14} />
                    <span>{t('sections.viewCode', 'Visit GitHub')}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

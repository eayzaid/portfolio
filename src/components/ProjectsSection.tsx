import React, { useState } from 'react';
import { TrueGitHubLogo } from './TrueLogos';
import { resumeData } from '../data/resumeData';
import { formatEmphasizedText } from '../utils/formatText';

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'ai' | 'fullstack'>('all');

  const filteredProjects = resumeData.projects.filter((p) => {
    if (filter === 'ai') {
      return (
        p.technologies.includes('LangChain') ||
        p.technologies.includes('TensorFlow') ||
        p.technologies.includes('Mediapipe')
      );
    }
    if (filter === 'fullstack') {
      return (
        p.technologies.includes('Spring Boot') ||
        p.technologies.includes('React.js') ||
        p.technologies.includes('React') ||
        p.technologies.includes('PostgreSQL')
      );
    }
    return true;
  });

  return (
    <div>
      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <div className="fp-label">
          <span>Featured Engineering Projects</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            className={`fp-btn fp-btn--sm ${filter === 'all' ? 'fp-btn--primary' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({resumeData.projects.length})
          </button>
          <button
            type="button"
            className={`fp-btn fp-btn--sm ${filter === 'ai' ? 'fp-btn--primary' : ''}`}
            onClick={() => setFilter('ai')}
          >
            AI &amp; RAG
          </button>
          <button
            type="button"
            className={`fp-btn fp-btn--sm ${filter === 'fullstack' ? 'fp-btn--primary' : ''}`}
            onClick={() => setFilter('fullstack')}
          >
            Full-Stack Systems
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div
        style={{
          display: 'grid',
          gap: '24px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
        }}
      >
        {filteredProjects.map((proj) => (
          <div key={proj.id} className="fp-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '10px',
                  gap: '8px',
                }}
              >
                <div>
                  <h3 style={{ margin: 0 }}>{proj.title}</h3>
                  <div className="fp-mono" style={{ fontSize: '12px', color: 'var(--fp-muted)' }}>
                    {proj.subtitle}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '14px', lineHeight: 1.65, marginBottom: '14px' }}>
                {formatEmphasizedText(proj.description)}
              </p>
            </div>

            <div
              style={{
                marginTop: 'auto',
                paddingTop: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {proj.technologies.map((t, tIdx) => (
                  <span key={tIdx} className="fp-badge" style={{ fontSize: '10px' }}>
                    {t}
                  </span>
                ))}
              </div>

              {proj.repoUrl && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                  <a
                    href={proj.repoUrl}
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
                    title={`Visit ${proj.title} repository on GitHub`}
                  >
                    <TrueGitHubLogo size={14} />
                    <span>Visit GitHub</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { resumeData } from '../data/resumeData';

export const SkillsSection: React.FC = () => {
  return (
    <div>
      <div className="fp-label" style={{ marginBottom: '14px' }}>
        <span>Technical Skills &amp; Architecture Matrix</span>
      </div>

      <div
        style={{
          display: 'grid',
          gap: '20px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
        }}
      >
        {resumeData.skills.map((category, idx) => (
          <div key={idx} className="fp-card">
            <div
              style={{
                marginBottom: '14px',
                borderBottom: '2px solid var(--fp-border)',
                paddingBottom: '8px',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '16px' }}>{category.category}</h3>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {category.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="fp-badge"
                  style={{
                    fontSize: '11px',
                    padding: '4px 10px',
                    cursor: 'default',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

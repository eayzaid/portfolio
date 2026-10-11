import React from 'react';
import { PixelIcon } from './PixelIcon';
import { resumeData } from '../data/resumeData';

export const StatsBanner: React.FC = () => {
  return (
    <section className="fp-stats" aria-label="Key Highlights Summary" style={{ marginTop: '24px' }}>
      {resumeData.stats.map((stat, idx) => (
        <div key={idx} className="fp-stat">
          <div className="fp-label">
            <PixelIcon name={stat.icon} size={14} />
            <span>{stat.label}</span>
          </div>
          <div className="fp-stat__value" style={{ fontSize: 'clamp(1.25rem, 2.8vw, 1.65rem)' }}>
            {stat.value}
          </div>
        </div>
      ))}
    </section>
  );
};

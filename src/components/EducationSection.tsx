import React from 'react';
import { PixelIcon } from './PixelIcon';
import { resumeData } from '../data/resumeData';

export const EducationSection: React.FC = () => {
  const centraleNantes = resumeData.education[0];
  const ensamMeknes = resumeData.education[1];

  return (
    <div>
      <div className="fp-label" style={{ marginBottom: '20px' }}>
        <span>Academic Timeline &amp; Engineering Degrees</span>
      </div>

      {/* Vertical 8-bit Timeline Container */}
      <div
        style={{
          position: 'relative',
          paddingLeft: '56px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* Continuous Vertical Timeline Rail Line connecting all 3 milestone squares */}
        <div
          style={{
            position: 'absolute',
            left: '19px',
            top: '36px',
            bottom: '40px',
            width: '3px',
            background: 'var(--fp-border)',
            zIndex: 1,
          }}
        />

        {/* 1. Milestone 2028 & École Centrale de Nantes Card */}
        <div style={{ position: 'relative' }}>
          {/* 8-bit Square Timeline Node 2028 on the Rail */}
          <div
            style={{
              position: 'absolute',
              left: '-56px',
              top: '16px',
              width: '40px',
              height: '40px',
              background: 'var(--fp-primary)',
              color: 'var(--fp-on-primary)',
              border: '2px solid var(--fp-border)',
              boxShadow: '2px 2px 0 var(--fp-shadow)',
              display: 'grid',
              placeItems: 'center',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              fontWeight: 800,
              zIndex: 2,
            }}
            title="Graduation Milestone: 2028"
          >
            2028
          </div>

          {/* Centrale Nantes Card */}
          <div
            className="fp-card"
            style={{
              padding: '20px',
              position: 'relative',
            }}
          >
            {/* Top Row: Expected Graduation Badge, Dual Degree & Location */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px',
                marginBottom: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span
                  className="fp-badge fp-badge--ok"
                  style={{ fontSize: '11px', padding: '3px 8px' }}
                >
                  <span
                    className="fp-led"
                    style={{ background: 'currentColor', marginRight: '4px' }}
                  />
                  Expected Sept 2028
                </span>

                {centraleNantes?.badge && (
                  <span
                    className="fp-badge"
                    style={{
                      fontSize: '10px',
                      background: 'var(--fp-surface-2)',
                      color: 'var(--fp-muted)',
                    }}
                  >
                    {centraleNantes.badge}
                  </span>
                )}
              </div>

              <div
                className="fp-mono"
                style={{
                  fontSize: '11px',
                  color: 'var(--fp-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <PixelIcon name="pin" size={10} />
                <span>{centraleNantes?.location}</span>
              </div>
            </div>

            {/* Institution Heading */}
            <h3
              style={{
                margin: '0 0 6px 0',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                lineHeight: 1.25,
              }}
            >
              {centraleNantes?.institution}
            </h3>

            {/* Degree Monospace Tag */}
            <div
              className="fp-mono"
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--fp-primary)',
                lineHeight: 1.5,
              }}
            >
              {centraleNantes?.degree}
            </div>
          </div>
        </div>

        {/* 2. Milestone 2026 in the Middle of the 2 Education Items */}
        <div
          style={{
            position: 'relative',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* 8-bit Square Timeline Node 2026 on the Rail */}
          <div
            style={{
              position: 'absolute',
              left: '-56px',
              top: '0',
              width: '40px',
              height: '40px',
              background: 'var(--fp-surface-2)',
              color: 'var(--fp-text)',
              border: '2px solid var(--fp-border)',
              boxShadow: '2px 2px 0 var(--fp-shadow)',
              display: 'grid',
              placeItems: 'center',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              fontWeight: 800,
              zIndex: 2,
            }}
            title="Milestone: 2026 (ENSAM Degree & Centrale Nantes Admission)"
          >
            2026
          </div>

          {/* Subtle connecting rail line across the middle */}
          <div
            style={{
              width: '100%',
              height: '2px',
              borderTop: '2px dashed var(--fp-hair)',
            }}
          />
        </div>

        {/* 3. ENSAM Meknès Card & Milestone 2022 */}
        <div style={{ position: 'relative' }}>
          {/* 8-bit Square Timeline Node 2022 on the Rail */}
          <div
            style={{
              position: 'absolute',
              left: '-56px',
              bottom: '20px',
              width: '40px',
              height: '40px',
              background: 'var(--fp-surface)',
              color: 'var(--fp-text)',
              border: '2px solid var(--fp-border)',
              boxShadow: '2px 2px 0 var(--fp-shadow)',
              display: 'grid',
              placeItems: 'center',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              fontWeight: 800,
              zIndex: 2,
            }}
            title="Start of Engineering Studies: 2022"
          >
            2022
          </div>

          {/* ENSAM Card */}
          <div
            className="fp-card"
            style={{
              padding: '20px',
              position: 'relative',
            }}
          >
            {/* Top Row: Badge & Location (Dates removed) */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px',
                marginBottom: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {ensamMeknes?.badge && (
                  <span
                    className="fp-badge"
                    style={{
                      fontSize: '10px',
                      background: 'var(--fp-surface-2)',
                      color: 'var(--fp-muted)',
                    }}
                  >
                    {ensamMeknes.badge}
                  </span>
                )}
              </div>

              <div
                className="fp-mono"
                style={{
                  fontSize: '11px',
                  color: 'var(--fp-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <PixelIcon name="pin" size={10} />
                <span>{ensamMeknes?.location}</span>
              </div>
            </div>

            {/* Institution Heading */}
            <h3
              style={{
                margin: '0 0 6px 0',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                lineHeight: 1.25,
              }}
            >
              {ensamMeknes?.institution}
            </h3>

            {/* Degree Monospace Tag */}
            <div
              className="fp-mono"
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--fp-primary)',
                lineHeight: 1.5,
              }}
            >
              {ensamMeknes?.degree}
            </div>

            {/* Equivalence Badge */}
            {ensamMeknes?.equivalence && (
              <div style={{ marginTop: '8px' }}>
                <span
                  className="fp-badge fp-badge--ok"
                  style={{
                    fontSize: '11px',
                    padding: '3px 8px',
                    textTransform: 'none',
                    letterSpacing: '0.02em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <PixelIcon name="check" size={10} />
                  <span>{ensamMeknes.equivalence}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

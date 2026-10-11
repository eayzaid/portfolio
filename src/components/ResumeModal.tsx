import React, { useState } from 'react';
import { PixelIcon } from './PixelIcon';
import { TruePhoneLogo } from './TrueLogos';
import { resumeData } from '../data/resumeData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(resumeData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(10, 12, 13, 0.75)',
        display: 'grid',
        placeItems: 'center',
        zIndex: 100,
        padding: '16px',
        backdropFilter: 'blur(2px)',
      }}
      onClick={onClose}
    >
      <div
        className="fp-modal"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '85vh',
          overflowY: 'auto',
          background: 'var(--fp-surface)',
          padding: '24px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderBottom: '2px solid var(--fp-border)',
            paddingBottom: '12px',
            marginBottom: '16px',
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: '22px' }}>{resumeData.personal.name}</h2>
            <div className="fp-mono" style={{ fontSize: '13px', color: 'var(--fp-primary)' }}>
              {resumeData.personal.role}
            </div>
          </div>
          <button
            type="button"
            className="fp-btn fp-btn--sm"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ✕ Close
          </button>
        </div>

        {/* Contact Links */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '18px',
            fontSize: '12px',
          }}
        >
          <span className="fp-badge">
            <PixelIcon name="pin" size={12} />
            {resumeData.personal.location}
          </span>
          <button
            type="button"
            className="fp-badge"
            style={{ cursor: 'pointer' }}
            onClick={handleCopyEmail}
          >
            <PixelIcon name="mail" size={12} />
            {copied ? 'Copied to clipboard!' : resumeData.personal.email}
          </button>
          <a
            href={`tel:${resumeData.personal.phone.replace(/\s+/g, '')}`}
            className="fp-badge"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
          >
            <TruePhoneLogo size={12} />
            {resumeData.personal.phone}
          </a>
        </div>

        {/* Target Internship Box */}
        <div
          style={{
            background: 'var(--fp-surface-2)',
            border: '2px solid var(--fp-border)',
            padding: '12px',
            marginBottom: '16px',
            fontSize: '13px',
          }}
        >
          <div className="fp-label" style={{ marginBottom: '4px' }}>
            <span>Target Objective</span>
          </div>
          <div>
            Seeking a <strong>16-week internship starting May 2027</strong> in{' '}
            <strong>AI and Software Engineering</strong> (France / EU).
          </div>
        </div>

        {/* Quick Highlights */}
        <div style={{ marginBottom: '16px' }}>
          <h4 style={{ marginBottom: '8px' }}>Education</h4>
          <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', lineHeight: 1.5 }}>
            {resumeData.education.map((edu, idx) => (
              <li key={idx} style={{ marginBottom: '4px' }}>
                <strong>{edu.institution}:</strong> {edu.degree}
                {edu.equivalence ? ` — ${edu.equivalence}` : ''} ({edu.period})
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '8px' }}>Key Experience</h4>
          <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', lineHeight: 1.5 }}>
            {resumeData.experience.map((exp, idx) => (
              <li key={idx} style={{ marginBottom: '4px' }}>
                <strong>{exp.company} ({exp.period}):</strong> {exp.role}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '2px solid var(--fp-border)', paddingTop: '16px' }}>
          <a
            href={resumeData.personal.resumePdf}
            download="Zaidane_Ayman_CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="fp-btn fp-btn--primary"
          >
            <PixelIcon name="download" size={14} />
            Download My Resume
          </a>
          <a
            href={`mailto:${resumeData.personal.email}`}
            className="fp-btn fp-btn--primary"
          >
            <PixelIcon name="mail" size={14} />
            Send Email
          </a>
        </div>
      </div>
    </div>
  );
};

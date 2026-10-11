import { Link } from 'react-router-dom';
import { PixelIcon } from '../components/PixelIcon';

export function BlogPage() {
  return (
    <div
      style={{
        minHeight: 'calc(75vh - 120px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        className="fp-panel fp-gridpaper"
        style={{
          padding: '48px 32px',
          maxWidth: '600px',
          width: '100%',
          boxSizing: 'border-box',
          backgroundColor: 'var(--fp-surface)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: '18px' }}>
          <PixelIcon name="terminal" size={40} />
        </div>

        <div
          className="fp-label"
          style={{
            marginBottom: '14px',
            color: 'var(--fp-primary)',
            fontSize: '11px',
            letterSpacing: '0.1em',
            fontWeight: 700,
          }}
        >
          <span className="fp-led" style={{ background: 'var(--fp-primary)' }} />
          <span>TRANSMISSION // UPCOMING</span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)',
            fontWeight: 800,
            lineHeight: 1.25,
            margin: '0 0 16px 0',
            letterSpacing: '-0.02em',
          }}
        >
          the blog section is going to be added later
        </h1>

        <p
          style={{
            fontSize: '14px',
            color: 'var(--fp-muted)',
            fontFamily: 'var(--fp-font-mono, monospace)',
            margin: '0 0 28px 0',
            lineHeight: 1.6,
          }}
        >
          Engineering logbooks &amp; technical dispatches are in preparation
          <span className="fp-blink" style={{ marginLeft: '6px' }}>▌</span>
        </p>

        <Link
          to="/"
          className="fp-btn fp-btn--primary"
          style={{
            textDecoration: 'none',
            fontSize: '13px',
            fontFamily: 'var(--fp-font-mono, monospace)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          ← Return to Portfolio
        </Link>
      </div>
    </div>
  );
}

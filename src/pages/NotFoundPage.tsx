import { Link } from 'react-router-dom';
import { PixelIcon } from '../components/PixelIcon';

export function NotFoundPage() {
  return (
    <div
      className="fp-panel fp-gridpaper fp-empty"
      style={{
        marginTop: '40px',
        padding: '56px 24px',
        backgroundColor: 'var(--fp-surface)',
        textAlign: 'center',
      }}
    >
      <PixelIcon name="terminal" size={48} />
      <div
        style={{
          fontFamily: 'var(--fp-font-mono, monospace)',
          fontSize: '13px',
          color: 'var(--fp-danger)',
          fontWeight: 700,
          marginTop: '16px',
        }}
      >
        [ ERROR 404 // STATIC ON FREQUENCY ]
      </div>
      <h1 style={{ fontSize: '2rem', margin: '8px 0' }}>Page Not Found</h1>
      <p style={{ color: 'var(--fp-muted)', maxWidth: '460px', margin: '0 auto 24px' }}>
        The station or page you requested does not exist or has been moved to another coordinate.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" className="fp-btn fp-btn--primary">
          <span>Return to Portfolio</span>
        </Link>
        <Link to="/blog" className="fp-btn">
          <span>Explore Blog</span>
        </Link>
      </div>
    </div>
  );
}

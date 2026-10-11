import { Link } from 'react-router-dom';
import { PixelIcon } from '../components/PixelIcon';
import { useLanguage } from '../context/LanguageContext';

export function NotFoundPage() {
  const { t } = useLanguage();

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
        {t('notFound.errorCode', '[ ERROR 404 // STATIC ON FREQUENCY ]')}
      </div>
      <h1 style={{ fontSize: '2rem', margin: '8px 0' }}>{t('notFound.title', 'Page Not Found')}</h1>
      <p style={{ color: 'var(--fp-muted)', maxWidth: '460px', margin: '0 auto 24px' }}>
        {t('notFound.message', 'The station or page you requested does not exist or has been moved to another coordinate.')}
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" className="fp-btn fp-btn--primary">
          <span>{t('notFound.returnHome', 'Return to Portfolio')}</span>
        </Link>
        <Link to="/blog" className="fp-btn">
          <span>{t('notFound.exploreBlog', 'Explore Blog')}</span>
        </Link>
      </div>
    </div>
  );
}

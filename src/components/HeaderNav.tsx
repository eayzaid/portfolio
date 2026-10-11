import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { PixelIcon } from './PixelIcon';
import { useLanguage } from '../context/LanguageContext';

interface HeaderNavProps {
  theme: 'light' | 'dark';
  onToggleTheme: (t: 'light' | 'dark') => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  theme,
  onToggleTheme,
}) => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="fp-nav">
      <Link to="/" className="fp-nav__brand">
        <span>zaidane.ayman</span>
      </Link>

      <NavLink
        to="/blog"
        className={({ isActive }) =>
          `fp-nav__cell ${isActive ? 'fp-nav__cell--active' : ''}`
        }
      >
        {t('nav.blog', 'Blog')}
      </NavLink>

      <div className="fp-nav__cell" style={{ padding: '0 8px', display: 'flex', gap: '6px' }}>
        {/* Language Switcher */}
        <button
          type="button"
          onClick={toggleLanguage}
          aria-label={language === 'en' ? 'Passer en français' : 'Switch to English'}
          title={language === 'en' ? 'Passer en français' : 'Switch to English'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '5px 9px',
            background: 'var(--fp-surface-2)',
            border: '2px solid var(--fp-border)',
            color: 'var(--fp-text)',
            cursor: 'pointer',
            fontFamily: 'var(--fp-font-mono, monospace)',
            fontSize: '11px',
            fontWeight: 700,
            boxShadow: '2px 2px 0 var(--fp-shadow)',
          }}
        >
          <span style={{ color: language === 'en' ? 'var(--fp-accent)' : 'var(--fp-muted)' }}>EN</span>
          <span style={{ opacity: 0.4 }}>/</span>
          <span style={{ color: language === 'fr' ? 'var(--fp-accent)' : 'var(--fp-muted)' }}>FR</span>
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={() => onToggleTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 10px',
            background: 'var(--fp-surface-2)',
            border: '2px solid var(--fp-border)',
            color: 'var(--fp-text)',
            cursor: 'pointer',
            fontFamily: 'var(--fp-font-mono, monospace)',
            fontSize: '11px',
            fontWeight: 700,
            boxShadow: '2px 2px 0 var(--fp-shadow)',
          }}
        >
          <PixelIcon name={theme === 'dark' ? 'sun' : 'moon'} size={14} />
          <span>{theme === 'dark' ? t('nav.themeLight', 'LIGHT') : t('nav.themeDark', 'DARK')}</span>
        </button>
      </div>
    </header>
  );
};

import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { PixelIcon } from './PixelIcon';

interface HeaderNavProps {
  theme: 'light' | 'dark';
  onToggleTheme: (t: 'light' | 'dark') => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  theme,
  onToggleTheme,
}) => {
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
        Blog
      </NavLink>

      <div className="fp-nav__cell" style={{ padding: '0 8px' }}>
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
          <span>{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
        </button>
      </div>
    </header>
  );
};

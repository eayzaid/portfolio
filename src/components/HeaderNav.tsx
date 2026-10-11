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
        <PixelIcon name="tree" size={20} />
        <span>zaidane.ayman</span>
      </Link>

      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `fp-nav__cell ${isActive ? 'fp-nav__cell--active' : ''}`
        }
      >
        Portfolio
      </NavLink>

      <NavLink
        to="/blog"
        className={({ isActive }) =>
          `fp-nav__cell ${isActive ? 'fp-nav__cell--active' : ''}`
        }
      >
        Blog
      </NavLink>

      <div className="fp-nav__cell" style={{ padding: '0 8px' }}>
        <div className="fp-theme" role="group" aria-label="Theme switcher">
          <button
            type="button"
            aria-label="Dark theme"
            aria-pressed={theme === 'dark'}
            onClick={() => onToggleTheme('dark')}
            title="Dark theme"
          >
            <PixelIcon name="moon" size={14} />
          </button>
          <button
            type="button"
            aria-label="Light theme"
            aria-pressed={theme === 'light'}
            onClick={() => onToggleTheme('light')}
            title="Light theme"
          >
            <PixelIcon name="sun" size={14} />
          </button>
        </div>
      </div>
    </header>
  );
};

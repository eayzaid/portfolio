import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface TickerBarProps {
  message?: string;
}

export const TickerBar: React.FC<TickerBarProps> = ({ message }) => {
  const { t } = useLanguage();
  const displayMessage = message || t('ticker.status');

  return (
    <div className="fp-ticker" role="status" aria-live="polite">
      <span>{displayMessage}</span>
      <span className="fp-blink" style={{ marginLeft: '8px' }}>
        ▌
      </span>
    </div>
  );
};

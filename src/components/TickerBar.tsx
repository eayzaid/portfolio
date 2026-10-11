import React from 'react';

interface TickerBarProps {
  message?: string;
}

export const TickerBar: React.FC<TickerBarProps> = ({
  message = 'STATUS: SEEKING 16-WEEK INTERNSHIP STARTING MAY 2027 • AI × SOFTWARE ENGINEERING • FRANCE / EU',
}) => {
  return (
    <div className="fp-ticker" role="status" aria-live="polite">
      <span>{message}</span>
      <span className="fp-blink" style={{ marginLeft: '8px' }}>
        ▌
      </span>
    </div>
  );
};

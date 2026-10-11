import React, { useState, useEffect } from 'react';
import { PixelIcon } from './PixelIcon';

export interface NantesTimeBoxProps {
  style?: React.CSSProperties;
  size?: 'sm' | 'md' | 'lg';
}

export const NantesTimeBox: React.FC<NantesTimeBoxProps> = ({ style, size = 'md' }) => {
  const isLarge = size === 'lg';

  const [timeStr, setTimeStr] = useState<string>(() => {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Paris',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date());
  });

  const [dateStr, setDateStr] = useState<string>(() => {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Paris',
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    }).format(new Date());
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/Paris',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now)
      );
      setDateStr(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/Paris',
          weekday: 'short',
          day: '2-digit',
          month: 'short',
        }).format(now)
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fp-card fp-nantes-timebox ${isLarge ? 'fp-nantes-timebox--lg' : ''}`}
      style={style}
      title="Current Local Time in Nantes (Paris TimeZone Europe/Paris)"
    >
      <div className="fp-nantes-timebox__location">
        <PixelIcon name="pin" size={isLarge ? 12 : 10} />
        <span>NANTES<span className="fp-nantes-timebox__country">, FRANCE</span></span>
      </div>

      <span className="fp-nantes-timebox__divider" aria-hidden="true">|</span>

      <div className="fp-nantes-timebox__right">
        <div className="fp-nantes-timebox__time">
          <span>{timeStr}</span>
          <span className="fp-nantes-timebox__tz">PARIS</span>
        </div>

        <span className="fp-nantes-timebox__divider" aria-hidden="true">|</span>

        <div className="fp-nantes-timebox__date">
          {dateStr}
        </div>

        <span
          className="fp-led"
          style={{
            width: isLarge ? '6px' : '5px',
            height: isLarge ? '6px' : '5px',
            marginLeft: '2px',
            background: 'var(--fp-primary)',
            flexShrink: 0,
          }}
        />
      </div>
    </div>
  );
};

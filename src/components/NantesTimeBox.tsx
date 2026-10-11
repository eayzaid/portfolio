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
      className="fp-card"
      style={{
        padding: isLarge ? '6px 14px' : '3px 8px',
        border: '2px solid var(--fp-border)',
        background: 'var(--fp-surface-2)',
        boxShadow: isLarge ? '4px 4px 0 var(--fp-shadow)' : '3px 3px 0 var(--fp-shadow)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: isLarge ? '10px' : '6px',
        height: 'fit-content',
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        ...style,
      }}
      title="Current Local Time in Nantes (Paris TimeZone Europe/Paris)"
    >
      <div
        className="fp-label"
        style={{
          fontSize: isLarge ? '12px' : '11px',
          fontWeight: 700,
          letterSpacing: '.06em',
          color: 'var(--fp-text)',
          display: 'flex',
          alignItems: 'center',
          gap: isLarge ? '6px' : '4px',
          textTransform: 'uppercase',
          margin: 0,
        }}
      >
        <PixelIcon name="pin" size={isLarge ? 12 : 10} />
        <span>NANTES, FRANCE</span>
      </div>

      <span style={{ color: 'var(--fp-border)', opacity: 0.35, fontSize: isLarge ? '13px' : '11px' }}>|</span>

      <div
        className="fp-mono"
        style={{
          fontSize: isLarge ? '15px' : '12px',
          fontWeight: 800,
          color: 'var(--fp-primary)',
          letterSpacing: '0.04em',
          display: 'flex',
          alignItems: 'baseline',
          gap: '4px',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        <span>{timeStr}</span>
        <span
          style={{
            fontSize: isLarge ? '10px' : '9px',
            color: 'var(--fp-text)',
            fontWeight: 700,
            opacity: 0.8,
          }}
        >
          PARIS
        </span>
      </div>

      <span style={{ color: 'var(--fp-border)', opacity: 0.35, fontSize: isLarge ? '13px' : '11px' }}>|</span>

      <div
        className="fp-mono"
        style={{
          fontSize: isLarge ? '12px' : '10px',
          color: 'var(--fp-muted)',
          textTransform: 'uppercase',
          fontWeight: 700,
          letterSpacing: '0.03em',
        }}
      >
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
  );
};

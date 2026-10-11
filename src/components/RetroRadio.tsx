import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

export type RadioStationId =
  | 'about'
  | 'experience'
  | 'education'
  | 'projects'
  | 'skills'
  | 'honors';

export interface RadioStation {
  id: RadioStationId;
  name: string;
  preset: number;
  freq: string;
  mhz: number;
  tagline: string;
  badge: string;
}


interface RetroRadioProps {
  activeStation: RadioStationId;
  onStationChange: (stationId: RadioStationId) => void;
}

export const RetroRadio: React.FC<RetroRadioProps> = ({
  activeStation,
  onStationChange,
}) => {
  const { stations, language } = useLanguage();
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Current station index (0 to 5)
  const currentIndex = stations.findIndex((s) => s.id === activeStation);
  const currentStation = stations[currentIndex] || stations[0];

  // Wheel rotation angle (60 degrees per station across 6 stations)
  const wheelAngle = currentIndex * 60;

  // Live Paris time and date for radio digital clock & locale readout
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
    return new Intl.DateTimeFormat(language === 'fr' ? 'fr-FR' : 'en-GB', {
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
        new Intl.DateTimeFormat(language === 'fr' ? 'fr-FR' : 'en-GB', {
          timeZone: 'Europe/Paris',
          weekday: 'short',
          day: '2-digit',
          month: 'short',
        }).format(now)
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [language]);

  // Synthesize short retro radio tuning blip
  const playTuningSound = () => {
    if (!audioEnabled) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420 + currentIndex * 100, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // AudioContext unavailable or blocked
    }
  };

  const handleNextStation = () => {
    const nextIdx = (currentIndex + 1) % stations.length;
    playTuningSound();
    onStationChange(stations[nextIdx].id);
  };

  const handlePrevStation = () => {
    const prevIdx = (currentIndex - 1 + stations.length) % stations.length;
    playTuningSound();
    onStationChange(stations[prevIdx].id);
  };

  const handleSelectStation = (id: RadioStationId) => {
    if (id !== activeStation) {
      playTuningSound();
      onStationChange(id);
    }
  };

  const handleWheelScroll = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0 || e.deltaX > 0) {
      handleNextStation();
    } else if (e.deltaY < 0 || e.deltaX < 0) {
      handlePrevStation();
    }
  };

  // Dial scale cursor position (percentage along 87.5 -> 108.5 scale)
  const minMhz = 87.5;
  const maxMhz = 108.5;
  const dialPercent = Math.min(
    95,
    Math.max(5, ((currentStation.mhz - minMhz) / (maxMhz - minMhz)) * 100)
  );

  return (
    <div
      className="fp-card fp-radio-unit"
      style={{
        marginTop: '16px',
        marginBottom: '16px',
        background: 'var(--fp-surface)',
        border: '3px solid var(--fp-border)',
        boxShadow: '5px 5px 0 var(--fp-shadow)',
        padding: '12px 16px',
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
      role="region"
      aria-label="Stereo Dashboard Tuner"
    >
      {/* 1. Header Bezel Strip with Cassette Tape Flap */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid var(--fp-border)',
          paddingBottom: '8px',
          marginBottom: '12px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '.08em',
          color: 'var(--fp-muted)',
          textTransform: 'uppercase',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="fp-led" style={{ background: 'var(--fp-primary)', flexShrink: 0 }} />
          <span>STEREO RECEIVER CR-880</span>
        </div>

        {/* Vintage Cassette Door Flap */}
        <div
          style={{
            background: 'var(--fp-surface-2)',
            border: '1px solid var(--fp-border)',
            padding: '2px 10px',
            fontSize: '9px',
            letterSpacing: '.12em',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>◄◄</span>
          <span>AUTO REVERSE // CASSETTE</span>
          <span>►►</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>FM STEREO</span>
          <span style={{ color: 'var(--fp-border)', opacity: 0.4 }}>|</span>
          <span style={{ color: 'var(--fp-primary)' }}>DOLBY NR</span>
        </div>
      </div>

      {/* 2. Main Stereo Console: Left Wheel | Center Screen | Right Knob */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: '16px',
          alignItems: 'center',
        }}
        className="fp-radio-main-grid"
      >
        {/* === LEFT ROTARY WHEEL (Transitions between stations) === */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              fontSize: '9px',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              color: 'var(--fp-muted)',
              letterSpacing: '.08em',
              textTransform: 'uppercase',
            }}
          >
            TUNE WHEEL
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              type="button"
              onClick={handlePrevStation}
              className="fp-btn fp-btn--icon"
              style={{
                width: '28px',
                height: '28px',
                padding: 0,
                fontSize: '11px',
                fontWeight: 700,
              }}
              title="Previous Station (Tune Left)"
              aria-label="Previous Station"
            >
              ◀
            </button>

            {/* Rotatable Physical Wheel Knob */}
            <div
              onWheel={handleWheelScroll}
              onClick={handleNextStation}
              title="Click or scroll wheel to switch stations"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'Enter') {
                  e.preventDefault();
                  handleNextStation();
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                  e.preventDefault();
                  handlePrevStation();
                }
              }}
              aria-label={`Rotary Tuning Wheel. Current station: ${currentStation.name}. Click to change.`}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--fp-surface-2) 0%, var(--fp-surface) 50%, var(--fp-surface-2) 100%)',
                border: '3px solid var(--fp-border)',
                boxShadow: '3px 3px 0 var(--fp-shadow), inset 0 0 0 2px rgba(255,255,255,0.15)',
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
                position: 'relative',
                transform: `rotate(${wheelAngle}deg)`,
                transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: '3px',
                  borderRadius: '50%',
                  border: '1px dashed var(--fp-border)',
                  opacity: 0.6,
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--fp-surface)',
                  border: '2px solid var(--fp-border)',
                  boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.2)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '9px',
                  fontWeight: 800,
                  fontFamily: 'JetBrains Mono, monospace',
                  color: 'var(--fp-primary)',
                }}
              >
                {currentStation.preset}
              </div>

              {/* Raised Tuning Needle Marker on Knob */}
              <div
                style={{
                  position: 'absolute',
                  top: '2px',
                  width: '4px',
                  height: '9px',
                  background: 'var(--fp-primary)',
                  border: '1px solid var(--fp-border)',
                }}
              />
            </div>

            <button
              type="button"
              onClick={handleNextStation}
              className="fp-btn fp-btn--icon"
              style={{
                width: '28px',
                height: '28px',
                padding: 0,
                fontSize: '11px',
                fontWeight: 700,
              }}
              title="Next Station (Tune Right)"
              aria-label="Next Station"
            >
              ▶
            </button>
          </div>

          <div
            style={{
              fontSize: '8px',
              color: 'var(--fp-muted)',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '.05em',
            }}
          >
            ROTATE / CLICK
          </div>
        </div>

        {/* === CENTER DIGITAL TUNER SCREEN (Submits to webpage Forest Pixel UI theme) === */}
        <div
          className="fp-radio-screen"
          style={{
            background: 'var(--fp-surface-2)',
            border: '2px solid var(--fp-border)',
            boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.06), 2px 2px 0 var(--fp-shadow)',
            padding: '8px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            position: 'relative',
            minWidth: 0,
            overflow: 'hidden',
          }}
        >
          {/* Subtle 8-bit CRT scanlines */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.05) 50%)',
              backgroundSize: '100% 4px',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* Analog Tuning Dial Scale with Needle */}
          <div
            style={{
              borderBottom: '1px solid var(--fp-border)',
              paddingBottom: '4px',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '8px',
                fontFamily: 'JetBrains Mono, monospace',
                color: 'var(--fp-muted)',
                letterSpacing: '.06em',
                marginBottom: '2px',
                fontWeight: 600,
              }}
            >
              <span>88</span>
              <span>92</span>
              <span>96</span>
              <span>100</span>
              <span>104</span>
              <span>108 MHz</span>
            </div>

            {/* Scale track bar */}
            <div
              style={{
                width: '100%',
                height: '4px',
                background: 'var(--fp-surface)',
                position: 'relative',
                border: '1px solid var(--fp-border)',
              }}
            >
              {/* Active Tuning Cursor Needle */}
              <div
                style={{
                  position: 'absolute',
                  top: '-4px',
                  left: `${dialPercent}%`,
                  transform: 'translateX(-50%)',
                  width: '3px',
                  height: '12px',
                  background: 'var(--fp-danger)',
                  boxShadow: '0 0 3px var(--fp-danger)',
                  transition: 'left 0.45s cubic-bezier(0.25, 1, 0.5, 1)',
                }}
              />
            </div>
          </div>

          {/* Main LCD Digital Readout matching reference style */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              flexWrap: 'wrap',
              gap: '8px',
              zIndex: 2,
            }}
          >
            {/* Left: Track Number + Station Title */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 'clamp(1.2rem, 3.2vw, 1.75rem)',
                  fontWeight: 800,
                  color: 'var(--fp-primary)',
                  letterSpacing: '0.05em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                00{currentStation.preset}
              </span>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 'clamp(11px, 2.2vw, 14px)',
                    fontWeight: 700,
                    color: 'var(--fp-text)',
                    letterSpacing: '.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  {currentStation.name}
                </span>
                <span
                  style={{
                    fontSize: '9px',
                    fontFamily: 'JetBrains Mono, monospace',
                    color: 'var(--fp-muted)',
                  }}
                >
                  FM {currentStation.freq} MHz
                </span>
              </div>
            </div>

            {/* Right: Local Info & Date + Live Clock */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '4px',
                marginLeft: 'auto',
                minWidth: 0,
              }}
            >
              {/* Local & Date strip */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '9px',
                  letterSpacing: '.05em',
                  textTransform: 'uppercase',
                  flexWrap: 'nowrap',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'var(--fp-text)',
                    fontWeight: 700,
                    background: 'var(--fp-surface)',
                    border: '1px solid var(--fp-border)',
                    padding: '1px 5px',
                  }}
                >
                  <span
                    className="fp-led"
                    style={{
                      width: '4px',
                      height: '4px',
                      background: 'var(--fp-primary)',
                      display: 'inline-block',
                    }}
                  />
                  NANTES, FRANCE
                </span>
                <span style={{ color: 'var(--fp-muted)', fontWeight: 600 }}>
                  {dateStr}
                </span>
              </div>

              {/* Live Clock */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '4px',
                }}
              >

                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 'clamp(1.15rem, 2.6vw, 1.55rem)',
                    fontWeight: 800,
                    color: 'var(--fp-primary)',
                    letterSpacing: '0.04em',
                    fontVariantNumeric: 'tabular-nums',
                    lineHeight: 1,
                  }}
                >
                  {timeStr}
                </span>
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '8px',
                    color: 'var(--fp-primary)',
                    fontWeight: 700,
                  }}
                >
                  PARIS
                </span>
              </div>
            </div>
          </div>

          {/* Status Indicators Strip */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '8px',
              fontFamily: 'JetBrains Mono, monospace',
              color: 'var(--fp-muted)',
              borderTop: '1px solid var(--fp-border)',
              paddingTop: '3px',
              zIndex: 2,
            }}
          >
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ color: 'var(--fp-danger)', fontWeight: 800 }}>● REC</span>
              <span style={{ color: 'var(--fp-primary)', fontWeight: 600 }}>TUNED: OK</span>
              <span>HI-FI STEREO</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <span>SIG:</span>
              <span style={{ color: 'var(--fp-primary)', fontWeight: 700 }}> ▂▄▅█</span>
            </div>
          </div>
        </div>

        {/* === RIGHT CONTROL KNOB (Sound FX / Vol Toggle) === */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            userSelect: 'none',
          }}
          className="fp-radio-vol-col"
        >
          <div
            style={{
              fontSize: '9px',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              color: 'var(--fp-muted)',
              letterSpacing: '.08em',
              textTransform: 'uppercase',
            }}
          >
            SOUND FX
          </div>

          <button
            type="button"
            onClick={() => setAudioEnabled((prev) => !prev)}
            title={audioEnabled ? 'Audio Click: ON (Click to Mute)' : 'Audio Click: Muted (Click to Enable Sound)'}
            aria-pressed={audioEnabled}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: audioEnabled
                ? 'var(--fp-primary)'
                : 'linear-gradient(135deg, var(--fp-surface-2) 0%, var(--fp-surface) 100%)',
              color: audioEnabled ? 'var(--fp-on-primary)' : 'var(--fp-text)',
              border: '2px solid var(--fp-border)',
              boxShadow: '2px 2px 0 var(--fp-shadow)',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 700,
            }}
          >
            {audioEnabled ? 'VOL' : 'MUTE'}
          </button>

          <span
            className="fp-led"
            style={{
              background: audioEnabled ? 'var(--fp-primary)' : 'var(--fp-muted)',
              opacity: audioEnabled ? 1 : 0.4,
            }}
          />
        </div>
      </div>

      {/* 3. Bottom Row: 6 Tactile Preset Push Buttons */}
      <div
        style={{
          marginTop: '12px',
          paddingTop: '10px',
          borderTop: '2px solid var(--fp-border)',
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '8px',
        }}
        className="fp-radio-buttons-grid"
      >
        {stations.map((station) => {
          const isActive = station.id === activeStation;
          return (
            <button
              key={station.id}
              type="button"
              onClick={() => handleSelectStation(station.id)}
              className="fp-btn fp-radio-preset-btn"
              style={{
                padding: '6px 4px',
                fontSize: '11px',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '.04em',
                background: isActive ? 'var(--fp-primary)' : 'var(--fp-surface)',
                color: isActive ? 'var(--fp-on-primary)' : 'var(--fp-text)',
                border: '2px solid var(--fp-border)',
                boxShadow: isActive ? 'none' : '3px 3px 0 var(--fp-shadow)',
                transform: isActive ? 'translate(2px, 2px)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                cursor: 'pointer',
                transition: 'transform 80ms steps(2), box-shadow 80ms steps(2)',
              }}
              title={`Switch to Station ${station.preset}: ${station.name}`}
              aria-pressed={isActive}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '9px',
                  opacity: isActive ? 0.9 : 0.6,
                }}
              >
                <span>[{station.preset}]</span>
                <span
                  className="fp-led"
                  style={{
                    width: '4px',
                    height: '4px',
                    background: isActive ? '#ffffff' : 'var(--fp-primary)',
                  }}
                />
              </div>
              <span style={{ fontSize: '10px', whiteSpace: 'nowrap' }}>
                {station.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

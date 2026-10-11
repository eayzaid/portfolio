import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useLofiPlayer } from '../hooks/useLofiPlayer';
import { RetroEqualizerCanvas } from './RetroEqualizerCanvas';

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

const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export const RetroRadio: React.FC<RetroRadioProps> = ({
  activeStation,
  onStationChange,
}) => {
  const { stations, language } = useLanguage();
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Integrated LoFi Cassette Player Hook (starts paused / silent at first hand)
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    progressPercent,
    volume,
    isMuted,
    tracks,
    analyser,
    togglePlay,
    nextTrack,
    prevTrack,
    seekByPercent,
    setVolume,
    toggleMute,
  } = useLofiPlayer();

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
    if (isMuted) return;
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

      gain.gain.setValueAtTime(0.12 * volume, ctx.currentTime);
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

  const handleVolumeWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setVolume(Math.min(1, Number((volume + 0.05).toFixed(2))));
    } else {
      setVolume(Math.max(0, Number((volume - 0.05).toFixed(2))));
    }
  };

  // Right Volume Wheel References & Drag State
  const volWheelRef = useRef<HTMLDivElement | null>(null);
  const [isDraggingVol, setIsDraggingVol] = useState(false);
  const volumeRef = useRef(volume);
  const lastRadRef = useRef<number>(volume * 2 * Math.PI);
  const dragMovedRef = useRef<boolean>(false);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  // Map volume (0 to 1) directly to radians (0 to 2π) and degrees (0 to 360°)
  // 0% = 0 rad (0°), 100% = 2π rad (360°)
  const volAngleDeg = volume * 360;

  const getRadFromPointer = (clientX: number, clientY: number) => {
    if (!volWheelRef.current) return null;
    const rect = volWheelRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = clientX - cx;
    const dy = clientY - cy;
    const dist = Math.hypot(dx, dy);

    // Clockwise angle from 12 o'clock:
    // 12 o'clock = 0 rad, 3 o'clock = π/2 rad, 6 o'clock = π rad, 9 o'clock = 3π/2 rad, 12 o'clock = 2π rad
    let rad = Math.atan2(dx, -dy);
    if (rad < 0) {
      rad += 2 * Math.PI;
    }
    return { rad, dist };
  };

  const handleVolPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const info = getRadFromPointer(e.clientX, e.clientY);
    if (!info) return;

    // Center cap is 32px diameter (16px radius) - clicking it toggles mute
    if (info.dist < 16) {
      toggleMute();
      return;
    }

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore fallback
    }
    setIsDraggingVol(true);
    dragMovedRef.current = false;
    lastRadRef.current = info.rad;
  };

  const handleVolPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingVol) return;
    const info = getRadFromPointer(e.clientX, e.clientY);
    if (!info) return;

    dragMovedRef.current = true;
    let diff = info.rad - lastRadRef.current;

    // Normalize diff to [-π, π] to gracefully handle crossing the 12 o'clock seam
    if (diff > Math.PI) diff -= 2 * Math.PI;
    if (diff < -Math.PI) diff += 2 * Math.PI;

    // Delta volume = diff / (2 * π)
    const deltaVol = diff / (2 * Math.PI);
    const nextVol = Math.min(1, Math.max(0, volumeRef.current + deltaVol));

    volumeRef.current = nextVol;
    setVolume(Number(nextVol.toFixed(2)));
    lastRadRef.current = info.rad;
  };

  const handleVolPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingVol) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setIsDraggingVol(false);

    // If user clicked without dragging (single click on wheel rim):
    if (!dragMovedRef.current) {
      const info = getRadFromPointer(e.clientX, e.clientY);
      if (info && info.dist >= 16) {
        // Direct click sets volume to rad / (2 * π)
        let clickedVol = info.rad / (2 * Math.PI);
        if (clickedVol < 0.03) clickedVol = 0;
        else if (clickedVol > 0.97) clickedVol = 1;
        setVolume(Number(clickedVol.toFixed(2)));
      }
    }
  };

  const handleVolKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setVolume(Math.min(1, Number((volume + 0.05).toFixed(2))));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setVolume(Math.max(0, Number((volume - 0.05).toFixed(2))));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setVolume(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setVolume(1);
    } else if (e.key === 'm' || e.key === 'M' || e.key === ' ') {
      e.preventDefault();
      toggleMute();
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = (clickX / rect.width) * 100;
    seekByPercent(percent);
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
      aria-label="Stereo Dashboard Tuner & LoFi Cassette Player"
    >
      {/* 1. Header Bezel Strip with Cassette Tape Deck Controls */}
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
          <span
            className={`fp-led ${isPlaying ? 'fp-led--pulsing' : ''}`}
            style={{
              background: isPlaying ? 'var(--fp-primary)' : 'var(--fp-muted)',
              flexShrink: 0,
            }}
          />
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

        {/* Right audio indicators */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: isPlaying ? 'var(--fp-primary)' : 'inherit' }}>
            {isPlaying ? 'LOFI TAPE' : 'FM STEREO'}
          </span>
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
              className="fp-btn fp-btn--icon fp-wheel-btn--flank"
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
              className="fp-btn fp-btn--icon fp-wheel-btn--flank"
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

        {/* === CENTER DIGITAL TUNER SCREEN === */}
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

          {/* Station Readout & Live Clock Row */}
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
                  fontSize: 'clamp(1.15rem, 3vw, 1.55rem)',
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
                    fontSize: 'clamp(11px, 2.2vw, 13px)',
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
                    fontSize: '8px',
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
                gap: '2px',
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
                    fontSize: 'clamp(1rem, 2.4vw, 1.35rem)',
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

          {/* === LOFI CASSETTE NOW PLAYING & PLAYBACK LCD SUB-PANEL === */}
          <div
            style={{
              background: 'var(--fp-surface)',
              border: '1px solid var(--fp-border)',
              padding: '6px 8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              zIndex: 2,
            }}
          >
            {/* Top row: Track Title & Status */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                <span
                  style={{
                    fontSize: '11px',
                    color: isPlaying ? 'var(--fp-primary)' : 'var(--fp-muted)',
                  }}
                >
                  ♫
                </span>
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 800,
                    letterSpacing: '.06em',
                    color: 'var(--fp-text)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  TRK {currentTrack.trackNumber}/{tracks.length}: {currentTrack.title.toUpperCase()}
                </span>
                <span
                  style={{
                    fontSize: '8px',
                    color: 'var(--fp-muted)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  [{currentTrack.category.toUpperCase()}]
                </span>
              </div>

              {/* Status Indicator Pill */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
                <span
                  style={{
                    fontSize: '8px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 700,
                    color: isPlaying ? 'var(--fp-primary)' : 'var(--fp-muted)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span
                    className={`fp-led ${isPlaying ? 'fp-led--pulsing' : ''}`}
                    style={{
                      width: '5px',
                      height: '5px',
                      background: isPlaying ? 'var(--fp-primary)' : 'var(--fp-muted)',
                    }}
                  />
                  {isPlaying ? 'PLAYING' : 'PAUSED'}
                </span>
              </div>
            </div>

            {/* Middle row: Interactive Retro Cassette Progress Bar */}
            <div
              onClick={handleProgressBarClick}
              role="slider"
              tabIndex={0}
              aria-label="Track Progress Seek"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progressPercent)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') {
                  seekByPercent(progressPercent + 5);
                } else if (e.key === 'ArrowLeft') {
                  seekByPercent(progressPercent - 5);
                }
              }}
              title="Click or drag to seek in track"
              style={{
                width: '100%',
                height: '7px',
                background: 'var(--fp-surface-2)',
                border: '1px solid var(--fp-border)',
                cursor: 'pointer',
                position: 'relative',
                boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.1)',
              }}
            >
              {/* Filled Ribbon */}
              <div
                style={{
                  height: '100%',
                  width: `${progressPercent}%`,
                  background: isPlaying ? 'var(--fp-primary)' : 'var(--fp-muted)',
                  transition: 'width 0.12s linear',
                }}
              />
              {/* Playhead Marker */}
              <div
                style={{
                  position: 'absolute',
                  top: '-2px',
                  left: `${progressPercent}%`,
                  transform: 'translateX(-50%)',
                  width: '3px',
                  height: '9px',
                  background: 'var(--fp-text)',
                  border: '1px solid var(--fp-border)',
                }}
              />
            </div>

            {/* Bottom row: Time Readout & Animated 8-bit Equalizer Bars */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '8px',
                fontFamily: 'JetBrains Mono, monospace',
                color: 'var(--fp-muted)',
              }}
            >
              {/* Elapsed / Total duration */}
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <span
                  style={{
                    color: 'var(--fp-text)',
                    fontWeight: 700,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {formatTime(currentTime)}
                </span>
                <span>/</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {formatTime(duration)}
                </span>
              </div>

              {/* Live Web Audio Responsive Equalizer Spectrum */}
              <RetroEqualizerCanvas analyser={analyser} isPlaying={isPlaying} />
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
              <span style={{ color: 'var(--fp-primary)', fontWeight: 600 }}>
                {isPlaying ? 'LOFI: PLAYING' : 'TUNED: OK'}
              </span>
              <span>HI-FI STEREO</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <span>SIG:</span>
              <span style={{ color: 'var(--fp-primary)', fontWeight: 700 }}>
                {isPlaying ? ' ▂▄▅██' : ' ▂▄▅█'}
              </span>
            </div>
          </div>
        </div>

        {/* === RIGHT ROTARY WHEEL (Master Volume: 0 to 2π) === */}
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
            VOL WHEEL
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {/* Step down button */}
            <button
              type="button"
              onClick={() => setVolume(Math.max(0, Number((volume - 0.05).toFixed(2))))}
              className="fp-btn fp-btn--icon fp-wheel-btn--flank"
              style={{
                width: '28px',
                height: '28px',
                padding: 0,
                fontSize: '12px',
                fontWeight: 800,
                fontFamily: 'JetBrains Mono, monospace',
              }}
              title="Decrease Volume (-5%)"
              aria-label="Decrease Volume"
            >
              -
            </button>

            {/* Rotatable Physical Volume Wheel Knob (64px) */}
            <div
              ref={volWheelRef}
              onPointerDown={handleVolPointerDown}
              onPointerMove={handleVolPointerMove}
              onPointerUp={handleVolPointerUp}
              onPointerCancel={handleVolPointerUp}
              onWheel={handleVolumeWheel}
              role="slider"
              tabIndex={0}
              aria-label={`Rotary Volume Wheel. Current volume: ${Math.round(volume * 100)}%. Drag around to rotate, scroll, or use arrows.`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(volume * 100)}
              onKeyDown={handleVolKeyDown}
              title={`Rotary Volume: ${Math.round(volume * 100)}% (${(volume * 2).toFixed(2)}π rad). Drag around wheel to adjust (0 to 2π), scroll wheel, or click center to mute.`}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--fp-surface-2) 0%, var(--fp-surface) 50%, var(--fp-surface-2) 100%)',
                border: '3px solid var(--fp-border)',
                boxShadow: isDraggingVol
                  ? '1px 1px 0 var(--fp-shadow), inset 0 0 0 2px rgba(255,255,255,0.25)'
                  : '3px 3px 0 var(--fp-shadow), inset 0 0 0 2px rgba(255,255,255,0.15)',
                display: 'grid',
                placeItems: 'center',
                cursor: isDraggingVol ? 'grabbing' : 'grab',
                position: 'relative',
                touchAction: 'none',
              }}
            >
              {/* Circular Gauge Track (0 to 2π) */}
              <svg
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                }}
                viewBox="0 0 64 64"
              >
                {/* Background Track Circle */}
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  fill="none"
                  stroke="var(--fp-border)"
                  strokeWidth="2"
                  strokeDasharray="2 3"
                  opacity="0.35"
                />
                {/* Active Volume Arc: 0 to 2π (0 rad = 0%, 2π rad = 100%) */}
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  fill="none"
                  stroke={!isMuted ? 'var(--fp-primary)' : 'var(--fp-muted)'}
                  strokeWidth="3"
                  strokeDasharray={163.36}
                  strokeDashoffset={163.36 * (1 - volume)}
                  strokeLinecap="round"
                  transform="rotate(-90 32 32)"
                  style={{
                    transition: isDraggingVol ? 'none' : 'stroke-dashoffset 0.15s cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                />
              </svg>

              {/* Rotating Wheel Rotor Body */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  transform: `rotate(${volAngleDeg}deg)`,
                  transition: isDraggingVol ? 'none' : 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)',
                  pointerEvents: 'none',
                }}
              >
                {/* Dashed inner circle */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '3px',
                    borderRadius: '50%',
                    border: '1px dashed var(--fp-border)',
                    opacity: 0.5,
                  }}
                />

                {/* Raised Tuning / Volume Needle Marker */}
                <div
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: 'calc(50% - 2px)',
                    width: '4px',
                    height: '9px',
                    background: !isMuted ? 'var(--fp-primary)' : 'var(--fp-muted)',
                    border: '1px solid var(--fp-border)',
                    boxShadow: !isMuted ? '0 0 4px var(--fp-primary)' : 'none',
                  }}
                />
              </div>

              {/* Static Upright Center Cap Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                title={isMuted ? 'Muted: Click to Unmute' : `Volume: ${Math.round(volume * 100)}% (Click to Mute)`}
                aria-label={isMuted ? 'Unmute Volume' : 'Mute Volume'}
                style={{
                  position: 'absolute',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: !isMuted ? 'var(--fp-surface)' : 'var(--fp-surface-2)',
                  border: '2px solid var(--fp-border)',
                  boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.2)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '9px',
                  fontWeight: 800,
                  fontFamily: 'JetBrains Mono, monospace',
                  color: !isMuted ? 'var(--fp-primary)' : 'var(--fp-muted)',
                  cursor: 'pointer',
                  zIndex: 3,
                  padding: 0,
                  userSelect: 'none',
                }}
              >
                {isMuted ? 'MUTE' : `${Math.round(volume * 100)}%`}
              </button>
            </div>

            {/* Step up button */}
            <button
              type="button"
              onClick={() => setVolume(Math.min(1, Number((volume + 0.05).toFixed(2))))}
              className="fp-btn fp-btn--icon fp-wheel-btn--flank"
              style={{
                width: '28px',
                height: '28px',
                padding: 0,
                fontSize: '12px',
                fontWeight: 800,
                fontFamily: 'JetBrains Mono, monospace',
              }}
              title="Increase Volume (+5%)"
              aria-label="Increase Volume"
            >
              +
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
            0 — 2π // ROTATE
          </div>
        </div>
      </div>

      {/* 2.5. Dedicated Cassette Transport Deck (Positioned between Screen and Section Buttons) */}
      <div
        className="fp-cassette-deck-bar"
        style={{
          marginTop: '12px',
          padding: '10px 14px',
          background: 'var(--fp-surface-2)',
          border: '2px solid var(--fp-border)',
          boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.06), 2px 2px 0 var(--fp-shadow)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
        }}
        role="toolbar"
        aria-label="Lo-Fi Cassette Player Controls"
      >
        {/* Tactile Transport Buttons Centered */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Previous Track / Rewind */}
          <button
            type="button"
            onClick={prevTrack}
            className="fp-cassette-deck-btn"
            title="Previous Track"
            aria-label="Previous Track"
            style={{ padding: '8px 18px' }}
          >
            <span style={{ fontSize: '13px' }}>◄◄</span>
            <span style={{ fontSize: '11px', fontWeight: 800 }}>PREV</span>
          </button>

          {/* Main Play / Pause Button - Larger & Prominent */}
          <button
            type="button"
            onClick={togglePlay}
            className={`fp-cassette-deck-btn ${isPlaying ? 'fp-cassette-deck-btn--active' : ''}`}
            title={isPlaying ? 'Pause LoFi Music' : 'Play LoFi Music'}
            aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
            aria-pressed={isPlaying}
            style={{
              padding: '8px 26px',
              fontSize: '12px',
              minWidth: '128px',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '14px' }}>{isPlaying ? '❚❚' : '▶'}</span>
            <span style={{ fontWeight: 800 }}>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
            <span
              className={`fp-led ${isPlaying ? 'fp-led--pulsing' : ''}`}
              style={{
                width: '6px',
                height: '6px',
                background: isPlaying ? '#ffffff' : 'var(--fp-muted)',
              }}
            />
          </button>

          {/* Next Track / Fast Forward */}
          <button
            type="button"
            onClick={nextTrack}
            className="fp-cassette-deck-btn"
            title="Next Track"
            aria-label="Next Track"
            style={{ padding: '8px 18px' }}
          >
            <span style={{ fontSize: '11px', fontWeight: 800 }}>NEXT</span>
            <span style={{ fontSize: '13px' }}>►►</span>
          </button>
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

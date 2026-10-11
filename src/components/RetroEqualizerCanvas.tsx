import React, { useEffect, useRef } from 'react';

interface RetroEqualizerCanvasProps {
  analyser: AnalyserNode | null;
  isPlaying: boolean;
}

// 11 frequency bin indices across the 32 FFT bins for balanced musical spectrum
const FREQ_BINS = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 18];

export const RetroEqualizerCanvas: React.FC<RetroEqualizerCanvasProps> = ({
  analyser,
  isPlaying,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resolve current theme color tokens
    const computed = getComputedStyle(canvas);
    const primaryColor = computed.getPropertyValue('--fp-primary').trim() || '#8fbf63';
    const borderColor = computed.getPropertyValue('--fp-border').trim() || '#212528';

    // Draw idle resting state when not playing
    const drawIdle = () => {
      ctx.clearRect(0, 0, 42, 14);
      ctx.fillStyle = borderColor;
      ctx.globalAlpha = 0.35;
      for (let i = 0; i < 11; i++) {
        ctx.fillRect(i * 4, 12, 2, 2);
      }
      ctx.globalAlpha = 1;
    };

    if (!isPlaying) {
      drawIdle();
      return;
    }

    const dataArray = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;
    let rafId: number;

    const render = () => {
      ctx.clearRect(0, 0, 42, 14);

      if (analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray);
      }

      ctx.fillStyle = primaryColor;

      for (let i = 0; i < 11; i++) {
        let level = 0;

        if (analyser && dataArray) {
          const bin = FREQ_BINS[i];
          const raw = dataArray[bin] || 0;
          level = raw / 255;
        } else {
          // Fallback rhythmic bounce if analyser is temporarily unavailable
          const time = performance.now() * 0.006;
          level = (Math.sin(time + i * 0.8) + 1) * 0.35 + 0.15;
        }

        // Discrete pixel height steps from 2px up to 13px (retro LCD feel)
        const barHeight = Math.max(2, Math.min(13, Math.round(level * 13)));
        const x = i * 4;
        const y = 14 - barHeight;

        ctx.fillRect(x, y, 2, barHeight);
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      drawIdle();
    };
  }, [analyser, isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      width={42}
      height={14}
      style={{
        width: '42px',
        height: '14px',
        display: 'block',
        imageRendering: 'pixelated',
      }}
      title={isPlaying ? 'Live Audio Spectrum' : 'Equalizer Standby'}
      aria-hidden="true"
    />
  );
};

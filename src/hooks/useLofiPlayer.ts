import { useState, useEffect, useRef, useCallback } from 'react';
import { LOFI_TRACKS, type LofiTrack } from '../data/lofiTracks';

export interface UseLofiPlayerReturn {
  currentTrack: LofiTrack;
  currentTrackIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progressPercent: number;
  volume: number;
  isMuted: boolean;
  autoReverse: boolean;
  tracks: LofiTrack[];
  analyser: AnalyserNode | null;
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  selectTrack: (index: number) => void;
  seek: (seconds: number) => void;
  seekByPercent: (percent: number) => void;
  setVolume: (val: number) => void;
  toggleMute: () => void;
  toggleAutoReverse: () => void;
}

export function useLofiPlayer(): UseLofiPlayerReturn {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [autoReverse, setAutoReverse] = useState(true);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  const [volume, setVolumeState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('fp-lofi-volume');
      return saved !== null ? Number(saved) : 0.75;
    } catch {
      return 0.75;
    }
  });

  const [isMuted, setIsMuted] = useState<boolean>(() => {
    try {
      return localStorage.getItem('fp-lofi-muted') === 'true';
    } catch {
      return false;
    }
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceConnectedRef = useRef(false);
  const autoReverseRef = useRef(autoReverse);
  const isPlayingRef = useRef(isPlaying);
  const shouldPlayNextRef = useRef(false);

  useEffect(() => {
    autoReverseRef.current = autoReverse;
  }, [autoReverse]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Connect Web Audio graph on first play for zero-latency frequency analysis
  const initAudioGraph = useCallback(() => {
    if (!audioRef.current || sourceConnectedRef.current) return;
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

      const analyserNode = ctx.createAnalyser();
      analyserNode.fftSize = 64; // 32 frequency bins, ultra light & fast
      analyserNode.smoothingTimeConstant = 0.75; // smooth vintage meter response

      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyserNode);
      analyserNode.connect(ctx.destination);

      sourceConnectedRef.current = true;
      setAnalyser(analyserNode);
    } catch {
      // AudioContext unavailable or restricted
    }
  }, []);

  // Play mechanical cassette tactile switch sound
  const playCassetteClick = useCallback((pitch = 300) => {
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

      // Quick dual micro-thump mimicking a mechanical spring lever
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // AudioContext unavailable
    }
  }, []);

  const currentTrack = LOFI_TRACKS[currentTrackIndex] || LOFI_TRACKS[0];

  // Initialize Audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.autoplay = false;
    audio.src = LOFI_TRACKS[0].src;
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const onPlay = () => {
      setIsPlaying(true);
    };

    const onPause = () => {
      // Only set isPlaying = false if not transitioning to next track
      if (!shouldPlayNextRef.current) {
        setIsPlaying(false);
      }
    };

    const onEnded = () => {
      // Signal that the next track MUST play automatically
      shouldPlayNextRef.current = true;
      setCurrentTrackIndex((prevIndex) => {
        const nextIdx = prevIndex + 1;
        if (nextIdx < LOFI_TRACKS.length) {
          return nextIdx;
        }
        // At end of tape: loop if auto-reverse enabled
        if (autoReverseRef.current) {
          return 0;
        }
        shouldPlayNextRef.current = false;
        return prevIndex;
      });
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Sync track source and auto-play when track index changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const shouldPlay = isPlayingRef.current || shouldPlayNextRef.current;
    shouldPlayNextRef.current = false;

    const targetSrc = currentTrack.src;
    const resolvedSrc = new URL(targetSrc, window.location.href).href;

    if (audio.src !== resolvedSrc) {
      audio.src = targetSrc;
      audio.currentTime = 0;
      setCurrentTime(0);

      if (shouldPlay) {
        initAudioGraph();
        if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    } else if (shouldPlay && (audio.paused || audio.ended)) {
      audio.currentTime = 0;
      initAudioGraph();
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [currentTrackIndex, currentTrack.src, initAudioGraph]);

  // Sync volume and mute
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    playCassetteClick(isPlayingRef.current ? 240 : 480);

    if (isPlayingRef.current) {
      shouldPlayNextRef.current = false;
      audio.pause();
      setIsPlaying(false);
    } else {
      initAudioGraph();
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [playCassetteClick, initAudioGraph]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || isPlayingRef.current) return;
    playCassetteClick(480);
    initAudioGraph();
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [playCassetteClick, initAudioGraph]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !isPlayingRef.current) return;
    playCassetteClick(240);
    shouldPlayNextRef.current = false;
    audio.pause();
    setIsPlaying(false);
  }, [playCassetteClick]);

  const nextTrack = useCallback(() => {
    playCassetteClick(520);
    shouldPlayNextRef.current = isPlayingRef.current;
    setCurrentTrackIndex((prev) => (prev + 1) % LOFI_TRACKS.length);
  }, [playCassetteClick]);

  const prevTrack = useCallback(() => {
    const audio = audioRef.current;
    playCassetteClick(360);
    // If more than 3 seconds into the song, restart song; otherwise go to previous
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setCurrentTime(0);
      if (isPlayingRef.current) {
        audio.play().catch(() => setIsPlaying(false));
      }
    } else {
      shouldPlayNextRef.current = isPlayingRef.current;
      setCurrentTrackIndex((prev) => (prev - 1 + LOFI_TRACKS.length) % LOFI_TRACKS.length);
    }
  }, [playCassetteClick]);

  const selectTrack = useCallback(
    (index: number) => {
      if (index >= 0 && index < LOFI_TRACKS.length) {
        playCassetteClick(400);
        shouldPlayNextRef.current = isPlayingRef.current;
        setCurrentTrackIndex(index);
      }
    },
    [playCassetteClick]
  );

  const seek = useCallback((seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const clamped = Math.max(0, Math.min(seconds, audio.duration || 0));
    audio.currentTime = clamped;
    setCurrentTime(clamped);
  }, []);

  const seekByPercent = useCallback((percent: number) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const clampedPct = Math.max(0, Math.min(100, percent));
    const targetTime = (clampedPct / 100) * audio.duration;
    audio.currentTime = targetTime;
    setCurrentTime(targetTime);
  }, []);

  const setVolume = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    }
    try {
      localStorage.setItem('fp-lofi-volume', String(clamped));
    } catch {
      // ignore
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('fp-lofi-muted', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const toggleAutoReverse = useCallback(() => {
    playCassetteClick(300);
    setAutoReverse((prev) => !prev);
  }, [playCassetteClick]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return {
    currentTrack,
    currentTrackIndex,
    isPlaying,
    currentTime,
    duration,
    progressPercent,
    volume,
    isMuted,
    autoReverse,
    tracks: LOFI_TRACKS,
    analyser,
    togglePlay,
    play,
    pause,
    nextTrack,
    prevTrack,
    selectTrack,
    seek,
    seekByPercent,
    setVolume,
    toggleMute,
    toggleAutoReverse,
  };
}

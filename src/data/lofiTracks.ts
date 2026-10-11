export interface LofiTrack {
  id: string;
  title: string;
  artist: string;
  category: string;
  src: string;
  side: 'A' | 'B';
  trackNumber: number;
}

const baseUrl = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export const LOFI_TRACKS: LofiTrack[] = [
  // --- SIDE A ---
  {
    id: 'pixel-quest-save-point',
    title: 'Pixel Quest Save Point',
    artist: 'OpenLo-Fi',
    category: 'Chiptune Lo-Fi',
    src: `${baseUrl}audio/lofi/pixel-quest-save-point.mp3`,
    side: 'A',
    trackNumber: 1,
  },
  {
    id: '2-am-debug-loop',
    title: '2 AM Debug Loop',
    artist: 'OpenLo-Fi',
    category: 'Late Night Coding',
    src: `${baseUrl}audio/lofi/2-am-debug-loop.mp3`,
    side: 'A',
    trackNumber: 2,
  },
  {
    id: 'terminal-rain',
    title: 'Terminal Rain',
    artist: 'OpenLo-Fi',
    category: 'Focus & Weather',
    src: `${baseUrl}audio/lofi/terminal-rain.mp3`,
    side: 'A',
    trackNumber: 3,
  },
  {
    id: 'continue-screen-dreams',
    title: 'Continue Screen Dreams',
    artist: 'OpenLo-Fi',
    category: 'Retro Gaming Chill',
    src: `${baseUrl}audio/lofi/continue-screen-dreams.mp3`,
    side: 'A',
    trackNumber: 4,
  },
  {
    id: 'rain-on-the-boulevard',
    title: 'Rain on the Boulevard',
    artist: 'OpenLo-Fi',
    category: 'Cozy Rain',
    src: `${baseUrl}audio/lofi/rain-on-the-boulevard.mp3`,
    side: 'A',
    trackNumber: 5,
  },
  {
    id: 'saxophone-in-the-rain',
    title: 'Saxophone in the Rain',
    artist: 'OpenLo-Fi',
    category: 'Jazz Lounge',
    src: `${baseUrl}audio/lofi/saxophone-in-the-rain.mp3`,
    side: 'A',
    trackNumber: 6,
  },

  // --- SIDE B ---
  {
    id: 'coffee-ring-notebook',
    title: 'Coffee Ring Notebook',
    artist: 'OpenLo-Fi',
    category: 'Mellow Study',
    src: `${baseUrl}audio/lofi/coffee-ring-notebook.mp3`,
    side: 'B',
    trackNumber: 7,
  },
  {
    id: 'first-coffee-thoughts',
    title: 'First Coffee Thoughts',
    artist: 'OpenLo-Fi',
    category: 'Morning Chill',
    src: `${baseUrl}audio/lofi/first-coffee-thoughts.mp3`,
    side: 'B',
    trackNumber: 8,
  },
  {
    id: 'after-school-rain',
    title: 'After School Rain',
    artist: 'OpenLo-Fi',
    category: 'Nostalgic Rain',
    src: `${baseUrl}audio/lofi/after-school-rain.mp3`,
    side: 'B',
    trackNumber: 9,
  },
  {
    id: 'lemonade-film-grain',
    title: 'Lemonade Film Grain',
    artist: 'OpenLo-Fi',
    category: 'Warm Memories',
    src: `${baseUrl}audio/lofi/lemonade-film-grain.mp3`,
    side: 'B',
    trackNumber: 10,
  },
  {
    id: 'rain-off-the-neon-signs',
    title: 'Rain Off the Neon Signs',
    artist: 'OpenLo-Fi',
    category: 'Late Night Neon',
    src: `${baseUrl}audio/lofi/rain-off-the-neon-signs.mp3`,
    side: 'B',
    trackNumber: 11,
  },
  {
    id: 'rooftop-static-dreams',
    title: 'Rooftop Static Dreams',
    artist: 'OpenLo-Fi',
    category: 'Late Night Lo-Fi',
    src: `${baseUrl}audio/lofi/rooftop-static-dreams.mp3`,
    side: 'B',
    trackNumber: 12,
  },
];

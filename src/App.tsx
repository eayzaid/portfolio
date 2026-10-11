import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HeaderNav } from './components/HeaderNav';
import { TickerBar } from './components/TickerBar';
import { ScrollToTopOnNav } from './components/ScrollToTopOnNav';
import { Footer } from './components/Footer';
import { PortfolioPage } from './pages/PortfolioPage';

const BlogPage = lazy(() => import('./pages/BlogPage').then((m) => ({ default: m.BlogPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));
const ResumeModal = lazy(() => import('./components/ResumeModal').then((m) => ({ default: m.ResumeModal })));

function RouteLoadingFallback() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '40vh',
        padding: '40px 20px',
        fontFamily: 'var(--fp-font-mono, "JetBrains Mono", monospace)',
      }}
    >
      <div
        style={{
          fontSize: '13px',
          color: 'var(--fp-accent)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '10px',
          fontWeight: 600,
        }}
      >
        LOADING ROUTE MODULE...
      </div>
      <div style={{ fontSize: '12px', color: 'var(--fp-muted)' }}>
        [ ░▒▓▒░▒▓▒░ ]
      </div>
    </div>
  );
}

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fp-theme') as 'light' | 'dark' | null;
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('fp-theme', theme);
    } catch {
      // localStorage may fail in private mode
    }
  }, [theme]);

  const handleToggleTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
  };

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTopOnNav />
      <div className="fp-shell">
        {/* Persistent Top Navigation Bar + Always Adhered Status Ticker */}
        <div style={{ width: '100%' }}>
          <HeaderNav
            theme={theme}
            onToggleTheme={handleToggleTheme}
          />
          <TickerBar />
        </div>

        {/* Dynamic Route Pages */}
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            <Route path="/" element={<PortfolioPage />} />
            <Route path="/blog/*" element={<BlogPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>

        {/* Persistent Footer */}
        <Footer />

        {/* Global Interactive Resume Modal (Lazy Loaded on Demand) */}
        {isResumeModalOpen && (
          <Suspense fallback={null}>
            <ResumeModal
              isOpen={isResumeModalOpen}
              onClose={() => setIsResumeModalOpen(false)}
            />
          </Suspense>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;

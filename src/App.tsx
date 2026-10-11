import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HeaderNav } from './components/HeaderNav';
import { TickerBar } from './components/TickerBar';
import { ScrollToTopOnNav } from './components/ScrollToTopOnNav';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { PortfolioPage } from './pages/PortfolioPage';
import { BlogPage } from './pages/BlogPage';
import { NotFoundPage } from './pages/NotFoundPage';

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
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/blog/*" element={<BlogPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* Persistent Footer */}
        <Footer />

        {/* Global Interactive Resume Modal */}
        <ResumeModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;

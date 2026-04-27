import { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import NavDots from './components/NavDots';
import { ThemeProvider } from './hooks/useTheme.jsx';
import ThemeToggle from './components/ThemeToggle';
import AmbientAudio from './components/AmbientAudio';
import CommandCenterLayout from './bimsearch/layout/CommandCenterLayout';
import DashboardPage from './bimsearch/pages/DashboardPage';
import PipelinePage from './bimsearch/pages/PipelinePage';
import PortalsPage from './bimsearch/pages/PortalsPage';
import ContactsPage from './bimsearch/pages/ContactsPage';

import HeroSection from './sections/HeroSection';
import KpiSection from './sections/KpiSection';
import VelocitySection from './sections/VelocitySection';
import SentimentSection from './sections/SentimentSection';
import TopicsSection from './sections/TopicsSection';
import EntitySection from './sections/EntitySection';
import TimelineSection from './sections/TimelineSection';
import ArcSection from './sections/ArcSection';
import BIMShowcaseSection from './sections/BIMShowcaseSection';
import StrengthsGapsSection from './sections/StrengthsGapsSection';
import SectionDivider from './three/SectionDivider';
import PipelineSection from './sections/PipelineSection';
import RiskSection from './sections/RiskSection';
import SprintSection from './sections/SprintSection';
import PeopleSection from './sections/PeopleSection';
import RoadmapSection from './sections/RoadmapSection';
import QuestionsSection from './sections/QuestionsSection';
import LinksSection from './sections/LinksSection';

function LoadingOverlay({ onDone }) {
  const [fading, setFading] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setFading(true), 1500);
    const t2 = setTimeout(() => onDone(), 1900);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [onDone]);
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'var(--bg-primary)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16,
      transition: 'opacity 0.4s ease',
      opacity: fading ? 0 : 1,
      pointerEvents: fading ? 'none' : 'all',
    }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan-400)', animation: 'pulse-dot 1.2s ease-in-out infinite' }} />
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Initializing...</span>
    </div>
  );
}

function ReviewApp() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setScrollProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0);

      const sections = el.querySelectorAll('[data-section]');
      sections.forEach((s, i) => {
        const rect = s.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.5 && rect.bottom > 0) {
          setActiveSection(i);
        }
      });
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = useCallback((index) => {
    const el = containerRef.current;
    if (!el) return;
    const sections = el.querySelectorAll('[data-section]');
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      {!loaded && <LoadingOverlay onDone={() => setLoaded(true)} />}
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          background: 'var(--bg-primary)',
        }}
      >
        <NavDots activeIndex={activeSection} onNavigate={navigateToSection} />
        <ThemeToggle />
        <AmbientAudio />

        <main id="main-content">
          <HeroSection scrollProgress={scrollProgress} />
          <KpiSection />
          <SectionDivider />
          <VelocitySection />
          <SentimentSection />
          <SectionDivider />
          <TopicsSection />
          <EntitySection />
          <TimelineSection />
          <SectionDivider />
          <StrengthsGapsSection />
          <PipelineSection />
          <BIMShowcaseSection />
          <RiskSection />
          <SprintSection />
          <PeopleSection />
          <RoadmapSection />
          <QuestionsSection />
          <LinksSection />
          <ArcSection />
        </main>
      </div>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ReviewApp />} />
          <Route path="/command-center" element={<CommandCenterLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="pipeline" element={<PipelinePage />} />
            <Route path="portals" element={<PortalsPage />} />
            <Route path="contacts" element={<ContactsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

import { useState, useEffect, useRef, useCallback } from 'react';
import './index.css';
import NavDots from './components/NavDots';
import HeroSection from './sections/HeroSection';
import KpiSection from './sections/KpiSection';
import VelocitySection from './sections/VelocitySection';
import SentimentSection from './sections/SentimentSection';
import TopicsSection from './sections/TopicsSection';
import EntitySection from './sections/EntitySection';
import TimelineSection from './sections/TimelineSection';
import ArcSection from './sections/ArcSection';

export default function App() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setScrollProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0);

      // Determine active section
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

      <main>
        <HeroSection scrollProgress={scrollProgress} />
        <KpiSection />
        <VelocitySection />
        <SentimentSection />
        <TopicsSection />
        <EntitySection />
        <TimelineSection />
        <ArcSection />
      </main>
    </div>
  );
}

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import VisionSection from './components/VisionSection';
import WorkSection from './components/WorkSection';
import ShakhaSection from './components/ShakhaSection';
import TimelineSection from './components/TimelineSection';
import NewsEventsSection from './components/NewsEventsSection';
import JoinUsSection from './components/JoinUsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import AdminPanel from './components/AdminPanel';
import DonationModal from './components/DonationModal';
import ScrollProgress from './components/ui/ScrollProgress';
import { NAVIGATION_LINKS } from './data/contentData';
import { useSmoothScroll } from './lib/SmoothScroll';
import useScrollSpy from './hooks/useScrollSpy';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('rhss_theme');
      if (saved) return saved === 'dark';
    } catch { /* ignore */ }
    return false;
  });
  const [searchOpen, setSearchOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [donationOpen, setDonationOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

  const sectionIds = useMemo(() => NAVIGATION_LINKS.map((l) => l.id), []);
  const activeSection = useScrollSpy(sectionIds);

  // Apply dark class to html root and persist
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    try { localStorage.setItem('rhss_theme', isDarkMode ? 'dark' : 'light'); } catch { /* ignore */ }
  }, [isDarkMode]);

  // Global keyboard shortcut: Ctrl/Cmd + K opens search
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleNavigate = useCallback((sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) scrollTo(el, { offset: sectionId === 'home' ? -200 : -64 });
  }, [scrollTo]);

  return (
    <div className="min-h-screen bg-amber-50/20 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-500">
      <ScrollProgress />

      <Header
        activeSection={activeSection}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenDonation={() => setDonationOpen(true)}
      />

      <main>
        <HeroSection onNavigate={handleNavigate} onOpenDonation={() => setDonationOpen(true)} />
        <AboutSection />
        <VisionSection />
        <WorkSection onJoinWork={() => handleNavigate('join')} />
        <ShakhaSection />
        <TimelineSection />
        <NewsEventsSection />
        <JoinUsSection />
        <ContactSection />
      </main>

      <Footer onNavigate={handleNavigate} onOpenDonation={() => setDonationOpen(true)} />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectSection={handleNavigate}
      />

      <DonationModal
        isOpen={donationOpen}
        onClose={() => setDonationOpen(false)}
      />

      <AdminPanel
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />
    </div>
  );
}

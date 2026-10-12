import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  Menu, X, Search, Moon, Sun, ChevronRight,
  Sparkles, Shield, UserPlus, Globe, Command
} from 'lucide-react';
import { ORG_DETAILS, NAVIGATION_LINKS } from '../data/contentData';
import { useLanguage } from '../context/LanguageContext';
import { EASE_OUT } from '../lib/motion';

export default function Header({
  activeSection,
  isDarkMode,
  setIsDarkMode,
  onNavigate,
  onOpenSearch,
  onOpenAdmin
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, toggleLanguage, t } = useLanguage();
  const { scrollY } = useScroll();

  // Shrink on scroll + hide on fast downward scroll, reveal on upward scroll
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setIsScrolled(latest > 80);
    if (latest > 400 && latest - prev > 6) setHidden(true);
    else if (prev - latest > 2 || latest < 400) setHidden(false);
  });

  // Close drawer on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="w-full relative z-50 select-none">
      {/* 1. TOP ANNOUNCEMENT TICKER */}
      <div className="bg-gradient-to-r from-[#3b1506] via-[#2a0f05] to-[#3b1506] text-amber-100 text-xs sm:text-sm py-1.5 px-4 flex items-center overflow-hidden border-b border-amber-700/30">
        <div className="flex items-center gap-2 font-bold px-3 py-0.5 bg-orange-600 text-white rounded text-[11px] shrink-0 z-10 shadow-sm uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>{t.latestUpdateTitle || "ताज़ा अपडेट"}</span>
        </div>
        <div className="overflow-hidden whitespace-nowrap relative flex-1 ml-3 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
          <div className="animate-marquee font-medium text-amber-200/90">
            <span className="pr-16">{t.tickerText}</span>
            <span className="pr-16" aria-hidden>{t.tickerText}</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3 shrink-0 ml-4 border-l border-amber-700/50 pl-4">
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 hover:text-white font-semibold text-xs text-amber-300 transition"
            title="प्रशासन नियंत्रण पैनल"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{t.adminPanelBtn || "एडमिन पैनल"}</span>
          </button>
          <span className="text-amber-700">|</span>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-1 rounded-md hover:bg-white/10 transition"
            title="थीम बदलें"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDarkMode ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="block"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-amber-200" />}
              </motion.span>
            </AnimatePresence>
          </button>
          <span className="text-amber-700">|</span>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-700/80 hover:bg-orange-600 text-white font-bold text-[11px] tracking-wider shadow transition"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'ENGLISH' : 'हिन्दी'}</span>
          </button>
        </div>
      </div>

      {/* 2. BRANDING MAIN HEADER */}
      <div className="relative bg-gradient-to-b from-amber-50 via-white to-orange-50/60 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 text-slate-800 dark:text-slate-100 py-5 px-4 sm:px-8 border-b border-amber-200/60 dark:border-white/5 transition-colors duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-40 dark:opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative">
          {/* Logo + Name */}
          <motion.div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-4 cursor-pointer group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <div className="relative">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 opacity-30 group-hover:opacity-90 blur-md transition duration-500" />
              <img
                src="/logo.png"
                alt="RHSS Logo"
                className="relative w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md transition duration-500 group-hover:scale-105 group-hover:rotate-3"
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gradient-saffron-dark dark:text-gradient-saffron tracking-tight leading-tight">
                {ORG_DETAILS.name}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-amber-800 dark:text-amber-400 tracking-[0.12em] uppercase mt-0.5">
                {ORG_DETAILS.englishName}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
                  स्थापना: {ORG_DETAILS.foundedDate} · प्रयागराज संगम
                </span>
              </div>
            </div>
          </motion.div>

          {/* Shloka & Quick Actions */}
          <motion.div
            className="hidden lg:flex flex-col items-end gap-2.5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
          >
            <div className="px-4 py-1.5 rounded-full bg-amber-100/70 dark:bg-amber-950/60 border border-amber-300/60 dark:border-amber-700/50 text-amber-900 dark:text-amber-200 text-xs font-serif italic shadow-inner">
              “{ORG_DETAILS.sanskritShloka}”
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenSearch}
                className="group flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300 text-xs font-medium hover:border-orange-300 hover:text-orange-700 dark:hover:text-amber-300 transition shadow-sm"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="w-32 text-left">{t.searchBtn || "खोजें..."}</span>
                <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-[10px] font-mono text-slate-400">
                  <Command className="w-2.5 h-2.5" />K
                </kbd>
              </button>
              <button
                onClick={() => handleNavClick('join')}
                className="btn-sheen flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs font-bold shadow-md shadow-orange-500/25 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all active:scale-95"
              >
                <UserPlus className="w-4 h-4" />
                <span>{t.joinVolunteerBtn || "स्वयंसेवक बनें"}</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. MAIN NAVIGATION BAR (STICKY) */}
      <motion.nav
        animate={{ y: hidden && !mobileMenuOpen ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
        className={`sticky top-0 z-40 text-white transition-[background,box-shadow,padding] duration-300 ${
          isScrolled
            ? 'bg-orange-700/90 dark:bg-slate-900/85 backdrop-blur-xl shadow-lg shadow-orange-950/25 py-0.5 border-b border-white/10'
            : 'bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950 py-1.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-0.5 py-1 relative">
            {NAVIGATION_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              const label = t.nav?.[link.id] || link.label;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 whitespace-nowrap ${
                    isActive ? 'text-orange-900 dark:text-slate-900' : 'text-orange-50/90 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-lg bg-amber-100 dark:bg-amber-300 shadow-md"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </div>

          {/* Compact brand on scrolled desktop */}
          <AnimatePresence>
            {isScrolled && (
              <motion.button
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                onClick={() => handleNavClick('home')}
                className="hidden lg:flex items-center gap-2 text-xs font-bold text-amber-100"
              >
                <img src="/logo.png" alt="" className="w-7 h-7 object-contain bg-white rounded-full p-0.5" />
                <span>RHSS</span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Mobile / tablet bar */}
          <div className="flex lg:hidden items-center justify-between w-full py-1">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 font-bold text-white text-sm"
            >
              <img src="/logo.png" alt="logo" className="w-8 h-8 object-contain bg-white rounded-full p-0.5" />
              <span className="truncate max-w-[180px]">{t.orgName || "राष्ट्रीय हिन्दू स्वयंसेवक संघ"}</span>
            </button>

            <div className="flex items-center gap-1.5">
              <button onClick={toggleLanguage} className="px-2 py-1.5 rounded-md bg-black/20 text-white font-bold text-[11px]">
                {lang === 'hi' ? 'EN' : 'हिं'}
              </button>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-md bg-black/20 text-amber-100" aria-label="Toggle theme">
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button onClick={onOpenSearch} className="p-2 rounded-md bg-black/20 text-amber-100" aria-label="Search">
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="p-2 rounded-md bg-black/20 text-amber-100"
                aria-label="Menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* 4. MOBILE DRAWER MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
            <motion.aside
              data-lenis-prevent
              className="absolute right-0 top-0 h-full w-[84%] max-w-sm bg-white dark:bg-slate-900 shadow-2xl p-6 overflow-y-auto flex flex-col justify-between border-l border-amber-500/30"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="RHSS" className="w-10 h-10 object-contain" />
                    <div>
                      <h3 className="font-bold text-orange-600 text-sm">{t.orgName}</h3>
                      <p className="text-[10px] text-slate-500">Prayagraj Sangam · 2022</p>
                    </div>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <motion.div
                  className="space-y-1"
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
                >
                  {NAVIGATION_LINKS.map((link) => (
                    <motion.button
                      key={link.id}
                      variants={{ hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0 } }}
                      onClick={() => handleNavClick(link.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition ${
                        activeSection === link.id
                          ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-500/30'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{t.nav?.[link.id] || link.label}</span>
                      <ChevronRight className="w-4 h-4 opacity-70" />
                    </motion.button>
                  ))}
                </motion.div>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <button
                  onClick={() => handleNavClick('join')}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-center shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>{t.joinVolunteerBtn || "स्वयंसेवक बनें"}</span>
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  <span>{t.adminPanelBtn || "एडमिन पैनल"}</span>
                </button>
                <div className="text-center text-[11px] text-slate-400">
                  © RHSS 2022–{new Date().getFullYear()}. {t.footer?.copyright || "सर्वाधिकार सुरक्षित।"}
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

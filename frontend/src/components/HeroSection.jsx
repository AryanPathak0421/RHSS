import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import { UserPlus, MapPin, Compass, ShieldCheck, ChevronRight, Sparkles, ChevronDown, Heart } from 'lucide-react';
import { ORG_DETAILS } from '../data/contentData';
import { useLanguage } from '../context/LanguageContext';
import CountUp from './ui/CountUp';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HeroSection({ onNavigate, onOpenDonation }) {
  const { t } = useLanguage();
  const hero = t.hero || {};
  const root = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const videoRef = useRef(null);

  // Respect reduced-motion: show the poster frame only, and pause the video when the hero is off-screen
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      video.removeAttribute('autoplay');
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.05 });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  useGSAP(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Entrance timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('[data-hero="bg"]', { scale: 1.15, opacity: 0, duration: 1.6, ease: 'power2.out' }, 0)
      .from('[data-hero="badge"]', { y: 20, opacity: 0, duration: 0.6 }, 0.3)
      .from('[data-hero="title"] > span', { y: 70, opacity: 0, skewY: 4, duration: 0.9, stagger: 0.12 }, 0.4)
      .from('[data-hero="tagline"]', { x: -30, opacity: 0, duration: 0.7 }, 0.8)
      .from('[data-hero="intro"]', { y: 24, opacity: 0, duration: 0.7 }, 0.95)
      .from('[data-hero="cta"] > *', { y: 24, opacity: 0, duration: 0.6, stagger: 0.1 }, 1.05)
      .from('[data-hero="quote"]', { y: 24, opacity: 0, duration: 0.7 }, 1.3)
      .from('[data-hero="stat"]', { y: 30, opacity: 0, duration: 0.6, stagger: 0.08 }, 1.35)
      .from('[data-hero="scroll"]', { opacity: 0, duration: 0.6 }, 1.8);

    if (reduce) { tl.progress(1); return; }

    // Parallax on scroll
    gsap.to(bgRef.current, {
      yPercent: 22,
      ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to(contentRef.current, {
      yPercent: -10,
      opacity: 0.25,
      ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom 30%', scrub: true },
    });
  }, { scope: root });

  const stats = [
    { value: hero.statDate || "2 दिसंबर 2022", label: hero.statDateLabel || "स्थापना दिवस (प्रयागराज)", color: 'text-amber-400' },
    { value: hero.statShakhas || "500+", label: hero.statShakhasLabel || "सक्रिय शाखाएँ व इकाइयाँ", color: 'text-orange-400' },
    { value: hero.statVolunteers || "50,000+", label: hero.statVolunteersLabel || "समर्पित स्वयंसेवक", color: 'text-amber-300' },
    { value: hero.statWork || "10+", label: hero.statWorkLabel || "सेवा एवं कल्याण क्षेत्र", color: 'text-yellow-400' },
  ];

  return (
    <section
      id="home"
      ref={root}
      className="relative overflow-hidden bg-slate-950 text-white min-h-[92vh] flex flex-col justify-between noise"
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div ref={bgRef} className="absolute -inset-y-[12%] inset-x-0 will-change-transform">
          <video
            data-hero="bg"
            ref={videoRef}
            className="w-full h-full object-cover object-center opacity-55"
            src="/hero_video.mp4"
            poster="/hero_banner.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-orange-950/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(251,146,60,0.22),transparent_55%)]" />
        <div className="absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />

        {/* Decorative floating orbs */}
        <div className="absolute -top-24 -right-24 w-[32rem] h-[32rem] rounded-full bg-orange-600/20 blur-3xl animate-float" />
        <div className="absolute bottom-10 -left-32 w-[26rem] h-[26rem] rounded-full bg-amber-500/15 blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

        {/* Rotating mandala ring */}
        <div className="absolute right-[-8rem] top-1/2 -translate-y-1/2 w-[34rem] h-[34rem] rounded-full border border-amber-400/15 animate-spin-slow hidden lg:block">
          <div className="absolute inset-10 rounded-full border border-dashed border-amber-400/20" />
          <div className="absolute inset-24 rounded-full border border-amber-400/10" />
        </div>
      </div>

      {/* Hero Central Content */}
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-16 pb-16 flex-1 flex flex-col justify-center">
        <div
          data-hero="badge"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 backdrop-blur-md text-amber-200 text-xs sm:text-sm font-semibold mb-7 self-start shadow-lg shadow-amber-500/10"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{hero.foundationBadge || "स्थापना दिवस: 2 दिसंबर 2022 | प्रयागराज संगम तट"}</span>
        </div>

        <div className="max-w-4xl">
          <h1 data-hero="title" className="text-4xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-extrabold tracking-tight text-white leading-[1.08] font-heading drop-shadow-lg">
            <span className="block text-amber-50">{hero.titleLine1 || "राष्ट्रीय हिन्दू"}</span>
            <span className="block text-gradient-saffron pb-2">{hero.titleLine2 || "स्वयंसेवक संघ"}</span>
          </h1>

          <p data-hero="tagline" className="mt-5 text-xl sm:text-2xl font-bold text-amber-200/90 font-serif italic border-l-4 border-orange-500 pl-4 py-1">
            “{t.tagline || ORG_DETAILS.tagline}”
          </p>

          <p data-hero="intro" className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {hero.intro}
          </p>
        </div>

        {/* CTAs */}
        <div data-hero="cta" className="mt-10 flex flex-wrap items-center gap-4">
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate('join')}
            className="btn-sheen group px-8 py-4 rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 text-white font-bold text-base shadow-xl shadow-orange-600/30 hover:shadow-orange-500/50 transition-shadow flex items-center gap-3"
          >
            <UserPlus className="w-5 h-5 group-hover:scale-110 transition" />
            <span>{hero.btnJoin || "हमसे जुड़ें (ऑनलाइन पंजीकरण)"}</span>
            <ChevronRight className="w-4 h-4 opacity-80 group-hover:translate-x-1 transition" />
          </motion.button>

          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenDonation}
            className="px-6 py-4 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 text-amber-200 border border-amber-400/50 hover:border-amber-300 font-bold text-base shadow-lg backdrop-blur-md transition-all flex items-center gap-2.5"
          >
            <Heart className="w-5 h-5 text-orange-400 fill-orange-400/20" />
            <span>{t.donateBtn || "सहयोग / समर्पण निधि"}</span>
          </motion.button>

          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate('shakha')}
            className="px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-amber-100 border border-amber-400/40 hover:border-amber-300 font-bold text-base shadow-lg backdrop-blur-md transition-colors flex items-center gap-2.5"
          >
            <MapPin className="w-5 h-5 text-amber-400" />
            <span>{hero.btnShakha || "शाखा खोजें / स्थान"}</span>
          </motion.button>

          <motion.button
            whileHover={{ x: 4 }}
            onClick={() => onNavigate('about')}
            className="px-5 py-4 rounded-xl text-slate-200 hover:text-white font-semibold text-base transition flex items-center gap-2 underline-offset-4 hover:underline decoration-amber-400/60"
          >
            <Compass className="w-5 h-5 text-amber-400" />
            <span>{hero.btnAbout || "हमारे बारे में समझें"}</span>
          </motion.button>
        </div>

        {/* Quote Card */}
        <div data-hero="quote" className="mt-10 p-4 sm:p-5 rounded-2xl bg-amber-950/40 border border-amber-500/30 backdrop-blur-md max-w-3xl flex items-center gap-4 shadow-xl">
          <div className="p-3 rounded-xl bg-orange-600/30 text-amber-400 shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-amber-200 font-bold text-sm sm:text-base">
              {hero.quote || "“राष्ट्र एवं समाज के लिए अपने समय और क्षमता के अनुसार योगदान दें।”"}
            </h4>
            <p className="text-slate-400 text-xs mt-1">
              {hero.founderTag || "संस्थापक: सनातनी अभय प्रताप सिंह | प्रयागराज संगम संकल्प"}
            </p>
          </div>
        </div>

        {/* Scroll cue */}
        <button
          data-hero="scroll"
          onClick={() => onNavigate('about')}
          className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-[11px] uppercase tracking-[0.25em] text-amber-200/60 hover:text-amber-200 transition"
          aria-label="Scroll down"
        >
          <span>Scroll</span>
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}>
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </button>
      </div>

      {/* Impact Stats Strip */}
      <div className="relative z-10 bg-slate-950/70 border-t border-amber-500/20 backdrop-blur-md py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              data-hero="stat"
              whileHover={{ y: -4 }}
              className="p-4 rounded-xl bg-white/[0.04] border border-amber-500/10 hover:border-amber-500/40 hover:bg-white/[0.07] transition-colors"
            >
              <div className={`text-2xl sm:text-3xl font-black font-heading ${s.color}`}>
                <CountUp value={s.value} />
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">{s.label}</div>
            </motion.div>
          ))}

          <div data-hero="stat" className="col-span-2 lg:col-span-1 p-2.5 rounded-xl bg-gradient-to-r from-orange-950/80 to-amber-950/80 border border-amber-500/40 flex items-center justify-center gap-3">
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 blur-sm opacity-70" />
              <img src="/president.jpg" alt="सनातनी अभय प्रताप सिंह" className="relative w-11 h-11 object-cover rounded-full border-2 border-amber-300 shrink-0" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">{hero.statLeader || "राष्ट्रीय अध्यक्ष"}</div>
              <div className="text-xs text-white font-black leading-tight">{hero.statLeaderName || "सनातनी अभय प्रताप सिंह"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

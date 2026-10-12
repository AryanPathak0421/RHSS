import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { History, Calendar, MapPin, Flag } from 'lucide-react';
import { TIMELINE_EVENTS } from '../data/contentData';
import { useLanguage } from '../context/LanguageContext';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function TimelineSection() {
  const { t } = useLanguage();
  const timelineTrans = t.timeline || {};
  const root = useRef(null);
  const lineRef = useRef(null);

  useGSAP(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = gsap.utils.toArray('[data-tl-item]');

    if (reduce) {
      gsap.set(lineRef.current, { scaleY: 1 });
      gsap.set(items, { opacity: 1, x: 0 });
      gsap.set('[data-tl-dot]', { scale: 1 });
      return;
    }

    // The vertical line draws itself as you scroll
    gsap.fromTo(lineRef.current, { scaleY: 0 }, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '[data-tl-track]',
        start: 'top 70%',
        end: 'bottom 60%',
        scrub: 0.6,
      },
    });

    // Each item slides in from its side; dot pops
    items.forEach((item) => {
      const dir = item.dataset.tlItem === 'left' ? -60 : 60;
      const dot = item.querySelector('[data-tl-dot]');
      const card = item.querySelector('[data-tl-card]');

      gsap.timeline({
        scrollTrigger: { trigger: item, start: 'top 80%', once: true },
      })
        .fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.5, ease: 'back.out(2.2)' })
        .fromTo(card, { opacity: 0, x: dir, y: 20 }, { opacity: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.25');
    });
  }, { scope: root });

  return (
    <section id="timeline" ref={root} className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white overflow-hidden noise">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48rem] h-[48rem] bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-dots opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-20">
        <SectionHeader
          tone="dark"
          icon={History}
          badge={timelineTrans.sectionBadge || "धारा 7: हमारी यात्रा — एक संक्षिप्त समयरेखा"}
          title={timelineTrans.headingMain || "स्थापना एवं"}
          highlight={timelineTrans.headingHighlight || "अब तक की यात्रा"}
          intro={timelineTrans.intro}
        />

        {/* Track */}
        <div data-tl-track className="relative max-w-4xl mx-auto py-4">
          {/* Base track */}
          <div className="absolute left-5 sm:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 rounded-full bg-white/10" />
          {/* Drawn line */}
          <div
            ref={lineRef}
            className="absolute left-5 sm:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-orange-500 via-amber-400 to-yellow-400 origin-top shadow-[0_0_18px_rgba(251,146,60,0.6)]"
          />

          <div className="space-y-14">
            {TIMELINE_EVENTS.map((event, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  data-tl-item={isLeft ? 'left' : 'right'}
                  className={`relative flex items-center ${isLeft ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}
                >
                  {/* Dot */}
                  <div
                    data-tl-dot
                    className="absolute left-5 sm:left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 border-4 border-slate-950 shadow-[0_0_0_4px_rgba(251,146,60,0.25)] flex items-center justify-center text-white z-20 font-black text-sm"
                  >
                    {idx + 1}
                  </div>

                  {/* Card */}
                  <div className={`w-full sm:w-[46%] pl-14 sm:pl-0 ${isLeft ? 'sm:pr-10 sm:text-right' : 'sm:pl-10 sm:text-left'}`}>
                    <div
                      data-tl-card
                      className="group relative p-6 rounded-2xl bg-white/[0.05] border border-amber-500/25 backdrop-blur-sm shadow-xl hover:border-amber-400/70 hover:bg-white/[0.08] transition-colors duration-300 space-y-3"
                    >
                      {/* Connector */}
                      <span className={`hidden sm:block absolute top-1/2 -translate-y-1/2 h-px w-10 bg-gradient-to-r from-amber-400/60 to-transparent ${isLeft ? '-right-10 rotate-180' : '-left-10'}`} />

                      <div className={`flex items-center gap-2 text-xs font-extrabold text-amber-400 ${isLeft ? 'sm:justify-end' : 'sm:justify-start'}`}>
                        <Calendar className="w-4 h-4 text-orange-400" />
                        <span>{event.date}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white font-heading group-hover:text-amber-300 transition">{event.title}</h3>
                      <div className={`flex items-center gap-1.5 text-xs text-slate-400 ${isLeft ? 'sm:justify-end' : 'sm:justify-start'}`}>
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>{event.place}</span>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Closing banner */}
        <Reveal variant="scaleIn" className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-amber-950/60 to-orange-950/40 border border-amber-500/30 text-center max-w-3xl mx-auto space-y-4 shadow-2xl overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="relative inline-flex p-3 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-600/40">
            <Flag className="w-6 h-6" />
          </div>
          <h3 className="relative text-2xl sm:text-3xl font-bold font-heading text-amber-200">
            “{t.tagline || "संगठित समाज — जागरूक समाज — सशक्त राष्ट्र"}”
          </h3>
          <p className="relative text-slate-300 text-sm sm:text-base leading-relaxed">{t.appealMessage}</p>
        </Reveal>
      </div>
    </section>
  );
}

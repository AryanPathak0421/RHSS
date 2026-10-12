import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Building2, MapPin, History, Shield, Target, Layers, Award, Heart } from 'lucide-react';
import { NATIONAL_LEADERS } from '../data/contentData';
import { useLanguage } from '../context/LanguageContext';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AboutSection() {
  const { t } = useLanguage();
  const about = t.about || {};
  const root = useRef(null);
  const imgRef = useRef(null);

  // Subtle parallax on the foundation image
  useGSAP(() => {
    gsap.fromTo(imgRef.current, { yPercent: -8 }, {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: { trigger: imgRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }, { scope: root });

  const pillars = [
    { icon: Target, title: about.pillarsTitle1 || "मूल उद्देश्य", desc: about.pillarsDesc1 || "हिंदू समाज को संगठित, अनुशासित और समर्थ बनाना। समाज के अंतिम व्यक्ति तक सेवा पहुँचाना।", tone: 'bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400' },
    { icon: Heart, title: about.pillarsTitle2 || "मूल मूल्य", desc: about.pillarsDesc2 || "सत्य, निष्काम सेवा, सामाजिक समरसता, चरित्र निर्माण और भारत माता के प्रति अनन्य भक्ति।", tone: 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400' },
    { icon: Layers, title: about.pillarsTitle3 || "कार्यपद्धति", desc: about.pillarsDesc3 || "दैनिक/साप्ताहिक शाखा, शारीरिक व्यायाम, बौद्धिक सत्र, सेवा प्रकल्प और सामूहिक बैठकें।", tone: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400' },
    { icon: Building2, title: about.pillarsTitle4 || "संगठनात्मक संरचना", desc: about.pillarsDesc4 || "केन्द्रीय कार्यकारिणी, प्रांत, संभाग, जिला, नगर एवं स्थानीय शाखा स्तर पर व्यवस्थित संचालन।", tone: 'bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400' },
  ];

  return (
    <section id="about" ref={root} className="relative py-24 px-4 sm:px-6 lg:px-8 bg-amber-50/40 dark:bg-slate-900 transition-colors overflow-hidden">
      <div className="absolute inset-0 bg-mandala opacity-70 dark:opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative">
        <SectionHeader
          icon={History}
          badge={about.sectionBadge || "धारा 2: हमारी पहचान एवं इतिहास"}
          title={about.headingMain || "हमारे"}
          highlight={about.headingHighlight || "बारे में"}
          intro={about.intro}
        />

        {/* Foundation story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <Reveal variant="slideLeft" className="lg:col-span-5 relative group">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-r from-orange-600 to-amber-500 opacity-20 group-hover:opacity-40 blur-2xl transition duration-700" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white dark:border-slate-800 aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
              <img
                ref={imgRef}
                src="/sangam.jpg"
                alt="Prayagraj Sangam Foundation"
                className="w-full h-[115%] -mt-[7%] object-cover will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>{about.sangamSubtitle || "2 दिसंबर 2022 | संगम तट, प्रयागराज (उ.प्र.)"}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading mt-1">{about.sangamTitle || "माँ गंगा को साक्षी मानकर स्थापना"}</h3>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7 space-y-8">
            <Reveal variant="slideRight" className="surface-card p-7 sm:p-8">
              <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400 font-heading mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6 text-amber-500" />
                <span>{about.historyTitle || "स्थापना एवं अब तक की यात्रा"}</span>
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">{about.historyDesc1}</p>
              <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed mt-3">{about.historyDesc2}</p>
            </Reveal>

            {/* Leadership */}
            <div className="space-y-5">
              <Reveal as="h4" className="text-xl font-extrabold text-slate-900 dark:text-white font-heading flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-600" />
                <span>{about.leadershipHeading || "केन्द्रीय नेतृत्व (National Leadership)"}</span>
              </Reveal>

              <Reveal.Group className="grid grid-cols-2 sm:grid-cols-3 gap-4" stagger={0.08}>
                {NATIONAL_LEADERS.map((leader) => (
                  <Reveal.Item key={leader.id}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      className={`h-full p-4 rounded-2xl bg-gradient-to-br ${leader.color} dark:from-slate-800 dark:to-slate-800/60 border ${leader.borderColor} shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between group`}
                    >
                      <div className="space-y-3">
                        <div className="relative mx-auto w-fit">
                          <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 opacity-60 group-hover:opacity-100 blur transition duration-300" />
                          <img
                            src={leader.photo}
                            alt={leader.name}
                            className="relative w-20 h-24 object-cover object-top rounded-lg border-2 border-amber-300 shadow-md"
                          />
                        </div>
                        <div className="text-center space-y-1">
                          <span className={`inline-block px-2 py-0.5 rounded-full ${leader.badgeColor} text-white font-bold text-[9px] uppercase tracking-wider`}>
                            {leader.title}
                          </span>
                          <h5 className="text-sm font-black text-slate-900 dark:text-white font-heading leading-tight">{leader.name}</h5>
                          <p className="text-[10px] font-semibold text-orange-700 dark:text-amber-400">{leader.role}</p>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed text-center mt-3">{leader.desc}</p>
                    </motion.div>
                  </Reveal.Item>
                ))}
              </Reveal.Group>
            </div>
          </div>
        </div>

        {/* 4 pillars */}
        <Reveal.Group className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.12}>
          {pillars.map((p, i) => (
            <Reveal.Item key={i}>
              <motion.div whileHover={{ y: -8 }} className="surface-card h-full p-6 group hover:shadow-glow transition-shadow duration-300">
                <div className={`w-12 h-12 rounded-xl ${p.tone} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition duration-300`}>
                  <p.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white font-heading mb-2">{p.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{p.desc}</p>
              </motion.div>
            </Reveal.Item>
          ))}
        </Reveal.Group>
      </div>
    </section>
  );
}

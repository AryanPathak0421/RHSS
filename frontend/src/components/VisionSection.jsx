import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ShieldCheck, Sun, Heart, Flame, Flag, BookOpen, FileText, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import { EASE_OUT } from '../lib/motion';

export default function VisionSection() {
  const [selectedPillar, setSelectedPillar] = useState(0);
  const { t, lang } = useLanguage();
  const vision = t.vision || {};
  const en = lang === 'en';

  const VISION_PILLARS = [
    { title: en ? "Organization" : "संगठन", subtitle: en ? "Unity & Harmony" : "एकता एवं समरसता", icon: ShieldCheck,
      desc: en ? "Strengthening unity, mutual cooperation, and organizational spirit in society across all divisions." : "समाज में एकता, परस्पर सहयोग और संगठनात्मक भावना को मजबूत करना। जाति, वर्ग या क्षेत्र से ऊपर उठकर एक सशक्त और अखंड समाज का निर्माण करना।" },
    { title: en ? "Culture" : "संस्कार", subtitle: en ? "Sanatan Heritage" : "सनातन परंपरा", icon: Sun,
      desc: en ? "Awareness of Indian culture, life values, and Sanatan traditions among youth and future generations." : "भारतीय संस्कृति, जीवन मूल्यों और सनातन परंपराओं के प्रति युवाओं में जागरूकता विकसित करना। नई पीढ़ी को अपनी सांस्कृतिक जड़ों से जोड़ना।" },
    { title: en ? "Character" : "चरित्र निर्माण", subtitle: en ? "Discipline & Virtues" : "अनुशासन व संयम", icon: Flame,
      desc: en ? "Developing discipline, self-restraint, courage, duty, and ethical responsibility in volunteers." : "युवाओं एवं स्वयंसेवकों में अनुशासन, आत्मसंयम, साहस, कर्तव्यनिष्ठा और नैतिक जिम्मेदारी की भावना को विकसित करना।" },
    { title: en ? "Service" : "सेवा", subtitle: en ? "Selfless Social Work" : "निष्काम समाज सेवा", icon: Heart,
      desc: en ? "Bringing relief through healthcare, education, and social aid to underprivileged sections." : "समाज के पीड़ित, वंचित और जरूरतमंद वर्गों के बीच सेवा, चिकित्सा, शिक्षा और आर्थिक सहयोग के माध्यम से समरसता लाना।" },
    { title: en ? "Patriotism" : "राष्ट्रभाव", subtitle: en ? "Devotion to Nation" : "समर्पण व कर्तव्य", icon: Flag,
      desc: en ? "Instilling deep love for the motherland, national pride, and contributing towards nation building." : "देश के प्रति अनन्य प्रेम, राष्ट्रीय गौरव, सुरक्षा एवं स्वाभिमान की भावना को जीवन में उतारना और राष्ट्र निर्माण में भूमिका निभाना।" },
  ];

  const docs = [
    { icon: BookOpen, color: 'text-orange-400', title: vision.doc1Title || "राष्ट्र एवं समाज दृष्टिकोण", desc: vision.doc1Desc || "राष्ट्र केवल भूमि का टुकड़ा नहीं है, बल्कि चेतन समाज का स्वरूप है। समाज की एकता ही देश का वास्तविक संबल है।" },
    { icon: Sun, color: 'text-amber-400', title: vision.doc2Title || "सांस्कृतिक समरसता", desc: vision.doc2Desc || "सनातन संस्कृति का मूल मंत्र वसुधैव कुटुंबकम् और सर्वजन हिताय है। जातिगत भेद मिटाकर सामाजिक समरसता स्थापित करना।" },
    { icon: FileText, color: 'text-yellow-400', title: vision.doc3Title || "सेवा व अनुशासन", desc: vision.doc3Desc || "बिना किसी व्यक्तिगत प्रचार या स्वार्थ के निष्काम भाव से निरंतर सेवा कार्य करते रहना ही संघ का प्रमुख आचार-विचार है।" },
  ];

  const current = VISION_PILLARS[selectedPillar];
  const CurrentIcon = current.icon;

  return (
    <section id="vision" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white overflow-hidden noise">
      <div className="absolute inset-0 bg-dots opacity-60" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[50rem] h-[50rem] rounded-full bg-orange-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        <SectionHeader
          tone="dark"
          icon={Compass}
          badge={vision.sectionBadge || "धारा 3: हमारी कार्यदृष्टि एवं सिद्धांत"}
          title={vision.headingMain || "ध्येय एवं"}
          highlight={vision.headingHighlight || "सिद्धांत"}
          intro={vision.intro}
        />

        {/* Pillar selector */}
        <Reveal.Group className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4" stagger={0.08}>
          {VISION_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isSelected = selectedPillar === idx;
            return (
              <Reveal.Item key={idx}>
                <motion.button
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPillar(idx)}
                  className={`relative w-full h-full p-5 rounded-2xl text-left border flex flex-col justify-between overflow-hidden transition-colors duration-300 ${
                    isSelected ? 'border-amber-400/70 text-white' : 'bg-white/[0.04] border-white/10 hover:border-amber-500/40 text-slate-200'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="vision-active"
                      className="absolute inset-0 bg-gradient-to-b from-orange-600 to-amber-700 shadow-2xl shadow-orange-600/30"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${isSelected ? 'bg-white text-orange-600 shadow-lg' : 'bg-white/10 text-amber-400'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold font-heading">{pillar.title}</h3>
                    <p className={`text-xs mt-1 ${isSelected ? 'text-amber-100' : 'text-slate-400'}`}>{pillar.subtitle}</p>
                  </div>
                  <div className={`relative mt-4 flex items-center gap-1 text-xs font-semibold ${isSelected ? 'text-white' : 'text-amber-400'}`}>
                    <span>{t.work?.readMore || "विस्तार देखें"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </motion.button>
              </Reveal.Item>
            );
          })}
        </Reveal.Group>

        {/* Selected pillar detail */}
        <Reveal variant="scaleIn" className="surface-dark p-8 sm:p-10 border-amber-500/25 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-orange-600/10 blur-3xl pointer-events-none" />
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPillar}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="flex flex-col md:flex-row items-center gap-8 relative"
            >
              <motion.div
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shrink-0 shadow-xl shadow-orange-600/30"
              >
                <CurrentIcon className="w-10 h-10" />
              </motion.div>
              <div className="flex-1 space-y-3 text-center md:text-left">
                <div className="inline-block px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                  {en ? `Pillar #0${selectedPillar + 1}` : `सिद्धांत #0${selectedPillar + 1}`}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                  {current.title} <span className="text-amber-300/80 font-normal">—</span> {current.subtitle}
                </h3>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-4xl">{current.desc}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </Reveal>

        {/* Philosophy docs */}
        <Reveal.Group className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.12}>
          {docs.map((d, i) => (
            <Reveal.Item key={i}>
              <motion.div whileHover={{ y: -6 }} className="h-full p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-amber-500/40 transition-colors space-y-3">
                <div className="flex items-center gap-3 text-amber-300 font-bold font-heading text-lg">
                  <d.icon className={`w-5 h-5 ${d.color}`} />
                  <span>{d.title}</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{d.desc}</p>
              </motion.div>
            </Reveal.Item>
          ))}
        </Reveal.Group>
      </div>
    </section>
  );
}

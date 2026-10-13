import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ChevronUp, Sparkles, MapPin, Phone, ShieldCheck, Info, Heart } from 'lucide-react';
import { ORG_DETAILS, NAVIGATION_LINKS } from '../data/contentData';
import { useLanguage } from '../context/LanguageContext';
import { useSmoothScroll } from '../lib/SmoothScroll';
import Reveal from './ui/Reveal';
import Modal from './ui/Modal';

export default function Footer({ onNavigate, onOpenDonation }) {
  const { t, lang } = useLanguage();
  const footerTrans = t.footer || {};
  const en = lang === 'en';
  const { scrollTo } = useSmoothScroll();
  const { scrollY } = useScroll();
  const [showTop, setShowTop] = useState(false);
  const [legal, setLegal] = useState(null);

  useMotionValueEvent(scrollY, 'change', (y) => setShowTop(y > 600));

  const legalContent = {
    privacy: {
      title: footerTrans.privacy || "गोपनीयता नीति",
      icon: ShieldCheck,
      body: en
        ? 'All volunteer information collected by the organization is kept strictly confidential and secure. It is used only for organizational communication and is never shared with third parties.'
        : 'संगठन द्वारा एकत्र की गई स्वयंसेवकों की समस्त जानकारी पूर्णतः गोपनीय एवं सुरक्षित रखी जाती है। इसका उपयोग केवल संगठनात्मक संपर्क हेतु किया जाता है और इसे किसी तीसरे पक्ष के साथ साझा नहीं किया जाता।',
    },
    terms: {
      title: footerTrans.terms || "नियम एवं शर्तें",
      icon: Info,
      body: en
        ? 'By registering, volunteers agree to follow the organization\'s code of conduct, discipline, and selfless service values. Membership may be reviewed in case of violation.'
        : 'पंजीकरण के साथ स्वयंसेवक संगठन की आचार संहिता, अनुशासन एवं निष्काम सेवा के मूल्यों का पालन करने हेतु सहमत होते हैं। उल्लंघन की स्थिति में सदस्यता की समीक्षा की जा सकती है।',
    },
  };

  return (
    <footer className="relative bg-slate-950 text-slate-300 border-t border-amber-500/20 select-none overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-40 bg-orange-600/10 blur-3xl pointer-events-none" />

      {/* Back to top (floating) */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollTo(0, { offset: 0 })}
            className="fixed bottom-6 right-6 z-[80] p-3.5 rounded-full bg-gradient-to-br from-orange-600 to-amber-600 text-white shadow-2xl shadow-orange-600/40"
            title={en ? 'Scroll to top' : 'ऊपर जाएँ'}
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 relative">
        <Reveal.Group className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10" stagger={0.12}>
          {/* Brand */}
          <Reveal.Item className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-4">
              <img src="/logo.png" alt="RHSS Logo" className="w-16 h-16 object-contain bg-white rounded-full p-1 shadow-lg shadow-orange-500/20" />
              <div>
                <h3 className="text-2xl font-black font-heading text-amber-300">{t.orgName || ORG_DETAILS.name}</h3>
                <p className="text-xs text-amber-100/80 font-semibold tracking-wider uppercase">{t.englishName || ORG_DETAILS.englishName}</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">{t.hero?.intro}</p>
            <div className="p-4 rounded-xl bg-white/[0.04] border border-amber-500/20 text-xs text-amber-200/90 font-serif italic">
              “{t.tagline || ORG_DETAILS.tagline}”
            </div>
            <div className="pt-1">
              <button
                onClick={onOpenDonation}
                className="btn-sheen inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs shadow-lg shadow-orange-600/30 hover:shadow-orange-500/40 transition-all hover:-translate-y-0.5"
              >
                <Heart className="w-4 h-4 fill-white/20" />
                <span>{t.donateBtn || "समर्पण निधि / सहयोग करें"}</span>
              </button>
            </div>
          </Reveal.Item>

          {/* Quick links */}
          <Reveal.Item className="lg:col-span-3 space-y-4">
            <h4 className="text-lg font-bold text-white font-heading border-b border-amber-500/30 pb-2 inline-block">
              {footerTrans.quickNav || "त्वरित नेविगेशन"}
            </h4>
            <ul className="space-y-2 text-sm">
              {NAVIGATION_LINKS.slice(0, 6).map((link) => (
                <li key={link.id}>
                  <button onClick={() => onNavigate(link.id)} className="group hover:text-amber-400 transition flex items-center gap-1.5">
                    <span className="text-orange-500 group-hover:translate-x-1 transition">›</span>
                    <span>{t.nav?.[link.id] || link.label}</span>
                  </button>
                </li>
              ))}
              <li>
                <button onClick={onOpenDonation} className="group text-amber-300 font-bold hover:text-amber-200 transition flex items-center gap-1.5">
                  <span className="text-orange-500 group-hover:translate-x-1 transition">›</span>
                  <span>{en ? "Donation & QR Code" : "समर्पण निधि (बैंक / QR)"}</span>
                </button>
              </li>
            </ul>
          </Reveal.Item>

          {/* Org details */}
          <Reveal.Item className="lg:col-span-4 space-y-4">
            <h4 className="text-lg font-bold text-white font-heading border-b border-amber-500/30 pb-2 inline-block">
              {footerTrans.orgDetails || "संगठन विवरण"}
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span><strong>{footerTrans.founderLabel || "संस्थापक:"}</strong> Sanatani Abhay Pratap Singh</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-1" />
                <span><strong>{footerTrans.foundedLabel || "स्थापना तिथि व स्थल:"}</strong> 2 Dec 2022 | {en ? 'Prayagraj Sangam Confluence' : 'प्रयागराज संगम तट'}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span><strong>{footerTrans.helplineLabel || "केन्द्रीय हेल्पलाइन:"}</strong> +91 98390 12345</span>
              </li>
            </ul>
          </Reveal.Item>
        </Reveal.Group>

        <Reveal variant="fadeIn" className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {t.orgName || ORG_DETAILS.name} ({ORG_DETAILS.shortName}). {footerTrans.copyright || "सर्वाधिकार सुरक्षित।"}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setLegal('privacy')} className="hover:text-amber-400 transition">{footerTrans.privacy || "गोपनीयता नीति"}</button>
            <span className="text-slate-600">•</span>
            <button onClick={() => setLegal('terms')} className="hover:text-amber-400 transition">{footerTrans.terms || "नियम एवं शर्तें"}</button>
          </div>
        </Reveal>
      </div>

      <Modal isOpen={!!legal} onClose={() => setLegal(null)} size="sm" labelledBy="legal-title">
        {legal && (
          <div className="p-7 space-y-4">
            <div className="flex items-center gap-3 text-orange-600 dark:text-amber-400">
              {React.createElement(legalContent[legal].icon, { className: 'w-6 h-6' })}
              <h3 id="legal-title" className="text-xl font-bold font-heading">{legalContent[legal].title}</h3>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{legalContent[legal].body}</p>
            <button onClick={() => setLegal(null)} className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-sm">
              {t.work?.closeBtn || "बंद करें"}
            </button>
          </div>
        )}
      </Modal>
    </footer>
  );
}

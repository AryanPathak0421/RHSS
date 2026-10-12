import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, Calendar, MapPin, Clock, User, ChevronRight, CheckCircle2, Sparkles, ArrowUpRight } from 'lucide-react';
import { LATEST_NEWS, UPCOMING_EVENTS } from '../data/contentData';
import { useLanguage } from '../context/LanguageContext';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import Modal from './ui/Modal';
import { EASE_OUT, staggerItem } from '../lib/motion';

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export default function NewsEventsSection() {
  const [activeTab, setActiveTab] = useState('news');
  const [rsvpModal, setRsvpModal] = useState(null);
  const [rsvpDone, setRsvpDone] = useState(false);
  const { t, lang } = useLanguage();
  const neTrans = t.newsEvents || {};
  const en = lang === 'en';

  const tabs = [
    { id: 'news', icon: Newspaper, label: `${neTrans.tabNews || "नवीनतम समाचार"} (${LATEST_NEWS.length})` },
    { id: 'events', icon: Calendar, label: `${neTrans.tabEvents || "आगामी कार्यक्रम"} (${UPCOMING_EVENTS.length})` },
  ];

  return (
    <section id="news" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-amber-50/40 dark:bg-slate-900 transition-colors overflow-hidden">
      <div className="absolute inset-0 bg-mandala opacity-60 dark:opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative">
        <SectionHeader
          icon={Newspaper}
          badge={en ? 'News & Activities' : 'समाचार एवं गतिविधियाँ'}
          title={neTrans.headingMain || "नवीनतम"}
          highlight={neTrans.headingHighlight || "समाचार व कार्यक्रम"}
        />

        {/* Tabs */}
        <Reveal className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-slate-800 border border-amber-200/60 dark:border-white/10 shadow-soft">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-5 sm:px-6 py-2.5 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 transition-colors ${
                    active ? 'text-white' : 'text-slate-600 dark:text-slate-300 hover:text-orange-700 dark:hover:text-amber-300'
                  }`}
                >
                  {active && (
                    <motion.span layoutId="news-tab" className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 shadow-lg shadow-orange-600/30" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />
                  )}
                  <tab.icon className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          {activeTab === 'news' ? (
            <motion.div key="news" variants={gridVariants} initial="hidden" animate="visible" exit="exit" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {LATEST_NEWS.map((item) => (
                <motion.article
                  key={item.id}
                  variants={staggerItem}
                  whileHover={{ y: -8 }}
                  className="surface-card overflow-hidden hover:shadow-glow transition-shadow duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold bg-orange-600 text-white shadow-md">
                        {item.category}
                      </div>
                    </div>
                    <div className="p-5 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-orange-600" />
                        <span>{item.date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading group-hover:text-orange-600 dark:group-hover:text-amber-300 transition leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed line-clamp-3">{item.summary}</p>
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <button className="w-full py-2 px-3 rounded-lg bg-slate-50 dark:bg-slate-700 group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-amber-600 group-hover:text-white text-slate-700 dark:text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1">
                      <span>{neTrans.readFull || "पूरा समाचार पढ़ें"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div key="events" variants={gridVariants} initial="hidden" animate="visible" exit="exit" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {UPCOMING_EVENTS.map((evt) => (
                <motion.article
                  key={evt.id}
                  variants={staggerItem}
                  whileHover={{ y: -8 }}
                  className="surface-card p-6 space-y-4 flex flex-col justify-between hover:shadow-glow hover:border-orange-400/60 transition-[box-shadow,border-color] duration-300"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-200">
                        {en ? 'Upcoming Event' : 'आगामी आयोजन'}
                      </span>
                      <span className="text-[11px] text-orange-600 dark:text-amber-400 font-bold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{en ? 'RSVP Open' : 'पंजीकरण खुला'}</span>
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">{evt.title}</h3>
                    <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                      {[
                        [Calendar, 'text-orange-600', en ? 'Date:' : 'दिनांक:', evt.date],
                        [Clock, 'text-amber-600', en ? 'Time:' : 'समय:', evt.time],
                        [MapPin, 'text-red-600', en ? 'Venue:' : 'स्थान:', evt.venue],
                        [User, 'text-emerald-600', en ? 'Keynote:' : 'मुख्य वक्ता:', evt.speaker],
                      ].map(([Icon, color, label, value], i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${color}`} />
                          <span><strong>{label}</strong> {value}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 bg-amber-50 dark:bg-slate-900 p-3 rounded-xl border border-amber-100 dark:border-slate-800">{evt.desc}</p>
                  </div>
                  <button
                    onClick={() => { setRsvpModal(evt); setRsvpDone(false); }}
                    className="btn-sheen w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-sm shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition"
                  >
                    {neTrans.rsvpBtn || "कार्यक्रम में भाग लें (RSVP)"}
                  </button>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RSVP Modal */}
      <Modal isOpen={!!rsvpModal} onClose={() => setRsvpModal(null)} size="sm" labelledBy="rsvp-title">
        {rsvpModal && (
          <div className="p-7 space-y-4">
            <h3 id="rsvp-title" className="text-xl font-bold text-orange-600 font-heading pr-8">{neTrans.rsvpTitle || "कार्यक्रम हेतु भाग लेने का पंजीकरण"}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              <strong>{rsvpModal.title}</strong> — {rsvpModal.date}
            </p>

            {rsvpDone ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 text-center space-y-2">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}>
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                </motion.div>
                <h4 className="font-bold">{en ? 'Your seat has been reserved!' : 'आपका स्थान सुरक्षित कर लिया गया है!'}</h4>
                <p className="text-xs">{en ? 'Please arrive on time to mark your attendance.' : 'समय पर पहुँच कर अपनी उपस्थिति दर्ज कराएँ।'}</p>
                <button onClick={() => setRsvpModal(null)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg mt-2">
                  {en ? 'OK' : 'ठीक है'}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setRsvpDone(true); }} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">{t.join?.nameLabel || "आपका नाम"}</label>
                  <input required type="text" placeholder={en ? 'Full name' : 'पूरा नाम'} className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20" />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">{t.join?.phoneLabel || "मोबाइल नंबर"}</label>
                  <input required type="tel" placeholder={en ? '10-digit number' : '10 अंकों का नंबर'} className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20" />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <button type="submit" className="flex-1 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-lg">{en ? 'Confirm RSVP' : 'पुष्टि करें'}</button>
                  <button type="button" onClick={() => setRsvpModal(null)} className="py-2.5 px-4 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-lg">{en ? 'Cancel' : 'रद्द करें'}</button>
                </div>
              </form>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}

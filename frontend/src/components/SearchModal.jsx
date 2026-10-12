import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronRight, Briefcase, MapPin, Newspaper, CornerDownLeft } from 'lucide-react';
import { WORK_CATEGORIES, SHAKHA_LOCATIONS, LATEST_NEWS } from '../data/contentData';
import { useLanguage } from '../context/LanguageContext';
import Modal from './ui/Modal';

export default function SearchModal({ isOpen, onClose, onSelectSection }) {
  const [query, setQuery] = useState('');
  const { t, lang } = useLanguage();
  const en = lang === 'en';

  const q = query.trim().toLowerCase();
  const groups = useMemo(() => {
    if (!q) return [];
    const has = (...vals) => vals.some((v) => String(v || '').toLowerCase().includes(q));
    return [
      { id: 'work', icon: Briefcase, color: 'text-orange-600', label: en ? 'Our Work' : 'हमारे कार्यप्रकल्प',
        items: WORK_CATEGORIES.filter((w) => has(w.title, w.shortDesc)).map((w) => ({ key: w.id, title: w.title, sub: w.shortDesc })) },
      { id: 'shakha', icon: MapPin, color: 'text-amber-600', label: en ? 'Shakhas' : 'शाखाएँ व इकाइयाँ',
        items: SHAKHA_LOCATIONS.filter((s) => has(s.name, s.district, s.area)).map((s) => ({ key: s.id, title: s.name, sub: `${s.state} • ${s.district} (${s.timing})` })) },
      { id: 'news', icon: Newspaper, color: 'text-red-600', label: en ? 'News' : 'समाचार',
        items: LATEST_NEWS.filter((n) => has(n.title, n.summary)).map((n) => ({ key: n.id, title: n.title, sub: `${n.date} - ${n.category}` })) },
    ].filter((g) => g.items.length);
  }, [q, en]);

  const total = groups.reduce((n, g) => n + g.items.length, 0);

  const close = () => { setQuery(''); onClose(); };
  const pick = (sectionId) => { onSelectSection(sectionId); close(); };

  return (
    <Modal isOpen={isOpen} onClose={close} size="lg" align="top" showClose={false}>
      <div className="p-5 sm:p-6 space-y-5">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <Search className="w-6 h-6 text-orange-600 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder={t.searchPlaceholder || "वेबसाइट पर सामग्री खोजें (उदा. गौसेवा, प्रयागराज, स्थापना...)"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base sm:text-lg bg-transparent outline-none text-slate-900 dark:text-white font-medium placeholder:text-slate-400"
          />
          <button onClick={close} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto space-y-6 pr-1" data-lenis-prevent>
          <AnimatePresence mode="wait">
            {!q ? (
              <motion.div key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-10 text-slate-400 text-sm space-y-3">
                <p>{en ? "Type to search (e.g. 'education', 'Prayagraj', 'shakha')" : "कृपया कुछ शब्द टाइप करें (उदा. 'शिक्षा', 'प्रयागराज', 'शाखा')"}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['गौसेवा', 'प्रयागराज', 'शिक्षा', 'शाखा'].map((s) => (
                    <button key={s} onClick={() => setQuery(s)} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-orange-100 hover:text-orange-700 transition">
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : total === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-10 text-slate-400 text-sm">
                {en ? 'No results found. Try a different keyword.' : 'कोई परिणाम नहीं मिला। कृपया भिन्न शब्द से प्रयास करें।'}
              </motion.div>
            ) : (
              <motion.div key="results" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.04 } } }} className="space-y-6">
                {groups.map((g) => (
                  <div key={g.id} className="space-y-2">
                    <h4 className={`text-[11px] font-bold ${g.color} uppercase tracking-wider flex items-center gap-1.5`}>
                      <g.icon className="w-4 h-4" />
                      <span>{g.label} ({g.items.length})</span>
                    </h4>
                    <div className="space-y-1">
                      {g.items.map((item) => (
                        <motion.button
                          key={item.key}
                          variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                          onClick={() => pick(g.id)}
                          className="w-full text-left p-3 rounded-xl hover:bg-amber-50 dark:hover:bg-slate-800 flex items-center justify-between group transition"
                        >
                          <div className="min-w-0">
                            <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm truncate">{item.title}</h5>
                            <p className="text-xs text-slate-500 line-clamp-1">{item.sub}</p>
                          </div>
                          <ChevronRight className={`w-4 h-4 text-slate-400 group-hover:${g.color} group-hover:translate-x-1 transition shrink-0`} />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden sm:flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400">
          <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 font-mono">Esc</kbd> {en ? 'to close' : 'बंद करें'}</span>
          <span className="flex items-center gap-1"><CornerDownLeft className="w-3 h-3" /> {en ? 'select' : 'चुनें'}</span>
        </div>
      </div>
    </Modal>
  );
}

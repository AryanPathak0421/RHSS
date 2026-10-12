import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase, HeartHandshake, GraduationCap, Activity, Shield,
  Leaf, LifeBuoy, Zap, Users, Sparkles, HandHeart, ChevronRight, TrendingUp
} from 'lucide-react';
import { WORK_CATEGORIES } from '../data/contentData';
import { useLanguage } from '../context/LanguageContext';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import Modal from './ui/Modal';

const ICON_MAP = { HeartHandshake, GraduationCap, Activity, Shield, Leaf, LifeBuoy, Zap, Users, Sparkles, HandHeart };

export default function WorkSection({ onJoinWork }) {
  const [selectedWork, setSelectedWork] = useState(null);
  const { t } = useLanguage();
  const workTrans = t.work || {};
  const SelectedIcon = selectedWork ? (ICON_MAP[selectedWork.icon] || Briefcase) : Briefcase;

  return (
    <section id="work" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50/60 via-amber-50/20 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 transition-colors overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] rounded-full bg-amber-300/20 dark:bg-orange-600/10 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-14 relative">
        <SectionHeader
          icon={Briefcase}
          badge={workTrans.sectionBadge || "धारा 4: हमारे आयाम एवं प्रकल्प"}
          title={workTrans.headingMain || "हमारे"}
          highlight={workTrans.headingHighlight || "कार्य"}
          intro={workTrans.intro}
        />

        <Reveal.Group className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" stagger={0.08}>
          {WORK_CATEGORIES.map((work, i) => {
            const Icon = ICON_MAP[work.icon] || Briefcase;
            return (
              <Reveal.Item key={work.id}>
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedWork(work)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedWork(work); } }}
                  className="group cursor-pointer h-full surface-card p-6 hover:shadow-glow hover:border-orange-400/60 transition-[box-shadow,border-color] duration-300 flex flex-col justify-between relative overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${work.color}`} />
                  <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-orange-500/0 group-hover:bg-orange-500/10 blur-2xl transition duration-500" />
                  <span className="absolute top-4 right-5 text-5xl font-black font-heading text-slate-900/[0.04] dark:text-white/[0.05] select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="relative">
                    <div className="flex items-center justify-between mb-5">
                      <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 group-hover:scale-110 group-hover:-rotate-6 transition duration-300 shadow-sm">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
                        {work.badge}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading group-hover:text-orange-600 dark:group-hover:text-orange-400 transition mb-2">
                      {work.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{work.shortDesc}</p>
                  </div>

                  <div className="relative pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between mt-5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-orange-600 dark:text-amber-400">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {work.stats}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-300 group-hover:text-orange-600 transition">
                      <span>{workTrans.readMore || "विस्तार पढ़ें"}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                    </span>
                  </div>
                </motion.article>
              </Reveal.Item>
            );
          })}
        </Reveal.Group>
      </div>

      {/* Details modal */}
      <Modal isOpen={!!selectedWork} onClose={() => setSelectedWork(null)} size="lg" labelledBy="work-modal-title">
        {selectedWork && (
          <div className="p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400">
                <SelectedIcon className="w-10 h-10" />
              </div>
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200">
                  {selectedWork.badge}
                </span>
                <h3 id="work-modal-title" className="text-3xl font-extrabold text-slate-900 dark:text-white font-heading mt-1">
                  {selectedWork.title}
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-bold text-orange-600 font-heading">{workTrans.modalTitle || "कार्य का विस्तृत विवरण"}</h4>
              <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">{selectedWork.fullDesc}</p>
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">प्रभाव व आंकड़े:</span>
                <span className="text-base font-extrabold text-orange-600 dark:text-amber-400">{selectedWork.stats}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => { setSelectedWork(null); onJoinWork?.(); }}
                className="btn-sheen w-full sm:flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-center shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition"
              >
                {workTrans.modalJoinBtn || "इस प्रकल्प में स्वयंसेवक बनें"}
              </button>
              <button
                onClick={() => setSelectedWork(null)}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                {workTrans.closeBtn || "बंद करें"}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

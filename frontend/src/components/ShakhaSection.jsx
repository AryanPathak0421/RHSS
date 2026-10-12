import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { MapPin, Clock, Phone, UserCheck, ExternalLink, Search, PlusCircle, CheckCircle, Navigation, SearchX } from 'lucide-react';
import { SHAKHA_LOCATIONS } from '../data/contentData';
import { useLanguage } from '../context/LanguageContext';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import Modal from './ui/Modal';
import { EASE_OUT } from '../lib/motion';

const inputCls = "w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition";

export default function ShakhaSection() {
  const { t, lang } = useLanguage();
  const shakhaTrans = t.shakha || {};
  const en = lang === 'en';

  const ALL = '__all__';
  const [selectedState, setSelectedState] = useState(ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [newShakhaModal, setNewShakhaModal] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const states = [
    { id: ALL, label: shakhaTrans.allStates || 'सभी प्रदेश' },
    ...['उत्तर प्रदेश', 'मध्य प्रदेश', 'दिल्ली'].map((s) => ({ id: s, label: s })),
  ];

  const filteredShakhas = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return SHAKHA_LOCATIONS.filter((s) => {
      const matchState = selectedState === ALL || s.state === selectedState;
      const matchQuery = !q || [s.name, s.district, s.area, s.place].some((v) => v.toLowerCase().includes(q));
      return matchState && matchQuery;
    });
  }, [selectedState, searchQuery]);

  const closeModal = () => { setNewShakhaModal(false); setSubmittedMessage(false); };

  return (
    <section id="shakha" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-amber-50/40 dark:bg-slate-900 transition-colors overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50 dark:opacity-20 [mask-image:radial-gradient(ellipse_at_top,#000,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative">
        <SectionHeader
          icon={MapPin}
          badge={shakhaTrans.sectionBadge || "धारा 5: दैनिक व साप्ताहिक शाखाएं"}
          title={shakhaTrans.headingMain || "शाखा /"}
          highlight={shakhaTrans.headingHighlight || "स्थानीय इकाइयाँ"}
          intro={shakhaTrans.intro}
        />

        {/* Filters */}
        <Reveal className="surface-card p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <LayoutGroup id="shakha-state">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none w-full md:w-auto p-1 rounded-xl bg-slate-100 dark:bg-slate-900">
              {states.map((s) => {
                const active = selectedState === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedState(s.id)}
                    className={`relative px-4 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
                      active ? 'text-white' : 'text-slate-600 dark:text-slate-300 hover:text-orange-700 dark:hover:text-amber-300'
                    }`}
                  >
                    {active && (
                      <motion.span layoutId="state-pill" className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 shadow-md" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />
                    )}
                    <span className="relative z-10">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          <div className="relative w-full md:w-80">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={shakhaTrans.searchPlaceholder || "जिला, क्षेत्र या शाखा खोजें..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
            />
          </div>
        </Reveal>

        {/* Cards */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[12rem]">
          <AnimatePresence mode="popLayout">
            {filteredShakhas.map((shakha) => (
              <motion.div
                key={shakha.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                whileHover={{ y: -6 }}
                className="surface-card p-6 hover:shadow-glow hover:border-amber-400/70 transition-[box-shadow,border-color] duration-300 flex flex-col justify-between gap-5"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300">
                      {shakha.state} • {shakha.district}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {en ? 'Active' : 'सक्रिय'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">{shakha.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {en ? 'Area:' : 'क्षेत्र:'} {shakha.area}
                  </p>

                  <div className="mt-4 space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
                    {[
                      [Clock, 'text-orange-600', en ? 'Timing:' : 'समय:', shakha.timing],
                      [MapPin, 'text-amber-600', en ? 'Venue:' : 'स्थान:', shakha.place],
                      [UserCheck, 'text-emerald-600', en ? 'In-charge:' : 'पदाधिकारी:', shakha.officer],
                      [Phone, 'text-blue-600', en ? 'Contact:' : 'संपर्क:', shakha.phone],
                    ].map(([Icon, color, label, value], i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <Icon className={`w-4 h-4 ${color} shrink-0 mt-0.5`} />
                        <span><strong className="text-slate-900 dark:text-white">{label}</strong> {value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={shakha.googleMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-50 dark:bg-slate-700 hover:bg-gradient-to-r hover:from-orange-600 hover:to-amber-600 hover:text-white text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{shakhaTrans.mapBtn || "गूगल मैप पर लोकेशन देखें"}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredShakhas.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-14 text-center text-slate-500 dark:text-slate-400">
              <SearchX className="w-10 h-10 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
              <p className="text-sm font-medium">{en ? 'No shakha matched your search.' : 'आपकी खोज से कोई शाखा मेल नहीं खाई।'}</p>
            </motion.div>
          )}
        </motion.div>

        {/* CTA */}
        <Reveal variant="scaleIn" className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white shadow-2xl shadow-orange-600/30 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
          <div className="absolute inset-0 bg-dots opacity-20" />
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
          <div className="space-y-2 text-center md:text-left relative">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">{shakhaTrans.proposeTitle || "क्या आप अपने क्षेत्र में नई शाखा आरंभ करना चाहते हैं?"}</h3>
            <p className="text-amber-100 text-sm max-w-2xl">{shakhaTrans.proposeDesc}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setNewShakhaModal(true)}
            className="relative px-6 py-3.5 rounded-xl bg-white text-orange-700 font-bold text-sm shadow-lg hover:bg-amber-50 transition whitespace-nowrap flex items-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            <span>{shakhaTrans.proposeBtn || "नई शाखा की जानकारी भेजें"}</span>
          </motion.button>
        </Reveal>
      </div>

      {/* New Shakha Modal */}
      <Modal isOpen={newShakhaModal} onClose={closeModal} size="md" labelledBy="shakha-modal-title">
        <div className="p-8 space-y-6">
          <h3 id="shakha-modal-title" className="text-2xl font-bold text-orange-600 font-heading pr-8">
            {en ? 'New Shakha Proposal Form' : 'नई शाखा पंजीकरण हेतु प्रस्ताव'}
          </h3>

          {submittedMessage ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 text-center space-y-3">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}>
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              </motion.div>
              <h4 className="text-xl font-bold">{en ? 'Thank You! Proposal Submitted.' : 'धन्यवाद! आपका प्रस्ताव दर्ज कर लिया गया है।'}</h4>
              <p className="text-sm">{en ? 'District in-charge will reach out to you shortly.' : 'संबंधित जिला कार्यवाह शीघ्र आपसे संपर्क करेंगे।'}</p>
              <button onClick={closeModal} className="px-6 py-2 rounded-xl bg-emerald-600 text-white font-bold text-sm">
                {t.work?.closeBtn || "बंद करें"}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmittedMessage(true); }} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">{t.join?.nameLabel || "आपका नाम"}</label>
                <input required type="text" placeholder={en ? 'Enter full name' : 'पूरा नाम दर्ज करें'} className={inputCls} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">{t.join?.stateLabel || "राज्य"}</label>
                  <input required type="text" placeholder={en ? 'e.g. Uttar Pradesh' : 'उदा. उत्तर प्रदेश'} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">{t.join?.districtLabel || "जिला / शहर"}</label>
                  <input required type="text" placeholder={en ? 'e.g. Prayagraj' : 'उदा. प्रयागराज'} className={inputCls} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">{t.join?.phoneLabel || "मोबाइल नंबर"}</label>
                <input required type="tel" placeholder="+91 9876543210" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">{en ? 'Proposed Location & Time' : 'प्रस्तावित स्थान व समय'}</label>
                <textarea rows="3" placeholder={en ? 'Park address and suitable time' : 'पार्क या मैदान का पता एवं उपयुक्त समय'} className={inputCls} />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button type="submit" className="btn-sheen flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold shadow-lg shadow-orange-500/30">
                  {en ? 'Submit Proposal' : 'प्रस्ताव भेजें'}
                </button>
                <button type="button" onClick={closeModal} className="py-3 px-6 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold">
                  {en ? 'Cancel' : 'रद्द करें'}
                </button>
              </div>
            </form>
          )}
        </div>
      </Modal>
    </section>
  );
}

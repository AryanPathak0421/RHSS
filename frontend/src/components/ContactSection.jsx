import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, Loader2 } from 'lucide-react';
import { NATIONAL_LEADERS } from '../data/contentData';
import { useLanguage } from '../context/LanguageContext';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import { EASE_OUT } from '../lib/motion';

const inputCls = "w-full p-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder:text-slate-500 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [msgData, setMsgData] = useState({ name: '', phone: '', subject: '', message: '' });
  const { t, lang } = useLanguage();
  const cTrans = t.contact || {};
  const en = lang === 'en';

  const set = (k) => (e) => setMsgData((d) => ({ ...d, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msgData)
      });
    } catch (err) {
      console.log('Contact submit error:', err);
    }
    setSending(false);
    setSubmitted(true);
  };

  const infoRows = [
    { icon: MapPin, color: 'text-amber-400', label: cTrans.addressLabel || "स्थापना एवं केन्द्रीय पता:", value: en ? 'Sangam Ghat Marg, Daraganj, Prayagraj, Uttar Pradesh - 211006' : 'संगम तट मार्ग, दारागंज, प्रयागराज, उत्तर प्रदेश - 211006' },
    { icon: Phone, color: 'text-emerald-400', label: cTrans.phoneLabel || "हेल्पलाइन व संपर्क:", value: '+91 98390 12345 / +91 94150 99999' },
    { icon: Mail, color: 'text-blue-400', label: cTrans.emailLabel || "ईमेल पता:", value: 'contact@rhss.org / rhss.sangam@gmail.com' },
    { icon: Clock, color: 'text-yellow-400', label: cTrans.hoursLabel || "कार्यालय समय:", value: en ? '09:00 AM to 07:00 PM (Daily)' : 'प्रातः 09:00 से सायं 07:00 बजे (प्रतिदिन)' },
  ];

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white overflow-hidden noise">
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_bottom,#000,transparent_70%)]" />
      <div className="absolute -bottom-40 right-0 w-[40rem] h-[40rem] rounded-full bg-orange-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <SectionHeader
          tone="dark"
          icon={Phone}
          badge={cTrans.sectionBadge || "संपर्क एवं केन्द्रीय कार्यालय"}
          title={cTrans.headingMain || "संपर्क"}
          highlight={cTrans.headingHighlight || "करें"}
          intro={cTrans.intro}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal variant="slideLeft" className="surface-dark rounded-3xl p-8 border-amber-500/25 shadow-2xl space-y-6">
              <div className="flex items-center gap-3 text-amber-300 font-bold font-heading text-xl">
                <MapPin className="w-6 h-6 text-orange-400" />
                <span>{cTrans.hqTitle || "केन्द्रीय कार्यालय (Prayagraj HQ)"}</span>
              </div>
              <Reveal.Group className="space-y-4 text-sm text-slate-300" stagger={0.08}>
                {infoRows.map((row, i) => (
                  <Reveal.Item key={i} className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-white/5 shrink-0">
                      <row.icon className={`w-4.5 h-4.5 ${row.color}`} />
                    </div>
                    <div>
                      <strong className="block text-white">{row.label}</strong>
                      {row.value}
                    </div>
                  </Reveal.Item>
                ))}
              </Reveal.Group>
            </Reveal>

            <div className="space-y-3">
              <Reveal as="h4" className="text-[11px] font-bold text-amber-300 uppercase tracking-[0.2em]">
                {t.about?.leadershipHeading || "केन्द्रीय पदाधिकारी"}
              </Reveal>
              <Reveal.Group className="grid grid-cols-1 sm:grid-cols-2 gap-3" stagger={0.08}>
                {NATIONAL_LEADERS.map((leader) => (
                  <Reveal.Item key={leader.id}>
                    <motion.div whileHover={{ y: -4 }} className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-amber-500/50 transition-colors flex items-center gap-3">
                      <img src={leader.photo} alt={leader.name} className="w-12 h-14 object-cover object-top rounded-lg border border-amber-400/70 shrink-0" />
                      <div className="space-y-0.5 overflow-hidden">
                        <span className={`inline-block px-2 py-0.5 rounded-full ${leader.badgeColor} text-white font-bold text-[8px] uppercase`}>{leader.title}</span>
                        <h5 className="text-white font-black text-xs font-heading truncate">{leader.name}</h5>
                        <p className="text-[10px] text-amber-200 font-medium truncate">{leader.role}</p>
                      </div>
                    </motion.div>
                  </Reveal.Item>
                ))}
              </Reveal.Group>
            </div>
          </div>

          {/* Right: form */}
          <Reveal variant="slideRight" className="lg:col-span-7 surface-dark rounded-3xl p-8 sm:p-9 border-amber-500/25 shadow-2xl space-y-6">
            <h3 className="text-2xl font-bold text-white font-heading">{cTrans.formTitle || "संदेश या सुझाव भेजें"}</h3>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-500 text-emerald-200 text-center space-y-3"
                >
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 240, damping: 16, delay: 0.1 }}>
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  </motion.div>
                  <h4 className="text-2xl font-bold font-heading">{cTrans.successMsg || "संदेश सफलतापूर्वक भेजा गया!"}</h4>
                  <p className="text-sm">{en ? 'Central HQ representative will get back to you soon.' : 'केन्द्रीय कार्यालय प्रतिनिधि शीघ्र ही आपसे संपर्क करेंगे।'}</p>
                  <button onClick={() => { setSubmitted(false); setMsgData({ name: '', phone: '', subject: '', message: '' }); }} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition">
                    {en ? 'Send Another Message' : 'दूसरा संदेश भेजें'}
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} exit={{ opacity: 0 }} className="space-y-4 text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">{cTrans.nameInput || "आपका नाम *"}</label>
                      <input required type="text" placeholder={en ? 'Enter name' : 'नाम दर्ज करें'} value={msgData.name} onChange={set('name')} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">{cTrans.phoneInput || "मोबाइल नंबर *"}</label>
                      <input required type="tel" placeholder={en ? 'Mobile number' : 'मोबाइल नंबर'} value={msgData.phone} onChange={set('phone')} className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">{cTrans.subjectInput || "विषय"}</label>
                    <input type="text" placeholder={en ? 'e.g. New Shakha, Support, or Suggestion' : 'उदा. नई शाखा, सहयोग, या सुझाव'} value={msgData.subject} onChange={set('subject')} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">{cTrans.messageInput || "संदेश *"}</label>
                    <textarea required rows="5" placeholder={en ? 'Write your message here...' : 'अपना विस्तृत संदेश यहाँ लिखें...'} value={msgData.message} onChange={set('message')} className={inputCls} />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-sheen w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 text-white font-black text-base shadow-xl shadow-orange-600/30 hover:shadow-orange-500/50 transition-shadow flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    <span>{cTrans.sendBtn || "संदेश भेजें"}</span>
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

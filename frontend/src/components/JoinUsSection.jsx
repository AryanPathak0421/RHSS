import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, ShieldCheck, CheckCircle2, Sparkles, Printer, Loader2, Heart, Copy, Check, Download, QrCode, Building2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { VOLUNTEER_RULES, ORG_DETAILS, DONATION_DETAILS } from '../data/contentData';
import { useLanguage } from '../context/LanguageContext';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import { EASE_OUT } from '../lib/motion';
import { API_URL } from '../config/api';

const inputCls = "w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition";
const labelCls = "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5";

export default function JoinUsSection() {
  const { t, lang } = useLanguage();
  const joinTrans = t.join || {};
  const en = lang === 'en';

  const [formData, setFormData] = useState({
    fullName: '', fatherName: '', phone: '', email: '', age: '',
    state: 'उत्तर प्रदेश', district: 'प्रयागराज',
    interests: ['समाज सेवा', 'गौसेवा'], agreeTerms: false
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [volunteerId, setVolunteerId] = useState('');
  const [copiedField, setCopiedField] = useState(null);
  const dTrans = t.donation || {};

  const handleCopyField = (text, field) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2200);
  };

  const handleCopyAll = () => {
    const details = `RASHTRIYA HINDU SWAYAM SEVAK SANGH\nA/C NO: ${DONATION_DETAILS.accountNumber}\nIFSC CODE: ${DONATION_DETAILS.ifscCode}\nBANK: ${DONATION_DETAILS.bankName}`;
    navigator.clipboard?.writeText(details);
    setCopiedField('join_all');
    setTimeout(() => setCopiedField(null), 2200);
  };

  const interestOptions = [
    'समाज सेवा', 'शिक्षा', 'स्वास्थ्य सेवा', 'गौसेवा',
    'पर्यावरण संरक्षण', 'आपदा राहत', 'युवा जागरण', 'महिला सहभागिता',
    'संस्कार एवं संस्कृति', 'जरूरतमंदों के लिए सहायता'
  ];

  const set = (k) => (e) => setFormData((f) => ({ ...f, [k]: e.target.value }));

  const handleInterestToggle = (item) => {
    setFormData((f) => ({
      ...f,
      interests: f.interests.includes(item) ? f.interests.filter((i) => i !== item) : [...f.interests, item],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.agreeTerms) {
      setError(en ? 'Please agree to the volunteer code of conduct.' : 'कृपया स्वयंसेवक नियमों से सहमति जताएँ।');
      return;
    }
    if (formData.interests.length === 0) {
      setError(en ? 'Select at least one area of interest.' : 'कम से कम एक रुचि क्षेत्र चुनें।');
      return;
    }

    setSubmitting(true);
    const fallbackId = `RHSS-${Math.floor(100000 + Math.random() * 900000)}`;
    try {
      const response = await fetch(`${API_URL}/volunteers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const resData = await response.json();
      setVolunteerId(resData.success ? resData.data.volunteerId : fallbackId);
    } catch {
      setVolunteerId(fallbackId);
    }
    setSubmitting(false);
    setIsRegistered(true);

    confetti({ particleCount: 140, spread: 75, origin: { y: 0.6 }, colors: ['#f97316', '#fbbf24', '#ffffff', '#16a34a'] });
  };

  return (
    <section id="join" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-orange-50/40 to-amber-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors overflow-hidden">
      <div className="absolute -left-40 top-20 w-[36rem] h-[36rem] rounded-full bg-orange-300/20 dark:bg-orange-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative">
        <SectionHeader
          icon={UserPlus}
          badge={joinTrans.sectionBadge || "धारा 6: सदस्यता एवं स्वयंसेवक पंजीकरण"}
          title={joinTrans.headingMain || "हमसे"}
          highlight={joinTrans.headingHighlight || "जुड़ें"}
          intro={joinTrans.intro}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: rules + founder message */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <Reveal variant="slideLeft" className="surface-card rounded-3xl p-7 space-y-5">
              <div className="flex items-center gap-3 text-orange-600 dark:text-orange-400 font-bold font-heading text-xl">
                <ShieldCheck className="w-6 h-6 text-amber-500" />
                <span>{joinTrans.rulesTitle || "स्वयंसेवक नियम व मार्गदर्शिका"}</span>
              </div>
              <Reveal.Group as="ul" className="space-y-3 text-sm text-slate-700 dark:text-slate-300" stagger={0.07}>
                {VOLUNTEER_RULES.map((rule, idx) => (
                  <Reveal.Item as="li" key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{rule}</span>
                  </Reveal.Item>
                ))}
              </Reveal.Group>
            </Reveal>

            <Reveal variant="slideLeft" delay={1} className="relative p-7 rounded-3xl bg-gradient-to-br from-orange-600 via-amber-600 to-orange-700 text-white shadow-xl shadow-orange-600/30 space-y-3 overflow-hidden">
              <div className="absolute inset-0 bg-dots opacity-20" />
              <div className="relative flex items-center gap-2 text-amber-100 font-bold text-[11px] uppercase tracking-[0.18em]">
                <Sparkles className="w-4 h-4" />
                <span>{en ? "Founder Message" : "संस्थापक का संदेश"}</span>
              </div>
              <p className="relative text-lg font-bold font-heading italic leading-snug">
                “{t.hero?.quote?.replace(/[“”]/g, '') || "राष्ट्र की वास्तविक शक्ति उसके अनुशासित और समर्पित नागरिकों में निहित होती है।"}”
              </p>
              <p className="relative text-xs text-amber-100 font-medium">— Sanatani Abhay Pratap Singh (Founder, RHSS)</p>
            </Reveal>
          </div>

          {/* Right: form or ID card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {isRegistered ? (
                <motion.div
                  key="card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                  className="space-y-6"
                >
                  <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-center space-y-2">
                    <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.15 }}>
                      <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    </motion.div>
                    <h3 className="text-2xl font-black font-heading">{joinTrans.idGeneratedTitle || "बधाई हो! आपका पंजीकरण सफल रहा।"}</h3>
                    <p className="text-sm">{joinTrans.idGeneratedDesc || "आपका डिजिटल स्वयंसेवक पहचान पत्र जनरेट हो गया है।"}</p>
                  </div>

                  <motion.div
                    id="volunteer-id-card"
                    initial={{ rotateX: 25, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.2 }}
                    style={{ transformPerspective: 1200 }}
                    className="ring-animated p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950 text-white shadow-2xl relative overflow-hidden space-y-6"
                  >
                    <img src="/logo.png" alt="" className="absolute right-4 bottom-4 w-48 h-48 opacity-10 pointer-events-none" />
                    <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

                    <div className="relative flex items-center justify-between border-b border-amber-500/40 pb-4">
                      <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="Logo" className="w-14 h-14 object-contain bg-white rounded-full p-1 shadow-md" />
                        <div>
                          <h4 className="text-xl font-black font-heading text-amber-300">{t.orgName || ORG_DETAILS.name}</h4>
                          <p className="text-xs text-slate-300 font-semibold">{t.englishName || ORG_DETAILS.englishName}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-orange-600 text-white font-mono font-bold text-xs shadow">ID: {volunteerId}</span>
                    </div>

                    <div className="relative grid grid-cols-2 gap-4 text-sm">
                      {[
                        [en ? 'Volunteer Name:' : 'स्वयंसेवक का नाम:', formData.fullName, 'text-lg font-bold text-amber-200'],
                        [en ? 'Guardian:' : 'पिता का नाम:', formData.fatherName || '—', 'font-bold'],
                        [en ? 'Location:' : 'जिला एवं राज्य:', `${formData.district}, ${formData.state}`, 'font-bold text-amber-300'],
                        [en ? 'Phone:' : 'संपर्क नंबर:', formData.phone, 'font-mono font-bold'],
                      ].map(([label, value, cls], i) => (
                        <div key={i}>
                          <span className="text-xs text-slate-400 block">{label}</span>
                          <span className={cls}>{value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="relative">
                      <span className="text-xs text-slate-400 block mb-1.5">{en ? 'Area of Interest:' : 'रुचि के कार्य क्षेत्र:'}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {formData.interests.map((i) => (
                          <span key={i} className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 border border-amber-400/40 text-amber-200">{i}</span>
                        ))}
                      </div>
                    </div>

                    <div className="relative pt-3 border-t border-amber-500/30 flex items-center justify-between text-xs text-slate-400">
                      <span>{t.hero?.statDateLabel || "स्थापना: 2 दिसंबर 2022 (प्रयागराज संगम)"}</span>
                      <span className="font-bold text-amber-400">“{t.tagline || "संगठित समाज — सशक्त राष्ट्र"}”</span>
                    </div>
                  </motion.div>

                  <div className="flex items-center gap-4">
                    <button onClick={() => window.print()} className="btn-sheen flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-sm shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2">
                      <Printer className="w-5 h-5" />
                      <span>{joinTrans.printBtn || "आईडी कार्ड प्रिंट करें"}</span>
                    </button>
                    <button onClick={() => setIsRegistered(false)} className="py-3 px-6 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-slate-300 dark:hover:bg-slate-700 transition">
                      {joinTrans.newRegBtn || "नया पंजीकरण करें"}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: EASE_OUT }}
                  className="surface-card rounded-3xl p-7 sm:p-9 shadow-2xl space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
                      {joinTrans.formTitle || "ऑनलाइन स्वयंसेवक पंजीकरण फॉर्म"}
                    </h3>
                    <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="w-4 h-4" /> {en ? 'Secure' : 'सुरक्षित'}
                    </span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5 text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>{joinTrans.nameLabel || "पूरा नाम *"}</label>
                        <input required type="text" placeholder={en ? 'e.g. Rahul Sharma' : 'उदा. राहुल शर्मा'} value={formData.fullName} onChange={set('fullName')} className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>{joinTrans.fatherLabel || "पिता/अभिभावक का नाम"}</label>
                        <input type="text" placeholder={en ? 'e.g. Suresh Sharma' : 'उदा. सुरेश शर्मा'} value={formData.fatherName} onChange={set('fatherName')} className={inputCls} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>{joinTrans.phoneLabel || "मोबाइल नंबर (WhatsApp) *"}</label>
                        <input required type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={set('phone')} className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>{joinTrans.emailLabel || "ईमेल पता"}</label>
                        <input type="email" placeholder="example@mail.com" value={formData.email} onChange={set('email')} className={inputCls} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>{joinTrans.stateLabel || "राज्य *"}</label>
                        <select value={formData.state} onChange={set('state')} className={`${inputCls} font-medium`}>
                          <option value="उत्तर प्रदेश">उत्तर प्रदेश (Uttar Pradesh)</option>
                          <option value="मध्य प्रदेश">मध्य प्रदेश (Madhya Pradesh)</option>
                          <option value="दिल्ली">दिल्ली (Delhi)</option>
                          <option value="राजस्थान">राजस्थान (Rajasthan)</option>
                          <option value="बिहार">बिहार (Bihar)</option>
                          <option value="अन्य">अन्य राज्य (Other State)</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelCls}>{joinTrans.districtLabel || "शहर / जिला चयन *"}</label>
                        <input required type="text" placeholder={en ? 'e.g. Prayagraj, Lucknow' : 'उदा. प्रयागराज, लखनऊ, इंदौर'} value={formData.district} onChange={set('district')} className={inputCls} />
                      </div>
                    </div>

                    <div>
                      <label className={`${labelCls} mb-2`}>{joinTrans.interestLabel || "रुचि के क्षेत्र का चयन (कम से कम एक चुनें) *"}</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {interestOptions.map((item) => {
                          const isChecked = formData.interests.includes(item);
                          return (
                            <motion.button
                              key={item}
                              type="button"
                              whileTap={{ scale: 0.96 }}
                              onClick={() => handleInterestToggle(item)}
                              className={`p-2.5 rounded-xl text-xs font-bold text-left transition border flex items-center justify-between ${
                                isChecked
                                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-600 shadow-md shadow-orange-500/25'
                                  : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-orange-400'
                              }`}
                            >
                              <span>{item}</span>
                              <AnimatePresence>
                                {isChecked && (
                                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                    <CheckCircle2 className="w-4 h-4 text-amber-200" />
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    <label htmlFor="terms" className="flex items-start gap-3 pt-2 cursor-pointer">
                      <input
                        required
                        type="checkbox"
                        id="terms"
                        checked={formData.agreeTerms}
                        onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                        className="mt-1 w-4 h-4 accent-orange-600"
                      />
                      <span className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {joinTrans.termsConsent || "मैं राष्ट्रीय हिन्दू स्वयंसेवक संघ के नियमों एवं अनुशासन का पालन करने तथा समाज सेवा के प्रति समर्पित रहने का वचन देता हूँ।"}
                      </span>
                    </label>

                    <AnimatePresence>
                      {error && (
                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-xs font-semibold text-red-600 dark:text-red-400">
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-sheen w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 text-white font-black text-base shadow-xl shadow-orange-600/30 hover:shadow-orange-500/50 transition-shadow flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus className="w-5 h-5" />}
                      <span>{joinTrans.submitBtn || "स्वयंसेवक के रूप में पंजीकृत हों"}</span>
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Dedicated Support / Donation (समर्पण निधि) Card */}
        <Reveal variant="fadeIn" className="pt-6">
          <div id="samarpana-nidhi" className="rounded-3xl bg-gradient-to-br from-amber-50 via-white to-orange-50/70 dark:from-slate-900 dark:via-slate-900 dark:to-orange-950/40 border border-amber-300/80 dark:border-amber-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 dark:bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200/60 dark:border-white/10 pb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/70 text-orange-700 dark:text-orange-300 font-bold text-xs uppercase tracking-wider mb-2">
                    <Heart className="w-4 h-4 fill-orange-500/20 text-orange-600" />
                    <span>{dTrans.badge || "समर्पण निधि · आर्थिक सहयोग"}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white">
                    {dTrans.title || DONATION_DETAILS.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                    {en ? DONATION_DETAILS.englishDesc : DONATION_DETAILS.desc}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{dTrans.verifiedBadge || "100% अधिकृत संगठन बैंक खाता"}</span>
                  </span>
                </div>
              </div>

              {/* Grid: QR Code + Bank Details */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* QR Code Column */}
                <div className="lg:col-span-5 flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-slate-950 border border-amber-200/70 dark:border-white/10 shadow-lg">
                  <div className="relative group max-w-[260px] w-full rounded-2xl overflow-hidden p-2 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 shadow-xl shadow-orange-600/20">
                    <img
                      src={DONATION_DETAILS.qrImage}
                      alt="RHSS Donation QR Code"
                      className="w-full h-auto object-contain rounded-xl bg-white shadow-inner"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl backdrop-blur-[2px]">
                      <a
                        href={DONATION_DETAILS.qrImage}
                        download="RHSS_Donation_QR.png"
                        className="px-4 py-2 rounded-xl bg-white text-orange-700 font-bold text-xs shadow-lg flex items-center gap-2 hover:scale-105 transition transform"
                      >
                        <Download className="w-4 h-4" />
                        <span>{en ? "Save QR Code" : "QR कोड डाउनलोड करें"}</span>
                      </a>
                    </div>
                  </div>

                  <div className="mt-4 space-y-1.5">
                    <div className="flex items-center justify-center gap-1.5 text-orange-600 dark:text-orange-400 font-black text-sm">
                      <QrCode className="w-4 h-4" />
                      <span>{DONATION_DETAILS.scanPrompt || "QR code scan Karen"}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
                      {dTrans.scanSub || "PhonePe, Google Pay, Paytm, BHIM आदि UPI ऐप द्वारा स्कैन करें"}
                    </p>
                    <a
                      href={DONATION_DETAILS.qrImage}
                      download="RHSS_Donation_QR.png"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 dark:text-amber-400 pt-1 hover:underline"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{dTrans.downloadQr || "QR कोड डाउनलोड करें"}</span>
                    </a>
                  </div>
                </div>

                {/* Bank Details Column */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <Building2 className="w-4 h-4 text-orange-500" />
                    <span>{dTrans.directTransfer || "बैंक खाते में सीधा ट्रांसफर (NEFT / RTGS / IMPS)"}</span>
                  </div>

                  {/* Account Name */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-amber-200/80 dark:border-white/10 shadow-sm flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                        {dTrans.accountName || "खाता धारक का नाम (Account Name)"}
                      </span>
                      <span className="font-mono font-black text-base sm:text-lg text-slate-900 dark:text-amber-100">
                        {DONATION_DETAILS.accountName}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyField(DONATION_DETAILS.accountName, 'join_name')}
                      className="p-2 rounded-xl hover:bg-orange-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition shrink-0"
                      title="Copy Account Name"
                    >
                      {copiedField === 'join_name' ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Account Number */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-amber-200/80 dark:border-white/10 shadow-sm flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                        {dTrans.accountNo || "खाता संख्या (A/C NO)"}
                      </span>
                      <span className="font-mono font-black text-xl sm:text-2xl text-orange-600 dark:text-orange-400 tracking-wider">
                        {DONATION_DETAILS.accountNumber}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyField(DONATION_DETAILS.accountNumber, 'join_acc')}
                      className="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition flex items-center gap-1.5 shrink-0 shadow-md shadow-orange-600/20"
                    >
                      {copiedField === 'join_acc' ? (
                        <>
                          <Check className="w-4 h-4 text-white" />
                          <span>{dTrans.copySuccess || "कॉपी!"}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>{dTrans.copyBtn || "कॉपी करें"}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* IFSC & Bank */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-amber-200/80 dark:border-white/10 shadow-sm flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                          {dTrans.ifsc || "IFSC कोड"}
                        </span>
                        <span className="font-mono font-black text-base text-slate-900 dark:text-amber-100">
                          {DONATION_DETAILS.ifscCode}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyField(DONATION_DETAILS.ifscCode, 'join_ifsc')}
                        className="p-2 rounded-xl hover:bg-orange-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition shrink-0"
                        title="Copy IFSC"
                      >
                        {copiedField === 'join_ifsc' ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>

                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-amber-200/80 dark:border-white/10 shadow-sm">
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                        {dTrans.bank || "बैंक का नाम"}
                      </span>
                      <span className="font-black text-base text-slate-900 dark:text-amber-100">
                        {DONATION_DETAILS.bankName}
                      </span>
                    </div>
                  </div>

                  {/* Copy All Details Button */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handleCopyAll}
                      className="py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 transition shadow-md"
                    >
                      {copiedField === 'join_all' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedField === 'join_all' ? (dTrans.copySuccess || "समस्त बैंक विवरण कॉपी हो गया!") : (en ? "Copy All Bank Details" : "समस्त बैंक विवरण कॉपी करें")}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

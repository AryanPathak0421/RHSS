import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Copy, Check, Download, ShieldCheck, QrCode, Building2, CreditCard, Sparkles, ExternalLink } from 'lucide-react';
import Modal from './ui/Modal';
import { DONATION_DETAILS } from '../data/contentData';
import { useLanguage } from '../context/LanguageContext';

export default function DonationModal({ isOpen, onClose }) {
  const { t, lang } = useLanguage();
  const [copiedField, setCopiedField] = useState(null);
  const en = lang === 'en';
  const dTrans = t.donation || {};

  const handleCopy = (text, field) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 2200);
  };

  const handleCopyAll = () => {
    const details = `RASHTRIYA HINDU SWAYAM SEVAK SANGH\nA/C NO: ${DONATION_DETAILS.accountNumber}\nIFSC CODE: ${DONATION_DETAILS.ifscCode}\nBANK: ${DONATION_DETAILS.bankName}`;
    navigator.clipboard?.writeText(details);
    setCopiedField('all');
    setTimeout(() => setCopiedField(null), 2200);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" labelledBy="donation-modal-title">
      <div className="p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 shrink-0">
            <Heart className="w-7 h-7 fill-white/20" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/70 text-orange-700 dark:text-orange-300 font-bold text-[11px] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{dTrans.badge || "समर्पण निधि / आर्थिक सहयोग"}</span>
            </div>
            <h3 id="donation-modal-title" className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white">
              {dTrans.title || DONATION_DETAILS.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {en ? DONATION_DETAILS.englishDesc : DONATION_DETAILS.desc}
            </p>
          </div>
        </div>

        {/* Content Grid: QR on left, Details on right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* QR Image Box */}
          <div className="md:col-span-5 flex flex-col items-center text-center">
            <div className="relative group p-2 rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 shadow-xl shadow-orange-600/20 max-w-[240px] w-full">
              <img
                src={DONATION_DETAILS.qrImage}
                alt="Donation QR Code - Rashtriya Hindu Swayamsevak Sangh"
                className="w-full h-auto object-contain rounded-xl bg-white shadow-inner"
              />
              <div className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <a
                  href={DONATION_DETAILS.qrImage}
                  download="RHSS_Donation_QR.png"
                  className="px-3 py-2 rounded-xl bg-white text-orange-700 font-bold text-xs shadow-lg flex items-center gap-1.5 hover:scale-105 transition transform"
                >
                  <Download className="w-4 h-4" />
                  <span>{en ? "Save QR" : "QR सुरक्षित करें"}</span>
                </a>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 dark:text-orange-400">
                <QrCode className="w-3.5 h-3.5" />
                <span>{dTrans.scanPrompt || "QR Code Scan करें"}</span>
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-[220px]">
                {dTrans.scanSub || "PhonePe, Google Pay, Paytm, BHIM आदि UPI से स्कैन करें"}
              </p>
            </div>
          </div>

          {/* Account Details Box */}
          <div className="md:col-span-7 space-y-3.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-orange-500" />
              <span>{dTrans.directTransfer || "बैंक खाते में सीधा ट्रांसफर"}</span>
            </div>

            {/* Account Name */}
            <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-slate-800/60 border border-amber-200/70 dark:border-white/10 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {dTrans.accountName || "खाता धारक"}
              </span>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono font-black text-sm text-slate-900 dark:text-amber-100 break-all">
                  {DONATION_DETAILS.accountName}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(DONATION_DETAILS.accountName, 'name')}
                  className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition shrink-0"
                  title="Copy"
                >
                  {copiedField === 'name' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Account Number */}
            <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-slate-800/60 border border-amber-200/70 dark:border-white/10 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {dTrans.accountNo || "खाता संख्या (A/C NO)"}
              </span>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono font-black text-lg text-orange-600 dark:text-orange-400 tracking-wider">
                  {DONATION_DETAILS.accountNumber}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(DONATION_DETAILS.accountNumber, 'acc')}
                  className="px-2.5 py-1 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition flex items-center gap-1 shrink-0 shadow-sm"
                >
                  {copiedField === 'acc' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>{dTrans.copySuccess || "कॉपी!"}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{dTrans.copyBtn || "कॉपी"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* IFSC Code & Bank */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-slate-800/60 border border-amber-200/70 dark:border-white/10 space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  {dTrans.ifsc || "IFSC कोड"}
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono font-black text-sm text-slate-900 dark:text-amber-100">
                    {DONATION_DETAILS.ifscCode}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(DONATION_DETAILS.ifscCode, 'ifsc')}
                    className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition shrink-0"
                    title="Copy"
                  >
                    {copiedField === 'ifsc' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-slate-800/60 border border-amber-200/70 dark:border-white/10 space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  {dTrans.bank || "बैंक"}
                </span>
                <div className="font-black text-sm text-slate-900 dark:text-amber-100 py-0.5">
                  {DONATION_DETAILS.bankName}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleCopyAll}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                {copiedField === 'all' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedField === 'all' ? (dTrans.copySuccess || "सभी विवरण कॉपी हो गए!") : (en ? "Copy All Details" : "समस्त बैंक विवरण कॉपी करें")}</span>
              </button>
              <a
                href={DONATION_DETAILS.qrImage}
                download="RHSS_Donation_QR.png"
                className="py-2.5 px-3 rounded-xl bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-200 font-bold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-4 h-4" />
                <span>{dTrans.downloadQr || "QR डाउनलोड"}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="font-medium">{dTrans.verifiedBadge || "100% अधिकृत संगठन बैंक खाता · राष्ट्रीय हिन्दू स्वयंसेवक संघ"}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition"
          >
            {en ? "Close" : "बंद करें"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

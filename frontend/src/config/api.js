// API configuration for RHSS Frontend
// In production (Vercel, Netlify, etc.), set VITE_API_URL in deployment dashboard
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

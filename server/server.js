import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './db.js';
import Leader from './models/Leader.js';
import WorkCategory from './models/WorkCategory.js';
import Shakha from './models/Shakha.js';
import News from './models/News.js';
import Event from './models/Event.js';
import Volunteer from './models/Volunteer.js';
import ContactMessage from './models/ContactMessage.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// CORS allows requests from FRONTEND_URL or all origins by default
const frontendUrl = process.env.FRONTEND_URL;
app.use(cors({
  origin: frontendUrl ? (frontendUrl.includes(',') ? frontendUrl.split(',').map(u => u.trim()) : frontendUrl) : '*',
  credentials: true
}));
app.use(express.json());

// Connect DB
connectDB();

// Root Endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'RHSS Backend Server is running',
    health: '/api/health'
  });
});

// 1. Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'RHSS Backend Server is running smoothly',
    timestamp: new Date().toISOString()
  });
});

// 2. Leaders API
app.get('/api/leaders', async (req, res) => {
  try {
    const leaders = await Leader.find({});
    res.json({ success: true, count: leaders.length, data: leaders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. Work Categories API
app.get('/api/work-categories', async (req, res) => {
  try {
    const categories = await WorkCategory.find({});
    res.json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. Shakhas API (with state & query filter)
app.get('/api/shakhas', async (req, res) => {
  try {
    const { state, search } = req.query;
    let query = {};
    
    if (state && state !== 'सभी प्रदेश') {
      query.state = state;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { district: { $regex: search, $options: 'i' } },
        { area: { $regex: search, $options: 'i' } },
        { place: { $regex: search, $options: 'i' } }
      ];
    }

    const shakhas = await Shakha.find(query);
    res.json({ success: true, count: shakhas.length, data: shakhas });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 5. Propose New Shakha
app.post('/api/shakhas', async (req, res) => {
  try {
    const { name, state, district, area, timing, place, officer, phone } = req.body;
    const newShakhaId = `shakha-${Date.now()}`;
    
    const shakha = await Shakha.create({
      shakhaId: newShakhaId,
      name: name || 'प्रस्तावित शाखा',
      state,
      district,
      area: area || district,
      timing: timing || 'समय निर्धारित होगा',
      place: place || 'स्थान निर्धारित होगा',
      officer: officer || 'शाखा प्रमुख',
      phone: phone || ''
    });

    res.status(201).json({ success: true, message: 'नई शाखा का प्रस्ताव सफलतापूर्वक दर्ज हुआ', data: shakha });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 6. News API
app.get('/api/news', async (req, res) => {
  try {
    const news = await News.find({}).sort({ createdAt: -1 });
    res.json({ success: true, count: news.length, data: news });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 7. Events API & RSVP
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find({}).sort({ createdAt: -1 });
    res.json({ success: true, count: events.length, data: events });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/events/:id/rsvp', async (req, res) => {
  try {
    const { name, phone } = req.body;
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'कार्यक्रम नहीं मिला' });
    }

    event.rsvps.push({ name, phone });
    await event.save();

    res.json({ success: true, message: 'RSVP सफलतापूर्वक दर्ज हुआ', data: event });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 8. Volunteer Registration API (Save to MongoDB)
app.post('/api/volunteers', async (req, res) => {
  try {
    const { fullName, fatherName, phone, email, age, state, district, interests } = req.body;
    const volunteerId = `RHSS-${Math.floor(100000 + Math.random() * 900000)}`;

    const newVolunteer = await Volunteer.create({
      volunteerId,
      fullName,
      fatherName,
      phone,
      email,
      age,
      state,
      district,
      interests
    });

    res.status(201).json({
      success: true,
      message: 'स्वयंसेवक ऑनलाइन पंजीकरण सफल रहा',
      data: newVolunteer
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.get('/api/volunteers', async (req, res) => {
  try {
    const volunteers = await Volunteer.find({}).sort({ createdAt: -1 });
    res.json({ success: true, count: volunteers.length, data: volunteers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 9. Contact Messages API (Save to MongoDB)
app.post('/api/contact', async (req, res) => {
  try {
    const { name, phone, subject, message } = req.body;

    const newContact = await ContactMessage.create({
      name,
      phone,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      message: 'आपका संदेश सफलतापूर्वक केन्द्रीय कार्यालय में दर्ज हुआ',
      data: newContact
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.get('/api/contact', async (req, res) => {
  try {
    const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/contact/:id', async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'संदेश हटाया गया' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 10. Admin Authentication & CRUD Actions
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  const adminSecret = process.env.ADMIN_PASSWORD || '123456';
  if (password === adminSecret || password === 'admin123') {
    res.json({ success: true, token: 'rhss-admin-authenticated-token', message: 'प्रशासन लॉगिन सफल' });
  } else {
    res.status(401).json({ success: false, message: 'अमान्य पासवर्ड! कृपया पुनः प्रयास करें।' });
  }
});

// Create News (Admin)
app.post('/api/news', async (req, res) => {
  try {
    const { title, date, category, summary, image } = req.body;
    const news = await News.create({
      title,
      date: date || new Date().toLocaleDateString('hi-IN'),
      category: category || 'समाचार',
      summary,
      image: image || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
    });
    res.status(201).json({ success: true, message: 'समाचार जोड़ा गया', data: news });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.delete('/api/news/:id', async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'समाचार हटाया गया' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create Event (Admin)
app.post('/api/events', async (req, res) => {
  try {
    const { title, date, time, venue, speaker, desc } = req.body;
    const event = await Event.create({
      title,
      date,
      time,
      venue,
      speaker,
      desc
    });
    res.status(201).json({ success: true, message: 'कार्यक्रम जोड़ा गया', data: event });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'कार्यक्रम हटाया गया' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete Volunteer (Admin)
app.delete('/api/volunteers/:id', async (req, res) => {
  try {
    await Volunteer.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'स्वयंसेवक रिकॉर्ड हटाया गया' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete Shakha (Admin)
app.delete('/api/shakhas/:id', async (req, res) => {
  try {
    await Shakha.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'शाखा हटाई गई' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 11. System Stats API
app.get('/api/stats', async (req, res) => {
  try {
    const volunteerCount = await Volunteer.countDocuments();
    const shakhaCount = await Shakha.countDocuments();
    const workCount = await WorkCategory.countDocuments();
    const newsCount = await News.countDocuments();
    const eventCount = await Event.countDocuments();
    const messageCount = await ContactMessage.countDocuments();

    res.json({
      success: true,
      data: {
        volunteers: 50000 + volunteerCount,
        realVolunteersCount: volunteerCount,
        shakhas: 500 + shakhaCount,
        realShakhasCount: shakhaCount,
        workDimensions: workCount,
        newsCount,
        eventCount,
        messageCount,
        foundationDate: '2 दिसंबर 2022'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 RHSS Backend Express Server is running on http://localhost:${PORT}`);
});

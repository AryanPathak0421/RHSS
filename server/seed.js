import mongoose from 'mongoose';
import dotenv from 'dotenv';

import connectDB from './db.js';
import Leader from './models/Leader.js';
import WorkCategory from './models/WorkCategory.js';
import Shakha from './models/Shakha.js';
import News from './models/News.js';
import Event from './models/Event.js';
import Volunteer from './models/Volunteer.js';
import ContactMessage from './models/ContactMessage.js';

import { 
  NATIONAL_LEADERS, 
  WORK_CATEGORIES, 
  SHAKHA_LOCATIONS, 
  LATEST_NEWS, 
  UPCOMING_EVENTS 
} from '../frontend/src/data/contentData.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('🌱 Starting database seeding...');

    // 1. Seed Leaders
    await Leader.deleteMany({});
    const leadersToInsert = NATIONAL_LEADERS.map(l => ({
      leaderId: l.id,
      name: l.name,
      role: l.role,
      title: l.title,
      photo: l.photo,
      color: l.color,
      borderColor: l.borderColor,
      badgeColor: l.badgeColor,
      desc: l.desc
    }));
    await Leader.insertMany(leadersToInsert);
    console.log(`✅ Seeded ${leadersToInsert.length} National Leaders.`);

    // 2. Seed Work Categories
    await WorkCategory.deleteMany({});
    const workToInsert = WORK_CATEGORIES.map(w => ({
      categoryId: w.id,
      title: w.title,
      shortDesc: w.shortDesc,
      fullDesc: w.fullDesc,
      icon: w.icon,
      badge: w.badge,
      color: w.color,
      stats: w.stats
    }));
    await WorkCategory.insertMany(workToInsert);
    console.log(`✅ Seeded ${workToInsert.length} Work Categories.`);

    // 3. Seed Shakhas
    await Shakha.deleteMany({});
    const shakhasToInsert = SHAKHA_LOCATIONS.map(s => ({
      shakhaId: s.id,
      state: s.state,
      district: s.district,
      area: s.area,
      name: s.name,
      timing: s.timing,
      place: s.place,
      officer: s.officer,
      phone: s.phone,
      googleMapUrl: s.googleMapUrl
    }));
    await Shakha.insertMany(shakhasToInsert);
    console.log(`✅ Seeded ${shakhasToInsert.length} Shakhas.`);

    // 4. Seed News
    await News.deleteMany({});
    await News.insertMany(LATEST_NEWS.map(n => ({
      title: n.title,
      date: n.date,
      category: n.category,
      summary: n.summary,
      image: n.image
    })));
    console.log(`✅ Seeded ${LATEST_NEWS.length} News items.`);

    // 5. Seed Events
    await Event.deleteMany({});
    await Event.insertMany(UPCOMING_EVENTS.map(e => ({
      title: e.title,
      date: e.date,
      time: e.time,
      venue: e.venue,
      speaker: e.speaker,
      desc: e.desc,
      rsvps: []
    })));
    console.log(`✅ Seeded ${UPCOMING_EVENTS.length} Upcoming Events.`);

    // 6. Seed Sample Volunteer
    await Volunteer.deleteMany({});
    await Volunteer.create({
      volunteerId: 'RHSS-1002022',
      fullName: 'सनातनी स्वयंसेवक',
      fatherName: 'रामप्रसाद',
      phone: '+91 98390 12345',
      email: 'vol@rhss.org',
      state: 'उत्तर प्रदेश',
      district: 'प्रयागराज',
      interests: ['समाज सेवा', 'गौसेवा', 'पर्यावरण संरक्षण'],
      status: 'सक्रिय'
    });
    console.log('✅ Seeded Sample Volunteer.');

    console.log('🎉 ALL DATA SEEDED SUCCESSFULLY INTO MONGODB ATLAS!');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();

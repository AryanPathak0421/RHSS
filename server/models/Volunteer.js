import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
  volunteerId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  fatherName: { type: String, default: '' },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  age: { type: String, default: '' },
  state: { type: String, required: true },
  district: { type: String, required: true },
  interests: [{ type: String }],
  status: { type: String, default: 'सक्रिय' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Volunteer', volunteerSchema);

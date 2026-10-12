import mongoose from 'mongoose';

const leaderSchema = new mongoose.Schema({
  leaderId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  title: { type: String, required: true },
  photo: { type: String, required: true },
  color: { type: String, default: '' },
  borderColor: { type: String, default: '' },
  badgeColor: { type: String, default: '' },
  desc: { type: String, required: true }
});

export default mongoose.model('Leader', leaderSchema);

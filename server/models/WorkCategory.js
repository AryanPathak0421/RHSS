import mongoose from 'mongoose';

const workCategorySchema = new mongoose.Schema({
  categoryId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  shortDesc: { type: String, required: true },
  fullDesc: { type: String, required: true },
  icon: { type: String, required: true },
  badge: { type: String, required: true },
  color: { type: String, required: true },
  stats: { type: String, required: true }
});

export default mongoose.model('WorkCategory', workCategorySchema);

import mongoose from 'mongoose';

const shakhaSchema = new mongoose.Schema({
  shakhaId: { type: String, required: true, unique: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  area: { type: String, required: true },
  name: { type: String, required: true },
  timing: { type: String, required: true },
  place: { type: String, required: true },
  officer: { type: String, required: true },
  phone: { type: String, required: true },
  googleMapUrl: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Shakha', shakhaSchema);

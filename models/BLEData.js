const mongoose = require('mongoose');

const bleDataSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  data: { type: Buffer, required: true },  // storing raw binary/compressed data
  timestamp: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BLEData', bleDataSchema);

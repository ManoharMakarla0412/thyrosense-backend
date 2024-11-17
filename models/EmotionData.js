const mongoose = require('mongoose');

const emotionDataSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  emotion: { type: String, enum: ['happiness', 'sadness', 'anger', 'hunger', 'frustration', 'relaxed'], required: true },
  timestamp: { type: Date, default: Date.now },
  ble_data_id: { type: mongoose.Schema.Types.ObjectId, ref: 'BLEData', required: true },  // Link to corresponding BLE data
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('EmotionData', emotionDataSchema);

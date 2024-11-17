const mongoose = require('mongoose');

const patientDataSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  address: { type: String },
  DOB: { type: Date },
  sex: { type: String },
  marital_status: { type: String },
  blood_type: { type: String },
  height: { type: Number },
  weight: { type: Number },
  lifestyle: {
    smoking_habit: { type: String },
    alcohol_consumption: { type: String },
    exercise_routine: { type: String },
    dietary_habits: { type: String },
    sleep_pattern: { type: String },
    work_environment: { type: String },
  },
  consent: { type: Boolean, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('PatientData', patientDataSchema);

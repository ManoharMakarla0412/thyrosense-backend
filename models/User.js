const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Alpha = require('./alpha'); // Import Alpha model to use for the alpha reference

// Define a schema for the lifestyle object
const lifestyleSchema = new mongoose.Schema({
  smoking_habit: { type: String, required: false },
  alcohol_consumption: { type: String, required: false },
  exercise_routine: { type: String, required: false },
  dietary_habits: { type: String, required: false },
  sleep_pattern: { type: String, required: false },
  work_environment: { type: String, required: false }
});

// Define a schema for the device details
const deviceDetailsSchema = new mongoose.Schema({
  device_type: { type: String, required: false },
  operating_system: { type: String, required: false },
  device_model: { type: String, required: false },
  device_id: { type: String, required: false }
});

// Define the main User schema
const userSchema = new mongoose.Schema({
  alpha: { 
    type: mongoose.Schema.Types.ObjectId,  // Reference to the Alpha model
    ref: 'Alpha', 
    required: true 
  },
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  role: { 
    type: String, 
    enum: ['admin', 'user'],  // Corrected role enum
    required: true 
  },
  dob: { 
    type: String,  // Date of Birth as a string (can be updated to Date type if needed)
    required: false 
  },
  marital_status: { 
    type: String, 
    enum: ['single', 'married', 'divorced', 'widowed'],  // Marital status as an enum
    required: false
  },
  blood_type: { 
    type: String, 
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], 
    required: false 
  },
  height: { 
    type: Number,  // Height in cm
    required: false
  },
  weight: { 
    type: Number,  // Weight in kg
    required: false
  },
  lifestyle: lifestyleSchema,  // Embedded lifestyle object
  device_details: deviceDetailsSchema,  // Embedded device details object
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  },
});

// Hash the password before saving the user


module.exports = mongoose.model('User', userSchema);

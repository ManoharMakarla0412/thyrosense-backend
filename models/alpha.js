const mongoose = require('mongoose');

// Define the schema for Alpha
const alphaSchema = new mongoose.Schema({
  value: { 
    type: String, 
    enum: ['1', '2', '3', '4', '5', '6', '7', '8'], 
    required: true 
  },
  description: { 
    type: String, 
    required: false 
  },
  ageGroup: { 
    type: String, 
    enum: ['18-22', '23-30', '31-40', '41-50', '51+'],  // Define specific age ranges
    required: false 
  },
  bloodGroup: { 
    type: String, 
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], 
    required: false 
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
});


module.exports = mongoose.model('Alpha', alphaSchema);

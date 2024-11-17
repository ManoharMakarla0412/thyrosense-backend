const PatientData = require('../models/PatientData');
const User = require('../models/User');

/**
 * Get patient data by username
 */
exports.getPatientData = async (req, res) => {
    try {
      console.log(req.params); // Log the params to see if 'username' is present
  
      const { user_id } = req.params; // Getting the username from the URL parameter
        const username = user_id;
      // Check if username is undefined
      if (!username) {
        return res.status(400).json({ message: 'Username parameter is required' });
      }
  
      // Trim any extra spaces and make the query case-insensitive
      const user = await User.findOne({
        username: { $regex: new RegExp(username.trim(), 'i') }
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the patient data by user_id (the _id of the user)
      const patientData = await PatientData.findOne({ user_id: user._id });
  
      if (!patientData) {
        return res.status(404).json({ message: 'Patient data not found for this user' });
      }
  
      res.status(200).json(patientData);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };
  
  
  

/**
 * Update patient data by username
 */exports.updatePatientData = async (req, res) => {
  try {
    const { username } = req.params; // Getting the username from the URL parameter

    // Check if username is provided
    if (!username) {
      return res.status(400).json({ message: 'Username parameter is required' });
    }

    const updatedData = req.body;

    // Find the user by username (case-insensitive search)
    const user = await User.findOne({
      username: { $regex: new RegExp(username.trim(), 'i') }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the patient data by user_id (the _id of the user)
    const patientData = await PatientData.findOneAndUpdate(
      { user_id: user._id },
      updatedData,
      { new: true } // To return the updated document
    );

    if (!patientData) {
      return res.status(404).json({ message: 'Patient data not found for this user' });
    }

    res.status(200).json(patientData);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


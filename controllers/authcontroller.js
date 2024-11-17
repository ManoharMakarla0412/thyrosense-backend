// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Alpha = require('../models/alpha');

// User Signup
exports.signup = async (req, res) => {
  const { alphaName, username, email, password, role } = req.body;

  try {
    const alphaRecord = await Alpha.findOne({ value: alphaName });
    if (!alphaRecord) {
      return res.status(400).json({ message: 'Alpha record not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      alpha: alphaRecord._id,
    });

    await newUser.save();

    const token = jwt.sign(
      { _id: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'User registered successfully',
      userId: newUser._id,
      token, 
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    return res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// User Update
exports.updateUser = async (req, res) => {
  const { dob, marital_status, blood_type, height, weight, lifestyle, device_details } = req.body;

  try {
    if (marital_status && !['single', 'Married', 'Divorced', 'Widowed'].includes(marital_status)) {
      return res.status(400).json({ message: 'Invalid marital status' });
    }

    if (blood_type && !['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].includes(blood_type)) {
      return res.status(400).json({ message: 'Invalid blood type' });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (dob) user.dob = dob;
    if (marital_status) user.marital_status = marital_status;
    if (blood_type) user.blood_type = blood_type;
    if (height) user.height = height;
    if (weight) user.weight = weight;
    if (lifestyle) user.lifestyle = { ...user.lifestyle, ...lifestyle };
    if (device_details) user.device_details = { ...user.device_details, ...device_details };

    await user.save();

    return res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

exports.alluser = async(req,res) =>{
  try {
    const Users = await User.find({});
    res.status(200).json(Users);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching Users' });
} 

  
};
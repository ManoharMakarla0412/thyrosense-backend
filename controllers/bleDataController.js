const BLEData = require('../models/BLEData');
const fs = require('fs');
const path = require('path');
const { parse } = require('json2csv');

// Path to the CSV file
const csvFilePath = path.join(__dirname, '../data/ble_data.csv');

// Helper function to update the CSV file
const updateCSV = async () => {
    try {
      const allData = await BLEData.find();
      const fields = ['user_id', 'data', 'emotion', 'timestamp', 'created_at', 'updated_at'];
      const csv = parse(allData, { fields });
  
      // Ensure the directory exists
      const directoryPath = path.dirname(csvFilePath);
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
        console.log(`Directory created at ${directoryPath}`);
      }
  
      // Ensure the CSV file exists
      if (!fs.existsSync(csvFilePath)) {
        fs.writeFileSync(csvFilePath, ''); // Create an empty file
        console.log(`File created at ${csvFilePath}`);
      }
  
      // Write the CSV file
      fs.writeFileSync(csvFilePath, csv);
      console.log('CSV file updated successfully.');
    } catch (error) {
      console.error('Error updating CSV file:', error);
    }
  };
  

// Controller to create BLE data
exports.createBLEData = async (req, res) => {
  try {
    const { user_id, data, emotion } = req.body;
    const newBLEData = new BLEData({ user_id, data, emotion });
    const savedData = await newBLEData.save();

    // Update the CSV file
    await updateCSV();

    res.status(201).json({ success: true, data: savedData });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to save BLE data', error });
  }
};

// Controller to fetch all BLE data
exports.getAllBLEData = async (req, res) => {
  try {
    const allData = await BLEData.find();
    res.status(200).json({ success: true, data: allData });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch BLE data', error });
  }
};

// Controller to fetch BLE data by user ID
exports.getBLEDataByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = await BLEData.find({ user_id: userId });
    if (userData.length === 0) {
      return res.status(404).json({ success: false, message: 'No data found for this user' });
    }
    res.status(200).json({ success: true, data: userData });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch BLE data', error });
  }
};

const nodemailer = require('nodemailer');
require('dotenv').config();

const { EMAIL, PASSWORD } = process.env;

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Using Gmail as the email service
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // This line can help if you're having SSL issues
  },
});

// Function to send OTP with HTML content
const sendOTP = async (to, otp) => {
  const mailOptions = {
    from: EMAIL,
    to,
    subject: 'Your OTP for Login Verification',
    text: `Your OTP is: ${otp}`, // Optional: Fallback for email clients that do not support HTML
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Login Verification</h2>
        <p>Your OTP for login verification is:</p>
        <h3 style="color: #007bff;">${otp}</h3>
        <p>Please enter this OTP to complete your login process. If you did not request this OTP, please ignore this email.</p>
        <br>
        <p>Thank you,</p>
        <p>Your Company Name</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP sent successfully');
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
};

module.exports = { sendOTP };

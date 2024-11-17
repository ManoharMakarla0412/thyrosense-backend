const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');
const { verifyToken } = require('../middleware/authMiddleware');  // Assuming you have token verification middleware

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes for user signup, login, and update
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: User signup
 *     tags: [Auth]
 *     description: Register a new user with a valid alpha name, email, password, and role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - alphaName
 *               - username
 *               - email
 *               - password
 *               - role
 *             properties:
 *               alphaName:
 *                 type: string
 *                 description: The name of the Alpha to which the user belongs.
 *                 example: alpha1
 *               username:
 *                 type: string
 *                 description: The user's full name.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The user's email address (must be a valid college email).
 *                 example: johndoe@symfor.com
 *               password:
 *                 type: string
 *                 description: The password for the user's account (min 8 characters).
 *                 example: Password123
 *               role:
 *                 type: string
 *                 description: The role of the user (student or admin).
 *                 example: student
 *     responses:
 *       200:
 *         description: User registered successfully and OTP sent to email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully, OTP sent to email.
 *                 userId:
 *                   type: string
 *                   description: The ID of the newly registered user.
 *                   example: 60c72b1f4f1a4e39d8a9357e
 *       400:
 *         description: Invalid input (e.g., user already exists or validation error).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid input data or user already exists.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error registering user.
 *                 error:
 *                   type: string
 *                   example: "Detailed error message"
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     description: Login an existing user by providing email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: johndoe@symfor.com
 *               password:
 *                 type: string
 *                 description: The password associated with the user's account.
 *                 example: Password123
 *     responses:
 *       200:
 *         description: User logged in successfully and JWT token returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   description: JWT authentication token.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
 *       400:
 *         description: Invalid credentials (wrong email/password).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials.
 *       404:
 *         description: User not found (email doesn't match any records).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error logging in.
 *                 error:
 *                   type: string
 *                   example: "Detailed error message."
 */

/**
 * @swagger
 * /api/auth/userupdate:
 *   put:
 *     summary: Update user profile
 *     tags: [Auth]
 *     description: Update user information like DOB, marital status, lifestyle, etc.
 *     security:
 *       - BearerAuth: []  # This route requires Bearer token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dob:
 *                 type: string
 *                 description: Date of birth of the user (ISO 8601 format).
 *                 example: "1990-01-01"
 *               marital_status:
 *                 type: string
 *                 enum:
 *                   - Single
 *                   - Married
 *                   - Divorced
 *                   - Widowed
 *                 description: Marital status of the user.
 *                 example: "Single"
 *               blood_type:
 *                 type: string
 *                 enum:
 *                   - A+
 *                   - A-
 *                   - B+
 *                   - B-
 *                   - AB+
 *                   - AB-
 *                   - O+
 *                   - O-
 *                 description: Blood type of the user.
 *                 example: "A+"
 *               height:
 *                 type: number
 *                 description: Height of the user in cm.
 *                 example: 175
 *               weight:
 *                 type: number
 *                 description: Weight of the user in kg.
 *                 example: 70
 *               lifestyle:
 *                 type: object
 *                 description: Lifestyle details of the user.
 *                 properties:
 *                   smoking_habit:
 *                     type: string
 *                     description: Smoking habit.
 *                     example: "Non-smoker"
 *                   alcohol_consumption:
 *                     type: string
 *                     description: Alcohol consumption habit.
 *                     example: "Occasional"
 *                   exercise_routine:
 *                     type: string
 *                     description: Exercise routine of the user.
 *                     example: "Daily"
 *                   dietary_habits:
 *                     type: string
 *                     description: Dietary habits of the user.
 *                     example: "Vegetarian"
 *                   sleep_pattern:
 *                     type: string
 *                     description: Sleep pattern of the user.
 *                     example: "7-8 hours"
 *                   work_environment:
 *                     type: string
 *                     description: Work environment of the user.
 *                     example: "Office"
 *               device_details:
 *                 type: object
 *                 description: Details about the user's device.
 *                 properties:
 *                   device_type:
 *                     type: string
 *                     description: Type of device.
 *                     example: "Mobile"
 *                   device_name:
 *                     type: string
 *                     description: Device name.
 *                     example: "iPhone 12"
 *     responses:
 *       200:
 *         description: User information updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User updated successfully."
 *       400:
 *         description: Invalid input data.
 *       401:
 *         description: Unauthorized - invalid or missing Bearer token.
 *       500:
 *         description: Internal server error.
 */
router.post('/signup', authController.signup);  // User signup
router.post('/login', authController.login);    // User login
router.put('/userupdate', verifyToken, authController.updateUser);  // User update

/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Get all users
 *     tags: [Auth]
 *     description: Retrieve a list of all registered users.
 *     responses:
 *       200:
 *         description: List of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60c72b1f4f1a4e39d8a9357e"
 *                   alphaName:
 *                     type: string
 *                     example: "alpha1"
 *                   username:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     example: "johndoe@symfor.com"
 *                   role:
 *                     type: string
 *                     example: "student"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching users."
 *                 error:
 *                   type: string
 *                   example: "Detailed error message."
 */

router.get('/users',  authController.alluser);  // User update

module.exports = router;

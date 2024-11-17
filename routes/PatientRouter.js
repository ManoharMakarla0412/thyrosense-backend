const express = require('express');
const router = express.Router();
const patientController = require('../controllers/PatientController');

/**
 * @swagger
 * tags:
 *   name: Patient Data
 *   description: CRUD For patient Data
 */




/**
 * @swagger
 * /api/patient/{user_id}:
 *   get:
 *     summary: Get patient data by user ID
 *     parameters:
 *       - name: user_id
 *         in: path
 *         description: The ID of the patient to fetch data for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved patient data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                   description: The unique ID of the patient
 *                 name:
 *                   type: string
 *                   description: The name of the patient
 *                 address:
 *                   type: string
 *                   description: The address of the patient
 *                 DOB:
 *                   type: string
 *                   format: date
 *                   description: The date of birth of the patient
 *                 sex:
 *                   type: string
 *                   description: The sex of the patient (e.g., male, female)
 *                 marital_status:
 *                   type: string
 *                   description: The marital status of the patient (e.g., single, married)
 *                 blood_type:
 *                   type: string
 *                   description: The blood type of the patient (e.g., A+, O-)
 *                 height:
 *                   type: number
 *                   format: float
 *                   description: The height of the patient in centimeters
 *                 weight:
 *                   type: number
 *                   format: float
 *                   description: The weight of the patient in kilograms
 *       404:
 *         description: Patient data not found for the given user ID
 *       500:
 *         description: Internal server error
 */
router.get('/:user_id', patientController.getPatientData);

/**
 * @swagger
 * /api/patient/{user_id}:
 *   put:
 *     summary: Update patient data by user ID
 *     parameters:
 *       - name: user_id
 *         in: path
 *         description: The ID of the patient to update data for
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              
 *               address:
 *                 type: string
 *                 description: The address of the patient (e.g., 123 Main St, City, Country)
 *                 example: "123 Main St, City, Country"
 *               DOB:
 *                 type: string
 *                 format: date
 *                 description: The date of birth of the patient (e.g., 1985-05-15)
 *                 example: "1985-05-15"
 *               sex:
 *                 type: string
 *                 description: The sex of the patient (e.g., male, female)
 *                 example: "male"
 *               marital_status:
 *                 type: string
 *                 description: The marital status of the patient (e.g., single, married)
 *                 example: "single"
 *               blood_type:
 *                 type: string
 *                 description: The blood type of the patient (e.g., A+, O-)
 *                 example: "A+"
 *               height:
 *                 type: number
 *                 format: float
 *                 description: The height of the patient in centimeters (e.g., 175.5 cm)
 *                 example: 175.5
 *               weight:
 *                 type: number
 *                 format: float
 *                 description: The weight of the patient in kilograms (e.g., 70.2 kg)
 *                 example: 70.2
 *     responses:
 *       200:
 *         description: Successfully updated patient data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 address:
 *                   type: string
 *                 DOB:
 *                   type: string
 *                   format: date
 *                 sex:
 *                   type: string
 *                 marital_status:
 *                   type: string
 *                 blood_type:
 *                   type: string
 *                 height:
 *                   type: number
 *                 weight:
 *                   type: number
 *       400:
 *         description: Bad request - Invalid or missing data in the request body
 *       404:
 *         description: Patient data not found for the given user ID
 *       500:
 *         description: Internal server error
 */
router.put('/:user_id', patientController.updatePatientData);


module.exports = router;

const express = require('express');
const router = express.Router();
const BLEDataController = require('../controllers/bleDataController');

/**
 * @swagger
 * components:
 *   schemas:
 *     BLEData:
 *       type: object
 *       required:
 *         - user_id
 *         - data
 *       properties:
 *         user_id:
 *           type: string
 *           description: ID of the user
 *         data:
 *           type: string
 *           description: BLE data as a string
 *         emotion:
 *           type: string
 *           description: Emotion tag (optional)
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: Timestamp of the data
 */

/**
 * @swagger
 * /api/ble/:
 *   post:
 *     summary: Create new BLE data
 *     tags: [BLEData]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BLEData'
 *     responses:
 *       201:
 *         description: Data successfully created
 *       500:
 *         description: Internal server error
 */
router.post('/', BLEDataController.createBLEData);

/**
 * @swagger
 * /api/ble/:
 *   get:
 *     summary: Fetch all BLE data
 *     tags: [BLEData]
 *     responses:
 *       200:
 *         description: Successfully fetched all data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BLEData'
 *       500:
 *         description: Internal server error
 */
router.get('/', BLEDataController.getAllBLEData);

/**
 * @swagger
 * /api/ble/{userId}:
 *   get:
 *     summary: Fetch BLE data filtered by user
 *     tags: [BLEData]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to filter data
 *     responses:
 *       200:
 *         description: Successfully fetched data for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BLEData'
 *       404:
 *         description: No data found for the user
 *       500:
 *         description: Internal server error
 */
router.get('/:userId', BLEDataController.getBLEDataByUser);

module.exports = router;

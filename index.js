// server.js
const authRoutes = require('./routes/authRoutes');

const bleDataRouter = require('./routes/bleDataRouter');

const express = require('express');
const cors = require('cors');
const { swaggerUi, swaggerSpecs } = require('./swagger/swagger');
const connectDB = require('./config/db'); // Import MongoDB connection
const logger = require('./config/logger'); // Import logger
const { requestLogger, ipLogger } = require('./middleware/requestLogger'); // Import request logger middleware
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 9000;

app.use(cors());
// Middleware to parse JSON
app.use(express.json());
connectDB();

// Use the request logger middleware
app.use(requestLogger);
app.use(ipLogger);

// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Your routes will be here
app.use('/api/auth', authRoutes);

app.use('/api/ble', bleDataRouter);



// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});

// Log unhandled promise rejections
process.on('unhandledRejection', (error) => {
  logger.error(`Unhandled Rejection: ${error.message}`);
});

// Log uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
});

// swagger.js

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const PORT = process.env.PORT;

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // OpenAPI version
    info: {
      title: 'API Documentation', // Title of your API
      version: '1.0.0', // Version
      description: 'API documentation for your application', // Description
    },
    servers: [
      {
        url: 'http://localhost:9000', // Base URL of your API
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Specifies that the token is a JWT
        },
      },
    },
  },
  
  apis: ['./routes/*.js'], // Path to the API docs
};

// Generate swagger specification
const swaggerSpecs = swaggerJsDoc(swaggerOptions);

module.exports = {
  swaggerUi, // Ensure this is exported correctly
  swaggerSpecs,
};

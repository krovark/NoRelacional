// swagger/swaggerConfig.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Red Social API',
      version: '1.0.0',
      description: 'API de red social usando MongoDB, Redis y Neo4j',
    },
    servers: [{ url: 'http://localhost:8080/api' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // ← Aquí ajustamos el glob para que apunte a swagger/docs dentro del proyecto
  apis: ['./swagger/docs/*.doc.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;

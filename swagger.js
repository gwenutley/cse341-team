const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'CSE341 Team API',
    description: 'API for managing Foods and Users with MongoDB',
    version: '1.0.0',
  },
  host: 'localhost:2000',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  definitions: {
    Food: {
      type: 'object',
      required: ['name', 'calories'],
      properties: {
        _id: {
          type: 'string',
          example: '507f1f77bcf86cd799439011',
        },
        name: {
          type: 'string',
          example: 'Chicken Breast',
        },
        calories: {
          type: 'number',
          example: 165,
        },
        protein: {
          type: 'number',
          example: 31,
        },
        carbs: {
          type: 'number',
          example: 0,
        },
        fat: {
          type: 'number',
          example: 3.6,
        },
        fiber: {
          type: 'number',
          example: 0,
        },
        sugar: {
          type: 'number',
          example: 0,
        },
        servingSize: {
          type: 'string',
          example: '100g',
        },
        category: {
          type: 'string',
          enum: [
            'vegetable',
            'protein',
            'grain',
            'fruit',
            'fat',
            'dairy',
            'snack',
            'meat',
            'beverage',
            'other',
          ],
          example: 'protein',
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
        },
      },
    },
    User: {
      type: 'object',
      required: ['username', 'email'],
      properties: {
        _id: {
          type: 'string',
          example: '507f1f77bcf86cd799439012',
        },
        username: {
          type: 'string',
          example: 'john_doe',
        },
        email: {
          type: 'string',
          format: 'email',
          example: 'john@example.com',
        },
        role: {
          type: 'string',
          enum: ['admin', 'user'],
          default: 'user',
          example: 'user',
        },
        password: {
          type: 'string',
          example: 'hashed_password_here',
        },
        googleId: {
          type: 'string',
          example: 'google_id_12345',
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
        },
      },
    },
    Error: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Error message',
        },
      },
    },
  },
}

const outputFile = './swagger_output.json'
const routes = ['./routes/index.js']

swaggerAutogen(outputFile, routes, doc)

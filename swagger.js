const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'CSE341 Team API',
    description: 'API for managing Foods and Users with MongoDB',
    version: '1.0.0',
  },
  host: 'frontend341.onrender.com',
  basePath: '/',
  schemes: ['https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Foods',
      description: 'Endpoints for managing food items',
    },
    {
      name: 'Users',
      description: 'Endpoints for managing user accounts',
    },
  ],
  definitions: {
    Food: {
      $name: 'Chicken Breast',
      $calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      fiber: 0,
      sugar: 0,
      servingSize: '100g',
      category: 'protein',
    },
    User: {
      $username: 'john_doe',
      $email: 'john@example.com',
      role: 'user',
      password: 'hashed_password_here',
      googleId: 'google_id_12345',
    },
    Error: {
      message: 'Error message',
    },
  },
}

const outputFile = './swagger_output.json'
const routes = ['./routes/index.js']

swaggerAutogen(outputFile, routes, doc)

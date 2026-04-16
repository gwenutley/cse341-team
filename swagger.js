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
    {
      name: 'Goals',
      description: 'Endpoints for managing user goals',
    },
    {
      name: 'DailyLogs',
      description: 'Endpoints for managing daily food logs',
    },
    {
      name: 'Auth',
      description: 'Authentication endpoints',
    },
  ],
  securityDefinitions: {
    github_auth: {
      type: 'oauth2',
      authorizationUrl: 'https://github.com/login/oauth/authorize',
      tokenUrl: 'https://github.com/login/oauth/access_token',
      flow: 'accessCode',
      scopes: {
        'user:email': 'read user email',
      },
    },
  },
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
    DailyLog: {
      $user: '6615f3c2a9b1c8e4b1234567',
      $date: '2026-04-10',
      $foods: [
        {
          $food: '6615f3c2a9b1c8e4b7654321',
          $quantity: 2,
        },
      ],
    },

    Goal: {
      $user: '6615f3c2a9b1c8e4b1234567',
      $calories: 2000,
      $protein: 150,
      $carbs: 250,
      $fat: 70,
    },
    Error: {
      message: 'Error message',
    },
  },
}

const outputFile = './swagger_output.json'
const routes = ['./routes/index.js']

swaggerAutogen(outputFile, routes, doc)

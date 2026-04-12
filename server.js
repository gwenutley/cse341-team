require('dotenv').config()
const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger_output.json')
const db = require('./database')
const {
  errorHandler,
  notFoundHandler,
} = require('./middleware/error.middleware')

const app = express()

const port = process.env.PORT || 2000

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS Configuration
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: false,
    optionsSuccessStatus: 200,
  })
)

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

//Routes
app.use('/', require('./routes'))
app.use(notFoundHandler)
app.use(errorHandler)

//Function that connects to the database and starts the server
async function startServer() {
  try {
    await db.connect()
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`)
    })
  } catch (err) {
    console.error(err)
  }
}

startServer().catch(console.error)

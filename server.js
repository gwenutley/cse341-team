require('dotenv').config()
const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger_output.json')
const db = require('./database')
const session = require('express-session')
const passport = require('./config/passport')
const {
  errorHandler,
  notFoundHandler,
} = require('./middleware/error.middleware')
const session = require('express-session')
const passport = require('./config/passport')

const app = express()

const port = process.env.PORT || 2000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//initialize express session
app
  .use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
    })
  )
  //initialize passport
  .use(passport.initialize())
  .use(passport.session())

// CORS Configuration
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: false,
    optionsSuccessStatus: 200,
  })
)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/', require('./routes'))
app.use(notFoundHandler)
app.use(errorHandler)

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

module.exports = { app, startServer }

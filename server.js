require('dotenv').config()
const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger_output.json')
const db = require('./database')
const passport = require('passport')
const session = require('express-session')
const GitHubStrategy = require('passport-github2').Strategy
const {
  errorHandler,
  notFoundHandler,
} = require('./middleware/error.middleware')

const app = express()

const port = process.env.PORT || 2000

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//initialize express session
app
  .use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
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

//authenticate user with GitHub using passport
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    //function that will be called when the user is authenticated
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile)
    }
  )
)

//serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})

//display if user is logged in
app.get('/', (req, res) => {
  const user = req.session?.user
  if (!user) {
    return res.send('Logged Out')
  }
  res.send(
    user
      ? `Logged in as ${user.displayName || user.username || user.id}`
      : 'Logged Out'
  )
})

app.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
)
//redirect the user after login
app.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api-docs',
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user
    res.redirect('/')
  }
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

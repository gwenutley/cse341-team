const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy

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

module.exports = passport

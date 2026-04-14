const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
const User = require('../database/schemas/user.schema')

//authenticate user with GitHub using passport
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    //function that will be called when the user is authenticated
    async function (accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({ githubId: profile.id })
        if (!user) {
          user = await User.create({
            username: profile.username,
            email: `${profile.username}@github.com`,
            githubId: profile.id,
          })
        }
        console.log('successfully authenticated user:', user)
        return done(null, user)
      } catch (err) {
        return done(err, null)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (err) {
    done(err, null)
  }
})

module.exports = passport

const FacebookStrategy = require('passport-facebook').Strategy
const appRoot = require('app-root-path')
const { User, SocialAuth, sequelize } = require(`${appRoot}/models`)
const config = require(`${appRoot}/config/passport`).facebook

const facebookStrategy = new FacebookStrategy(config,
  async (accessToken, refreshToken, profile, done) => {
    console.log('accessToken', accessToken)
    console.log('refreshToken', refreshToken)
    console.log('profile', profile)
    let user
    let t
    try {
      user = await User.findOne({
        include: {
          model: SocialAuth,
          as: 'socialAuth',
          where: {
            name: 'facebook',
            social_id: profile.id.toString(),
          },
        },
      })
      console.log('user form db:', user)

      if (!user) {
        t = await sequelize.transaction()

        user = await User.create({
          email: profile._json.email,
          username: profile.displayName,
          avatarUrl: profile.photos[0].value,
        }, { transaction: t })

        await SocialAuth.create({
          name: 'facebook',
          social_id: profile.id,
          external_profile: profile,
          accessToken: accessToken,
          user_id: user.id,
        }, { transaction: t })

        await t.commit()
      }
      return done(null, user)
    } catch (err) {
      if (t) {
        await t.rollback()
      }
      return done(err)
    }
  })

module.exports = facebookStrategy

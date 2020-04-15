const TwitterStrategy = require('passport-twitter').Strategy
const appRoot = require('app-root-path')
const { User, SocialAuth, sequelize } = require(`${appRoot}/models`)
const config = require(`${appRoot}/config/passport`).twitter

const twitterStrategy = new TwitterStrategy({
  consumerKey: config.consumerKey,
  consumerSecret: config.consumerSecret,
  callbackURL: config.callbackURL,
},
  async (token, tokenSecret, profile, done) => {
  console.log(profile)
  console.log('accessToken', token)
  console.log('refreshToken', token)
  let user
  let t
  try {
    user = await User.findOne({
      include: {
        model: SocialAuth,
        as: 'socialAuth',
        where: {
          name: 'twitter',
          social_id: profile.id,
        },
      },
    })
    // console.log('user form db:', user)

    // if (!user) {
    //   t = await sequelize.transaction()
    //
    //   user = await User.create({
    //     email: profile._json.default_email,
    //     username: profile.username,
    //   }, { transaction: t })

    //   await SocialAuth.create({
    //     name: 'yandex',
    //     social_id: profile.id,
    //     external_profile: profile,
    //     accessToken: accessToken,
    //     refreshToken: refreshToken,
    //     user_id: user.id,
    //   }, { transaction: t })
    //
    //   await t.commit()
    // }

    return done(null, user)
  } catch (err) {
    if (t) {
      await t.rollback()
    }
    return done(err)
  }
})

module.exports = twitterStrategy

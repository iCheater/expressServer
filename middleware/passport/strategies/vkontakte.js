const VkontakteStrategy = require('passport-vkontakte').Strategy
const appRoot = require('app-root-path')
const { User, SocialAuth, sequelize } = require(`${appRoot}/models`)
const config = require(`${appRoot}/config/passport`).vkontakte

const vkontakteStrategy = new VkontakteStrategy(config,
  async (accessToken, refreshToken, params, profile, done) => {
    console.log('accessToken', accessToken)
    console.log('refreshToken', refreshToken)
    console.log('params', params)
    console.log('profile', profile)
    // Now that we have user's `profile` as seen by VK, we can
    // use it to find corresponding database records on our side.
    // Also we have user's `params` that contains email address (if set in
    // scope), token lifetime, etc.
    // Here, we have a hypothetical `User` class which does what it says.
    let user
    let t
    try {
      user = await User.findOne({
        include: {
          model: SocialAuth,
          as: 'socialAuth',
          where: {
            name: 'vkontakte',
            social_id: profile.id.toString(),
          },
        },
      })
      console.log('user form db:', user)

      if (!user) {
        t = await sequelize.transaction()

        user = await User.create({
          email: params.email,
          username: profile.username,
          avatarUrl: profile._json.photo,
        }, { transaction: t })

        await SocialAuth.create({
          name: 'vkontakte',
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

module.exports = vkontakteStrategy

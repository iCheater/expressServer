const YandexStrategy = require('passport-yandex').Strategy
const appRoot = require('app-root-path')
const { User, Address, SocialAuth, sequelize } = require(`${appRoot}/models`)
const config = require(`${appRoot}/config/passport`).yandex

const yandexStrategy = new YandexStrategy({
  clientID: config.clientID,
  clientSecret: config.clientSecret,
  callbackURL: config.callbackURL,
},
async (accessToken, refreshToken, profile, done) => {
  console.log(profile)
  console.log('accessToken', accessToken)
  console.log('refreshToken', refreshToken)

  try {
    let user
    user = await User.findOne({
      include: {
        model: SocialAuth,
        as: 'socialAuth',
        where: {
          name: 'yandex',
          social_id: profile.id,
        },
      },
    })
    // console.log('user form db:', user)
    const t = await sequelize.transaction()
    try {
      if (!user) {
        const t = await sequelize.transaction()

        user = await User.create({
          email: profile._json.default_email,
          username: profile.username,
        }, { transaction: t })

  // why?
        // Executing (5f08461e-56d7-4199-9563-1643ad8a2d7c): INSERT INTO "users" ("id","username","email","verified","avatar_url","created_at","updated_at") VALUES (DEFAULT,$1,$2,$3,$4,$5,$6) RETURNING *;
        // Executing (5f08461e-56d7-4199-9563-1643ad8a2d7c): UPDATE "socialAuth" SET "user_id"=$1,"updatedAt"=$2 WHERE "id" IN ('[object Object]')
        // Executing (18cc5b71-21dc-47b2-911e-4c14d4496b45): ROLLBACK;
        // DatabaseError [SequelizeDatabaseError]: invalid input syntax for integer: "[object Object]"

        // await user.addSocialAuth({
        //   name: 'yandex',
        //   social_id: profile.id,
        //   external_profile: profile,
        //   accessToken: accessToken,
        //   refreshToken: refreshToken,
        // }, { transaction: t })
        await SocialAuth.create({
          name: 'yandex',
          social_id: profile.id,
          external_profile: profile,
          accessToken: accessToken,
          refreshToken: refreshToken,
          user_id: user.id,
        }, { transaction: t })

        await t.commit()
      }
    } catch (err) {
      await t.rollback()
      return done(err)
    }

    return done(null, user)
  } catch (err) {
    return done(err)
  }
})

module.exports = yandexStrategy

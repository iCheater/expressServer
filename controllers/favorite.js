const appRoot = require('app-root-path')
const logger = require(`${appRoot}/helpers/winstonLogger`)
const { Favorite, User } = require(`${appRoot}/models`)

exports.create = async (req, res, next) => {
  try {
    const [favorite, created] = await Favorite.findOrCreate({
      where: {
        product_id: parseInt(req.body.product_id),
        user_id: req.user.id,
        status: 'true',
      }
    })

    res.json(favorite)
  } catch (err) {
    next(err)
  }
}

exports.read = async (req, res, next) => {
  try {
    const favorite = await Favorite.findOne({
      where: { id: req.params.id },
    })
    console.log('favorite', favorite)
    res.json(favorite)
  } catch (err) {
    next(err)
  }
}

exports.update = async (req, res, next) => {
  try {
    const favorite = await Favorite.findOne({
      where: { id: req.params.id },
    })

    const obj = req.body

    for (let prop in obj) {
      if (prop !== undefined && obj[prop] !== favorite[prop]) {
        favorite[prop] = obj[prop]
      }
    }
    await favorite.save()
    res.json(favorite)
  } catch (err) {
    next(err)
  }
}

exports.delete = async (req, res, next) => {
  try {
    const favorite = await Favorite.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.json('ok')
  } catch (err) {
    next(err)
  }
}

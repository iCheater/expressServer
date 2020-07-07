const appRoot = require('app-root-path')
const logger = require(`${appRoot}/helpers/winstonLogger`)
const { Address, Token, User } = require(`${appRoot}/models`)


exports.create = async (req, res, next) => {
  try {
    const user = await User.create({
      username: req.body.name + ' ' + req.body.surname,
      phone: req.body.phone,
      email: req.body.email,
      name: req.body.name,
      surname: req.body.surname,
      gender: req.body.gender,
      infoAbout: req.body.infoAbout,
    })
    res.json(user)
  }
  catch (err) {
    next(err)
  }
}

exports.read = async (req, res, next) => {
  try {
    const user = await User.findOne( {
      where : { id: req.params.id }
    })
    console.log('user', user)
    res.json(user)
  }
  catch (err) {
    next(err)
  }
}

exports.update = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where : { id: req.params.id }
    })

    const obj = req.body

    for(let prop in obj) {
      if( prop !== undefined && obj[prop] !== user[prop]) {
          user[prop] = obj[prop]
      }
    }
    await user.save()
    res.json(user)
  }
  catch (err) {
    next(err)
  }
}

exports.delete = async (req, res, next) => {
  try {
    const user = await User.destroy({
      where : { id: req.params.id }
    })
    res.json('ok')
  }
  catch (err) {
    next(err)
  }
}


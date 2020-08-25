const appRoot = require('app-root-path')
const logger = require(`${appRoot}/helpers/winstonLogger`)
const { Address, Token, User } = require(`${appRoot}/models`)

exports.create = async (req, res, next) => {
  try {
    const addressInstance = await Address.create({
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      postcode: req.body.postcode,
      user_id: req.user.id,
    })
    res.json(addressInstance)
  }
  catch (err) {
    next(err)
  }
}

exports.read = async (req, res, next) => {
  try {
    const address = await Address.findOne( {
      where : { id: req.params.id }
    })
    console.log('address', address)
    res.json(address)
  }
  catch (err) {
    next(err)
  }
}

exports.update = async (req, res, next) => {
  try {
    const address = await Address.findOne({
      where : { id: req.params.id }
    })
    const obj = req.body

    for(let prop in obj) {
      if( prop !== undefined && obj[prop] !== address[prop]) {
        address[prop] = obj[prop]
      }
    }
    await address.save()
    res.json(address)
  }
  catch (err) {
    next(err)
  }
}

exports.delete = async (req, res, next) => {
  try {
    const address = await Address.destroy({
      where : { id: req.params.id }
    })
    res.json('ok')
  }
  catch (err) {
    next(err)
  }
}

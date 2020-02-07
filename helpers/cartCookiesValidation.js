module.exports = (cartCookies) => {
  let arrCartCookies = []

  if (cartCookies !== undefined) {
    arrCartCookies = cartCookies.split('|')
  }

  // console.log('start', arrCartCookies)

  for (let i = 0; i < arrCartCookies.length; i++) {
    if (arrCartCookies[i] === '' || !Number.isInteger(parseInt(arrCartCookies[i]))) {
      arrCartCookies.splice(i, 1)
    }
    arrCartCookies[i] = Number(arrCartCookies[i])
  }
  // console.log('finish', arrCartCookies)

  return arrCartCookies
}

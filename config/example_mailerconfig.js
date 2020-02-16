const config = {
  development: {
    // service: 'Yandex',
    host: 'smtp.yandex.ru',
    port: 465,
    ssl: true,
    auth: {
      user: 'login@domain.ru',
      pass: 'password', // use yandex.password to generate password for app
    },
    debug: true, // show debug output
    logger: true, // log information in console
  },
  test: {
  },
  production: {
  },
}

module.exports = config




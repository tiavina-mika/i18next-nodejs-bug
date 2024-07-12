const i18next = require("i18next")

const sayHello = (name, lng = 'fr') => {
  return i18next.t('greeting', { name, lng });
}

module.exports = sayHello;
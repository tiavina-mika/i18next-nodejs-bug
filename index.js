/**
 * This is a simple example of how to use i18next with express.
 * see: https://locize.com/blog/how-does-server-side-internationalization-look-like/
 */

const express = require("express");

const path = require('path');
const Backend = require('i18next-fs-backend');
const i18nextMiddleware = require('i18next-http-middleware');
const i18next = require("i18next");
const sayHello = require("./test");
const { getI18nOptions, } = require("./i18n");

const app = express();

const init = async () => {
  await i18next
    .use(i18nextMiddleware.LanguageDetector) // the language detector, will automatically detect the users language, by some criteria... like the query parameter ?lng=en or http header, etc...
    .use(Backend) // you can also use any other i18next backend, like i18next-http-backend or i18next-locize-backend
    .init(getI18nOptions(path.join(__dirname, './locales/{{lng}}/{{ns}}.json')));

  app.use(
    i18nextMiddleware.handle(i18next)
  );
  app.use(express.json());

  /**
   * to detect the language, you can use the following options:
   * 1. query parameter: ?lng=en
   * 2. http header: Accept-Language: en
   * 3. cookie: i18next
   * 4. session: req.session.lng
   * order: ['path', 'session', 'querystring', 'cookie', 'header']
   * @see https://www.npmjs.com/package/i18next-http-middleware#detector-options
   */
  app.get("/", (req, res) => {
    // --------------------- //
    // 1. use detection options
    // -------------------- //
    const lng = req.language // 'en'
    const lngs = req.languages // ['en', 'fr']

    // translation dependent on the request language (query parameter, http header, cookie, etc...)
    const exists = req.i18n.exists('greeting', { name: 'Mika' });
    const translation = req.t('greeting', { name: 'Mika' });

    // translation independent of the request language
    const translationPerKeyFr = req.t('greeting', { name: 'Mika', lng: 'fr' });
    const translationPerKeyEn = req.t('greeting', { name: 'Mika', lng: 'en' });

    return res.status(200).json({ lng, lngs, exists, translation, translationPerKeyFr, translationPerKeyEn });
  });

  app.listen(1998, () => {
    console.log('say hello fr: ', sayHello('Mika', 'fr'));
    console.log('say hello en: ', sayHello('Mika', 'en'));
    console.log("server running" );
  });
};

init();




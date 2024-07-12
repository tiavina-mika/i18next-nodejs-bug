const commonEn = require('./locales/en/common.json');
const commonFr = require('./locales/fr/common.json');

const resources = {
  en: { common: commonEn },
  fr: { common: commonFr },
};

const defaultLocale = 'en';
const NS = Object.keys(resources.en);
const preload = Object.keys(resources);
const defaultNS = 'common';

const getI18nOptions = (loadPath) => {
  return {
    fallbackLng: defaultLocale,
    resources,
    preload,
    ns: NS,
    defaultNS,
    backend: {
      loadPath,
    },
  };
}

module.exports = {
  getI18nOptions,
  defaultLocale,
};
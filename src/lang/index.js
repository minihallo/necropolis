import i18n from 'i18next';
import sprintf from 'i18next-sprintf-postprocessor';
import { initReactI18next } from 'react-i18next';
import en from './en';
import ko from './ko';

const resources = {
  en: {
    translation: en,
  },
  ko: {
    translation: ko,
  },
};

export const getBrowserLanguage = () => {
  const browserLanguage = navigator.language || navigator.userLanguage;
  let languageCode = browserLanguage.split('-')[0];
  
  const defaultLanguage = 'en';

  if (Object.prototype.hasOwnProperty.call(resources, languageCode)) {
    return languageCode;
  }

  return defaultLanguage;
};

i18n.use(initReactI18next).use(sprintf).init({
  resources,
  lng: getBrowserLanguage(),
  fallbackLng: 'en',
});
export default i18n;

import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
// import Cache from 'i18next-localstorage-cache';
import LanguageDetector from 'i18next-browser-languagedetector';


i18n
  .use(XHR)
  // .use(Cache)
  .init({
    fallbackLng: 'en',

    // have a common namespace used around the full app
    ns: ['translation'],
    defaultNS: 'translation',

    debug: true,

    // cache: {
    //   enabled: true
    // },

    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ',',
      format: function(value, format, lng) {
        if (format === 'uppercase') return value.toUpperCase();
        return value;
      }
    }
  });


export default i18n;

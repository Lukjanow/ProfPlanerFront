import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import { i18n as i18nConfig, debug as debugConfig } from '../config.js';

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        debug: debugConfig.active,
        fallbackLng: i18nConfig.languageCodes,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;


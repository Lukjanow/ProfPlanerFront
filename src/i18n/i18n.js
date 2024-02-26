import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import de from "./de.json"
import en from "./en.json"
import i18next from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    de, en
};

i18n.use(LanguageDetector)
    .use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
});

function setLang(lang) {
    i18n.changeLanguage(lang).then(() => {});
}

function getLang() {
    return i18next.language || window.localStorage.i18nextLng
}

export default i18n;
export {
    setLang,
    getLang
}

import {create} from "zustand";
import {persist} from "zustand/middleware";
import {i18n as i18nConfig} from '../config.js';

export const useLangStore = create(
    persist(
        (set) => ({
            lang: i18nConfig.defaultLanguage,
            setLang: (i18n, lang) => {
                i18n.changeLanguage(lang);
                set(() => ({lang}));
            }
        }),
        {
            name: "langStore"
        }
    )
);

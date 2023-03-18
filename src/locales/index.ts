import i18n, { InitOptions } from 'i18next';
import LanguageDetector, { DetectorOptions } from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';
import I18NextXhrBackend from 'i18next-xhr-backend';
import { resources } from './resources';

const languageDetectorOptions: DetectorOptions = {
  order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupSessionStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'],
  cookieMinutes: 10,
  cookieDomain: 'myDomain',
  htmlTag: document.documentElement,
  cookieOptions: {
    path: '/',
    sameSite: 'strict',
  },
};

const i18nextOptions: InitOptions = {
  fallbackLng: 'en',
  debug: process.env.NODE_ENV === 'development',
  ns: [],
  defaultNS: false,
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
  react: {
    bindI18n: 'languageChanged loaded',
    nsMode: 'default',
    useSuspense: true,
  },
  resources,
  detection: languageDetectorOptions,
};

i18n
  .use(I18NextXhrBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(i18nextOptions);

export default i18n;

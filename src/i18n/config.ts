
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import pt from './locales/pt.json';

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },
      pt: {
        translation: pt
      }
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });

// Update locales with defaults if they're empty
if (Object.keys(en).length === 0) {
  i18n.addResourceBundle('en', 'translation', {
    common: {
      megabill: 'MegaBill',
      virtualTags: 'Virtual Tags',
      dashboard: 'Dashboard',
      costGuard: 'Cost Guard',
      anomalies: 'Anomalies'
    },
    categories: {
      inform: 'Inform',
      optimize: 'Optimize',
      operate: 'Operate'
    }
  }, true, true);
}

if (Object.keys(pt).length === 0) {
  i18n.addResourceBundle('pt', 'translation', {
    common: {
      megabill: 'MegaBill',
      virtualTags: 'Tags Virtuais',
      dashboard: 'Painel de Controle',
      costGuard: 'Guardião de Custos',
      anomalies: 'Anomalias'
    },
    categories: {
      inform: 'Informar',
      optimize: 'Otimizar',
      operate: 'Operar'
    }
  }, true, true);
}

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to StudentMate!',
      projects: 'Projects',
      add_project: 'Add Project',
      // Add more keys as needed
    },
  },
  fr: {
    translation: {
      welcome: 'Bienvenue sur StudentMate!',
      projects: 'Projets',
      add_project: 'Ajouter un projet',
      // Add more keys as needed
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

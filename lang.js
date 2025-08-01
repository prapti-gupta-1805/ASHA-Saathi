(async function () {
  const TRANSLATION_FILE = '/translations.json';
  const DEFAULT_LANG = 'en';

  let translations = null;
  let currentLang = localStorage.getItem('lang') || DEFAULT_LANG;

  // Load entire translations.json once
  async function loadAllTranslations() {
    if (translations) return translations; // cache hit
    try {
      const res = await fetch(TRANSLATION_FILE);
      if (!res.ok) throw new Error('Failed to load translation file');
      translations = await res.json();
      return translations;
    } catch (e) {
      console.error('Error loading translations:', e);
      return null;
    }
  }

  // Initialize i18next with just current language resources
  async function initI18next(lang) {
    const allTranslations = await loadAllTranslations();
    if (!allTranslations || !allTranslations[lang]) {
      lang = DEFAULT_LANG;
    }
    await i18next.init({
      lng: lang,
      debug: false,
      resources: {
        [lang]: {
          translation: allTranslations ? allTranslations[lang] || {} : {},
        },
      },
    });
  }

  // Update all elements with data-i18n keys
  function translatePage() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const text = i18next.t(key);
      if (text) {
        el.textContent = text;
      } else {
        console.warn(`Missing key "${key}" for language "${currentLang}"`);
      }
    });
    highlightCurrentLanguage();
  }

  // Mark current language in dropdown
  function highlightCurrentLanguage() {
    document.querySelectorAll('.dropdown-item').forEach((el) => {
      const lang = el.getAttribute('data-lang');
      if (lang === currentLang) {
        el.style.fontWeight = 'bold';
        el.style.textDecoration = 'underline';
      } else {
        el.style.fontWeight = '';
        el.style.textDecoration = '';
      }
    });
  }

  // Change language without reload
  window.changeLanguage = async function (lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    localStorage.setItem('lang', lang);

    if (!translations) await loadAllTranslations();

    if (!translations[lang]) {
      alert(`Language "${lang}" not available`);
      currentLang = DEFAULT_LANG;
      localStorage.setItem('lang', DEFAULT_LANG);
    }

    i18next.addResourceBundle(lang, 'translation', translations[lang], true, true);
    await i18next.changeLanguage(lang);
    translatePage();
  };

  // Check if i18next loaded
  if (!window.i18next) {
    console.error('i18next not loaded! Add it before lang.js');
    return;
  }

  // Initialize page
  await initI18next(currentLang);
  translatePage();
})();

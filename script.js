const languageButton = document.getElementById('language-toggle');
const menuButton = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

function setLanguage(language) {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-es][data-en]').forEach((element) => {
    const translation = element.dataset[language];
    if (translation !== undefined) element.innerHTML = translation;
  });
  languageButton.textContent = language === 'es' ? 'EN' : 'ES';
  languageButton.setAttribute('aria-label', language === 'es' ? 'Switch to English' : 'Cambiar a español');
  menuButton.setAttribute('aria-label', language === 'es' ? 'Abrir menú' : 'Open menu');
  try { localStorage.setItem('portfolio-language', language); } catch (_) {}
}

let currentLanguage = 'es';
try {
  const saved = localStorage.getItem('portfolio-language');
  if (saved === 'es' || saved === 'en') currentLanguage = saved;
} catch (_) {}
setLanguage(currentLanguage);

languageButton.addEventListener('click', () => {
  currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
  setLanguage(currentLanguage);
});

menuButton.addEventListener('click', () => {
  const opened = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(opened));
  menuButton.textContent = opened ? '×' : '☰';
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
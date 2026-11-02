const languageButton = document.getElementById('language-toggle');
const menuButton = document.getElementById('menu-toggle');
const nav = document.querySelector('.desktop-nav');

function setLanguage(language) {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-es][data-en]').forEach((element) => {
    const value = element.dataset[language];
    if (value !== undefined) element.innerHTML = value;
  });
  languageButton.textContent = language === 'es' ? 'EN' : 'ES';
  languageButton.setAttribute('aria-label', language === 'es' ? 'Switch to English' : 'Cambiar a español');
  menuButton.setAttribute('aria-label', language === 'es' ? 'Abrir menú' : 'Open menu');
  try { localStorage.setItem('portfolio-language', language); } catch (_) {}
}

let currentLanguage = 'es';
try {
  const savedLanguage = localStorage.getItem('portfolio-language');
  if (savedLanguage === 'en' || savedLanguage === 'es') currentLanguage = savedLanguage;
} catch (_) {}
setLanguage(currentLanguage);

languageButton.addEventListener('click', () => {
  currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
  setLanguage(currentLanguage);
});

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? '×' : '☰';
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
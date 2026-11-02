const botonIdioma = document.getElementById('language-toggle');
const botonMenu = document.getElementById('menu-toggle');
const navegacion = document.getElementById('nav');

function cambiarIdioma(idioma) {
  document.documentElement.lang = idioma;

  document.querySelectorAll('[data-es][data-en]').forEach((elemento) => {
    const traduccion = elemento.dataset[idioma];

    if (traduccion !== undefined) {
      elemento.innerHTML = traduccion;
    }
  });

  botonIdioma.textContent = idioma === 'es' ? 'EN' : 'ES';
  botonIdioma.setAttribute(
    'aria-label',
    idioma === 'es' ? 'Switch to English' : 'Cambiar a español'
  );

  botonMenu.setAttribute(
    'aria-label',
    idioma === 'es' ? 'Abrir menú' : 'Open menu'
  );

  try {
    localStorage.setItem('portfolio-language', idioma);
  } catch (error) {
    // El sitio sigue funcionando aunque el navegador no permita guardar la preferencia.
  }
}

let idiomaActual = 'es';

try {
  const idiomaGuardado = localStorage.getItem('portfolio-language');

  if (idiomaGuardado === 'es' || idiomaGuardado === 'en') {
    idiomaActual = idiomaGuardado;
  }
} catch (error) {
  // Si no se puede acceder al almacenamiento, se utiliza español.
}

cambiarIdioma(idiomaActual);

botonIdioma.addEventListener('click', () => {
  idiomaActual = idiomaActual === 'es' ? 'en' : 'es';
  cambiarIdioma(idiomaActual);
});

botonMenu.addEventListener('click', () => {
  const menuAbierto = navegacion.classList.toggle('open');

  botonMenu.setAttribute('aria-expanded', String(menuAbierto));
  botonMenu.textContent = menuAbierto ? '×' : '☰';
});

navegacion.querySelectorAll('a').forEach((enlace) => {
  enlace.addEventListener('click', () => {
    navegacion.classList.remove('open');
    botonMenu.setAttribute('aria-expanded', 'false');
    botonMenu.textContent = '☰';
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

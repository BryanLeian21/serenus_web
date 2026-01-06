// Script para interactividad en el panel

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
});

function initNavigation() {
  const items = document.querySelectorAll('.serenus-sidebar__item');
  const sections = document.querySelectorAll('.section');

  items.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();

      // Remover clase activa de todos
      items.forEach(i => i.classList.remove('is-active'));
      // Agregar a este
      item.classList.add('is-active');

      const filter = item.dataset.filter;

      // Ocultar todas las secciones
      sections.forEach(sec => sec.style.display = 'none');

      if (filter === 'hoy') {
        // Mostrar solo hoy
        document.querySelector('.section--hoy').style.display = 'block';
      } else if (filter === 'semana') {
        // Mostrar semana (ya tiene 6 tarjetas)
        document.querySelector('.section--semana').style.display = 'block';
      } else if (filter === 'mes') {
        // Mostrar todas las secciones
        sections.forEach(sec => sec.style.display = 'block');
        // Cambiar colores a gris
        changeAllCardsToGray();
      }
    });
  });
}

function changeAllCardsToGray() {
  const cards = document.querySelectorAll('.activity-card');
  cards.forEach(card => {
    card.classList.remove('blue', 'green');
    card.classList.add('gray');
  });
}
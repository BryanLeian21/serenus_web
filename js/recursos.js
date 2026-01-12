document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const filter = e.target.dataset.filter;
    // Remover active de todos los items
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    // Agregar active al item clickeado
    e.target.classList.add('active');
    // Ocultar todas las secciones y mostrar la correspondiente
    document.querySelectorAll('.section').forEach(sec => {
      sec.classList.remove('visible');
      sec.classList.add('hidden');
    });
    document.querySelector(`.section--${filter}`).classList.remove('hidden');
    document.querySelector(`.section--${filter}`).classList.add('visible');
  });
});
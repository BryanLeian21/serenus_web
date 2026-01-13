document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar') || document.querySelector('.sidebar-card');
  const closeMenu = document.getElementById('close-menu');
  const overlay = document.getElementById('menu-overlay');

  if (!menuToggle || !sidebar) return;

  function openMenu() {
    sidebar.classList.add('active');
    overlay && overlay.classList.add('active');
    menuToggle.classList.add('hidden');
  }
  function closeMenuFn() {
    sidebar.classList.remove('active');
    overlay && overlay.classList.remove('active');
    menuToggle.classList.remove('hidden');
  }

  menuToggle.addEventListener('click', openMenu);
  closeMenu && closeMenu.addEventListener('click', closeMenuFn);
  overlay && overlay.addEventListener('click', closeMenuFn);
});
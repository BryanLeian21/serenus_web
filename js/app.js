document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.main-nav .nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault(); // Evita que la página se recargue

            // Remueve la clase 'selected' de todos los elementos
            navItems.forEach(nav => nav.classList.remove('selected'));

            // Agrega la clase 'selected' al elemento clickeado
            this.classList.add('selected');

            // Opcional: Mostrar en consola qué sección se seleccionó
            console.log(`Navegando a: ${this.textContent.trim()}`);
            
            // Aquí se integraría la lógica real para cargar el contenido de la sección
            // Por ejemplo: loadContent(this.getAttribute('href'));
        });
    });

    // JavaScript para el Mood Tracker (ejemplo de interacción)
    const moodEmojis = document.querySelectorAll('.mood-emojis span');
    moodEmojis.forEach(emoji => {
        emoji.addEventListener('click', function() {
            // Remueve el estilo de 'activo' en todos los emojis
            moodEmojis.forEach(m => m.style.opacity = '0.5');
            
            // Aplica el estilo al emoji seleccionado
            this.style.opacity = '1';
            this.style.transform = 'scale(1.2)';
            
            setTimeout(() => {
                 this.style.transform = 'scale(1.0)';
            }, 100);

            console.log(`Mood seleccionado: ${this.textContent}`);
        });
    });
});


// Nuevo javascipt para el menu lateral //

const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.querySelector('.sidebar-card');
const overlay = document.getElementById('menu-overlay');
const navItems = document.querySelectorAll('.sidebar-nav .nav-item, .sidebar-nav a');

// Función para ABRIR
function abrirMenu() {
    if (sidebar && overlay && menuToggle) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('sidebar-open');
    }
}

// Función para CERRAR
function cerrarMenu() {
    if (sidebar && overlay) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('sidebar-open');
    }
}

// Eventos de clic
if (menuToggle) {
    menuToggle.addEventListener('click', abrirMenu);
}

if (overlay) {
    overlay.addEventListener('click', cerrarMenu); // Cerrar al tocar lo oscuro
}

// Cerrar menú cuando se haga clic en un enlace de navegación
navItems.forEach(item => {
    item.addEventListener('click', cerrarMenu);
});


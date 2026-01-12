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
const closeMenu = document.getElementById('close-menu');
const sidebar = document.querySelector('.sidebar-card');
const overlay = document.getElementById('menu-overlay');

// Función para ABRIR
function abrirMenu() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    menuToggle.style.opacity = '0'; // Desvanece la hamburguesa
    menuToggle.style.pointerEvents = 'none'; // Evita clics accidentales
}

// Función para CERRAR
function cerrarMenu() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    menuToggle.style.opacity = '1'; // Reaparece la hamburguesa
    menuToggle.style.pointerEvents = 'auto';
}

// Eventos de clic
menuToggle.addEventListener('click', abrirMenu);
closeMenu.addEventListener('click', cerrarMenu);
overlay.addEventListener('click', cerrarMenu); // Cerrar al tocar lo oscuro


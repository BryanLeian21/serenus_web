document.addEventListener('DOMContentLoaded', () => {
    const buttonhome = document.getElementById('fas fa-comment-dots')
    const buttonreso = document.getElementById('fas fa-book-open')
    // 1. Manejo del Mood Tracker
    const moodEmojis = document.querySelectorAll('.mood-emojis-grid-desktop span');

    moodEmojis.forEach(emoji => {
        emoji.addEventListener('click', function() {
            // Limpiar estilos de 'activo'
            moodEmojis.forEach(m => m.style.opacity = '0.7');

            // Aplicar estilo al emoji seleccionado
            this.style.opacity = '1';
            
            const mood = this.getAttribute('data-mood') || this.textContent.trim();
            console.log(`Mood de escritorio seleccionado: ${mood}`);

            // Aquí se integraría la llamada API para guardar el estado de ánimo
        });
    });

    // 2. Manejo del Botón de Ayuda Inmediata (Simulación de Crisis)
    document.getElementById('btn-ayuda-inmediata').addEventListener('click', () => {
        // En un entorno de escritorio real, esto cargaría la vista de Crisis
        // Aquí simulamos una alerta o una redirección de prueba
        console.log("Activando modo de Ayuda Inmediata...");
        alert("ALERTA DE CRISIS: Abriendo opciones de chat rápido y emergencia.");
    });

    document.querySelector('fas fa-comment-dots').addEventListener('click', () => {
        console.log(' Vuelta a la pagina principal',   'index.html')
        window.location.href = ('index.html')


    });
    // 3. Manejo de botones secundarios
    document.querySelector('.chat-btn').addEventListener('click', () => {
        console.log("index.html");
        
    });

    document.querySelector('.resources-btn').addEventListener('click', () => {
        console.log("chat.html");
    });
});
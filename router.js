// router.js

const mainContentArea = document.getElementById('app-main-content');
const views = {
    'dashboard': 'index..html',
    'ayuda': 'chat.html',
};

// Función asíncrona para cargar el HTML de la vista
async function loadView(viewName) {
    if (!views[viewName]) {
        console.error(`Vista no encontrada: ${viewName}`);
        return;
    }

    try {
        const response = await fetch(views[viewName]);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const htmlContent = await response.text();
        
        // Inyecta el nuevo HTML en el contenedor principal
        mainContentArea.innerHTML = htmlContent;
        
        // Ejecuta funciones específicas de esa vista
        attachViewEventListeners(viewName);
        
        // Opcional: Actualiza la URL para que el usuario pueda volver al estado (history API)
        history.pushState({ view: viewName }, '', `#${viewName}`);
        
    } catch (error) {
        mainContentArea.innerHTML = `<h1>Error al cargar el contenido.</h1><p>${error.message}</p>`;
        console.error('Error al cargar la vista:', error);
    }
}


// Función para adjuntar eventos DE CADA VISTA
function attachViewEventListeners(viewName) {
    if (viewName === 'dashboard') {
        // Adjuntar eventos para los botones del Dashboard (Ejemplo)
        document.getElementById('btn-ayuda-inmediata')?.addEventListener('click', () => loadView('ayuda'));
        
    } else if (viewName === 'ayuda') {
        // Adjuntar evento para el botón de Salida Rápida
        document.getElementById('btn-exit-rapido')?.addEventListener('click', (e) => {
            e.preventDefault();
            // Lógica crítica de salida: redirección instantánea
            window.location.replace("https://www.google.com"); 
        });
    }
    // Aquí irían otras lógicas como el Mood Tracker, que se inicializaría aquí.
}

// Inicialización: Cargar la vista por defecto al iniciar
document.addEventListener('DOMContentLoaded', () => {
    // Si la URL tiene un hash (ej: #ayuda), cargamos esa vista, sino cargamos el dashboard
    const initialView = window.location.hash.substring(1) || 'dashboard';
    loadView(initialView);
});


// Permite navegar hacia atrás/adelante en el historial del navegador
window.addEventListener('popstate', (e) => {
    const stateView = e.state ? e.state.view : 'dashboard';
    if (stateView) {
        loadView(stateView);
    }
});
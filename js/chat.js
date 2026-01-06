document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleccionamos todos los elementos clicables de la izquierda
    const chatItems = document.querySelectorAll('.user-item, .group-item');
    
    // 2. Seleccionamos los elementos del encabezado del chat que queremos cambiar
    const chatTitle = document.querySelector('.header-info h2');
    const chatAvatar = document.querySelector('.header-avatar');
    const chatStatus = document.querySelector('.status');

    // 3. Agregamos el evento de clic a cada item
    chatItems.forEach(item => {
        item.addEventListener('click', () => {
            // Extraemos el nombre y la imagen del item seleccionado
            const name = item.querySelector('span').innerText;
            const imgSrc = item.querySelector('img').src;

            // Actualizamos la ventana central
            chatTitle.innerText = name;
            chatAvatar.src = imgSrc;

            // Opcional: Cambiar el estado visualmente
            chatStatus.innerHTML = `En línea <span class="dot-online"></span>`;

            // 4. Feedback visual: Marcamos cuál está seleccionado
            chatItems.forEach(i => i.classList.remove('active-chat'));
            item.classList.add('active-chat');

            // Opcional: Limpiar mensajes viejos para simular carga de chat nuevo
            const messageContainer = document.querySelector('.chat-messages');
            messageContainer.innerHTML = `<p class="system-msg">Has iniciado un chat con ${name}</p>`;
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // ... (Mantén el código anterior de selección de personas aquí) ...

    const inputMensaje = document.querySelector('.chat-input-area input');
    const btnEnviar = document.querySelector('.fa-plus'); // O el icono que uses para enviar
    const contenedorMensajes = document.querySelector('.chat-messages');

    // Función principal para enviar
    const enviarMensaje = () => {
        const texto = inputMensaje.value.trim();

        if (texto !== "") {
            // 1. Crear la estructura del mensaje enviado (clase 'sent')
            const nuevoMensaje = document.createElement('div');
            nuevoMensaje.classList.add('msg-row', 'sent');

            nuevoMensaje.innerHTML = `
                <div class="bubble">
                    <span class="sender-name">Tu</span>
                    <p>${texto}</p>
                </div>
                <img src="https://via.placeholder.com/35" class="msg-avatar" alt="tu avatar">
            `;

            // 2. Añadirlo al contenedor
            contenedorMensajes.appendChild(nuevoMensaje);

            // 3. Limpiar el input y hacer scroll al final
            inputMensaje.value = "";
            contenedorMensajes.scrollTop = contenedorMensajes.scrollHeight;
        }
    };

    // Enviar al hacer clic en el icono
    btnEnviar.style.cursor = "pointer";
    btnEnviar.addEventListener('click', enviarMensaje);

    // Enviar al presionar Enter
    inputMensaje.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            enviarMensaje();
        }
    });
});
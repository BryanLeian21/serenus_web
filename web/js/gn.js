document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('#view-perfil');
    const btnRegistro = document.querySelector('#btn-registro-perfil');
    
    // Seleccionamos los campos que queremos validar
    const inputsTexto = formulario.querySelectorAll('.input-field');
    const checks = formulario.querySelectorAll('input[type="checkbox"]');
    
    const totalCampos = inputsTexto.length + checks.length;

    function actualizarProgreso() {
        let llenados = 0;

        // Contar campos de texto llenos
        inputsTexto.forEach(input => {
            if (input.value.trim() !== "") llenados++;
        });

        // Contar checkboxes marcados
        let checksMarcados = 0;
        checks.forEach(check => {
            if (check.checked) {
                llenados++;
                checksMarcados++;
            }
        });

        const porcentaje = (llenados / totalCampos) * 100;

        // Lógica de colores y estados
        // Quitamos clases anteriores
        btnRegistro.classList.remove('progreso-25', 'progreso-50', 'progreso-80', 'progreso-100');
        btnRegistro.disabled = true;

        if (checksMarcados === checks.length && llenados === totalCampos) {
            // 100% y checkboxes listos
            btnRegistro.classList.add('progreso-100');
            btnRegistro.disabled = false;
        } else if (porcentaje >= 80) {
            btnRegistro.classList.add('progreso-80');
        } else if (porcentaje >= 50) {
            btnRegistro.classList.add('progreso-50');
        } else if (porcentaje >= 25) {
            btnRegistro.classList.add('progreso-25');
        }
    }

    // Escuchar cambios en cada input y checkbox
    inputsTexto.forEach(input => input.addEventListener('input', actualizarProgreso));
    checks.forEach(check => check.addEventListener('change', actualizarProgreso));
});


document.addEventListener('DOMContentLoaded', () => {
    const sectionChat = document.querySelector('#view-chat');
    // Supongamos que tomamos los primeros 4 campos (Datos del Usuario)
    const inputsChat = sectionChat.querySelectorAll('.form-container:first-of-type .input-field');
    const inputId = inputsChat[3]; // El cuarto campo es el ID
    const btnBusqueda = sectionChat.querySelector('.btn-search-mint');
    
    const modal = document.getElementById('modal-advertencia');
    const btnEntendido = document.getElementById('btn-entendido');

    // Función para cambiar colores
    function validarBusqueda() {
        let llenos = 0;
        inputsChat.forEach(input => {
            if (input.value.trim() !== "") llenos++;
        });

        btnBusqueda.classList.remove('amarillo', 'naranja', 'verde');
        btnBusqueda.classList.add('btn-busqueda-dinamico');

        if (inputId.value.trim() !== "" && llenos === 4) {
            btnBusqueda.classList.add('verde');
        } else if (llenos >= 3) {
            btnBusqueda.classList.add('naranja');
        } else if (llenos >= 1) {
            btnBusqueda.classList.add('amarillo');
        }
    }

    // Escuchar escritura
    inputsChat.forEach(input => input.addEventListener('input', validarBusqueda));

    // Lógica de la Modal
    btnBusqueda.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex'; // Mostrar modal
    });

    btnEntendido.addEventListener('click', () => {
        modal.style.display = 'none'; // Cerrar modal
    });
});



document.addEventListener('DOMContentLoaded', () => {
    // ... (Mantén tu lógica de colores de la respuesta anterior) ...

    const btnBusqueda = document.getElementById('btn-search-chat');
    const modal = document.getElementById('modal-advertencia');
    const btnEntendido = document.getElementById('btn-entendido');

    btnEntendido.addEventListener('click', () => {
        modal.style.display = 'none'; // Cerramos la modal

        // Iniciamos la animación de carga en el botón
        btnBusqueda.classList.add('btn-loading');

        // Simulamos que la búsqueda tarda 3 segundos
        setTimeout(() => {
            btnBusqueda.classList.remove('btn-loading');
            
            // Opcional: Una alerta simple para avisar que terminó
            alert("Búsqueda completada: No se encontraron usuarios con esos criterios.");
        }, 3000); 
    });
});


// logica para habilitar el botón de registro de grupo//

document.addEventListener('DOMContentLoaded', () => {
    const seccionGrupo = document.querySelector('#view-grupo');
    const btnGrupo = document.querySelector('#btn-registro-grupo');
    
    // Seleccionamos todos los inputs, el textarea y los checkboxes de ESTA sección
    const camposTexto = seccionGrupo.querySelectorAll('input[type="text"], textarea');
    const checkboxes = seccionGrupo.querySelectorAll('input[type="checkbox"]');
    
    const totalElementos = camposTexto.length + checkboxes.length;

    function calcularProgresoGrupo() {
        let completados = 0;
        let todosLosChecks = true;

        // Validar campos de texto y descripción
        camposTexto.forEach(campo => {
            if (campo.value.trim() !== "") completados++;
        });

        // Validar checkboxes
        let marcados = 0;
        checkboxes.forEach(check => {
            if (check.checked) {
                completados++;
                marcados++;
            } else {
                todosLosChecks = false;
            }
        });

        const porcentaje = (completados / totalElementos) * 100;

        // Limpiar clases de color
        btnGrupo.classList.remove('progreso-25', 'progreso-50', 'progreso-80', 'progreso-100');
        btnGrupo.disabled = true;

        // Aplicar colores según tu regla
        if (completados === totalElementos) {
            btnGrupo.classList.add('progreso-100');
            btnGrupo.disabled = false;
        } else if (porcentaje >= 80) {
            btnGrupo.classList.add('progreso-80');
        } else if (porcentaje >= 50) {
            btnGrupo.classList.add('progreso-50');
        } else if (porcentaje >= 25) {
            btnGrupo.classList.add('progreso-25');
        }
    }

    // Escuchar eventos en cada elemento
    camposTexto.forEach(c => c.addEventListener('input', calcularProgresoGrupo));
    checkboxes.forEach(ch => ch.addEventListener('change', calcularProgresoGrupo));
});


// logica para habilitar el mensaje de exito//

document.addEventListener('DOMContentLoaded', () => {
    const btnRegistro = document.getElementById('btn-registro-perfil');
    const modalExito = document.getElementById('modal-exito');
    const btnCerrarExito = document.getElementById('btn-exito-entendido');
    const formInputs = document.querySelectorAll('#view-perfil .input-field');

    btnRegistro.addEventListener('click', (e) => {
        e.preventDefault();

        // 1. Iniciamos animación de carga en el botón
        btnRegistro.classList.add('btn-loading');

        // 2. Simulamos la "espera" del servidor (2 segundos)
        setTimeout(() => {
            // 3. Quitamos el estado de carga
            btnRegistro.classList.remove('btn-loading');

            // 4. Mostramos la modal de éxito
            modalExito.style.display = 'flex';

            // 5. Opcional: Limpiamos los campos del formulario
            formInputs.forEach(input => input.value = "");
            
            // 6. Opcional: Reiniciamos el color del botón a gris
            btnRegistro.className = 'btn-submit-progresivo'; 
            btnRegistro.disabled = true;

        }, 2000);
    });

    // Cerrar la modal al hacer clic en el botón
    btnCerrarExito.addEventListener('click', () => {
        modalExito.style.display = 'none';
    });
});
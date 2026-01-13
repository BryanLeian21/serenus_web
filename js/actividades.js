// Script para manejar la expansión de tarjetas de actividades
document.addEventListener('DOMContentLoaded', function() {
    const emojiModal = document.getElementById('emojiModal');
    const closeEmojiModal = document.getElementById('closeEmojiModal');
    let currentAddButton = null;

    // Helper: attach behavior to a single card
    function setupCard(card) {
        if (!card) return;

        card.addEventListener('click', function(e) {
            // Si se hace clic en el botón de añadir, abrir modal
            const addButton = e.target.closest('.add-button');
            if (addButton) {
                e.stopPropagation();
                currentAddButton = addButton;
                emojiModal.classList.add('active');
                return;
            }

            // Si se hace clic en el título editable o la pregunta, no cerrar la tarjeta
            if (e.target.closest('.expanded-title') || e.target.closest('.expanded-question')) {
                return;
            }

            // Alternar clase expanded
            const wasExpanded = this.classList.contains('expanded');
            this.classList.toggle('expanded');

            // Si se acaba de expandir, enfocar el título después de un breve delay
            if (!wasExpanded && this.classList.contains('expanded')) {
                setTimeout(() => {
                    const title = this.querySelector('.expanded-title');
                    if (title) {
                        title.focus();
                        // Seleccionar todo el texto para facilitar edición
                        const range = document.createRange();
                        range.selectNodeContents(title);
                        const sel = window.getSelection();
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }, 100);
            }
        });

        // Escuchar cambios en la pregunta para cambiar el color gradualmente
        const question = card.querySelector('.expanded-question');
        if (question) {
            question.addEventListener('input', function() {
                updateCardColor(card, this.textContent.length);
            });
        }
    }

    // Inicializar todas las tarjetas existentes
    document.querySelectorAll('.activity-card').forEach(setupCard);

    // Crear una nueva tarjeta (gris) y devolver el elemento
    function createNewActivityCard() {
        const template = `
        <div class="activity-card gray">
          <div class="card-icon-container"><svg class="card-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v3c0 .6.4 1 1 1h1l5-5h5c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14h-5.2L12 18.8V16H4V4h16v12z" fill="currentColor"/><path d="M6 8h12v2H6zm0 4h8v2H6z" fill="currentColor"/></svg><svg class="card-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/></svg><svg class="card-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/></svg></div>
          <div class="expanded-content">
            <div class="expanded-header">
              <h3 class="expanded-title" contenteditable="true" data-placeholder="Nueva Actividad">Nueva Actividad</h3>
              <hr class="expanded-divider">
            </div>
            <p class="expanded-question" contenteditable="true" data-placeholder="¿Como estuvo hoy?">¿Como estuvo hoy?</p>
            <div class="add-button-container">
              <div class="add-button">
                <span class="add-button-icon">+</span>
              </div>
            </div>
          </div>
        </div>`;

        const wrapper = document.createElement('div');
        wrapper.innerHTML = template.trim();
        return wrapper.firstElementChild;
    }

    // Manejar click en "Nueva Nota"
    const nuevaNotaBtn = document.querySelector('.pill--mint');
    if (nuevaNotaBtn) {
        nuevaNotaBtn.addEventListener('click', function() {
            const sectionHoyGrid = document.querySelector('.section--hoy .activity-grid');
            if (!sectionHoyGrid) return;
            const newCard = createNewActivityCard();
            // Insertar al inicio
            sectionHoyGrid.insertBefore(newCard, sectionHoyGrid.firstElementChild);
            // Configurar listeners para la nueva tarjeta
            setupCard(newCard);
            // Opcional: expandir y enfocar inmediatamente
            newCard.classList.add('expanded');
            setTimeout(() => {
                const title = newCard.querySelector('.expanded-title');
                if (title) title.focus();
            }, 80);
        });
    }
    
    // Manejar selección de emoji
    document.querySelectorAll('.emoji-item').forEach(emojiBtn => {
        emojiBtn.addEventListener('click', function() {
            const emoji = this.getAttribute('data-emoji');
            if (currentAddButton) {
                const iconSpan = currentAddButton.querySelector('.add-button-icon');
                iconSpan.textContent = emoji;
                currentAddButton.classList.add('has-emoji');
            }
            emojiModal.classList.remove('active');
        });
    });
    
    // Cerrar modal
    closeEmojiModal.addEventListener('click', function() {
        emojiModal.classList.remove('active');
    });
    
    // Cerrar modal al hacer clic fuera
    emojiModal.addEventListener('click', function(e) {
        if (e.target === emojiModal) {
            emojiModal.classList.remove('active');
        }
    });
    
    // Función para cambiar el color gradualmente según el texto escrito
    function updateCardColor(card, textLength) {
        // Determinar el color base de la tarjeta
        let baseColor, targetColor;
        
        if (card.classList.contains('gray')) {
            baseColor = { r: 107, g: 107, b: 107 }; // #6b6b6b
            targetColor = { r: 220, g: 220, b: 220 }; // Gris claro
        } else if (card.classList.contains('blue')) {
            baseColor = { r: 74, g: 144, b: 226 }; // #4A90E2
            targetColor = { r: 183, g: 227, b: 255 }; // Azul claro
        } else if (card.classList.contains('green')) {
            baseColor = { r: 76, g: 175, b: 80 }; // #4CAF50
            targetColor = { r: 200, g: 255, b: 210 }; // Verde claro
        } else {
            return;
        }
        
        // Calcular el progreso basado en la longitud del texto (max 200 caracteres para transición completa)
        const progress = Math.min(textLength / 200, 1);
        
        // Interpolar entre el color base y el color objetivo
        const r = Math.round(baseColor.r + (targetColor.r - baseColor.r) * progress);
        const g = Math.round(baseColor.g + (targetColor.g - baseColor.g) * progress);
        const b = Math.round(baseColor.b + (targetColor.b - baseColor.b) * progress);
        
        card.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        
        // Cambiar color del texto para contraste cuando el fondo se aclare
        const expandedContent = card.querySelector('.expanded-content');
        if (expandedContent) {
            // Si el progreso es mayor a 40%, cambiar a texto oscuro
            if (progress > 0.4) {
                expandedContent.style.color = `rgba(0, 0, 0, ${0.7 + progress * 0.3})`;
            } else {
                expandedContent.style.color = 'white';
            }
        }
    }
    
    // Prevenir que Enter cree nuevas líneas en el título
    document.addEventListener('keydown', function(e) {
        if (e.target.classList.contains('expanded-title') && e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
        // Permitir Enter en la pregunta para crear nuevas líneas
        
        // Cerrar modal con Escape
        if (e.key === 'Escape' && emojiModal.classList.contains('active')) {
            emojiModal.classList.remove('active');
        }
    });
});

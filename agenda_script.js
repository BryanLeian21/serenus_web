// script.js (para agenda.html)

document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.querySelector('.back-button');
    const menuButton = document.querySelector('.menu-button');
    const agendarCitaBtn = document.getElementById('agendarCitaBtn');
    const monthNameSpan = document.querySelector('.month-name');
    const calendarGrid = document.querySelector('.calendar-grid');

    const appointmentModal = document.getElementById('appointmentModal');
    const modalFechaInput = document.getElementById('modalFecha');
    const modalHoraInput = document.getElementById('modalHora');
    const modalServicioInput = document.getElementById('modalServicio');
    const modalBackBtn = document.getElementById('modalBackBtn');
    const modalConfirmBtn = document.getElementById('modalConfirmBtn');

    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    const renderCalendar = (month, year) => {
        calendarGrid.innerHTML = '';

        const dayNames = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
        dayNames.forEach(name => {
            const dayNameDiv = document.createElement('div');
            dayNameDiv.classList.add('day-name');
            dayNameDiv.textContent = name;
            calendarGrid.appendChild(dayNameDiv);
        });

        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let firstDayOfWeek = firstDayOfMonth.getDay();
        if (firstDayOfWeek === 0) firstDayOfWeek = 6;
        else firstDayOfWeek--;

        for (let i = 0; i < firstDayOfWeek; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('day-cell', 'empty');
            calendarGrid.appendChild(emptyCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('day-cell');
            dayCell.textContent = day;
            const formattedMonth = (month + 1).toString().padStart(2, '0');
            const formattedDay = day.toString().padStart(2, '0');
            dayCell.dataset.fullDate = `${year}-${formattedMonth}-${formattedDay}`;

            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayCell.classList.add('selected');
            }

            dayCell.addEventListener('click', () => {
                if (dayCell.classList.contains('empty')) return;

                const currentSelected = document.querySelector('.day-cell.selected');
                if (currentSelected) {
                    currentSelected.classList.remove('selected');
                }
                dayCell.classList.add('selected');

                const selectedDate = dayCell.dataset.fullDate;
                console.log(`Día seleccionado: ${selectedDate}. Abriendo modal.`);
                modalFechaInput.value = selectedDate;
                appointmentModal.classList.add('show');
            });

            calendarGrid.appendChild(dayCell);
        }

        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Julio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        monthNameSpan.textContent = monthNames[month];
    };

    renderCalendar(currentMonth, currentYear);

    // Botón de Volver Atrás
    if (backButton) {
        backButton.addEventListener('click', () => {
            console.log('Botón "Volver Atrás" clickeado. Volviendo a main_page.html');
            window.location.href = 'paginap_index.html'; // Vuelve a la página del menú principal
        });
    }

    // Botón de Menú
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            console.log('Botón "Menú" clickeado. Navegando a main_page.html');
            window.location.href = 'paginap_index.html'; // Navega a la página del menú principal
        });
    }

    // Botón "Agendar Cita" flotante
    if (agendarCitaBtn) {
        agendarCitaBtn.addEventListener('click', () => {
            console.log('Botón "Agendar Cita" clickeado. Abriendo modal.');
            modalFechaInput.value = '';
            modalHoraInput.value = '';
            modalServicioInput.value = '';
            appointmentModal.classList.add('show');
        });
    }

    // Event Listeners del Modal
    if (modalBackBtn) {
        modalBackBtn.addEventListener('click', () => {
            console.log('Botón "Atrás" del modal clickeado. Ocultando modal.');
            appointmentModal.classList.remove('show');
            modalFechaInput.value = '';
            modalHoraInput.value = '';
            modalServicioInput.value = '';
        });
    }

    if (modalConfirmBtn) {
        modalConfirmBtn.addEventListener('click', () => {
            const fecha = modalFechaInput.value;
            const hora = modalHoraInput.value;
            const servicio = modalServicioInput.value;

            if (fecha === '' || hora === '' || servicio === '') {
                alert('Por favor, completa todos los campos de la cita.');
                return;
            }

            console.log(`Cita confirmada: Fecha: ${fecha}, Hora: ${hora}, Servicio: ${servicio}`);
            alert(`Cita agendada para el ${fecha} a las ${hora} para el servicio de ${servicio}.`);
            appointmentModal.classList.remove('show');
            // Aquí se enviaría la información de la cita a un backend o se guardaría localmente
        });
    }

    if (appointmentModal) {
        appointmentModal.addEventListener('click', (event) => {
            if (event.target === appointmentModal) {
                console.log('Clic en overlay del modal. Ocultando modal.');
                appointmentModal.classList.remove('show');
                modalFechaInput.value = '';
                modalHoraInput.value = '';
                modalServicioInput.value = '';
            }
        });
    }

    console.log('Página de Agenda cargada correctamente.');
});

document.addEventListener('DOMContentLoaded', () => {
    // Actualizar el año en el footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Botón para alternar modo oscuro
    const toggleDarkModeButton = document.getElementById('toggleDarkMode');
    if (toggleDarkModeButton) {
        // Verificar si hay una preferencia guardada
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            toggleDarkModeButton.textContent = 'Modo Claro';
        }

        toggleDarkModeButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');

            // Guardar preferencia en localStorage
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
                toggleDarkModeButton.textContent = 'Modo Claro';
            } else {
                localStorage.setItem('darkMode', 'disabled');
                toggleDarkModeButton.textContent = 'Modo Oscuro';
            }
        });
    }

    // Botones para mostrar/ocultar contenido de las secciones
    const toggleContentButtons = document.querySelectorAll('.toggle-content');
    toggleContentButtons.forEach(button => {
        button.addEventListener('click', () => {
            const contentDiv = button.nextElementSibling; // El div .content es el siguiente hermano
            if (contentDiv && contentDiv.classList.contains('content')) {
                contentDiv.classList.toggle('hidden');
                if (contentDiv.classList.contains('hidden')) {
                    button.textContent = 'Mostrar Contenido';
                } else {
                    button.textContent = 'Ocultar Contenido';
                }
            }
        });
    });

    // Smooth scroll para la tabla de contenidos (TOC)
    const tocLinks = document.querySelectorAll('.toc a[href^="#"]');
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Alinea la parte superior del elemento con la parte superior de la ventana gráfica
                });

                // Opcional: Abrir la sección si está colapsada
                const contentDiv = targetElement.querySelector('.content.hidden');
                if (contentDiv) {
                    const toggleButton = targetElement.querySelector('.toggle-content');
                    contentDiv.classList.remove('hidden');
                    if (toggleButton) {
                        toggleButton.textContent = 'Ocultar Contenido';
                    }
                }
            }
        });
    });
});
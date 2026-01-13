// ==================== ESCENA 3D VR ====================
let scene, camera, renderer, cube;
let currentColorIndex = 0;
// Estado para control de animación y crash simulado
let isCrashed = false;
let animationFrameId = null;
let crashTimeoutId = null;
let crashOverlayEl = null;
const cubeColors = [
    0x7c63f4, // Púrpura
    0x00d4ff, // Cian
    0x00ff88, // Verde
    0xff006e, // Rosa/Magenta
    0xffd60a, // Amarillo
    0x667eea, // Púrpura azulado
];

const cubeEmissives = [
    0x5a4a9f, // Púrpura
    0x0099cc, // Cian
    0x00aa55, // Verde
    0xcc004d, // Rosa/Magenta
    0xccaa00, // Amarillo
    0x445599, // Púrpura azulado
];

function init3DScene() {
    const canvas = document.getElementById('canvas3d');
    
    // Crear escena
    scene = new THREE.Scene();
    scene.background = null; // Fondo transparente

    // Obtener dimensiones reales del canvas
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Configurar cámara
    camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
    );
    camera.position.z = 2.5;

    // Configurar renderizador
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        antialias: true, 
        alpha: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;

    // Crear geometría del cubo
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    
    // Crear material del cubo - Púrpura
    const material = new THREE.MeshStandardMaterial({
        color: 0x7c63f4, // Púrpura
        metalness: 0.4,
        roughness: 0.4,
        emissive: 0x5a4a9f,
        emissiveIntensity: 0.1
    });

    // Crear cubo
    cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);

    // ==================== CREAR SOMBRA EN EL FONDO ====================
    // Crear un plano que actúe como sombra
    const shadowGeometry = new THREE.CircleGeometry(1.5, 32);
    const shadowMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.3
    });
    const shadowPlane = new THREE.Mesh(shadowGeometry, shadowMaterial);
    shadowPlane.position.y = -0.9;
    shadowPlane.position.z = -0.1;
    shadowPlane.rotation.x = Math.PI / 2.2;
    scene.add(shadowPlane);

    // Iluminación ambiental
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Luz direccional (principal) - azul suave
    const directionalLight = new THREE.DirectionalLight(0xb3c1ff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Luz de relleno (secundaria) - púrpura
    const fillLight = new THREE.DirectionalLight(0xd8a5ff, 0.3);
    fillLight.position.set(-5, 3, -5);
    scene.add(fillLight);

    // Luz puntual azul claro alrededor del cubo
    const pointLight = new THREE.PointLight(0x8fa5ff, 0.4);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    // Iniciar animación
    animate();

    // Manejar redimensionamiento de ventana
    window.addEventListener('resize', onWindowResize);
}

function animate() {
    if (isCrashed) return;

    // Rotación del cubo
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.008;
    cube.rotation.z += 0.003;

    // Movimiento ligero hacia arriba y abajo
    cube.position.y = Math.sin(Date.now() * 0.001) * 0.3;

    renderer.render(scene, camera);

    // Programar el siguiente frame sólo si no hay crash
    animationFrameId = requestAnimationFrame(animate);
}

function onWindowResize() {
    const canvas = document.getElementById('canvas3d');
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

// Inicializar cuando la página carga
document.addEventListener('DOMContentLoaded', init3DScene);

// ==================== INTERACTIVIDAD BOTONES ====================
document.addEventListener('DOMContentLoaded', function() {
    const btnCambio = document.querySelector('.btn-3d-cambio');
    const btnJuego = document.querySelector('.btn-3d-juego');
    const btnVR = document.querySelector('.btn-3d-vr');

    btnCambio.addEventListener('click', function() {
        changeColor();
    });

    btnJuego.addEventListener('click', function() {
        playGameMode();
    });

    btnVR.addEventListener('click', function() {
        console.log('Botón VR clickeado');
        // Aquí puedes agregar funcionalidad
    });
});

// ==================== FUNCIÓN MODO JUEGO ====================
function playGameMode() {
    const canvas = document.getElementById('canvas3d');
    const buttonsContainer = document.querySelector('.buttons-3d-container');
    const mainContainer = document.querySelector('.vr-main-container');
    
    // Agregar clases de animación
    canvas.classList.add('slide-out-right');
    buttonsContainer.classList.add('slide-out-down');
    
    // Después de la transición, cambiar estado de pantalla limpia y mostrar título
    setTimeout(() => {
        mainContainer.classList.add('clean-screen');
        
        // Mostrar el título con animación
        const titleContainer = document.getElementById('titleContainer');
        if (titleContainer) {
            titleContainer.classList.add('show-title');
        }
        
        console.log('Entrando en modo juego...');

        // Programar crash simulado entre 10 y 15 minutos
        scheduleCrash();
    }, 1000);
}

// ==================== PROGRAMAR Y SIMULAR CRASH ====================
function scheduleCrash() {
    // Limpiar cualquier programación previa
    if (crashTimeoutId) {
        clearTimeout(crashTimeoutId);
        crashTimeoutId = null;
    }

    const minDelay = 10 * 1000; // 10 segundos
    const maxDelay = 15 * 1000; // 15 segundos
    const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

    crashTimeoutId = setTimeout(simulateCrash, delay);
    console.log(`Crash simulado programado en ~${Math.round(delay / 1000)} s.`);
}

function simulateCrash() {
    // Pausar loop de animación
    isCrashed = true;
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }

    // Crear overlay sólo una vez
    if (!crashOverlayEl) {
        crashOverlayEl = document.createElement('div');
        crashOverlayEl.className = 'crash-overlay';
        crashOverlayEl.setAttribute('role', 'dialog');
        crashOverlayEl.setAttribute('aria-live', 'assertive');

        const message = document.createElement('div');
        message.className = 'crash-message';
        const spinner = document.createElement('div');
        spinner.className = 'loading-symbol';
        const text = document.createElement('p');
        text.textContent = 'SERENUS está en creación — vuelve pronto.';

        message.appendChild(spinner);
        message.appendChild(text);
        crashOverlayEl.appendChild(message);
    }

    document.body.appendChild(crashOverlayEl);

    // Redirigir a la página de inicio después de 4 segundos
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 4000);
}

// ==================== FUNCIÓN REINICIAR PANTALLA ====================
function resetScreen() {
    const canvas = document.getElementById('canvas3d');
    const buttonsContainer = document.querySelector('.buttons-3d-container');
    const mainContainer = document.querySelector('.vr-main-container');
    
    // Remover clases de animación
    canvas.classList.remove('slide-out-right');
    buttonsContainer.classList.remove('slide-out-down');
    mainContainer.classList.remove('clean-screen');
    
    // Remover clase del título
    const titleContainer = document.getElementById('titleContainer');
    if (titleContainer) {
        titleContainer.classList.remove('show-title');
    }
}

// ==================== FUNCIÓN CAMBIAR COLOR ====================
function changeColor() {
    if (!cube) return;
    
    // Avanzar al siguiente color
    currentColorIndex = (currentColorIndex + 1) % cubeColors.length;
    
    // Actualizar color del cubo con transición suave
    const targetColor = new THREE.Color(cubeColors[currentColorIndex]);
    const targetEmissive = new THREE.Color(cubeEmissives[currentColorIndex]);
    
    // Animación suave de cambio de color
    const currentColor = cube.material.color.getHex();
    const startTime = Date.now();
    const duration = 600; // 600ms de transición
    
    function animateColor() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const fromColor = new THREE.Color(currentColor);
        const toColor = targetColor;
        
        fromColor.lerp(toColor, progress);
        cube.material.color.copy(fromColor);
        
        // Animar emissive también
        const currentEmissive = cube.material.emissive;
        const fromEmissive = new THREE.Color(0x000000);
        fromEmissive.lerp(targetEmissive, progress * 0.5);
        currentEmissive.copy(fromEmissive);
        
        if (progress < 1) {
            requestAnimationFrame(animateColor);
        }
    }
    
    animateColor();
}

// TEXTO DE LA CARTA (ESTILO PROGRAMADORA / LORE)
const cartaLore = `/**
 * Servidores de la Vanguardia // Registro XXII_DESEO
 * Estado: Completado con Éxito.
 */

const guardiana = {
    nombre: "Virtuosa",
    nivel: 27,
    status: "Leyenda de la Torre"
};

function celebrarCumpleaños() {
    console.log("¡Feliz Cumpleaños, Guardiana!");
    
    // Escribe aquí tus palabras bonitas desde el corazón:
    return \`Hoy alcanzamos el nivel 27. A lo largo de este viaje llamado vida, has superado incursiones que parecían imposibles, has derrotado jefes en solitario y has demostrado una resiliencia inquebrantable.
    
    No importa qué tan oscura se ponga la galaxia, recuerda que siempre tienes a tu escuadra principal en la Torre (tu madre y tu hermano) listos para cubrirte las espaldas. 
    
    Eres brillante, eres fuerte, eres una programadora excepcional y, sobre todo, una persona Virtuosa. Que la Luz te acompañe en este nuevo año.\`;
}

celebrarCumpleaños();`;

// GESTIÓN DE ESTADO DE VISTAS (STATE VIEW MANAGER)
const body = document.body;
const audio = document.getElementById('bg-music');

// Escuchar clics globales para cambiar de pantalla
document.querySelectorAll('[data-target]').forEach(element => {
    element.addEventListener('click', (e) => {
        const nextView = element.getAttribute('data-target');
        
        // Si venimos de la pantalla splash, activamos música
        if (body.getAttribute('data-view') === 'splash') {
            audio.volume = 0.3;
            audio.play().catch(err => console.log("Audio bloqueado por navegador hasta interacción"));
        }

        // Cambiar estado visual
        body.setAttribute('data-view', nextView);

        // Si entramos a Venus, disparamos el efecto de escribir la carta
        if (nextView === 'venus') {
            triggerTypingEffect();
        }
    });
});

// CURSOR INTELIGENTE DE DESTINY 2
const customCursor = document.getElementById('destiny-cursor');

document.addEventListener('mousemove', (e) => {
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
});
// Detectar si el cursor pasa por encima de algo interactivo
// Detectar si el cursor pasa por encima de algo interactivo
const interactivos = document.querySelectorAll('button, .destination-node');
interactivos.forEach(el => {
    el.addEventListener('mouseenter', () => customCursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => customCursor.classList.remove('hovering'));
});

// EFECTO TYPING (MÁQUINA DE ESCRIBIR) PARA LA CARTA
let typingStarted = false;
function triggerTypingEffect() {
    if (typingStarted) return; // Evitar que se repita si vuelve a entrar
    typingStarted = true;
    
    const target = document.getElementById('lore-text-target');
    let index = 0;
    
    function type() {
        if (index < cartaLore.length) {
            target.textContent += cartaLore.charAt(index);
            index++;
            setTimeout(type, 15); // Velocidad de escritura (en milisegundos)
        }
    }
    type();
}

// CONTROL DE LANZAMIENTO MANUAL DE LA INCURSION
document.getElementById('btn-start-raid').addEventListener('click', () => {
    const launchBox = document.getElementById('launch-box');
    const encounterBox = document.getElementById('encounter-box');
    
    // Ocultar la pantalla de lanzamiento
    launchBox.style.display = 'none';
    
    // Mostrar la tarjeta del juego con el formato Flexbox original
    encounterBox.style.display = 'flex';
    encounterBox.style.flexDirection = 'column';
    
    // Arrancar oficialmente el primer encuentro
    cargarEncuentro();
});

// ==========================================================================
// CONFIGURACIÓN DE LA INCURSIÓN: XXII DESEO (MINI-JUEGO)
// ==========================================================================

// 1. Las 4 preguntas con sus respectivas opciones y respuestas correctas (1-A, 2-D, 3-D, 4-B)
const encuentrosRaid = [
    {
        titulo: "ENCUENTRO I: CORTAFUEGOS",
        pregunta: "¿En qué año nació el creador del deseo XXII?",
        opciones: [
            "A) 1999",
            "B) 1998",
            "C) 2001",
            "D) 1995"
        ],
        correcta: 0 // Índice 0 corresponde a la opción A
    },
    {
        titulo: "ENCUENTRO II: ORÁCULOS",
        pregunta: "¿De qué se gana la vida el creador del deseo XXII?",
        opciones: [
            "A) No trabaja.",
            "B) Programador.",
            "C) Jugando jueguitos.",
            "D) Reparando relojes."
        ],
        correcta: 2 // Índice 3 corresponde a la opción D
    },
    {
        titulo: "ENCUENTRO III: MENTE CONSAGRADA",
        pregunta: "¿Qué animal representa actitudes y comportamientos del creador del deseo XXII?",
        opciones: [
            "A) Colibrí.",
            "B) Perro.",
            "C) Tortuga.",
            "D) Gato."
        ],
        correcta: 3 // Índice 3 corresponde a la opción D
    },
    {
        titulo: "ENCUENTRO IV: LA CÁMARA",
        pregunta: "¿Por quién merece la pena que sigas luchando?",
        opciones: [
            "A) El creador del deseo XXII.",
            "B) Raquel.",
            "C) Un lazo roto.",
            "D) Cualquier otra persona."
        ],
        correcta: 1 // Índice 1 corresponde a la opción B
    }
];

let encuentroActual = 0;

// 2. Elementos del DOM del mini-juego
const encTitleElement = document.getElementById('encounter-title');
const encQuestionElement = document.getElementById('encounter-question');
const optionsContainer = document.getElementById('options-container');
const feedbackText = document.getElementById('feedback-text');
const encounterBox = document.getElementById('encounter-box');

// 3. Función para cargar el encuentro actual en pantalla
function cargarEncuentro() {
    // Limpiar mensajes de feedback anteriores
    feedbackText.textContent = "";
    feedbackText.className = "feedback-message";

    if (encuentroActual < encuentrosRaid.length) {
        const datos = encuentrosRaid[encuentroActual];
        
        // Actualizar textos del encuentro
        encTitleElement.textContent = datos.titulo;
        encQuestionElement.textContent = datos.pregunta;
        
        // Renderizar las opciones en botones estilo Destiny
        optionsContainer.innerHTML = "";
        datos.opciones.forEach((opcion, index) => {
            const boton = document.createElement('button');
            boton.className = 'option-btn';
            boton.textContent = opcion;
            
            // Asignar detector de clics para verificar la respuesta
            boton.addEventListener('click', () => verificarRespuesta(index));
            optionsContainer.appendChild(boton);
        });
        
        // Forzar al cursor de Destiny a reconocer los nuevos botones inyectados
        actualizarCursorInteractivos();
    } else {
        // Fin de la Raid: Desplegar botón de Descifrar con la estética de la Quest
        renderizarFinDeRaid();
    }
}

// 4. Función para validar la opción elegida por Raquel
function verificarRespuesta(indiceElegido) {
    const datosCorrectos = encuentrosRaid[encuentroActual];
    
    if (indiceElegido === datosCorrectos.correcta) {
        // Respuesta Correcta: Encender en verde el checklist del HTML
        feedbackText.style.color = "var(--vanguard-blue)";
        feedbackText.textContent = "✓ ENCUENTRO SUPERADO";
        
        // Marcar el objetivo de la quest actual en la columna derecha
        const objId = `obj-${encuentroActual + 1}`;
        const objectiveItem = document.getElementById(objId);
        if (objectiveItem) {
            objectiveItem.classList.add('completed');
        }
        
        // Pequeña pausa táctica de 1.5 segundos para ver el éxito antes de saltar al siguiente nivel
        encuentroActual++;
        setTimeout(cargarEncuentro, 1500);
    } else {
        // Respuesta Incorrecta: Alerta estilo error de la interfaz del Espectro
        feedbackText.style.color = "#f94144";
        feedbackText.textContent = "❌ ERROR";
        
        // Efecto visual sutil de vibración en la tarjeta ante el error
        encounterBox.style.animation = 'none';
        encounterBox.offsetHeight; // Forzar reflow de renderizado
        encounterBox.style.animation = 'pulse 0.3s ease 2';
    }
}

// 5. Renderizar el estado final: El botón excepcional "Descifrar"
function renderizarFinDeRaid() {
    encounterBox.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
            <span class="encounter-phase" style="color: var(--exotic-gold);">// RECOMPENSA EXCEPCIONAL DISPONIBLE</span>
            <h2 style="font-size: 2rem; color: var(--text-white); letter-spacing: 3px; margin-bottom: 15px;">INCURSIÓN CONQUISTADA</h2>
            <p class="question-text" style="max-width: 550px; margin: 0 auto 35px auto;">El enramado lógico del Deseo XXII ha sido completamente descifrado.</p>
            
            <!-- Botón con los colores exactos y estética de la Quest ocre/dorada -->
            <button id="btn-decrypt" class="back-btn" data-target="venus" style="
                background-color: #ceae31;
                color: #0b0e12;
                padding: 18px 45px;
                font-size: 1.1rem;
                font-weight: bold;
                letter-spacing: 3px;
                border: 1px solid #ffffff;
                box-shadow: 0 0 20px rgba(245, 203, 66, 0.4);
                align-self: center;
                transition: all 0.3s ease;
                margin-top: 10px;
            ">DESCIFRAR</button>
        </div>
    `;
    
    // Configurar la transición del botón final hacia el despliegue del Lore del texto de la carta
    document.getElementById('btn-decrypt').addEventListener('click', () => {
        // Cambiar la vista general del body al contenedor final de la carta (que antes se llamaba view-venus pero ahora aloja el juego)
        // Nota: Como modificamos el HTML para que Venus sea el juego, el botón de descifrar simplemente transformará esta misma pantalla para mostrar el texto hermoso con máquina de escribir.
        triggerDespliegueDeCarta();
    });
    
    actualizarCursorInteractivos();
}

// 6. Transición final para inyectar la Carta con efecto typing dentro del mismo contenedor
function triggerDespliegueDeCarta() {
    const raidLayout = document.querySelector('.raid-layout');
    
    // Ocultar la estructura de juego con una transición limpia estilo Destiny
    raidLayout.style.transition = "opacity 0.5s ease";
    raidLayout.style.opacity = "0";
    
    setTimeout(() => {
        // Reemplazar la cuadrícula de juego por el contenedor exclusivo de la Carta Cifrada
        raidLayout.removeAttribute('style'); // Limpiar opacidad cero
        raidLayout.className = "view-container"; // Heredar el estilo centrado de la Torre
        raidLayout.innerHTML = `
            <div class="lore-container" style="animation: entradaCinematica 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;">
                <div class="lore-header">
                    <span class="exotic-tag">CARTA EXCEPCIONAL DESCIFRADA</span>
                    <h1 class="exotic-color" style="font-size: 2.2rem; letter-spacing: 2px;">Carta_Felicidades.crypt</h1>
                    <p class="subtitle" style="color: var(--vanguard-blue); font-size: 0.85rem; margin-top: 4px;">Sincronización completa establecida // Registro XXII Deseo</p>
                </div>

                <hr class="destiny-divider">

                <div class="lore-body">
                    <p id="lore-text-target" style="font-size: 1.1rem; line-height: 1.9; color: #d1d7de; font-style: italic;">
                    Si estás leyendo esto es que me conoces lo suficiente como para haber descifrado esta carta. Eso es bueno y te lo agradezco mucho.
                    Te quiero hacer llegar mis más profundas felicidades hoy en tu día especial. De todo corazón, espero que este jueguito haya cautivado algo en ti. Sé que no es lo que me pediste específicamente pero mencionaste la idea de juegos e innevitablemente me inspiré por la obra que más tiempo lleva conmigo en mi vida. 
                    También quiero agradecerte por estos meses que nos hemos conocido y por la amistad que no dudaste en brindarme. Me ayudas bastante a recordar lecciones que olvido con demasiada facilidad y a no caer en el absoluto aislamiento.
                    Con el corazón en un puño quiero dedicarte lo mejor para este nuevo año de vida que comienzas y que recordarte que no debes permitir que tu luz deje de brillar nunca. Te irá bien, pudiste con lo que se te puso en frente y podrás con lo que se te viene. 
                    Suerte y mis mejores deseos para ti, Raquel.
                    </p>
                </div>
            </div>
        `;
        
        // Iniciar la función de máquina de escribir global (el efecto typing que ya tenías programado originalmente)
        triggerTypingEffect();
    }, 500);
}

// 7. Utilidad para refrescar el cursor inteligente con los nuevos botones dinámicos
function actualizarCursorInteractivos() {
    const customCursor = document.getElementById('destiny-cursor');
    const interactivos = document.querySelectorAll('button, .option-btn, #btn-decrypt');
    interactivos.forEach(el => {
        el.addEventListener('mouseenter', () => customCursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => customCursor.classList.remove('hovering'));
    });
}

// Inicializar el primer encuentro en cuanto se cargue la web o el script se ejecute
cargarEncuentro();
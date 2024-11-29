// Variables globales
let camera, joystick;
let moveDirection = { x: 0, z: 0 };
const moveSpeed = 0.05; // Velocidad base de movimiento

// Detectar si es móvil
function isMobile() {
  return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
}

// Inicializar el joystick
function initJoystick() {
  const joystickContainer = document.getElementById("joystickContainer");

  // Crear el joystick usando nipplejs
  joystick = nipplejs.create({
    zone: joystickContainer,
    mode: "static",
    position: { left: "50px", bottom: "50px" },
    color: "blue",
  });

  // Manejar los movimientos del joystick
  joystick.on("move", (event, data) => {
    if (data && data.angle && data.distance) {
      const angle = data.angle.degree; // Ángulo en grados
      const speed = data.distance / 100; // Velocidad proporcional a la distancia
      calculateMoveDirection(angle, speed);
    }
  });

  // Detener el movimiento cuando se suelta el joystick
  joystick.on("end", () => {
    stopMovement();
  });

  // Iniciar el movimiento continuo
  startMovement();
}

// Calcular la dirección del movimiento
function calculateMoveDirection(angle, speed) {
  const radian = (angle * Math.PI) / 180; // Convertir ángulo a radianes

  // Calcular los componentes X y Z del movimiento
  moveDirection.x = Math.sin(radian) * moveSpeed * speed;
  moveDirection.z = Math.cos(radian) * moveSpeed * speed;
}

// Detener el movimiento
function stopMovement() {
  moveDirection.x = 0;
  moveDirection.z = 0;
}

// Mover la cámara continuamente
function startMovement() {
  const moveInterval = 10; // Intervalo de movimiento en milisegundos
  setInterval(() => {
    if (moveDirection.x !== 0 || moveDirection.z !== 0) {
      moveCamera();
    }
  }, moveInterval);
}

// Aplicar el movimiento a la cámara
function moveCamera() {
  const position = camera.getAttribute("position");

  // Actualizar las coordenadas X y Z basadas en la dirección del joystick
  position.x += moveDirection.x;
  position.z += moveDirection.z;

  // Actualizar la posición de la cámara en la escena
  camera.setAttribute("position", position);
}

// Inicializar el sistema al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  camera = document.querySelector("#camera");

  if (isMobile()) {
    initJoystick();
  }
});

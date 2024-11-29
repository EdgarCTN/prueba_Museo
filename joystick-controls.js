// Variables globales
let camera, joystick;
let moveDirection = { x: 0, z: 0 };

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
      calculateMoveDirection(data.angle.degree, data.distance / 100);
    }
  });

  joystick.on("end", () => {
    stopMovement();
  });

  startMovement();
}

// Calcular la dirección del movimiento
function calculateMoveDirection(angle, speed) {
  const radian = (angle * Math.PI) / 180; // Convertir ángulo a radianes
  const scaledSpeed = speed || 0.1; // Escalar la velocidad basado en la distancia

  // Calcular el vector de movimiento
  moveDirection.x = Math.cos(radian) * scaledSpeed;
  moveDirection.z = Math.sin(radian) * scaledSpeed;
}

// Detener el movimiento
function stopMovement() {
  moveDirection.x = 0;
  moveDirection.z = 0;
}

// Iniciar el movimiento continuo
function startMovement() {
  const moveInterval = 10; // Intervalo en milisegundos
  setInterval(() => {
    if (moveDirection.x !== 0 || moveDirection.z !== 0) {
      moveCamera();
    }
  }, moveInterval);
}

// Mover la cámara
function moveCamera() {
  // Obtener la dirección de la cámara en el mundo
  const cameraDirection = new THREE.Vector3();
  camera.object3D.getWorldDirection(cameraDirection);

  // Calcular nueva posición
  const position = camera.getAttribute("position");
  position.x += moveDirection.x * cameraDirection.z - moveDirection.z * cameraDirection.x;
  position.z += moveDirection.z * cameraDirection.z + moveDirection.x * cameraDirection.x;

  // Actualizar la posición de la cámara
  camera.setAttribute("position", position);
}

// Inicializar el sistema al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  camera = document.querySelector("#camera");

  if (isMobile()) {
    initJoystick();
  }
});

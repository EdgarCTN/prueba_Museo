// Variables globales
let camera, joystick;

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
      moveCamera(data.angle.degree, data.distance / 100);
    }
  });

  joystick.on("end", () => {
    stopCamera();
  });
}

// Mover la cámara
function moveCamera(angle, speed) {
  const moveSpeed = speed || 0.1; // Escalar velocidad según distancia del joystick
  const radian = (angle * Math.PI) / 180;

  // Obtener dirección de la cámara
  const direction = new THREE.Vector3();
  camera.object3D.getWorldDirection(direction);

  // Descomponer en componentes X y Z
  const deltaX = Math.cos(radian) * moveSpeed;
  const deltaZ = Math.sin(radian) * moveSpeed;

  // Calcular nueva posición
  const position = camera.getAttribute("position");
  position.x += deltaX;
  position.z += deltaZ;

  // Actualizar la posición de la cámara
  camera.setAttribute("position", position);
}

// Detener la cámara
function stopCamera() {
  // Aquí puedes implementar lógica adicional si se requiere
}

// Inicializar el sistema al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  camera = document.querySelector("#camera");

  if (isMobile()) {
    initJoystick();
  }
});

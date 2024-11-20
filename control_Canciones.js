document.addEventListener('DOMContentLoaded', function () {
  const listaCanciones = document.querySelector('#listaCanciones');
  const panelMusica = document.querySelector('#panelMusica');
  const botonVerCanciones = document.querySelector('#botonVerCanciones');
  const camara = document.querySelector('#camara');
  const tituloCancion = document.querySelector('#tituloCancion');
  const canciones = {
    cancion1: document.querySelector('#cancion1'),
    cancion2: document.querySelector('#cancion2'),
    cancion3: document.querySelector('#cancion3'),
  };
  let cancionActual = null;
  let listaVisible = false;

        // Función para alternar la visibilidad de la lista de canciones
        function alternarListaCanciones() {
          listaVisible = !listaVisible;
          if (listaVisible) {
            // Posicionar la lista frente al usuario
            const posicionCamara = new THREE.Vector3();
            const direccionCamara = new THREE.Vector3();
            camara.object3D.getWorldPosition(posicionCamara);
            camara.object3D.getWorldDirection(direccionCamara);

            posicionCamara.add(direccionCamara.multiplyScalar(-1.2));
            listaCanciones.setAttribute('position', {
              x: posicionCamara.x,
              y: posicionCamara.y,
              z: posicionCamara.z
            });

            // Orientar la lista hacia el usuario
            const rotacion = camara.object3D.rotation;
            listaCanciones.setAttribute('rotation', {
              x: rotacion.x * (180 / Math.PI),
              y: rotacion.y * (180 / Math.PI),
              z: rotacion.z * (180 / Math.PI)
            });
            listaCanciones.setAttribute('visible', 'true');

            // Posicionar el panel de música debajo de la lista
            panelMusica.setAttribute('position', {
              x: posicionCamara.x,
              y: posicionCamara.y - 0.8,
              z: posicionCamara.z
            });
            panelMusica.setAttribute('rotation', {
              x: rotacion.x * (180 / Math.PI),
              y: rotacion.y * (180 / Math.PI),
              z: rotacion.z * (180 / Math.PI)
            });
            panelMusica.setAttribute('visible', 'true');

            botonVerCanciones.innerText = "Ocultar Canciones";
          } else {
            // Ocultar lista y panel de música
            listaCanciones.setAttribute('visible', 'false');
            panelMusica.setAttribute('visible', 'false');
            botonVerCanciones.innerText = "Ver Canciones";
          }
        }


  function reproducirCancion(idCancion) {
    if (cancionActual && !cancionActual.paused) cancionActual.pause();
    cancionActual = canciones[idCancion];
    cancionActual.play();
    tituloCancion.setAttribute('value', 'Reproduciendo: ' + idCancion);
  }

  function pausarCancion() {
    if (cancionActual) cancionActual.pause();
  }

  function detenerCancion() {
    if (cancionActual) {
      cancionActual.pause();
      cancionActual.currentTime = 0;
      tituloCancion.setAttribute('value', 'Reproduciendo: ');
    }
  }

  botonVerCanciones.addEventListener('click', alternarListaCanciones);
  listaCanciones.querySelector('#botonCancion1').addEventListener('click', () => reproducirCancion('cancion1'));
  listaCanciones.querySelector('#botonCancion2').addEventListener('click', () => reproducirCancion('cancion2'));
  listaCanciones.querySelector('#botonCancion3').addEventListener('click', () => reproducirCancion('cancion3'));
  panelMusica.querySelector('#botonReproducir').addEventListener('click', () => cancionActual?.play());
  panelMusica.querySelector('#botonPausar').addEventListener('click', pausarCancion);
  panelMusica.querySelector('#botonDetener').addEventListener('click', detenerCancion);
});

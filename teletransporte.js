AFRAME.registerComponent('mapa-interactivo', {
    schema: {
      idMapa: { type: 'string', default: 'mapa' },
      position: { type: 'vec3', default: { x: 0, y: 3, z: 0 } },
      rotation: { type: 'vec3', default: { x: 0, y: 0, z: 0 } }
    },
    init: function () {
      const el = this.el;
      const data = this.data;
  
      // Configurar posición y rotación del mapa
      el.setAttribute('position', data.position);
      el.setAttribute('rotation', data.rotation);
  
      // Crear el fondo del mapa
      const fondo = document.createElement('a-plane');
      fondo.setAttribute('color', '#333333');
      fondo.setAttribute('height', '2');
      fondo.setAttribute('width', '3');
      fondo.setAttribute('material', 'src: #textura_Panel;');
      fondo.setAttribute('position', '0 0 -0.01');
      el.appendChild(fondo);
  
      // Crear texto del título
      const titulo = document.createElement('a-text');
      titulo.setAttribute('value', 'Zonas de teletransporte');
      titulo.setAttribute('color', '#FFFFFF');
      titulo.setAttribute('position', '0 0.9 0');
      titulo.setAttribute('align', 'center');
      el.appendChild(titulo);
  
      // Crear los botones
      const botones = [
        { id: `${data.idMapa}_Convento`, material: '#santoDomingoPoster', color: '#69D4FF', pos: '0 0.55 0', destino: { x: 0, y: 3, z: -55 } },
        { id: `${data.idMapa}_Centro`, material: '#centroPoster', color: '#FC5182', pos: '0 0 0', destino: { x: 0, y: 3, z: 0 } },
        { id: `${data.idMapa}_Puente`, material: '#puentePiedraPoster', color: '#69D4FF', pos: '0.85 0 0', destino: { x: 50, y: 3, z: 0 } },        
        { id: `${data.idMapa}_Huaca`, material: '#huallamarcaPoster', color: '#69D4FF', pos: '0 -0.55 0', destino: { x: -50, y: 3, z: 0 } },
        { id: `${data.idMapa}_Francis`, material: '#franciscoPoster', color: '#69D4FF', pos: '-0.85 0 0', destino: { x: 0, y: 3, z: 55 } }

      ];
  
      botones.forEach(boton => {
        const botonEl = document.createElement('a-entity');
        botonEl.setAttribute('id', boton.id);
        botonEl.setAttribute('position', boton.pos);
  
        const plano = document.createElement('a-plane');
        plano.setAttribute('id', boton.id);
        plano.setAttribute('material', `src: ${boton.material}; color: ${boton.color}`);
        plano.setAttribute('height', '0.5');
        plano.setAttribute('width', '0.8');
        plano.setAttribute('class', 'raycastable');
  
        // Agregar evento de teletransporte
        plano.addEventListener('click', () => {
          const camara = document.querySelector('#camara');
          camara.setAttribute('position', boton.destino);
        });
  
        botonEl.appendChild(plano);
        el.appendChild(botonEl);
      });
    }
  });
  
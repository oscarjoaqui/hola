document.addEventListener('DOMContentLoaded', function() {
  const btnAbrir = document.getElementById("Abrir");
  const btnCerrar = document.getElementById("Cerrar");
  const deslizaMsg = document.getElementById("deslizaMsg");
  const contenedor = document.getElementById("AbrirContenedor");

  let efectosActivos = false;
  let intervalos = [];

  function crearConfeti() {
    const colores = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
    
    const intervalo = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        const confeti = document.createElement('div');
        confeti.className = 'confeti';
        confeti.style.left = Math.random() * 100 + 'vw';
        confeti.style.top = -10 + 'px';
        confeti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
        confeti.style.width = Math.random() * 10 + 5 + 'px';
        confeti.style.height = confeti.style.width;
        confeti.style.animationDuration = Math.random() * 3 + 2 + 's';
        document.getElementById('confetti-container').appendChild(confeti);
        
        confeti.addEventListener('animationend', function() {
          confeti.remove();
        });
      }
    }, 200);
    
    intervalos.push(intervalo);
  }

function crearFlores() {
  const flores = ['🌸', '🌹', '🌺', '🌻', '🌼', '🌷', '💐', '🏵️'];
  const corazones = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍'];
  
  const intervalo = setInterval(() => {
    const elemento = document.createElement('div');
    elemento.className = Math.random() > 0.5 ? 'flor' : 'corazon';
    elemento.innerHTML = Math.random() > 0.5 ? 
      flores[Math.floor(Math.random() * flores.length)] : 
      corazones[Math.floor(Math.random() * corazones.length)];
    elemento.style.left = Math.random() * 100 + 'vw';
    elemento.style.top = -30 + 'px';
    elemento.style.fontSize = Math.random() * 30 + 25 + 'px'; // Aumenté de 15-35px a 25-55px
    elemento.style.animationDuration = Math.random() * 5 + 3 + 's';
    document.getElementById('flores-container').appendChild(elemento);
    
    elemento.addEventListener('animationend', function() {
      elemento.remove();
    });
  }, 300);
  
  intervalos.push(intervalo);
}

  function limpiarEfectos() {
    intervalos.forEach(intervalo => clearInterval(intervalo));
    intervalos = [];
    document.getElementById('confetti-container').innerHTML = '';
    document.getElementById('flores-container').innerHTML = '';
    efectosActivos = false;
  }

  function abrirCarta() {
    if (!efectosActivos) {
      efectosActivos = true;
      crearConfeti();
      crearFlores();
    }

    const ElementoSuperior = document.querySelector(".superior");
    ElementoSuperior.classList.add("abrir-superior");

    document.querySelector("h1").style.transform = "translateY(-120px)";
    document.querySelector(".psorpresa").style.transform = "translateY(-120px)";

    document.querySelector(".bx").classList.add("bx-rotada");

    setTimeout(() => {
      ElementoSuperior.style.zIndex = -1;
      document.querySelector(".mensaje").classList.add("abrir-mensaje");
      setTimeout(() => deslizaMsg.classList.add("mostrar"), 300);
    }, 700);
  }

  function cerrarCarta() {
    deslizaMsg.classList.remove("mostrar");
    document.querySelector(".mensaje").classList.remove("abrir-mensaje");

    setTimeout(() => {
      document.querySelector("h1").style.transform = "translateY(0)";
      document.querySelector(".psorpresa").style.transform = "translateY(0)";
      document.querySelector(".superior").style.zIndex = 2;
      document.querySelector(".superior").classList.remove("abrir-superior");
      document.querySelector(".bx").classList.remove("bx-rotada");
    }, 700);

    limpiarEfectos();
  }

  btnAbrir.addEventListener("click", abrirCarta);
  btnCerrar.addEventListener("click", cerrarCarta);
  contenedor.addEventListener("click", abrirCarta);
});
// Mejorar desplazamiento táctil
const textoCarta = document.getElementById('texto-carta');
let startY;

textoCarta.addEventListener('touchstart', (e) => {
  startY = e.touches[0].clientY;
}, {passive: true});

textoCarta.addEventListener('touchmove', (e) => {
  e.preventDefault();
  const y = e.touches[0].clientY;
  textoCarta.scrollTop += (startY - y);
  startY = y;
}, {passive: false});
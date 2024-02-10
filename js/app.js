// referencias
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const btnEnviar = document.querySelector('.obtener');

// eventos
window.addEventListener('load', () => {
  formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
  e.preventDefault();

  // Validar

  const ciudad = document.querySelector('#ciudad').value;
  const pais = document.querySelector('#pais').value;

  if (ciudad === '' && pais === '') {
    mostrarError('Ambos campos son obligatorios');

    return;
  }

  consultarAPI(ciudad, pais);
}

function mostrarError(textoMensaje) {
  // creación de scripting
  const mensaje = document.createElement('DIV');
  const strong = document.createElement('strong');
  const span = document.createElement('span');

  mensaje.classList.add(
    'p-5',
    'text-red-500',
    'bg-white',
    'text-center',
    'font-bold',
    'mensaje' /**referenica de clase */
  );

  strong.classList.add('font-bold');
  span.classList.add('block');

  // agrego el contenido de texto
  strong.textContent = 'Error!';
  span.textContent = textoMensaje;

  // inserto al mensaje
  mensaje.append(strong);
  mensaje.append(span);

  // limpia la alerta de duplicidad antes de la insertación, argumentos: contenedor, y referencia clase
  limpiarAlertas(formulario, 'mensaje');

  // Agregar al DOM, después del botón de enviar
  btnEnviar.insertAdjacentElement('afterend', mensaje);

  // Quitar la alerta después de 5 segundos
  setTimeout(() => {
    mensaje.remove();
  }, 3000);
}

function limpiarAlertas(referenciaContenedor, claseReferencia) {
  // Validación si ya hay una alerta presente, mediante la referencia de la clase alert
  const alertaExistente = referenciaContenedor.querySelector(
    `.${claseReferencia}`
  );
  if (alertaExistente) {
    // Si ya hay una alerta, no agregamos otra
    alertaExistente.remove();
  }
}

function consultarAPI(ciudad, pais) {
  const appId = 'b8f2e5f6b1d2d0b67d7445bb43f535a2';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

  // consultamos la información de la api
  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      // limpiar html duplicados de datos previo
      limpiarHTML();
      if (datos.cod === '404') {
        mostrarError(`Ciudad no encontrada`);
        return;
      }

      // imprimir la respuesta en el HTML
      mostrarClima(datos);
    });
}

function mostrarClima(datosClima) {
  const {
    main: { temp, temp_max, temp_min },
  } = datosClima;

  // Convertir a centigrados
  const centigrados = kelvinACentigrado(temp);

  // creamos parrafos
  const actual = document.createElement('p');
  // insertamos el texto centigrados con inner por que usaremos con una entidad
  actual.innerHTML = `${centigrados} &#8451;`;
  actual.classList.add('font-bold', 'text-6xl');

  const resultadoDiv = document.createElement('DIV');
  resultadoDiv.classList.add('text-center', 'text-white');

  // agregramos el parrafo actual a resultadoDiv
  resultadoDiv.appendChild(actual);

  // agregramos el resultadoDiv al resultado
  resultado.append(resultadoDiv);
}

const kelvinACentigrado = (grados) => parseInt(grados - 272.15);

function limpiarHTML() {
  // iterar si se encuentra un elemento en resultado
  while (resultado.firstChild) {
    if (resultado.firstChild) {
      resultado.removeChild(resultado.firstChild);
    }
  }
}

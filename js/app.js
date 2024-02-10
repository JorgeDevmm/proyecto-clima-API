// referencias
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const btnEnviar = document.querySelector('.obtener');
const btnLimpiar = document.querySelector('.limpiar');
const resultadoContenido = document.querySelector('#resultado__contenido');

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
  limpiarHTML();

  // creación de scripting
  const mensaje = document.createElement('DIV');

  const strong = document.createElement('strong');
  const span = document.createElement('span');

  const noEncontrado = document.createElement('DIV');
  const img = document.createElement('img');

  mensaje.classList.add(
    'p-5',
    'text-red-500',
    'bg-white',
    'text-center',
    'font-bold',
    'mensaje' /**referenica de clase */
  );

  img.src = 'img/not-found.jpg';

  strong.classList.add('font-bold');
  span.classList.add('block');

  // agrego el contenido de texto
  strong.textContent = 'Error!';
  span.textContent = textoMensaje;

  // inserto al mensaje
  mensaje.append(strong);
  mensaje.append(span);

  // inserta imagen
  noEncontrado.append(img);

  // limpia la alerta de duplicidad antes de la insertación, argumentos: contenedor, y referencia clase
  limpiarAlertas(formulario, 'mensaje');

  // Agregar al DOM, después del botón de enviar
  btnLimpiar.insertAdjacentElement('afterend', mensaje);

  // agregramos el resultadoDiv al resultado
  resultado.append(noEncontrado);

  // Quitar la alerta después de 5 segundos
  setTimeout(() => {
    mensaje.remove();
    limpiarHTML();
    resultado.append(resultadoContenido);
    formulario.reset();
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
  // api key
  const appId = 'b8f2e5f6b1d2d0b67d7445bb43f535a2';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

  limpiarHTML();
  // muestra un Spinner de carga
  spinner();

  // consultamos la información de la api
  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      console.log(datos);
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
    name,
  } = datosClima;

  // Convertir a centigrados
  const centigrados = kelvinACentigrado(temp);
  const max = kelvinACentigrado(temp_max);
  const min = kelvinACentigrado(temp_min);

  // creamos nombre ciudad
  const ciudadNombre = document.createElement('h3');
  ciudadNombre.textContent = `Clima: ${name}`;
  ciudadNombre.classList.add('text-center', 'text-4xl', 'font-bold');

  // creamos parrafos
  const actual = document.createElement('p');
  // insertamos el texto centigrados con inner por que usaremos con una entidad
  actual.innerHTML = `${centigrados} &#8451;`;
  actual.classList.add('font-bold', 'text-6xl');

  const tempMaxima = document.createElement('p');
  tempMaxima.innerHTML = `Max: ${max} &#8451`;
  tempMaxima.classList.add('text-xl');

  const tempMinima = document.createElement('p');
  tempMinima.innerHTML = `Min: ${min} &#8451`;
  tempMinima.classList.add('text-xl');

  const resultadoDiv = document.createElement('DIV');
  resultadoDiv.classList.add('text-center', 'text-white');

  // agregramos el parrafo actual a resultadoDiv
  resultadoDiv.appendChild(ciudadNombre);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMaxima);
  resultadoDiv.appendChild(tempMinima);

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

function spinner() {
  limpiarHTML();
  const spinner = document.createElement('DIV');
  // agrego clase de estilo spinner y para centrar x y y
  spinner.classList.add('loader', 'mx-auto', 'my-auto');

  resultado.appendChild(spinner);
}

function limpiarFormulario() {
  limpiarHTML();
  limpiarAlertas(formulario, 'mensaje');
  formulario.reset();
  resultado.append(resultadoContenido);
  // mensaje.remove();
}

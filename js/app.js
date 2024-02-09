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
  } else {
    console.log(ciudad);
    console.log(pais);
  }
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

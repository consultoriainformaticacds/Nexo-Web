async function enviarNexo() {
  var btn = document.getElementById('nx-btn');
  var status = document.getElementById('nx-status');
  var nombre = document.getElementById('nx-nombre').value.trim();
  var email = document.getElementById('nx-email').value.trim();
  var tipo = document.getElementById('nx-tipo').value;
  var mensaje = document.getElementById('nx-mensaje').value.trim();

  if (!nombre || !email || !tipo) {
    status.style.color = '#ff6b6b';
    status.textContent = 'Por favor completá los campos obligatorios.';
    return;
  }

  btn.textContent = 'Enviando...';
  btn.disabled = true;
  status.textContent = '';

  try {
    var response = await fetch('https://formspree.io/f/xpqynaqq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ nombre: nombre, email: email, tipo_web: tipo, mensaje: mensaje })
    });
    if (response.ok) {
      status.style.color = '#C8F135';
      status.textContent = 'Mensaje enviado. Te respondemos en menos de 24 horas.';
      document.getElementById('nx-nombre').value = '';
      document.getElementById('nx-email').value = '';
      document.getElementById('nx-tipo').value = '';
      document.getElementById('nx-mensaje').value = '';
    } else {
      throw new Error('Error');
    }
  } catch(err) {
    status.style.color = '#ff6b6b';
    status.textContent = 'Error al enviar. Contactanos por WhatsApp.';
  }

  btn.textContent = 'Enviar consulta';
  btn.disabled = false;
}
// frontend/js/reportar.js
const API = 'http://localhost:3000/api';
const usuario = JSON.parse(localStorage.getItem('usuario'));

async function reportarAhora() {
  const tipo = document.getElementById('tipo').value;
  const descripcion = document.getElementById('descripcion').value;
  const fotoInput = document.getElementById('foto');

  if (!navigator.geolocation) return alert('Tu navegador no soporta ubicación');

  navigator.geolocation.getCurrentPosition(async pos => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    let foto_url = null;
    if (fotoInput.files[0]) {
      const formData = new FormData();
      formData.append('foto', fotoInput.files[0]);

      const uploadRes = await fetch(`${API}/upload`, {
        method: 'POST',
        body: formData
      });
      const uploadData = await uploadRes.json();
      foto_url = uploadData.url;
    }

    await fetch(`${API}/reportes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuario_id: usuario.id,
        tipo,
        descripcion,
        lat,
        lng,
        foto_url
      })
    });

    alert('¡Reporte enviado con éxito!');
    location.href = 'mapa.html';
  });
}
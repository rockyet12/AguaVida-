// frontend/js/mapa.js
const API = 'http://localhost:3000/api';

let map;
async function cargarMapa() {
  map = L.map('map').setView([-34.6037, -58.3816], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  const res = await fetch(`${API}/reportes`);
  const reportes = await res.json();

  reportes.forEach(r => {
    const icono = r.tipo === 'fuga' 
      ? 'assets/icons/fuga.png' 
      : 'assets/icons/fuente.png';

    const marker = L.marker([r.lat, r.lng], {
      icon: L.icon({ iconUrl: icono, iconSize: [40,40] })
    }).addTo(map);

    let popup = `<b>${r.tipo.toUpperCase()}</b><br>Por: ${r.nombre_usuario}<br>${r.descripcion || ''}`;
    if (r.foto_url) popup += `<br><img src="${r.foto_url}" width="200">`;
    
    marker.bindPopup(popup);
  });
}

cargarMapa();
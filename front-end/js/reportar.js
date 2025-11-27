// Formulario de Reportes con Multi-Step
let currentStep = 1;
let mapInstance = null;
let marker = null;
const uploadedPhotos = [];

// Inicializar formulario
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reportForm');
  
  // Event listeners para los botones de paso
  document.querySelectorAll('.next-step').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (validateCurrentStep()) {
        goToStep(currentStep + 1);
      }
    });
  });

  document.querySelectorAll('.prev-step').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      goToStep(currentStep - 1);
    });
  });

  // Submit del formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitReport();
  });

  // Upload de fotos
  document.getElementById('fotos').addEventListener('change', handlePhotosUpload);

  // Iniciar mapa cuando se llegue al paso 2
  initializeStepLogic();
});

// Validar paso actual
function validateCurrentStep() {
  switch(currentStep) {
    case 1:
      const titulo = document.getElementById('titulo').value;
      const tipo = document.getElementById('tipo').value;
      const descripcion = document.getElementById('descripcion').value;
      const gravedad = document.querySelector('input[name="gravedad"]:checked');

      if (!titulo.trim()) {
        showError('Por favor ingresa un título');
        return false;
      }
      if (titulo.length < 5) {
        showError('El título debe tener al menos 5 caracteres');
        return false;
      }
      if (!tipo) {
        showError('Por favor selecciona un tipo de problema');
        return false;
      }
      if (!descripcion.trim()) {
        showError('Por favor describe el problema');
        return false;
      }
      if (descripcion.length < 20) {
        showError('La descripción debe tener al menos 20 caracteres');
        return false;
      }
      if (!gravedad) {
        showError('Por favor selecciona el nivel de gravedad');
        return false;
      }
      return true;

    case 2:
      const ubicacion = document.getElementById('ubicacion').value;
      const latitud = document.getElementById('latitud').value;
      const longitud = document.getElementById('longitud').value;

      if (!ubicacion.trim()) {
        showError('Por favor ingresa una dirección');
        return false;
      }
      if (!latitud || !longitud) {
        showError('Por favor ubica el problema en el mapa');
        return false;
      }
      return true;

    case 3:
      return true; // Las fotos son opcionales

    default:
      return true;
  }
}

// Cambiar de paso
function goToStep(step) {
  if (step < 1 || step > 4) return;

  // Actualizar indicadores de pasos
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  document.querySelector(`[data-step="${step}"]`).classList.add('active');

  // Ocultar paso actual y mostrar el nuevo
  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
  document.getElementById(`step-${step}`).classList.add('active');

  currentStep = step;

  // Actualizar review al llegar al paso 4
  if (step === 4) {
    updateReview();
  }

  // Inicializar mapa en paso 2
  if (step === 2 && !mapInstance) {
    setTimeout(initializeMap, 100);
  }

  // Scroll al formulario
  document.querySelector('.report-form').scrollIntoView({ behavior: 'smooth' });
}

// Inicializar lógica de pasos
function initializeStepLogic() {
  // Ir al primer paso
  goToStep(1);
}

// Inicializar mapa
function initializeMap() {
  const mapContainer = document.getElementById('map');
  
  if (!mapContainer) return;

  // Crear mapa centrado en coordenada por defecto
  mapInstance = L.map('map').setView([40.4168, -3.7038], 13); // Madrid como default

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(mapInstance);

  // Obtener ubicación del usuario
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // Centrar mapa en ubicación actual
      mapInstance.setView([lat, lng], 15);

      // Agregar marcador
      addMapMarker(lat, lng);
    });
  }

  // Evento al hacer click en el mapa
  mapInstance.on('click', (e) => {
    addMapMarker(e.latlng.lat, e.latlng.lng);
  });
}

// Agregar marcador en el mapa
function addMapMarker(lat, lng) {
  if (marker) {
    mapInstance.removeLayer(marker);
  }

  marker = L.marker([lat, lng], {
    icon: L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      iconSize: [25, 41],
      shadowSize: [41, 41],
      iconAnchor: [12, 41],
      shadowAnchor: [12, 41],
      popupAnchor: [1, -34]
    })
  }).addTo(mapInstance);

  marker.bindPopup(`<b>Reporte aquí</b><br>Lat: ${lat.toFixed(4)}<br>Lng: ${lng.toFixed(4)}`).openPopup();

  // Actualizar inputs
  document.getElementById('latitud').value = lat.toFixed(6);
  document.getElementById('longitud').value = lng.toFixed(6);
}

// Manejar carga de fotos
function handlePhotosUpload(e) {
  const files = e.target.files;
  const preview = document.getElementById('photoPreview');

  if (files.length > 5) {
    showError('Máximo 5 fotos permitidas');
    return;
  }

  uploadedPhotos.length = 0;
  preview.innerHTML = '';

  Array.from(files).forEach((file, index) => {
    // Validar tamaño (5MB)
    if (file.size > 5 * 1024 * 1024) {
      showError(`La foto ${index + 1} excede 5MB`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      uploadedPhotos.push({
        file: file,
        dataUrl: event.target.result
      });

      // Mostrar preview
      const photoItem = document.createElement('div');
      photoItem.className = 'photo-item';
      photoItem.innerHTML = `
        <img src="${event.target.result}" alt="Foto ${index + 1}">
        <button type="button" class="delete-btn" onclick="removePhoto(${index})">
          <i class="fas fa-trash"></i>
        </button>
      `;
      preview.appendChild(photoItem);
    };
    reader.readAsDataURL(file);
  });
}

// Eliminar foto
function removePhoto(index) {
  uploadedPhotos.splice(index, 1);
  document.getElementById('fotos').value = '';
  
  const preview = document.getElementById('photoPreview');
  preview.innerHTML = '';
  
  uploadedPhotos.forEach((photo, idx) => {
    const photoItem = document.createElement('div');
    photoItem.className = 'photo-item';
    photoItem.innerHTML = `
      <img src="${photo.dataUrl}" alt="Foto ${idx + 1}">
      <button type="button" class="delete-btn" onclick="removePhoto(${idx})">
        <i class="fas fa-trash"></i>
      </button>
    `;
    preview.appendChild(photoItem);
  });
}

// Actualizar resumen
function updateReview() {
  const titulo = document.getElementById('titulo').value;
  const tipo = document.getElementById('tipo').value;
  const descripcion = document.getElementById('descripcion').value;
  const gravedad = document.querySelector('input[name="gravedad"]:checked').value;
  const ubicacion = document.getElementById('ubicacion').value;
  const latitud = document.getElementById('latitud').value;
  const longitud = document.getElementById('longitud').value;

  document.getElementById('review-titulo').textContent = titulo;
  document.getElementById('review-tipo').textContent = document.getElementById('tipo').options[document.getElementById('tipo').selectedIndex].text;
  document.getElementById('review-descripcion').textContent = descripcion;
  
  const gravedadText = {
    'leve': '🟢 Leve',
    'medio': '🟡 Moderado',
    'critico': '🔴 Crítico'
  };
  document.getElementById('review-gravedad').textContent = gravedadText[gravedad];
  document.getElementById('review-ubicacion').textContent = ubicacion;
  document.getElementById('review-coords').textContent = `${latitud}, ${longitud}`;

  // Mostrar fotos en review
  const reviewPhotos = document.getElementById('review-fotos');
  reviewPhotos.innerHTML = '';
  if (uploadedPhotos.length === 0) {
    reviewPhotos.innerHTML = '<small class="text-muted">Sin fotos adjuntas</small>';
  } else {
    uploadedPhotos.forEach(photo => {
      const img = document.createElement('img');
      img.src = photo.dataUrl;
      img.style.width = '80px';
      img.style.height = '80px';
      img.style.objectFit = 'cover';
      img.style.borderRadius = '8px';
      reviewPhotos.appendChild(img);
    });
  }
}

// Enviar reporte
async function submitReport() {
  const titulo = document.getElementById('titulo').value;
  const tipo = document.getElementById('tipo').value;
  const descripcion = document.getElementById('descripcion').value;
  const gravedad = document.querySelector('input[name="gravedad"]:checked').value;
  const ubicacion = document.getElementById('ubicacion').value;
  const latitud = parseFloat(document.getElementById('latitud').value);
  const longitud = parseFloat(document.getElementById('longitud').value);

  try {
    // Crear FormData con fotos
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('tipo', tipo);
    formData.append('descripcion', descripcion);
    formData.append('gravedad', gravedad);
    formData.append('ubicacion', ubicacion);
    formData.append('lat', latitud);
    formData.append('lng', longitud);

    // Agregar fotos
    uploadedPhotos.forEach((photo, index) => {
      formData.append(`fotos`, photo.file);
    });

    // Obtener UID del usuario autenticado
    const uid = localStorage.getItem('userUID') || 'anonimo';
    formData.append('uid', uid);

    // Enviar a la API
    const response = await fetch('http://localhost:5000/api/reportes', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      showSuccess('¡Reporte enviado exitosamente!');
      
      // Limpiar formulario
      document.getElementById('reportForm').reset();
      uploadedPhotos.length = 0;
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        window.location.href = '/mapa.html';
      }, 2000);
    } else {
      const error = await response.json();
      showError(error.error || 'Error al enviar el reporte');
    }
  } catch (error) {
    showError('Error: ' + error.message);
  }
}

// Mostrar error
function showError(message) {
  const errorDiv = document.getElementById('errorMessage');
  const errorText = document.getElementById('errorText');
  errorText.textContent = message;
  errorDiv.style.display = 'block';
  setTimeout(() => {
    errorDiv.style.display = 'none';
  }, 5000);
}

// Mostrar éxito
function showSuccess(message) {
  const successDiv = document.getElementById('successMessage');
  successDiv.style.display = 'block';
  setTimeout(() => {
    successDiv.style.display = 'none';
  }, 5000);
}

// Logout
function logout() {
  localStorage.removeItem('userUID');
  localStorage.removeItem('userToken');
  window.location.href = '/login.html';
}
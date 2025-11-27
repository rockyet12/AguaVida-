// Configuración de la API
const API_BASE_URL = 'http://localhost:5000/api';

// Función para hacer peticiones GET
async function fetchAPI(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error en la petición');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Función para registrar usuario
async function registroAPI(email, password, nombre) {
  return fetchAPI('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, nombre })
  });
}

// Función para login
async function loginAPI(email, password) {
  return fetchAPI('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

// Función para obtener reportes
async function obtenerReportes() {
  return fetchAPI('/reportes');
}

// Función para crear reporte
async function crearReporte(titulo, descripcion, ubicacion, lat, lng, uid) {
  return fetchAPI('/reportes', {
    method: 'POST',
    body: JSON.stringify({ titulo, descripcion, ubicacion, lat, lng, uid })
  });
}

// Función para obtener reporte específico
async function obtenerReporte(id) {
  return fetchAPI(`/reportes/${id}`);
}

// Función para actualizar reporte
async function actualizarReporte(id, titulo, descripcion, estado) {
  return fetchAPI(`/reportes/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ titulo, descripcion, estado })
  });
}

// Función para eliminar reporte
async function eliminarReporte(id) {
  return fetchAPI(`/reportes/${id}`, {
    method: 'DELETE'
  });
}

// Función para obtener perfil
async function obtenerPerfil(uid) {
  return fetchAPI(`/usuarios/${uid}`);
}

// Función para actualizar perfil
async function actualizarPerfil(uid, nombre, telefono, direccion) {
  return fetchAPI(`/usuarios/${uid}`, {
    method: 'PUT',
    body: JSON.stringify({ nombre, telefono, direccion })
  });
}

// Función para verificar salud del servidor
async function verificarServidor() {
  return fetchAPI('/health');
}

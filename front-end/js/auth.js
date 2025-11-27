// ==========================================
// AUTENTICACIÓN - AGUA VIDA
// ==========================================

const API_BASE = 'http://localhost:5000/api';

// ============================================
// LOGIN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }
});

async function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  // Validación básica
  if (!email || !password) {
    showAlert('alert-danger', 'Por favor completa todos los campos');
    return;
  }

  if (!isValidEmail(email)) {
    showAlert('alert-danger', 'Por favor ingresa un email válido');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      // Guardar datos en localStorage
      localStorage.setItem('userUID', data.uid || 'user_' + Date.now());
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', data.user?.nombre || email);
      localStorage.setItem('userToken', 'token_' + Date.now());

      showAlert('alert-success', '✅ Login exitoso. Redirigiendo...');

      setTimeout(() => {
        window.location.href = '/home.html';
      }, 1500);
    } else {
      showAlert('alert-danger', data.error || 'Error: Usuario o contraseña incorrectos');
    }
  } catch (error) {
    console.error('Error:', error);
    showAlert('alert-danger', 'Error de conexión. Verifica que el backend esté activo.');
  }
}

async function handleRegister(e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const terms = document.getElementById('terms').checked;

  // Validaciones
  if (!nombre || !email || !password || !confirmPassword) {
    showAlert('alert-danger', '⚠️ Por favor completa los campos requeridos');
    return;
  }

  if (nombre.length < 3) {
    showAlert('alert-danger', 'El nombre debe tener al menos 3 caracteres');
    return;
  }

  if (!isValidEmail(email)) {
    showAlert('alert-danger', 'Por favor ingresa un email válido');
    return;
  }

  if (password.length < 8) {
    showAlert('alert-danger', 'La contraseña debe tener al menos 8 caracteres');
    return;
  }

  if (password !== confirmPassword) {
    showAlert('alert-danger', 'Las contraseñas no coinciden');
    return;
  }

  if (!terms) {
    showAlert('alert-danger', 'Debes aceptar los términos y condiciones');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        nombre,
        telefono
      })
    });

    const data = await response.json();

    if (response.ok) {
      showAlert('alert-success', '✅ Registro exitoso. Redirigiendo a login...');

      setTimeout(() => {
        window.location.href = '/login.html';
      }, 2000);
    } else {
      showAlert('alert-danger', data.error || 'Error al registrar el usuario');
    }
  } catch (error) {
    console.error('Error:', error);
    showAlert('alert-danger', 'Error de conexión. Verifica que el backend esté activo.');
  }
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function showAlert(type, message) {
  const alertDiv = document.getElementById('alertMessage');
  const alertText = document.getElementById('alertText');

  if (!alertDiv || !alertText) return;

  alertDiv.className = `alert ${type} alert-dismissible fade show`;
  alertText.textContent = message;
  alertDiv.style.display = 'block';

  // Auto-descartar después de 5 segundos
  setTimeout(() => {
    alertDiv.style.display = 'none';
  }, 5000);
}

// ============================================
// PROTEGER PÁGINAS
// ============================================

function requireLogin() {
  const userUID = localStorage.getItem('userUID');
  if (!userUID) {
    window.location.href = '/login.html';
    return false;
  }
  return true;
}

function logout() {
  localStorage.removeItem('userUID');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userName');
  localStorage.removeItem('userToken');
  window.location.href = '/';
}

// ============================================
// INFORMACIÓN DEL USUARIO
// ============================================

function getCurrentUser() {
  return {
    uid: localStorage.getItem('userUID'),
    email: localStorage.getItem('userEmail'),
    nombre: localStorage.getItem('userName')
  };
}

function isLoggedIn() {
  return !!localStorage.getItem('userUID');
}
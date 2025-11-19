// frontend/js/auth.js
const API = 'http://localhost:3000/api';

async function registrar() {
  const nombre = document.getElementById('nombre')?.value;
  const email = document.getElementById('email')?.value || document.getElementById('emailReg')?.value;
  const password = document.getElementById('password')?.value || document.getElementById('passReg')?.value;

  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password })
  });
  const data = await res.json();

  if (data.success) {
    alert('¡Registrado con éxito!');
    location.href = 'login.html';
  } else {
    alert(data.message || 'Error al registrar');
  }
}

async function login() {
  const email = document.getElementById('email')?.value || document.getElementById('emailLogin')?.value;
  const password = document.getElementById('password')?.value || document.getElementById('passLogin')?.value;

  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();

  if (data.success) {
    localStorage.setItem('usuario', JSON.stringify(data.usuario));
    location.href = 'home.html';
  } else {
    alert('Email o contraseña incorrectos');
  }
}

// Proteger páginas
function proteger() {
  if (!localStorage.getItem('usuario')) {
    location.href = 'login.html';
  }
}
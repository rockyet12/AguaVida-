import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

dotenv.config();

// Inicializar Firebase Admin
initializeApp();
const db = getFirestore();
const auth = getAuth();

// Configurar __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear aplicación Express
const app = express();
const PORT = process.env.PORT || 5000;

// Configurar almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../front-end/assets/uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.random().toString(36).substring(7) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB máximo
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes (JPEG, PNG, WebP, GIF)'));
    }
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../front-end')));

// Rutas de Autenticación
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, nombre, telefono } = req.body;
    
    // Validaciones
    if (!email || !password || !nombre) {
      return res.status(400).json({ error: 'Email, contraseña y nombre son obligatorios' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
    }
    
    // Crear usuario en Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: nombre
    });

    // Guardar datos adicionales en Firestore
    await db.collection('usuarios').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email,
      nombre,
      telefono: telefono || '',
      createdAt: new Date().toISOString(),
      updated: new Date().toISOString(),
      reportesCount: 0
    });

    console.log(`✅ Usuario creado: ${email} (UID: ${userRecord.uid})`);

    res.status(201).json({ 
      message: 'Usuario registrado exitosamente',
      uid: userRecord.uid,
      user: {
        uid: userRecord.uid,
        email,
        nombre
      }
    });
  } catch (error) {
    console.error('❌ Error en registro:', error.message);
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }
    
    // Buscar usuario en Firestore
    const userSnapshot = await db.collection('usuarios')
      .where('email', '==', email)
      .limit(1)
      .get();

    if (userSnapshot.empty) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const userData = userSnapshot.docs[0].data();
    
    // Log para debugging
    console.log(`✅ Login exitoso para: ${email}`);

    // En producción, usar Firebase SDK en cliente para autenticación
    res.json({ 
      message: 'Login exitoso',
      uid: userData.uid,
      user: {
        uid: userData.uid,
        email: userData.email,
        nombre: userData.nombre,
        telefono: userData.telefono || ''
      }
    });
  } catch (error) {
    console.error('❌ Error en login:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Rutas de Reportes
app.get('/api/reportes', async (req, res) => {
  try {
    const reportesSnapshot = await db.collection('reportes')
      .orderBy('fecha', 'desc')
      .get();

    const reportes = [];
    reportesSnapshot.forEach(doc => {
      reportes.push({ 
        id: doc.id, 
        ...doc.data(),
        fecha: doc.data().fecha // ISO string
      });
    });

    console.log(`📊 Se obtuvieron ${reportes.length} reportes`);
    res.json(reportes);
  } catch (error) {
    console.error('❌ Error obteniendo reportes:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Obtener reportes por usuario
app.get('/api/reportes/usuario/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    
    const reportesSnapshot = await db.collection('reportes')
      .where('uid', '==', uid)
      .orderBy('fecha', 'desc')
      .get();

    const reportes = [];
    reportesSnapshot.forEach(doc => {
      reportes.push({ 
        id: doc.id, 
        ...doc.data()
      });
    });

    console.log(`📊 Usuario ${uid} tiene ${reportes.length} reportes`);
    res.json(reportes);
  } catch (error) {
    console.error('❌ Error obteniendo reportes del usuario:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/reportes', upload.array('fotos', 5), async (req, res) => {
  try {
    const { titulo, descripcion, ubicacion, lat, lng, tipo, gravedad, uid } = req.body;

    // Validar campos requeridos
    if (!titulo || !descripcion || !ubicacion || !lat || !lng) {
      return res.status(400).json({ 
        error: 'Campos requeridos: titulo, descripcion, ubicacion, lat, lng' 
      });
    }

    if (!uid || uid === 'anonimo') {
      return res.status(400).json({ 
        error: 'Debes estar autenticado para crear un reporte' 
      });
    }

    // Procesar fotos subidas
    const fotos = req.files ? req.files.map(file => {
      console.log(`📸 Foto procesada: ${file.filename} (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
      return {
        filename: file.filename,
        path: `/assets/uploads/${file.filename}`,
        url: `http://localhost:5000/assets/uploads/${file.filename}`,
        size: file.size,
        mimetype: file.mimetype,
        uploadedAt: new Date().toISOString()
      };
    }) : [];

    const nuevoReporte = {
      titulo,
      tipo: tipo || 'general',
      descripcion,
      gravedad: gravedad || 'leve',
      ubicacion,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      uid,
      fotos,
      fotosCount: fotos.length,
      fecha: new Date().toISOString(),
      estado: 'pendiente',
      respuestas: 0,
      megustasCount: 0
    };

    // Guardar en Firestore
    const docRef = await db.collection('reportes').add(nuevoReporte);

    // Actualizar contador de reportes del usuario
    await db.collection('usuarios').doc(uid).update({
      reportesCount: require('firebase-admin').firestore.FieldValue.increment(1),
      ultimoReporte: new Date().toISOString()
    });

    console.log(`✅ Reporte creado: ${titulo} (ID: ${docRef.id}) por usuario ${uid}`);
    console.log(`   - Fotos: ${fotos.length}`);
    console.log(`   - Ubicación: ${ubicacion}`);
    console.log(`   - Gravedad: ${gravedad}`);

    res.status(201).json({ 
      message: 'Reporte creado exitosamente',
      id: docRef.id,
      reporte: {
        ...nuevoReporte,
        id: docRef.id
      }
    });
  } catch (error) {
    console.error('❌ Error creando reporte:', error.message);
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/reportes/:id', async (req, res) => {
  try {
    const doc = await db.collection('reportes').doc(req.params.id).get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }

    console.log(`📋 Reporte obtenido: ${req.params.id}`);
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('❌ Error obteniendo reporte:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/reportes/:id', async (req, res) => {
  try {
    const { titulo, descripcion, estado, gravedad } = req.body;

    const updateData = {
      actualizado: new Date().toISOString()
    };

    if (titulo) updateData.titulo = titulo;
    if (descripcion) updateData.descripcion = descripcion;
    if (estado) updateData.estado = estado;
    if (gravedad) updateData.gravedad = gravedad;

    await db.collection('reportes').doc(req.params.id).update(updateData);

    console.log(`✅ Reporte actualizado: ${req.params.id}`);
    res.json({ 
      message: 'Reporte actualizado exitosamente',
      id: req.params.id,
      updates: updateData
    });
  } catch (error) {
    console.error('❌ Error actualizando reporte:', error.message);
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/reportes/:id', async (req, res) => {
  try {
    await db.collection('reportes').doc(req.params.id).delete();
    console.log(`🗑️  Reporte eliminado: ${req.params.id}`);
    res.json({ message: 'Reporte eliminado exitosamente' });
  } catch (error) {
    console.error('❌ Error eliminando reporte:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Rutas de Usuarios
app.get('/api/usuarios/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    const doc = await db.collection('usuarios').doc(uid).get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const userData = doc.data();
    console.log(`👤 Perfil obtenido: ${userData.email}`);
    
    res.json({ 
      id: doc.id, 
      ...userData 
    });
  } catch (error) {
    console.error('❌ Error obteniendo usuario:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/usuarios/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    const { nombre, telefono, direccion } = req.body;

    const updateData = {
      updated: new Date().toISOString()
    };

    if (nombre) updateData.nombre = nombre;
    if (telefono) updateData.telefono = telefono;
    if (direccion) updateData.direccion = direccion;

    await db.collection('usuarios').doc(uid).update(updateData);

    console.log(`✅ Perfil actualizado: ${uid}`);
    res.json({ 
      message: 'Perfil actualizado exitosamente',
      uid,
      updates: updateData
    });
  } catch (error) {
    console.error('❌ Error actualizando usuario:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'API funcionando correctamente ✅',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('❌ Error no capturado:', err.message);
  res.status(500).json({ 
    error: 'Error del servidor',
    message: err.message 
  });
});

// Ruta 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║           🌊 AGUA VIDA - BACKEND INICIADO EXITOSAMENTE         ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log('');
  console.log('📊 ENDPOINTS DISPONIBLES:');
  console.log('');
  console.log('  🔐 AUTENTICACIÓN:');
  console.log('    - POST   /api/auth/register      → Registrar usuario');
  console.log('    - POST   /api/auth/login         → Iniciar sesión');
  console.log('');
  console.log('  📝 REPORTES:');
  console.log('    - GET    /api/reportes           → Obtener todos los reportes');
  console.log('    - GET    /api/reportes/:id       → Obtener reporte específico');
  console.log('    - POST   /api/reportes           → Crear reporte (con fotos)');
  console.log('    - PUT    /api/reportes/:id       → Actualizar reporte');
  console.log('    - DELETE /api/reportes/:id       → Eliminar reporte');
  console.log('    - GET    /api/reportes/usuario/:uid → Reportes del usuario');
  console.log('');
  console.log('  👤 USUARIOS:');
  console.log('    - GET    /api/usuarios/:uid      → Obtener perfil');
  console.log('    - PUT    /api/usuarios/:uid      → Actualizar perfil');
  console.log('');
  console.log('  💚 SERVIDOR:');
  console.log('    - GET    /api/health             → Verificar estado del servidor');
  console.log('');
  console.log('📸 ALMACENAMIENTO:');
  console.log('    - Fotos guardadas en: /front-end/assets/uploads/');
  console.log('    - Max fotos por reporte: 5');
  console.log('    - Max tamaño de archivo: 5MB');
  console.log('');
  console.log('🗄️  BASE DE DATOS:');
  console.log('    - Colecciones: usuarios, reportes');
  console.log('    - Storage: Firebase Firestore');
  console.log('    - Auth: Firebase Authentication');
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('');
});

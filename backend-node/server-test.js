/**
 * 🧪 SERVIDOR DE PRUEBA LOCAL - SIN DEPENDENCIA DE FIREBASE
 * Este servidor prueba el almacenamiento de datos sin necesidad de credenciales de Firebase
 */

import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5001; // Puerto diferente para no conflictuar

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, '../front-end/assets')));

// 📁 Crear carpeta de uploads si no existe
const uploadsDir = path.join(__dirname, '../front-end/assets/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Carpeta /assets/uploads/ creada');
}

// 📸 Configurar Multer para upload de fotos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no permitido'));
    }
  }
});

// 🗄️ Almacenamiento en memoria (simula base de datos)
const database = {
  usuarios: {},
  reportes: []
};

console.log('\n╔════════════════════════════════════════════════════════════════╗');
console.log('║     🧪 SERVIDOR DE PRUEBA - AGUA VIDA (LOCAL, SIN FIREBASE)    ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

// ========== RUTAS DE AUTENTICACIÓN ==========

app.post('/api/auth/register', (req, res) => {
  try {
    const { email, password, nombre, telefono } = req.body;

    // Validar campos requeridos
    if (!email || !password || !nombre) {
      return res.status(400).json({ error: 'Email, contraseña y nombre son requeridos' });
    }

    // Validar que el usuario no exista
    if (database.usuarios[email]) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Crear usuario
    const uid = `user_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    database.usuarios[email] = {
      uid,
      email,
      nombre,
      telefono: telefono || '',
      createdAt: new Date().toISOString(),
      reportesCount: 0
    };

    console.log(`✅ Usuario registrado: ${email} (UID: ${uid})`);

    res.json({
      message: 'Usuario registrado exitosamente',
      uid,
      user: database.usuarios[email]
    });
  } catch (error) {
    console.error('❌ Error en registro:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    // Verificar que el usuario existe
    if (!database.usuarios[email]) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const user = database.usuarios[email];
    console.log(`✅ Login exitoso para: ${email}`);

    res.json({
      message: 'Login exitoso',
      uid: user.uid,
      user
    });
  } catch (error) {
    console.error('❌ Error en login:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ========== RUTAS DE REPORTES ==========

app.post('/api/reportes', upload.array('fotos', 5), (req, res) => {
  try {
    const { titulo, tipo, descripcion, gravedad, ubicacion, lat, lng, uid } = req.body;

    // Validar campos requeridos
    if (!titulo || !tipo || !descripcion || !uid) {
      return res.status(400).json({ error: 'Campos requeridos faltantes' });
    }

    // Procesar fotos
    const fotos = (req.files || []).map(file => ({
      filename: file.filename,
      path: `/assets/uploads/${file.filename}`,
      url: `http://localhost:5001/assets/uploads/${file.filename}`,
      size: file.size,
      mimetype: file.mimetype,
      uploadedAt: new Date().toISOString()
    }));

    // Crear reporte
    const reporte = {
      id: `report_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      titulo,
      tipo,
      descripcion,
      gravedad: gravedad || 'medio',
      ubicacion: ubicacion || '',
      lat: parseFloat(lat) || 0,
      lng: parseFloat(lng) || 0,
      uid,
      fotos,
      fotosCount: fotos.length,
      fecha: new Date().toISOString(),
      estado: 'pendiente',
      respuestas: 0,
      megustasCount: 0
    };

    database.reportes.push(reporte);

    // Incrementar contador de reportes del usuario
    if (database.usuarios[Object.keys(database.usuarios).find(email => database.usuarios[email].uid === uid)]) {
      const userEmail = Object.keys(database.usuarios).find(email => database.usuarios[email].uid === uid);
      database.usuarios[userEmail].reportesCount++;
    }

    console.log(`✅ Reporte creado: "${titulo}" (${fotos.length} fotos) por usuario ${uid}`);

    res.json({
      message: 'Reporte creado exitosamente',
      id: reporte.id,
      reporte
    });
  } catch (error) {
    console.error('❌ Error al crear reporte:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/reportes', (req, res) => {
  try {
    console.log(`📊 Se obtuvieron ${database.reportes.length} reportes`);
    res.json(database.reportes);
  } catch (error) {
    console.error('❌ Error al obtener reportes:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/reportes/:id', (req, res) => {
  try {
    const reporte = database.reportes.find(r => r.id === req.params.id);
    if (!reporte) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }
    res.json(reporte);
  } catch (error) {
    console.error('❌ Error al obtener reporte:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/reportes/usuario/:uid', (req, res) => {
  try {
    const reportesUsuario = database.reportes.filter(r => r.uid === req.params.uid);
    console.log(`📊 Usuario ${req.params.uid} tiene ${reportesUsuario.length} reportes`);
    res.json(reportesUsuario);
  } catch (error) {
    console.error('❌ Error al obtener reportes del usuario:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/reportes/:id', (req, res) => {
  try {
    const reporte = database.reportes.find(r => r.id === req.params.id);
    if (!reporte) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }

    // Actualizar campos
    Object.assign(reporte, req.body, { fecha: reporte.fecha });
    console.log(`✅ Reporte actualizado: ${req.params.id}`);

    res.json({ message: 'Reporte actualizado', reporte });
  } catch (error) {
    console.error('❌ Error al actualizar reporte:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/reportes/:id', (req, res) => {
  try {
    const index = database.reportes.findIndex(r => r.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }

    const reporteEliminado = database.reportes.splice(index, 1)[0];
    console.log(`✅ Reporte eliminado: ${req.params.id}`);

    res.json({ message: 'Reporte eliminado', reporte: reporteEliminado });
  } catch (error) {
    console.error('❌ Error al eliminar reporte:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ========== RUTAS DE USUARIOS ==========

app.get('/api/usuarios/:uid', (req, res) => {
  try {
    const userEmail = Object.keys(database.usuarios).find(email => database.usuarios[email].uid === req.params.uid);
    if (!userEmail) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(database.usuarios[userEmail]);
  } catch (error) {
    console.error('❌ Error al obtener usuario:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/usuarios/:uid', (req, res) => {
  try {
    const userEmail = Object.keys(database.usuarios).find(email => database.usuarios[email].uid === req.params.uid);
    if (!userEmail) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    Object.assign(database.usuarios[userEmail], req.body, { uid: req.params.uid });
    console.log(`✅ Usuario actualizado: ${req.params.uid}`);

    res.json({ message: 'Usuario actualizado', user: database.usuarios[userEmail] });
  } catch (error) {
    console.error('❌ Error al actualizar usuario:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ========== RUTAS DE SALUD ==========

app.get('/api/health', (req, res) => {
  const stats = {
    status: 'API funcionando correctamente ✅',
    modo: '🧪 PRUEBA LOCAL (sin Firebase)',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    usuarios: Object.keys(database.usuarios).length,
    reportes: database.reportes.length,
    fotosAlmacenadas: database.reportes.reduce((acc, r) => acc + r.fotos.length, 0),
    db: {
      usuarios: Object.keys(database.usuarios).length,
      reportes: database.reportes.length
    }
  };
  res.json(stats);
});

app.get('/api/stats', (req, res) => {
  res.json({
    usuarios: database.usuarios,
    reportes: database.reportes,
    totalFotos: database.reportes.reduce((acc, r) => acc + r.fotos.length, 0),
    fotosDir: {
      path: uploadsDir,
      exists: fs.existsSync(uploadsDir),
      files: fs.readdirSync(uploadsDir).length
    }
  });
});

// ========== MANEJO DE ERRORES ==========

app.use((err, req, res, next) => {
  console.error('❌ Error global:', err.message);
  res.status(500).json({ error: err.message });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// ========== INICIAR SERVIDOR ==========

app.listen(PORT, () => {
  console.log(`\n🚀 Servidor de prueba corriendo en http://localhost:${PORT}`);
  console.log(`📍 API Base URL: http://localhost:${PORT}/api`);
  console.log(`📁 Carpeta de uploads: ${uploadsDir}`);
  console.log(`\n📊 Estadísticas disponibles en: http://localhost:${PORT}/api/stats\n`);
  console.log('✅ Este servidor usa almacenamiento en memoria (para pruebas)');
  console.log('✅ Las fotos se guardan en: /front-end/assets/uploads/\n');
});

export default app;

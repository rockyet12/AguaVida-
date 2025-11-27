import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;

// Servir archivos estáticos
app.use(express.static(__dirname));

// Rutas para los archivos HTML
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/home', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'register.html')));
app.get('/mapa', (req, res) => res.sendFile(path.join(__dirname, 'mapa.html')));
app.get('/reportar', (req, res) => res.sendFile(path.join(__dirname, 'reportar.html')));
app.get('/perfil', (req, res) => res.sendFile(path.join(__dirname, 'perfil.html')));

app.listen(PORT, () => {
  console.log(`\n🌊 Frontend ejecutándose en http://localhost:${PORT}\n`);
  console.log(`Páginas disponibles:`);
  console.log(`  - http://localhost:${PORT}/         (Index)`);
  console.log(`  - http://localhost:${PORT}/home     (Home)`);
  console.log(`  - http://localhost:${PORT}/login    (Login)`);
  console.log(`  - http://localhost:${PORT}/register (Registro)`);
  console.log(`  - http://localhost:${PORT}/mapa     (Mapa)`);
  console.log(`  - http://localhost:${PORT}/reportar (Reportar)`);
  console.log(`  - http://localhost:${PORT}/perfil   (Perfil)\n`);
});

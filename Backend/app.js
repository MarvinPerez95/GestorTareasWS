import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

import { AppDataSource } from './data-source.js';
//import { logMiddleware, logError } from './middleware/log.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

AppDataSource.initialize()
    .then(() => console.log('📦 Base de datos conectada'))
    .catch(error => console.error('❌ Error al conectar TypeORM:', error));

// Importar rutas
// import usuarioRoutes from './routes/usuario.routes.js';
import tableroRoutes from './routes/tableroRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import consultaRoutes from './routes/consultaRoutes.js';
import departamentoRouter from './routes/departamentosRoutes.js'
import categoriaRoutes from './routes/categoriaRoutes.js';
import estadoRoutes from './routes/estadoRoutes.js';
import prioridadRoutes from './routes/prioridadRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
//app.use(logMiddleware());

// Servir archivos estáticos si se requieren (por ejemplo, archivos subidos)
app.use('/uploads', express.static('Backend/uploads'));

// Import Rutas FrondEnd
app.use(express.static(path.join(__dirname, '../Frontend')))

// Ruta raíz
app.get('/', (req, res) => {
    res.send('API de Kanban en funcionamiento');
});

// Rutas API
app.use('/tablero', tableroRoutes);
app.use('/tarea', tareaRoutes);
app.use('/usuario', usuarioRoutes)
app.use('/consulta', consultaRoutes)
app.use('/departamento', departamentoRouter)
app.use('/categoria', categoriaRoutes);
app.use('/estado', estadoRoutes);
app.use('/prioridad', prioridadRoutes);

// Ruestas HTML
app.get('/crear', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/crear.html'))
})
app.get("/panel", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/panelPrincipal.html"));
});


//Registro de Logs
//app.use(logError());

export { app };

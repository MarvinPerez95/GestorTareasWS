import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';

import { AppDataSource } from './data-source.js';

AppDataSource.initialize()
    .then(() => console.log('📦 Base de datos conectada'))
    .catch(error => console.error('❌ Error al conectar TypeORM:', error));

// Importar rutas
// import usuarioRoutes from './routes/usuario.routes.js';
import tableroRoutes from './routes/tableroRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js'

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Servir archivos estáticos si se requieren (por ejemplo, archivos subidos)
app.use('/uploads', express.static('Backend/uploads'));

// Ruta raíz
app.get('/', (req, res) => {
    res.send('API de Kanban en funcionamiento');
});

// Rutas API
app.use('/tablero', tableroRoutes);
app.use('/tarea', tareaRoutes);
app.use('/usuario', usuarioRoutes)
export { app };

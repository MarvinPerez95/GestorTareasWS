import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';

// Importar rutas
// import usuarioRoutes from './routes/usuario.routes.js';
import tableroRoutes from './routes/tableroRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';

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
// app.use('/usuarios', usuarioRoutes);
app.use('/tablero', tableroRoutes);
app.use('/tarea', tareaRoutes);

export { app };

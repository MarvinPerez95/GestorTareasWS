import express from 'express';
const router = express.Router();
import * as ctrl from '../controllers/TareaUsuarioController.js';

// GET /tareas/usuario/:usuarioId
router.get("/tareas/usuario/:usuarioId", ctrl.consultarTareasPorUsuario);

// GET /tableros
router.get("/tableros", ctrl.consultarTodosLosTableros);

export default router;

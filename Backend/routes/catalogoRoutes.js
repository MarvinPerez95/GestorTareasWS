import express from "express";
const router = express.Router();
import * as catalogo from "../controllers/catalogoController.js";

router.get("/categorias", catalogo.listarCategorias);
router.get("/estados", catalogo.listarEstados);
router.get("/prioridades", catalogo.listarPrioridades);
router.get("/departamentos", catalogo.listarDepartamentos);
router.get("/usuarios", catalogo.listarUsuarios);

export default router;

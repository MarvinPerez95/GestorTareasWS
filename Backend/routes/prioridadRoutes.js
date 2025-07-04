import express from "express";
import * as prioridad from "../controllers/prioridadController.js";

const router = express.Router();

router.get("/", prioridad.listarPrioridades);

export default router;

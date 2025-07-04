import express from "express";
import * as estado from "../controllers/estadoController.js";

const router = express.Router();

router.get("/", estado.listarEstados);

export default router;

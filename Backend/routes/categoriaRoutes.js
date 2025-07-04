import express from "express";
import * as categoria from "../controllers/categoriaController.js";

const router = express.Router();

router.get("/", categoria.listarCategorias);

export default router;

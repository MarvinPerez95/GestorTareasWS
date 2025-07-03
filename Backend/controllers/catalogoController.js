import { AppDataSource } from "../data-source.js";

const categoriaRepo = AppDataSource.getRepository("Categoria");
const estadoRepo = AppDataSource.getRepository("Estado");
const prioridadRepo = AppDataSource.getRepository("Prioridad");
const departamentoRepo = AppDataSource.getRepository("Departamento");
const usuarioRepo = AppDataSource.getRepository("Usuario");

export async function listarCategorias(req, res) {
    const data = await categoriaRepo.find();
    res.json(data);
}

export async function listarEstados(req, res) {
    const data = await estadoRepo.find();
    res.json(data);
}

export async function listarPrioridades(req, res) {
    const data = await prioridadRepo.find();
    res.json(data);
}

export async function listarDepartamentos(req, res) {
    const data = await departamentoRepo.find();
    res.json(data);
}

export async function listarUsuarios(req, res) {
    const data = await usuarioRepo.find();
    res.json(data);
}


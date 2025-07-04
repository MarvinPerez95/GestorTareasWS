import { AppDataSource } from "../data-source.js";

const prioridadRepo = AppDataSource.getRepository("Prioridad");

export async function listarPrioridades(req, res) {
    const data = await prioridadRepo.find();
    res.json(data);
}

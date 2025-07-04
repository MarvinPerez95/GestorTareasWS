import { AppDataSource } from "../data-source.js";

const estadoRepo = AppDataSource.getRepository("Estado");

export async function listarEstados(req, res) {
    const data = await estadoRepo.find();
    res.json(data);
}

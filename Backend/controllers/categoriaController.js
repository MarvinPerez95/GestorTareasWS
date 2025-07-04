import { AppDataSource } from "../data-source.js";

const categoriaRepo = AppDataSource.getRepository("Categoria");

export async function listarCategorias(req, res) {
    const data = await categoriaRepo.find();
    res.json(data);
}

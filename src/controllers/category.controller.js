import categoryService from "../services/category.service.js";

const getAll = async (req, res) => {
  try {
    const categories = await categoryService.getAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const category = await categoryService.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const category = await categoryService.update(req.params.id, req.body);
    if (!category) return res.status(404).json({ error: "Categoría no encontrada" });
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const category = await categoryService.remove(req.params.id);
    if (!category) return res.status(404).json({ error: "Categoría no encontrada" });
    res.json({ message: "Categoría desactivada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { getAll, create, update, remove };
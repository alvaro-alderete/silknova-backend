import productService from "../services/product.service.js";

const getAll = async (req, res) => {
  try {
    const result = await productService.getAll(req.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getByUrlNombre = async (req, res) => {
  try {
    const product = await productService.getByUrlNombre(req.params.urlNombre);
    if (!product) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const product = await productService.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const product = await productService.update(req.params.id, req.body);
    if (!product) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const product = await productService.remove(req.params.id);
    if (!product) return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ message: "Producto desactivado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { getAll, getByUrlNombre, create, update, remove };
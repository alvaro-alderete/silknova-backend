import Product from "../models/Product.js";

const getAll = async ({ page = 1, limit = 15, categoria, genero, destacado, busqueda }) => {
  const filtro = { activo: true };

  if (categoria) filtro.categoria = categoria;
  if (genero) filtro.genero = genero;
  if (destacado !== undefined) filtro.destacado = destacado === "true";
  if (busqueda) filtro.nombre = { $regex: busqueda, $options: "i" };

  const skip = (page - 1) * limit;
  const total = await Product.countDocuments(filtro);
  const productos = await Product.find(filtro)
    .populate("categoria", "nombre urlNombre")
    .skip(skip)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  return { productos, total, page: Number(page), totalPages: Math.ceil(total / limit) };
};

const getByUrlNombre = async (urlNombre) => {
  return await Product.findOne({ urlNombre, activo: true }).populate("categoria", "nombre urlNombre");
};

const getById = async (id) => {
  return await Product.findById(id).populate("categoria", "nombre urlNombre");
};

const create = async (data) => {
  const product = new Product(data);
  return await product.save();
};

const update = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const remove = async (id) => {
  return await Product.findByIdAndUpdate(id, { activo: false }, { new: true });
};

export default { getAll, getByUrlNombre, getById, create, update, remove };
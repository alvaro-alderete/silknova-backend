import Product from "../models/Product.js";

const getAll = async (params) => {
  // destructuración con defaults
  const {
    page = 1,
    limit = 15,
    categoria,
    genero,
    destacado,
    busqueda,
    orden
  } = params;

  // filtro base
  let filtro = { activo: true };

  // filtros opcionales
  if (categoria) {
    filtro.categoria = categoria;
  }

  if (genero) {
    filtro.genero = genero;
  }

  if (destacado !== undefined) {
    filtro.destacado = (destacado === "true");
  }

  if (busqueda) {
    filtro.nombre = {
      $regex: busqueda,
      $options: "i"
    };
  }

  let criterioOrdenamiento = { createdAt: -1 };

  switch (orden) {
    case "asc":
      criterioOrdenamiento = { precio: 1 };
      break;

    case "desc":
      criterioOrdenamiento = { precio: -1 };
      break;

    case "oferta":
      filtro.precioAnterior = { $ne: null };
      filtro.$expr = {
        $gt: ["$precioAnterior", "$precio"]
      };
      break;

    default:
      break;
  }

  const skip = (page - 1) * limit;

  const total = await Product.countDocuments(filtro);

  const productos = await Product.find(filtro)
    .populate("categoria", "nombre urlNombre")
    .skip(skip)
    .limit(Number(limit))
    .sort(criterioOrdenamiento);

  return {
    productos,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit)
  };
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
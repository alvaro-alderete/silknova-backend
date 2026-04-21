import Category from "../models/Category.js";

const getAll = async () => {
  return await Category.find({ activo: true }).sort({ nombre: 1 });
};

const getById = async (id) => {
  return await Category.findById(id);
};

const create = async (data) => {
  const category = new Category(data);
  return await category.save();
};

const update = async (id, data) => {
  return await Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const remove = async (id) => {
  return await Category.findByIdAndUpdate(id, { activo: false }, { new: true });
};

export default { getAll, getById, create, update, remove };
import Favorite from "../models/Favorite.js";

export const obtenerFavoritos = async (usuarioId) => {
  return await Favorite.find({ usuario: usuarioId }).populate({
    path: "producto",
    select: "nombre precio precioAnterior imagenes categoria",
    populate: { path: "categoria", select: "nombre" },
  });
};

export const agregarFavorito = async (usuarioId, productoId) => {
  const existe = await Favorite.findOne({ usuario: usuarioId, producto: productoId });
  if (existe) throw new Error("El producto ya está en favoritos");

  await Favorite.create({ usuario: usuarioId, producto: productoId });
  return { mensaje: "Producto agregado a favoritos" };
};

export const quitarFavorito = async (usuarioId, productoId) => {
  const resultado = await Favorite.findOneAndDelete({ usuario: usuarioId, producto: productoId });
  if (!resultado) throw new Error("El producto no está en favoritos");
  return { mensaje: "Producto quitado de favoritos" };
};

export const toggleFavorito = async (usuarioId, productoId) => {
  const existe = await Favorite.findOne({ usuario: usuarioId, producto: productoId });

  if (existe) {
    await existe.deleteOne();
  } else {
    await Favorite.create({ usuario: usuarioId, producto: productoId });
  }

  const total = await Favorite.countDocuments({ usuario: usuarioId });
  return { estaEnFavoritos: !existe, totalFavoritos: total };
};

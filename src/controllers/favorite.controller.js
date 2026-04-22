import * as favoritosService from "../services/favorite.service.js";

export const obtenerFavoritos = async (req, res) => {
  try {
    const favoritos = await favoritosService.obtenerFavoritos(req.usuario._id);
    res.status(200).json(favoritos);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

export const agregarFavorito = async (req, res) => {
  try {
    const resultado = await favoritosService.agregarFavorito(req.usuario._id, req.params.productoId);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

export const quitarFavorito = async (req, res) => {
  try {
    const resultado = await favoritosService.quitarFavorito(req.usuario._id, req.params.productoId);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

export const toggleFavorito = async (req, res) => {
  try {
    const resultado = await favoritosService.toggleFavorito(req.usuario._id, req.params.productoId);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

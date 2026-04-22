import { cartService } from "../services/cart.service.js";

export const getCart = async (req, res) => {
  try {
    const cart = await cartService.getOrCreateCart(req.usuario._id);
    res.status(200).json({ ok: true, cart });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const getCartSummary = async (req, res) => {
  try {
    const summary = await cartService.getCartSummary(req.usuario._id);
    res.status(200).json({ ok: true, summary });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

export const addItem = async (req, res) => {
  try {
    const { productoId, cantidad, talle, color } = req.body;
    if (!productoId) return res.status(400).json({ ok: false, mensaje: "productoId es requerido" });
    const cart = await cartService.addItem(req.usuario._id, { productoId, cantidad, talle, color });
    res.status(200).json({ ok: true, cart });
  } catch (error) {
    const status = error.message.includes("no encontrado") ? 404 : 400;
    res.status(status).json({ ok: false, mensaje: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { productoId, cantidad, talle, color } = req.body;
    if (!productoId || cantidad === undefined)
      return res.status(400).json({ ok: false, mensaje: "productoId y cantidad son requeridos" });
    const cart = await cartService.updateItem(req.usuario._id, { productoId, cantidad, talle, color });
    res.status(200).json({ ok: true, cart });
  } catch (error) {
    const status = error.message.includes("no encontrado") || error.message.includes("no existe") ? 404 : 400;
    res.status(status).json({ ok: false, mensaje: error.message });
  }
};

export const removeItem = async (req, res) => {
  try {
    const { productoId, talle, color } = req.body;
    if (!productoId) return res.status(400).json({ ok: false, mensaje: "productoId es requerido" });
    const cart = await cartService.removeItem(req.usuario._id, { productoId, talle, color });
    res.status(200).json({ ok: true, cart });
  } catch (error) {
    const status = error.message.includes("no encontrado") || error.message.includes("no existe") ? 404 : 400;
    res.status(status).json({ ok: false, mensaje: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    await cartService.clearCart(req.usuario._id);
    res.status(200).json({ ok: true, mensaje: "Carrito vaciado correctamente" });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

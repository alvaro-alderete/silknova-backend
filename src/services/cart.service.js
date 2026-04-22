import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const PRODUCT_FIELDS = "nombre precio precioAnterior imagenes stock activo urlNombre";

const getOrCreateCart = async (usuarioId) => {
  let cart = await Cart.findOne({ usuario: usuarioId, activo: true }).populate("items.producto", PRODUCT_FIELDS);
  if (!cart) {
    cart = await Cart.create({ usuario: usuarioId, items: [] });
    await cart.populate("items.producto", PRODUCT_FIELDS);
  }
  return cart;
};

const addItem = async (usuarioId, { productoId, cantidad = 1, talle = null, color = null }) => {
  const product = await Product.findById(productoId);
  if (!product) throw new Error("Producto no encontrado");
  if (!product.activo) throw new Error("El producto no está disponible");
  if (product.stock < cantidad) throw new Error("Stock insuficiente");

  let cart = await Cart.findOne({ usuario: usuarioId, activo: true });
  if (!cart) cart = await Cart.create({ usuario: usuarioId, items: [] });

  const index = cart.items.findIndex(
    (i) => i.producto.toString() === productoId && i.talle === talle && i.color === color
  );

  if (index !== -1) {
    const nuevaCantidad = cart.items[index].cantidad + cantidad;
    if (product.stock < nuevaCantidad) throw new Error("Stock insuficiente para esa cantidad");
    cart.items[index].cantidad = nuevaCantidad;
  } else {
    cart.items.push({ producto: productoId, cantidad, talle, color });
  }

  await cart.save();
  return cart.populate("items.producto", PRODUCT_FIELDS);
};

const updateItem = async (usuarioId, { productoId, cantidad, talle = null, color = null }) => {
  if (cantidad < 1) throw new Error("La cantidad mínima es 1");

  const product = await Product.findById(productoId);
  if (!product) throw new Error("Producto no encontrado");
  if (product.stock < cantidad) throw new Error("Stock insuficiente");

  const cart = await Cart.findOne({ usuario: usuarioId, activo: true });
  if (!cart) throw new Error("Carrito no encontrado");

  const index = cart.items.findIndex(
    (i) => i.producto.toString() === productoId && i.talle === talle && i.color === color
  );
  if (index === -1) throw new Error("El item no existe en el carrito");

  cart.items[index].cantidad = cantidad;
  await cart.save();
  return cart.populate("items.producto", PRODUCT_FIELDS);
};

const removeItem = async (usuarioId, { productoId, talle = null, color = null }) => {
  const cart = await Cart.findOne({ usuario: usuarioId, activo: true });
  if (!cart) throw new Error("Carrito no encontrado");

  const prevLength = cart.items.length;
  cart.items = cart.items.filter(
    (i) => !(i.producto.toString() === productoId && i.talle === talle && i.color === color)
  );
  if (cart.items.length === prevLength) throw new Error("El item no existe en el carrito");

  await cart.save();
  return cart.populate("items.producto", PRODUCT_FIELDS);
};

const clearCart = async (usuarioId) => {
  const cart = await Cart.findOne({ usuario: usuarioId, activo: true });
  if (!cart) throw new Error("Carrito no encontrado");
  cart.items = [];
  await cart.save();
  return cart;
};

const getCartSummary = async (usuarioId) => {
  const cart = await Cart.findOne({ usuario: usuarioId, activo: true }).populate(
    "items.producto",
    "nombre precio precioAnterior imagenes stock activo"
  );

  if (!cart) return { items: [], subtotal: 0, descuento: 0, total: 0, totalItems: 0 };

  let subtotal = 0;
  let descuento = 0;
  let totalItems = 0;

  for (const item of cart.items) {
    const p = item.producto;
    if (!p || !p.activo) continue;
    subtotal += p.precio * item.cantidad;
    if (p.precioAnterior) descuento += (p.precioAnterior - p.precio) * item.cantidad;
    totalItems += item.cantidad;
  }

  return { items: cart.items, subtotal, descuento, total: subtotal, totalItems };
};

export const cartService = {
  getOrCreateCart,
  addItem,
  updateItem,
  removeItem,
  clearCart,
  getCartSummary,
};

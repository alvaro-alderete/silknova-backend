import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { enviarEmailRecuperacion } from "../utils/email.js";

const generarToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const registrarUsuario = async ({ nombre, email, password }) => {
  const existente = await User.findOne({ email });
  if (existente) throw new Error("Ya existe una cuenta con ese email");

  const hashed = await hashPassword(password);
  const usuario = await User.create({ nombre, email, password: hashed });

  return { _id: usuario._id, nombre: usuario.nombre, email: usuario.email, token: generarToken(usuario._id) };
};

export const loginUsuario = async ({ email, password }) => {
  const usuario = await User.findOne({ email });
  if (!usuario) throw new Error("Email o contraseña incorrectos");

  const passwordOk = await comparePassword(password, usuario.password);
  if (!passwordOk) throw new Error("Email o contraseña incorrectos");

  return { _id: usuario._id, nombre: usuario.nombre, email: usuario.email, token: generarToken(usuario._id) };
};

export const obtenerPerfil = async (id) => {
  const usuario = await User.findById(id).select("-password");
  if (!usuario) throw new Error("Usuario no encontrado");
  return usuario;
};

export const solicitarRecuperacion = async (email) => {
  const usuario = await User.findOne({ email });
  if (!usuario) throw new Error("No existe una cuenta con ese email");

  const token = crypto.randomBytes(32).toString("hex");
  usuario.resetToken = token;
  usuario.resetTokenExpira = new Date(Date.now() + 60 * 60 * 1000);
  await usuario.save();

  await enviarEmailRecuperacion(email, token);
};

export const resetearPassword = async (token, nuevaPassword) => {
  const usuario = await User.findOne({
    resetToken: token,
    resetTokenExpira: { $gt: new Date() },
  });
  if (!usuario) throw new Error("Token inválido o expirado");

  usuario.password = await hashPassword(nuevaPassword);
  usuario.resetToken = null;
  usuario.resetTokenExpira = null;
  await usuario.save();
};

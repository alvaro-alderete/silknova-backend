import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/password.js";

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

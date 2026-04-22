import { registrarUsuario, loginUsuario, obtenerPerfil, solicitarRecuperacion, resetearPassword } from "../services/auth.service.js";

export const registro = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password)
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    const datos = await registrarUsuario({ nombre, email, password });
    res.status(201).json(datos);
  } catch (error) {
    if (error.message === "Ya existe una cuenta con ese email")
      return res.status(409).json({ mensaje: error.message });
    res.status(400).json({ mensaje: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ mensaje: "Email y contraseña son obligatorios" });
    const datos = await loginUsuario({ email, password });
    res.status(200).json(datos);
  } catch (error) {
    res.status(401).json({ mensaje: error.message });
  }
};

export const perfil = async (req, res) => {
  try {
    const usuario = await obtenerPerfil(req.usuario.id);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(404).json({ mensaje: error.message });
  }
};

export const recuperarContrasena = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ mensaje: "El email es obligatorio" });
    await solicitarRecuperacion(email);
    res.json({ mensaje: "Te enviamos un email con las instrucciones" });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ mensaje: "Token y contraseña son obligatorios" });
    await resetearPassword(token, password);
    res.json({ mensaje: "Contraseña actualizada correctamente" });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

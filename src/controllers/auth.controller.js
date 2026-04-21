import { registrarUsuario, loginUsuario, obtenerPerfil } from "../services/auth.service.js";

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

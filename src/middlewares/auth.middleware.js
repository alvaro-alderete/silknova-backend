import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protegerRuta = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ mensaje: "No autorizado, token faltante" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = await User.findById(decoded.id).select("-password");

    if (!req.usuario) return res.status(401).json({ mensaje: "Usuario no encontrado" });

    next();
  } catch (error) {
    res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
};

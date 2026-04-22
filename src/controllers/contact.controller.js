import { enviarMensajeContacto } from "../services/contact.service.js";

export const contacto = async (req, res) => {
  try {
    const { nombre, email, asunto, mensaje } = req.body;
    if (!nombre || !email || !asunto || !mensaje)
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });

    await enviarMensajeContacto({ nombre, email, asunto, mensaje });
    res.json({ mensaje: "Mensaje enviado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al enviar el mensaje" });
  }
};

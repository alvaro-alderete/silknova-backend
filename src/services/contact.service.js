import { transporter } from "../utils/email.js";

export const enviarMensajeContacto = async ({ nombre, email, asunto, mensaje }) => {
  await transporter.sendMail({
    from: `"SilkNova Contacto" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `Contacto: ${asunto}`,
    html: `
      <h3>Nuevo mensaje de contacto</h3>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Asunto:</strong> ${asunto}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${mensaje}</p>
    `,
  });
};

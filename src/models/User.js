import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: [true, "El nombre es obligatorio"], trim: true },
    email: { type: String, required: [true, "El email es obligatorio"], unique: true, lowercase: true, trim: true },
    password: { type: String, required: [true, "La contraseña es obligatoria"], minlength: [6, "La contraseña debe tener al menos 6 caracteres"] },
    resetToken: { type: String, default: null },
    resetTokenExpira: { type: Date, default: null },
    favoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    carrito: [
      {
        producto: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        cantidad: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

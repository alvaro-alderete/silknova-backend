import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true, min: 0 },
    precioAnterior: { type: Number, default: null },
    imagenes: { type: [String], required: true },
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    stock: { type: Number, required: true, default: 0, min: 0 },
    talle: { type: [String], enum: ["XS", "S", "M", "L", "XL", "XXL"], default: [] },
    color: { type: [String], default: [] },
    genero: { type: String, enum: ["mujer", "hombre", "unisex"], required: true },
    material: { type: String, trim: true },
    destacado: { type: Boolean, default: false },
    activo: { type: Boolean, default: true },
    urlNombre: { type: String, required: true, unique: true, trim: true, lowercase: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
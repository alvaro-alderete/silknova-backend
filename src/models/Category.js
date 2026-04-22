import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    urlNombre: { type: String, required: true, unique: true, trim: true, lowercase: true },
    activo: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
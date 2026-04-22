import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    producto: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    cantidad: { type: Number, required: true, default: 1, min: 1 },
    talle: { type: String, enum: ["XS", "S", "M", "L", "XL", "XXL"], default: null },
    color: { type: String, default: null },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: { type: [cartItemSchema], default: [] },
    activo: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);

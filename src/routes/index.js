import { Router } from "express";
import authRoutes from "./auth.routes.js";
import productRoutes from "./product.routes.js";
import categoryRoutes from "./category.routes.js";
import favoriteRoutes from "./favorite.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/favorites", favoriteRoutes);

export default router;

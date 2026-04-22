import { Router } from "express";
import { obtenerFavoritos, agregarFavorito, quitarFavorito, toggleFavorito } from "../controllers/favorite.controller.js";
import { protegerRuta } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protegerRuta);

router.get("/", obtenerFavoritos);
router.post("/:productoId", agregarFavorito);
router.delete("/:productoId", quitarFavorito);
router.put("/:productoId/toggle", toggleFavorito);

export default router;

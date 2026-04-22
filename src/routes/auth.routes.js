import { Router } from "express";
import { registro, login, perfil, recuperarContrasena, resetPassword } from "../controllers/auth.controller.js";
import { protegerRuta } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/registro", registro);
router.post("/login", login);
router.get("/perfil", protegerRuta, perfil);
router.post("/recuperar-contrasena", recuperarContrasena);
router.post("/resetear-contrasena", resetPassword);

export default router;

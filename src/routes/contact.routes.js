import { Router } from "express";
import { contacto } from "../controllers/contact.controller.js";

const router = Router();

router.post("/", contacto);

export default router;

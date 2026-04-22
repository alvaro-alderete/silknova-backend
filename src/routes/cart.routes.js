import { Router } from "express";
import { getCart, getCartSummary, addItem, updateItem, removeItem, clearCart } from "../controllers/cart.controller.js";
import { protegerRuta } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protegerRuta);

router.get("/", getCart);
router.get("/summary", getCartSummary);
router.post("/items", addItem);
router.put("/items", updateItem);
router.delete("/items", removeItem);
router.delete("/", clearCart);

export default router;

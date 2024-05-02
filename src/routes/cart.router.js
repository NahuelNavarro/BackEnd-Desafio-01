import { Router } from "express";
import { addProductInCart, createCart, getCartById } from "../controllers/carts.js";

export const router = Router();

router.post('/', createCart);

router.get('/:cid', getCartById);

router.post('/:cid/product/:pid', addProductInCart);



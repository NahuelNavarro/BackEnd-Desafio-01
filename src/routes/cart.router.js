import { Router } from "express";
export const router = Router();
import CartManager from '../dao/CartManager.js';


router.post('/', (req, res) => {

    const c = new CartManager();
    const result = c.createCart();
    return res.json({ result })
})

router.get('/:cid', (req, res) => {

    const { cid:id }= req.params
    const carts = new CartManager()
    const products = carts.getCartById(id)
    return res.json({products})

//mostrar los productos segun el ID del carrito
})

router.post('/:cid/product/:pid', (req, res) => {
    const {cid , pid} = req.params;
    const c = new CartManager();
    const result = c.addProductInCart(cid , pid);
    return res.json({result});
});



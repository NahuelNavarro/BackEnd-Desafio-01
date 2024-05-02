import { Router } from "express";
import { productModel } from "../data/models/products.js";
export const router = Router()

router.get('/', async (req, res) => {
    const productos = await productModel.find().lean();
    res.setHeader('Content-Type', 'text/html')
    res.status(200).render('home', { productos })
})

router.get('/realtimeproducts', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.status(200).render('realtimeproducts')
})
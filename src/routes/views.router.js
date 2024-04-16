import { Router } from "express";
import ProductManager from "../dao/ProductManager.js";
export const router = Router()

router.get('/', (req, res) => {
    const p = new ProductManager();
    const productos = p.getProducts();
    res.setHeader('Content-Type', 'text/html')
    res.status(200).render('home', { productos })
})

router.get('/realtimeproducts', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.status(200).render('realtimeproducts')
})
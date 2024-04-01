//const express = require('express');
import express from 'express'
//const ProductManager = require('./classes/ProductManager')
import { router as productosRouter } from './routes/products.router.js'
import { router as cartsRouter } from './routes/cart.router.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/productos", productosRouter)
app.use("/api/carts", cartsRouter)



app.listen(8080, () => console.log("Servido 8080 iniciado"))
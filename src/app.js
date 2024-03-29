//const express = require('express');
import express from 'express'
//const ProductManager = require('./classes/ProductManager')
import { router as productosRouter } from './routes/products.router.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/productos", productosRouter)


app.listen(8080, () => console.log("Servido 8080 iniciado"))
//const express = require('express');
import express from 'express'
//const ProductManager = require('./classes/ProductManager')
import { router as productosRouter } from './routes/products.router.js'
import { router as cartsRouter } from './routes/cart.router.js'
import { router as vistasRouter } from './routes/views.router.js'
import { Server, Socket } from 'socket.io'
import { engine } from 'express-handlebars'
import __dirname from './utils.js'
import ProductManager from './dao/ProductManager.js'
import { dbConnection } from './database/config.js'
import { productModel } from './data/models/products.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));


//handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use('/', vistasRouter)

//socket.io


app.use("/api/productos", productosRouter)
app.use("/api/carts", cartsRouter)

await dbConnection();

const p = new ProductManager()

const expressServer = app.listen(8080, () => console.log("Servido 8080 iniciado"));

const io = new Server(expressServer)
io.on('connection', async (socket) => {

    //const productos = p.getProducts();
    const productos = await productModel.find()
    socket.emit('productos', productos)

    socket.on('agregarProducto', async (nuevoProducto) => {
        const newProduct =  await productModel.create({...nuevoProducto})
        if(newProduct){
            productos.push(newProduct)
        }
        socket.emit('productos', productos)
    })
})
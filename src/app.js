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


const p = new ProductManager()

const expressServer = app.listen(8080, () => console.log("Servido 8080 iniciado"));

const socketServer = new Server(expressServer)
socketServer.on('connection',socket=>{

    const productos = p.getProducts();
    socket.emit('productos',productos)

    socket.on('agregarProducto', nuevoProducto=>{
        console.log({nuevoProducto})
        const result = p.addProduct({...nuevoProducto});
        console.log({result})
    })
})
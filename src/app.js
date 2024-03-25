//const express = require('express');
import express from 'express'
//const ProductManager = require('./classes/ProductManager')
import ProductManager from './classes/ProductManager.js'

const products = new ProductManager()

const productos = products.getProducts()
const app = express()

app.use(express.urlencoded({extended:true}))

//busco una cantidad de resultados con REQ.QUERY.
app.get('/', (req, res) => {
    const limit = req.query.limit;
    if (limit) { //si le paso un valor haceme lo de abajo, sino mostrame todos los productos
        const cantidadLimite = parseInt(limit); //lo convierte a numero 
        const datosLimitados = productos.slice(0, cantidadLimite);// slice lo uso para extraer numeros desde un unicio hasta una posicion del array final arr.slice([inicio [, fin]])
        res.send({datosLimitados});
    } else {
        res.send({ productos });
    }
});



//busco mi producto por el ID con REQ PARAMS
app.get('/:idProducto',(req,res)=>{
    const idProducto = req.params.idProducto;
    let producto = productos.find(item => item.id == idProducto)
    if(!producto) return res.send({error:"producto no encontrado"})
    res.send({producto})
})

    

app.listen(8080, () => console.log("Servido 8080 iniciado"))
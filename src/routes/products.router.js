import { Router } from "express";
export const router = Router();
import ProductManager from '../dao/ProductManager.js';


const products = new ProductManager()
const productos = products.getProducts()



//busco una cantidad de resultados con REQ.QUERY.
router.get('/', (req, res) => {
    const limit = req.query.limit;
    if (limit) { //si le paso un valor haceme lo de abajo, sino mostrame todos los productos
        const cantidadLimite = parseInt(limit); //lo convierte a numero 
        const datosLimitados = productos.slice(0, cantidadLimite);// slice lo uso para extraer numeros desde un unicio hasta una posicion del array final arr.slice([inicio [, fin]])
        res.send({ datosLimitados });
    } else {
        res.send({ productos });
    }
});

//busco mi producto por el ID con REQ PARAMS
router.get('/:pid', (req, res) => {
    const idProducto = req.params.pid;
    let producto = productos.find(item => item.id == idProducto)
    console.log(producto)
    if (!producto) return res.send({ error: "producto no encontrado" })
    res.send({ producto })
})


router.post('/', (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body
    const p = new ProductManager()
    const result = p.addProduct(title, description, price, thumbnail, code, stock)
    return res.json(products.addProduct({ result }))

})

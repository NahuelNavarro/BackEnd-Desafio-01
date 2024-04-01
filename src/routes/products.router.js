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

    const { pid: id } = req.params; // Aquí se utiliza desestructuración
    const productoId = products.getProductsById(id);
    console.log(productoId);
    res.send({ productoId });
})


router.post('/', (req, res) => {

    const { title, description, price, thumbnail, code, stock, status = true, category } = req.body
    const agregarProducto = products.addProduct(title, description, price, thumbnail, code, stock, status = true, category)
    return res.json({ agregarProducto })

})

router.put('/:pid', (req, res) => {

    const { pid: id } = req.params
    const modificarProducto = products.updateProduct(id, req.body)
    return res.json({ modificarProducto })
})

router.delete('/:pid', (req, res) => {
    
    const { pid: id } = req.params
    const productoEliminado = products.deleteProduct(id)
    return res.json({ productoEliminado })
})
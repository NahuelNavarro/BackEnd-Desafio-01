import { Router } from "express";
import { productModel } from "../data/models/products.js";
import { ManagerMongo } from "../dao/ProductManagerMongo.js";
import { auth } from "../middleware/auth.js";
export const router = Router()

router.get('/', async (req, res) => {
    const productos = await productModel.find().lean();
    res.setHeader('Content-Type', 'text/html')
    res.status(200).render('products', { productos })
})

router.get('/realtimeproducts', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.status(200).render('realtimeproducts')
})

router.get('/chat', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.status(200).render('chat')
})

const  productManager = new ManagerMongo()
router.get('/products', async (req, res) => {

    let {pagina} = req.query
    if(!pagina) pagina = 1

    let {docs:productos,totalPages,hasPrevPage,hasNextPage,prevPage,nextPage} = await productManager.getAllPaginate(pagina)
    console.log(productos)
    res.setHeader('Content-Type', 'text/html')
    res.status(200).render('products',{productos,totalPages,hasPrevPage,hasNextPage,prevPage,nextPage,usuario:req.session.usuario
    })
})

router.get('/login',(req , res)=>{
    let {error} = req.query
    res.status(200).render('login', {error})
})

router.get('/registro',(req , res)=>{
    res.status(200).render('register')
})

router.get('/profile', auth, (req , res)=>{
    res.status(200).render('profile',{
        usuario:req.session.usuario
    })
})
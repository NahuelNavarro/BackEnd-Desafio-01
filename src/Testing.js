//const ProductManager = require("./classes/productManager")
import ProductManager from "./dao/ProductManager.js";
import CartManager from "./dao/CartManager.js";


const cart = new CartManager();
const producto = new ProductManager();


//console.log(producto.addProduct("Motorola","hnjmknjmk",500,"img/http.img","4542",5))
//console.log(producto.addProduct("Iphone","hnjmknjmk",300,"img/http.img","44332",5))
//console.log(producto.leerProductosInFile())
//

//console.log(producto.addProduct("comida","blabla",400,45313,2,false,"comida"))
//!title || !description || !price || !code || !stock || status || category
//console.log(producto.getProducts())

//console.log(producto.deleteProduct(2024003))
//console.log(producto.updateProduct(2024001))

//console.log(cart.leerCart())
//console.log(Cart.guardarCart())
console.log(cart.addCart(20))




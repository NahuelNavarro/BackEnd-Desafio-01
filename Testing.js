const ProductManager = require("./productManager")

const producto = new ProductManager();


//console.log(producto.addProduct("Motorola","hnjmknjmk",500,"img/http.img","4542",5))
//console.log(producto.addProduct("Iphone","hnjmknjmk",300,"img/http.img","44332",5))
//console.log(producto.addProduct("redbla1","hnjmknjmk",300,"img/http.img","42kfdd2",5))
//
//console.log(producto.addProduct("nuevo", "hnjmknjmk", 300, "img/http.img", "42kxx2", 5))

//console.log(producto.getProductsById)

//console.log(producto.deleteProduct(2024002))
//console.log(producto.updateProduct(2024001))

const productoNuevo = {

    "id" : 2024001888888383838,
    "title" : "IphoneNuevoXR",
    "description" : "dfrtgyhujdrftgy",
    "price" : 10000,
    


}



console.log(producto.updateProduct(2024001, productoNuevo))



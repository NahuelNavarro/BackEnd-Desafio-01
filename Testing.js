const ProductManager = require("./productManager")

const producto = new ProductManager();

//console.log(producto.getProducts());
//console.log(producto.getProductsById(1));
console.log(producto.addProduct('Moto xz', '4gb + 500 gb', 500 ,'img1','4532gb',5));
console.log(producto.addProduct('Moto z3', '4gb + 500 gb', 500 ,'img1','4532lb',5));
console.log(producto.addProduct('Moto z3', '4gb + 500 gb', 500 ,'img1','4532xq',5));
console.log(producto.addProduct('Moto z3', '4gb + 500 gb', 500 ,'img1','4534Ls',5));
console.log(producto.getProductsById(20240003));




console.log(producto.getProducts());


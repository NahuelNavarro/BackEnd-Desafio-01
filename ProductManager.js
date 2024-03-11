class ProductManager {
    static idProducto = 0;
    //Constructor
    constructor() {
        this.products = [];
    }

    //Metodos
    addProduct(title, description, price, thumbnail, code, stock) {

        if (!title || !description || !price || !thumbnail || !code || !stock)
            return "todos los campos son obligatorios"

        let isInProducts = this.products.some(item => item.code == code)

        if (isInProducts)
            return "el codigo ya se encuentra registrado"

        ProductManager.idProducto = ProductManager.idProducto + 1

        let idAño = 20240000
        let id = idAño + ProductManager.idProducto

        const nuevoProducto = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.products.push(nuevoProducto)

        return "Producto agregado correctamente"

    }

    getProducts() {
        return this.products;

    }

    //busco el producto por id
    getProductsById(id) {
        let isItemFound = this.products.find(item => item.id == id);
        if (isItemFound) return isItemFound
        else
            return "not found"

    }

}


module.exports = ProductManager;
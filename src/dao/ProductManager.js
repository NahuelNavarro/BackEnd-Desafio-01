//const fs = require('fs');
import fs from 'fs'

class ProductManager {
    products;
    path;
    static idProducto = 0;

    //Constructor
    constructor() {
        this.path = './src/data/productos.json';
        this.products = this.leerProductosInFile();

    }

    //Metodos

    leerProductosInFile() {
        try {
            if (fs.existsSync(this.path))
                return JSON.parse(fs.readFileSync(this.path, 'utf-8')); //paso una cadena de texto a objeto para verlo por consola
            return [];


        } catch (error) {
            console.log(`el error es el siguiente, ${error}`)

        }
    }

    guardarArchivo() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products)) // paso un objeto a texto para guardarlo en el JSON
        } catch (error) {
            console.log(`el error es el siguiente, ${error}`)

        }

    }

    asignarId() {
        let id = 2024000;
        if (this.products.length != 0)
            id = this.products[this.products.length - 1].id + 1;
        return id
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        // Verifica si algún campo obligatorio está faltando
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return "Todos los campos son obligatorios";
        }
    
        // Verifica si el código ya está en uso
        const isInProducts = this.products.some(item => item.code == code);
        if (isInProducts) {
            return "El código ya se encuentra registrado";
        }
    
        // Incrementa el contador de ID
        ProductManager.idProducto++;
    
        // Asigna un nuevo ID al producto
        const id = this.asignarId();
    
        // Crea un nuevo objeto para el producto
        const nuevoProducto = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
    
        // Agrega el nuevo producto al array de productos
        this.products.push(nuevoProducto);
    
        // Guarda los cambios en el archivo
        this.guardarArchivo();
    
        // Retorna un mensaje de éxito
        return "Producto agregado correctamente";
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

    updateProduct(id,objetUpdate) {
        const index = this.products.findIndex(item => item.id == id)
        if (index !== -1){// -1 indica que no esta el elemento item, da -1 cuando no encuentra el elemento
            const {id, ...rest} = objetUpdate
            this.products[index] = {...this.products[index], ...rest}
            console.log("producto modificado")
            this.guardarArchivo();
        }

    }

    deleteProduct(id) {
        const isIdFound = this.products.find(item => item.id == id)
        const indexFound = this.products.indexOf(isIdFound)
        const deleteItem = this.products.splice(indexFound, 1)

        if (isIdFound) {
            deleteItem
            this.guardarArchivo();
            console.log('eliminado')
        }


    }

}


//module.exports = ProductManager;

export default ProductManager
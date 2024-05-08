import { request, response } from "express";
import { productModel } from "../data/models/products.js";

export const getProducts = async (req = request, res = response) => {
    try {
        // Parámetros de consulta
        let { limit = 10, page = 1, query, sort } = req.query;
        limit = Number(limit);
        page = Number(page);

        // Filtros de búsqueda
        const filter = {};
        if (query) {
            // Aquí podrías implementar la lógica para filtrar por categoría o disponibilidad
            filter.category = query; // Suponiendo que la categoría está en el campo 'category'
        }

        // Ordenamiento
        const sortOptions = {};
        if (sort) {
            if (sort === "asc") {
                sortOptions.price = 1;
            } else if (sort === "desc") {
                sortOptions.price = -1;
            }
        }

        // Consulta para contar total de documentos
        const total = await productModel.countDocuments(filter);

        // Consulta para obtener productos con paginación y ordenamiento
        const skip = (page - 1) * limit;
        const productos = await productModel.find(filter)
            .limit(limit)
            .skip(skip)
            .sort(sortOptions);

        // Construcción de objeto de respuesta
        const totalPages = Math.ceil(total / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        const prevPage = hasPrevPage ? page - 1 : null;
        const nextPage = hasNextPage ? page + 1 : null;
        const prevLink = hasPrevPage ? `/products?page=${prevPage}&limit=${limit}&query=${query}&sort=${sort}` : null;
        const nextLink = hasNextPage ? `/products?page=${nextPage}&limit=${limit}&query=${query}&sort=${sort}` : null;

        return res.json({
            status: "success",
            payload: productos,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink
        });

    } catch (error) {
        console.log('getProducts => ', error);
        return res.status(500).json({ msg: 'Hablar con el admin' });
    }
}

export const getProductsById = async (req = request, res = response) => {
    try {
        const {pid} = req.params
        const producto = await productModel.findById(pid)
        if(!producto)
            return res.status(404).json({msg:`El producto con id ${pid} no existe`})
        return res.json({producto})

    } catch (error) {
        console.log('getProductsById => ', error)
        return res.status(500).json({msg:'Hablar con el admin'})
    }
}

export const addProduct = async (req = request, res = response) => {
    try {
        const {title,description,price,thumbnail,code,stock,category,status} = req.body;
        if(!title, !description, !code,!price,!stock,!category)
        return res.status(404).json({msg: `los campos title, !description, !code,!price,!stock,!category son obligatorios `})
        const producto = await productModel.create({title,description,price,thumbnail,code,stock,category,status})
    } catch (error) {
        console.log('addProduct => ', error)
        return res.status(500).json({msg:'Hablar con el admin'})
    }
}

export const updateProduct = async (req = request, res = response) => {
    try {
        const {pid} = req.params
        const {_id, ...rest} = req.body;
        const producto = await productModel.findByIdAndUpdate(pid,{...rest},{new: true})
        producto? res.json({msg:`Producto actualizado`, producto}) : res.status(400).json({msg:`no se encontro el producto con el ${pid}`})
    } catch (error) {
        console.log('updateProduct => ', error)
        return res.status(500).json({msg:'Hablar con el admin'})
    }
}

export const deleteProduct = async (req = request, res = response) => {
    try {
        const {pid} = req.params
        const producto = await productModel.findOneAndDelete(pid)
        producto? res.json({msg:`Producto eliminado`, producto}) : res.status(400).json({msg:`no se encontro el producto con el ${pid}`})
    } catch (error) {
        console.log('deleteProduct => ', error)
        return res.status(500).json({msg:'Hablar con el admin'})
    }
}


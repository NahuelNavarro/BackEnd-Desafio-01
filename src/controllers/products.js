import { request, response } from "express";
import { productModel } from "../data/models/products.js";

export const getProducts = async (req = request, res = response) => {
    try {
        const {limit} = req.query;
        const total = await productModel.countDocuments();
        const productos = await productModel.find().limit(Number(limit))
        return res.json({productos, total})

    } catch (error) {
        console.log('getProducts => ', error)
        return res.status(500).json({msg:'Hablar con el admin'})
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


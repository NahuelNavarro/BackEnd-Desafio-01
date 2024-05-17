import mongoose, { Schema, model } from "mongoose";

export const  usuarioModelo = mongoose.model('usuarios', new mongoose.Schema({
    nombre: {
        type: String,
        required: true // El nombre es obligatorio
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: true // La contraseña es obligatoria
    }
}))